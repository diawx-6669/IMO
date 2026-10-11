/* Профиль ученика и общий рейтинг. Один слой, три режима хранения.

   "artifact" — страница открыта как артефакт claude.ai: общая база данных
                артефакта (claude.use("db")) и личность зрителя (claude.use("user")).
                Писать в общие документы могут владелец и те, кому артефакт
                расшарен хотя бы как Contributor; остальные видят рейтинг,
                но их результаты остаются только в браузере.
   "server"   — задан window.IMO_BACKEND.url: свой REST-бэкенд, см. server/README.md.
                Работает для любого числа учеников по публичной ссылке.
   "local"    — сети нет: профиль и «рейтинг из одного человека» в localStorage.

   Наружу отдаётся window.IMO_CLOUD. Все функции возвращают Promise и никогда
   не бросают: ошибка приходит как отклонение с объектом {code, message}. */
window.IMO_CLOUD = (function () {
  "use strict";

  var KEY = "imo-cloud-v1";
  var MAX_ROWS = 500;

  var S = {
    mode: "local",      // artifact | server | local
    ready: false,
    canWrite: false,    // можно ли писать в общий рейтинг
    isOwner: false,     // владелец страницы — видит админ-панель
    uid: null,
    row: null,          // своя строка рейтинга или null, если не зарегистрирован
    count: 0,           // сколько учеников зарегистрировано
    rows: [],           // строки рейтинга
    note: ""            // код пояснения для интерфейса
  };

  var subs = [];        // подписчики на обновление рейтинга
  var local = { token: "", pid: "", nick: "", row: null };
  var db = null, user = null, backend = "";
  var unsub = null, listening = false;

  function loadLocal() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && typeof o === "object") {
          local.token = o.token || "";
          local.pid = o.pid || "";
          local.nick = o.nick || "";
          local.row = o.row || null;
        }
      }
    } catch (e) { }
  }
  function saveLocal() {
    try { localStorage.setItem(KEY, JSON.stringify(local)); } catch (e) { }
  }
  loadLocal();

  function emit() { for (var i = 0; i < subs.length; i++) try { subs[i](S); } catch (e) { } }
  function fail(code, message) { return Promise.reject({ code: code, message: message || code }); }

  /* ---------- нормализация строки рейтинга ---------- */
  function clean(nick) {
    return String(nick == null ? "" : nick).replace(/\s+/g, " ").trim().slice(0, 24);
  }
  function row(id, nick, st, joined) {
    st = st || {};
    return {
      id: id,
      nick: clean(nick) || "—",
      joined: joined || new Date().toISOString(),
      seen: new Date().toISOString(),
      pts: Math.max(0, Math.round(+st.pts || 0)),
      rated: Math.max(0, Math.round(+st.rated || 0)),
      solved: Math.max(0, Math.round(+st.solved || 0)),
      full: Math.max(0, Math.round(+st.full || 0)),
      streak: Math.max(0, Math.round(+st.streak || 0)),
      best: Math.max(0, Math.round(+st.best || 0)),
      mod: Math.max(0, Math.round(+st.mod || 0)),
      diag: st.diag == null ? null : Math.max(0, Math.round(+st.diag))
    };
  }
  function sane(o, id) {
    if (!o || typeof o !== "object") return null;
    var r = row(id, o.nick, o, o.joined);
    r.seen = typeof o.seen === "string" ? o.seen : r.seen;
    return r;
  }

  /* ---------- режим artifact ---------- */
  function bootArtifact() {
    return Promise.all([window.claude.use("db"), window.claude.use("user")]).then(function (r) {
      db = r[0]; user = r[1];
      if (!db) return bootServerOrLocal();
      S.mode = "artifact";
      var who = user ? user.me() : Promise.resolve(null);
      var mayWrite = user ? user.can("data.write") : Promise.resolve(null);
      return Promise.all([who, mayWrite]).then(function (q) {
        var me = q[0], can = q[1];
        S.uid = me && me.id ? me.id : null;
        S.isOwner = !!(me && me.isOwner);
        // can === null означает «платформа не ответила»: оставляем форму и ждём отказа записи
        S.canWrite = !!S.uid && can !== false;
        if (!S.uid) S.note = "anon";
        else if (can === false) S.note = "readonly";
        return pull();
      });
    }, function () { return bootServerOrLocal(); });
  }

  function goLocal() {
    S.mode = "local"; S.canWrite = true; S.note = "local";
    S.row = local.row ? sane(local.row, local.token || "me") : null;
    S.rows = S.row ? [S.row] : [];
    S.count = S.rows.length;
    return Promise.resolve(S);
  }

  /* Сайт может лежать на том же домене, что и бэкенд (Cloudflare Pages).
     Тогда адрес прописывать не нужно — просто проверяем /api/board. */
  function probeSameOrigin() {
    if (typeof fetch !== "function") return Promise.resolve(null);
    if (!/^https?:$/.test(location.protocol)) return Promise.resolve(null);
    return fetch("/api/board", { headers: { "accept": "application/json" } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { return (j && typeof j.count === "number" && j.rows) ? j : null; },
        function () { return null; });
  }

  function bootServerOrLocal() {
    db = null; user = null;
    if (backend) { S.mode = "server"; S.canWrite = true; return pull(); }
    return probeSameOrigin().then(function (j) {
      if (!j) return goLocal();
      S.mode = "server"; S.canWrite = true;          // backend остаётся пустым: пути относительные
      take(j.rows.map(function (o) { return sane(o, o.id); }));
      S.count = j.count;
      return S;
    }, goLocal);
  }

  /* ---------- чтение рейтинга ---------- */
  function pull() {
    if (S.mode === "artifact") {
      return db.collection("students").limit(MAX_ROWS).get().then(function (snap) {
        take(snap.docs.map(function (d) { return sane(d.data(), d.id); }));
        return S;
      }, function (e) {
        S.note = "offline"; S.rows = []; S.count = 0;
        return S;
      });
    }
    if (S.mode === "server") {
      return fetch(backend.replace(/\/$/, "") + "/api/board", { headers: { "accept": "application/json" } })
        .then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .then(function (j) {
          take((j.rows || []).map(function (o) { return sane(o, o.id); }));
          if (typeof j.count === "number") S.count = j.count;
          return S;
        }, function () { S.note = "offline"; return S; });
    }
    return Promise.resolve(S);
  }

  function selfId() {
    return S.mode === "server" ? local.pid : (S.mode === "local" ? "me" : S.uid);
  }
  function take(list) {
    var rows = [];
    for (var i = 0; i < list.length; i++) if (list[i]) rows.push(list[i]);
    S.rows = rows;
    S.count = rows.length;
    S.row = null;
    var self = selfId();
    for (var j = 0; j < rows.length; j++) if (rows[j].id === self) S.row = rows[j];
    emit();
  }

  /* ---------- живое обновление (только artifact) ---------- */
  function listen() {
    if (listening || S.mode !== "artifact" || !db) return;
    listening = true;
    unsub = db.collection("students").limit(MAX_ROWS).onSnapshot(function (snap) {
      take(snap.docs.map(function (d) { return sane(d.data(), d.id); }));
    }, function () { listening = false; });
  }

  /* ---------- запись ---------- */
  function put(r) {
    if (S.mode === "artifact") {
      if (!S.uid) return fail("anon");
      var body = {};
      for (var k in r) if (r.hasOwnProperty(k) && k !== "id") body[k] = r[k];
      return db.doc("students/" + S.uid).set(body).then(function () {
        S.canWrite = true;
        if (S.note === "readonly") S.note = "";
        return pull();
      }, function (e) {
        if (e && e.code === "invalid_argument") { S.canWrite = false; S.note = "readonly"; emit(); }
        return fail((e && e.code) || "unavailable", e && e.message);
      });
    }
    if (S.mode === "server") {
      return fetch(backend.replace(/\/$/, "") + "/api/save", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: local.token, nick: r.nick, stats: r })
      }).then(function (res) { if (!res.ok) throw 0; return res.json(); })
        .then(function (j) {
          if (j && j.token) local.token = j.token;
          if (j && j.row && j.row.id) local.pid = j.row.id;
          if (j && (j.token || j.row)) saveLocal();
          return pull();
        }, function () { return fail("offline"); });
    }
    local.row = r; local.nick = r.nick; local.token = local.token || "me"; saveLocal();
    S.row = r; S.rows = [r]; S.count = 1; emit();
    return Promise.resolve(S);
  }

  /* ---------- публичный интерфейс ---------- */
  var booted = null;
  function init() {
    if (booted) return booted;
    backend = (window.IMO_BACKEND && window.IMO_BACKEND.url) || "";
    var p;
    if (window.claude && typeof window.claude.use === "function") p = bootArtifact();
    else p = bootServerOrLocal();
    booted = p.then(function () { S.ready = true; emit(); return S; }, function () {
      S.ready = true; S.mode = "local"; S.note = "local"; emit(); return S;
    });
    return booted;
  }

  return {
    state: function () { return S; },
    init: init,
    on: function (fn) { subs.push(fn); return function () { subs = subs.filter(function (f) { return f !== fn; }); }; },
    listen: listen,
    refresh: function () { return init().then(pull); },
    /* регистрация / смена имени */
    signIn: function (nick, stats) {
      var n = clean(nick);
      if (n.length < 2) return fail("short");
      return init().then(function () {
        var keep = S.row ? S.row.joined : null;
        return put(row(selfId(), n, stats, keep));
      });
    },
    /* обновление своих показателей (без смены имени) */
    save: function (stats) {
      return init().then(function () {
        if (!S.row) return S;                       // не зарегистрирован — ничего не отправляем
        return put(row(S.row.id, S.row.nick, stats, S.row.joined));
      });
    },
    signOut: function () {
      return init().then(function () {
        if (S.mode === "artifact") {
          if (!S.uid) return S;
          return db.doc("students/" + S.uid).delete().then(pull, function (e) { return fail((e && e.code) || "unavailable"); });
        }
        if (S.mode === "server") {
          return fetch(backend.replace(/\/$/, "") + "/api/save", {
            method: "POST", headers: { "content-type": "application/json" },
            body: JSON.stringify({ token: local.token, remove: true })
          }).then(pull, function () { return fail("offline"); });
        }
        local.row = null; local.nick = ""; local.pid = ""; local.token = ""; saveLocal();
        S.row = null; S.rows = []; S.count = 0; emit();
        return S;
      });
    }
  };
})();
