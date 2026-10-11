/* Бэкенд рейтинга IMO Workbench на Cloudflare Workers + D1.

   API тот же, что у server/server.js, — клиент (assets/cloud.js) не отличает:
     GET  /api/board           -> {count, rows:[...]}
     POST /api/save            -> {token, row}   тело: {token?, nick?, stats?, remove?}
     GET  /api/admin?key=...   -> полный список (ключ из секрета ADMIN_KEY)

   Развёртывание — см. server/README.md. */

const MAX_ROWS = 5000;

/* Публичный id ученика = хеш его токена. Токен знает только сам ученик,
   поэтому подделать чужую строку нельзя, а токен при этом нигде не светится. */
async function pidOf(token) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("imo:" + token));
  return [...new Uint8Array(buf)].slice(0, 8).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const num = (v, max) => Math.min(max, Math.max(0, Math.round(Number(v) || 0)));

function nickOf(v) {
  return String(v == null ? "" : v).replace(/[\u0000-\u001f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 24);
}

const COLS = "pid, nick, joined, seen, pts, rated, solved, nfull, streak, best, nmod, diag";
const asRow = (r) => ({
  id: r.pid, nick: r.nick, joined: r.joined, seen: r.seen,
  pts: r.pts, rated: r.rated, solved: r.solved, full: r.nfull,
  streak: r.streak, best: r.best, mod: r.nmod, diag: r.diag
});

function cors(env) {
  return {
    "access-control-allow-origin": env.ORIGIN || "*",
    "access-control-allow-headers": "content-type",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-max-age": "86400"
  };
}
function json(env, code, obj) {
  return new Response(JSON.stringify(obj), {
    status: code,
    headers: Object.assign({
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }, cors(env))
  });
}
/* 204 обязан быть без тела: иначе Workers бросает TypeError и preflight падает */
const noContent = (env) => new Response(null, { status: 204, headers: cors(env) });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return noContent(env);
    if (!env.DB) return json(env, 500, { error: "no D1 binding" });

    if (request.method === "GET" && url.pathname === "/api/board") {
      const q = await env.DB.prepare(
        "SELECT " + COLS + " FROM students ORDER BY pts DESC LIMIT 500"
      ).all();
      const rows = (q.results || []).map(asRow);
      return json(env, 200, { count: rows.length, rows });
    }

    if (request.method === "GET" && url.pathname === "/api/admin") {
      if (!env.ADMIN_KEY || url.searchParams.get("key") !== env.ADMIN_KEY) {
        return json(env, 403, { error: "forbidden" });
      }
      const q = await env.DB.prepare(
        "SELECT " + COLS + " FROM students ORDER BY joined ASC"
      ).all();
      const rows = (q.results || []).map(asRow);
      return json(env, 200, { count: rows.length, rows });
    }

    if (request.method === "POST" && url.pathname === "/api/save") {
      let body;
      try { body = await request.json(); } catch (e) { return json(env, 400, { error: "bad json" }); }
      if (!body || typeof body !== "object") return json(env, 400, { error: "bad body" });

      let token = typeof body.token === "string" && /^[a-f0-9]{32}$/.test(body.token) ? body.token : "";

      if (body.remove) {
        if (token) await env.DB.prepare("DELETE FROM students WHERE pid = ?").bind(await pidOf(token)).run();
        return json(env, 200, { ok: true });
      }

      let prev = null;
      if (token) {
        const got = await env.DB.prepare("SELECT " + COLS + " FROM students WHERE pid = ?")
          .bind(await pidOf(token)).first();
        prev = got || null;
      }
      if (!token) {
        const c = await env.DB.prepare("SELECT COUNT(*) AS n FROM students").first();
        if (c && c.n >= MAX_ROWS) return json(env, 429, { error: "full" });
        token = crypto.randomUUID().replace(/-/g, "");
      }

      const nick = nickOf(body.nick != null ? body.nick : (prev ? prev.nick : ""));
      if (nick.length < 2) return json(env, 400, { error: "bad nick" });

      const st = body.stats || {};
      const now = new Date().toISOString();
      const pid = await pidOf(token);
      const row = {
        pid,
        nick,
        joined: prev ? prev.joined : now,
        seen: now,
        pts: num(st.pts, 100000),
        rated: num(st.rated, 10000),
        solved: num(st.solved, 10000),
        nfull: num(st.full, 10000),
        streak: num(st.streak, 100000),
        best: num(st.best, 100000),
        nmod: num(st.mod, 1000),
        diag: st.diag == null ? null : num(st.diag, 100)
      };

      await env.DB.prepare(
        "INSERT INTO students (" + COLS + ") VALUES (?,?,?,?,?,?,?,?,?,?,?,?) " +
        "ON CONFLICT(pid) DO UPDATE SET nick=excluded.nick, seen=excluded.seen, pts=excluded.pts, " +
        "rated=excluded.rated, solved=excluded.solved, nfull=excluded.nfull, streak=excluded.streak, " +
        "best=excluded.best, nmod=excluded.nmod, diag=excluded.diag"
      ).bind(row.pid, row.nick, row.joined, row.seen, row.pts, row.rated, row.solved,
        row.nfull, row.streak, row.best, row.nmod, row.diag).run();

      return json(env, 200, { token, row: asRow(row) });
    }

    return json(env, 404, { error: "not found" });
  }
};
