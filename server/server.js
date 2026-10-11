#!/usr/bin/env node
/* Минимальный бэкенд для входа и общего рейтинга IMO Workbench.
   Без зависимостей, хранит данные в одном JSON-файле.

   Запуск:  node server/server.js            (порт 8787, файл server/students.json)
            PORT=3000 DATA=/var/lib/imo.json node server/server.js

   Эндпоинты:
     GET  /api/board           -> {count, rows:[{id,nick,joined,seen,pts,...}]}
     POST /api/save            -> {token, row}   тело: {token?, nick?, stats?, remove?}
     GET  /api/admin?key=...   -> полный список (ключ из ADMIN_KEY)

   Честно о модели доступа: токен, который сервер выдаёт при регистрации,
   это и имя, и пароль ученика одновременно. Он хранится в localStorage
   браузера. Этого достаточно для класса (никто не может переписать чужую
   строку, не зная токена), но это не настоящая аутентификация: потерянный
   токен — потерянная строка, а общий компьютер делит токен на всех.
   Для чего-то большего нужен нормальный вход — здесь он сознательно не
   сделан, чтобы сервер оставался в один файл без зависимостей. */
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = +(process.env.PORT || 8787);
const FILE = process.env.DATA || path.join(__dirname, "students.json");
const ADMIN_KEY = process.env.ADMIN_KEY || "";
const ORIGIN = process.env.ORIGIN || "*";
const MAX_ROWS = 5000;

let store = { rows: {} };                 // token -> row
try { store = JSON.parse(fs.readFileSync(FILE, "utf8")); } catch (e) { }
if (!store || typeof store !== "object" || !store.rows) store = { rows: {} };

let writeTimer = null;
function persist() {                      // пишем не чаще раза в секунду
  if (writeTimer) return;
  writeTimer = setTimeout(() => {
    writeTimer = null;
    const tmp = FILE + ".tmp";
    try {
      fs.writeFileSync(tmp, JSON.stringify(store));
      fs.renameSync(tmp, FILE);
    } catch (e) { console.error("не удалось записать " + FILE + ": " + e.message); }
  }, 1000);
}

const num = (v, max) => Math.min(max, Math.max(0, Math.round(+v || 0)));
function nick(v) {
  return String(v == null ? "" : v).replace(/[\u0000-\u001f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 24);
}
function sanitize(body, prev) {
  const st = body.stats || {};
  const n = nick(body.nick != null ? body.nick : (prev ? prev.nick : ""));
  if (n.length < 2) return null;
  return {
    nick: n,
    joined: prev ? prev.joined : new Date().toISOString(),
    seen: new Date().toISOString(),
    pts: num(st.pts, 100000),
    rated: num(st.rated, 10000),
    solved: num(st.solved, 10000),
    full: num(st.full, 10000),
    streak: num(st.streak, 100000),
    best: num(st.best, 100000),
    mod: num(st.mod, 1000),
    diag: st.diag == null ? null : num(st.diag, 100)
  };
}
/* id, который виден другим: хеш токена, сам токен не раскрываем */
const pub = (token) => crypto.createHash("sha256").update("imo:" + token).digest("hex").slice(0, 16);

const CORS = {
  "access-control-allow-origin": process.env.ORIGIN || "*",
  "access-control-allow-headers": "content-type",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-max-age": "86400"
};
function preflight(res) {                 // 204 — без тела
  res.writeHead(204, CORS);
  res.end();
}
function send(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": ORIGIN,
    "access-control-allow-headers": "content-type",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(body)
  });
  res.end(body);
}

http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  if (req.method === "OPTIONS") return preflight(res);

  if (req.method === "GET" && url.pathname === "/api/board") {
    const rows = Object.keys(store.rows).map((tk) => Object.assign({ id: pub(tk) }, store.rows[tk]));
    return send(res, 200, { count: rows.length, rows: rows });
  }

  if (req.method === "GET" && url.pathname === "/api/admin") {
    if (!ADMIN_KEY || url.searchParams.get("key") !== ADMIN_KEY) return send(res, 403, { error: "forbidden" });
    const rows = Object.keys(store.rows).map((tk) => Object.assign({ id: pub(tk) }, store.rows[tk]));
    rows.sort((a, b) => String(a.joined).localeCompare(String(b.joined)));
    return send(res, 200, { count: rows.length, rows: rows });
  }

  if (req.method === "POST" && url.pathname === "/api/save") {
    let raw = "";
    req.on("data", (c) => { raw += c; if (raw.length > 8192) req.destroy(); });
    req.on("end", () => {
      let body;
      try { body = JSON.parse(raw || "{}"); } catch (e) { return send(res, 400, { error: "bad json" }); }
      if (!body || typeof body !== "object") return send(res, 400, { error: "bad body" });

      let token = typeof body.token === "string" && /^[a-f0-9]{32}$/.test(body.token) ? body.token : "";
      if (body.remove) {
        if (token) { delete store.rows[token]; persist(); }
        return send(res, 200, { ok: true });
      }
      const prev = token ? store.rows[token] : null;
      if (!token) {
        if (Object.keys(store.rows).length >= MAX_ROWS) return send(res, 429, { error: "full" });
        token = crypto.randomBytes(16).toString("hex");
      }
      const row = sanitize(body, prev);
      if (!row) return send(res, 400, { error: "bad nick" });
      store.rows[token] = row;
      persist();
      return send(res, 200, { token: token, row: Object.assign({ id: pub(token) }, row) });
    });
    return;
  }

  send(res, 404, { error: "not found" });
}).listen(PORT, () => {
  console.log("IMO Workbench backend: http://localhost:" + PORT);
  console.log("данные: " + FILE + " · учеников сейчас: " + Object.keys(store.rows).length);
  if (!ADMIN_KEY) console.log("ADMIN_KEY не задан — /api/admin отключён");
});
