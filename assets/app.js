/* IMO Workbench — логика приложения.
   Данные: window.IMO_DATA (задачи), window.IMO_TECHNIQUES (арсенал). */
(function () {
  "use strict";

  var DATA = (window.IMO_DATA || []).slice();
  var TECH = (window.IMO_TECHNIQUES || []).slice();
  var TOPIC = { A: "Алгебра", C: "Комбинаторика", G: "Геометрия", N: "Теория чисел", M: "Общие приёмы" };
  var TIER = { 1: "P1 / P4 — разогрев", 2: "P2 / P5 — средняя", 3: "P3 / P6 — трудная" };
  var RUBRIC = [
    "0 — продвижения нет",
    "1 — есть верное наблюдение, но без развития",
    "2 — существенное продвижение: лемма или часть случаев",
    "3 — ключевая идея найдена, решение не доведено",
    "4 — решение почти готово, остался пробел",
    "5 — решение полное, но с неточностью в рассуждении",
    "6 — решение полное, огрехи только в оформлении",
    "7 — полное строгое решение"
  ];
  var EXAM_SECONDS = 4 * 3600 + 30 * 60;

  DATA.sort(function (a, b) { return a.year - b.year || a.num - b.num; });

  /* ---------------- хранилище ---------------- */
  var KEY = "imo-workbench-v1";
  var P = { scores: {}, notes: {}, hints: {}, time: {}, log: [], exams: [], theme: "" };
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var o = JSON.parse(raw);
        ["scores", "notes", "hints", "time"].forEach(function (k) { if (o && o[k] && typeof o[k] === "object") P[k] = o[k]; });
        if (o && Array.isArray(o.log)) P.log = o.log;
        if (o && Array.isArray(o.exams)) P.exams = o.exams;
        if (o && typeof o.theme === "string") P.theme = o.theme;
      }
    } catch (e) { /* приватный режим или заблокированное хранилище — работаем без сохранения */ }
  }
  var saveTimer = null;
  function save() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { /* молча */ }
    }, 250);
  }
  load();

  /* ---------------- утилиты ---------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function today() { return new Date().toISOString().slice(0, 10); }
  function hhmmss(sec) {
    sec = Math.max(0, Math.round(sec));
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    var p2 = function (x) { return x < 10 ? "0" + x : "" + x; };
    return h > 0 ? h + ":" + p2(m) + ":" + p2(s) : p2(m) + ":" + p2(s);
  }
  function plural(n, forms) {
    var a = Math.abs(n) % 100, b = a % 10;
    if (a > 10 && a < 20) return forms[2];
    if (b > 1 && b < 5) return forms[1];
    if (b === 1) return forms[0];
    return forms[2];
  }
  function humanTime(sec) {
    if (!sec) return "—";
    if (sec < 60) return Math.round(sec) + " с";
    if (sec < 3600) return Math.round(sec / 60) + " мин";
    return (sec / 3600).toFixed(1).replace(".", ",") + " ч";
  }

  /* --- рендер текста: сначала выделяем математику, потом разметку --- */
  var SEP = "\u0000";
  function fmt(text) {
    if (!text) return "";
    var math = [], i = 0, out = "";
    while (i < text.length) {
      if (text.charCodeAt(i) === 36) { // $
        var display = text.charCodeAt(i + 1) === 36;
        var open = display ? 2 : 1;
        var close = text.indexOf(display ? "$$" : "$", i + open);
        if (close > -1) {
          var tex = text.slice(i + open, close);
          var html;
          try {
            html = window.katex.renderToString(tex, { displayMode: display, throwOnError: false, output: "html", strict: false });
          } catch (e) {
            html = '<code class="num">' + esc(tex) + "</code>";
          }
          math.push(html);
          out += SEP + (math.length - 1) + SEP;
          i = close + open;
          continue;
        }
      }
      out += text[i];
      i++;
    }
    out = esc(out);
    out = out.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/(^|[\s(])\*([^*\n]+?)\*(?=[\s.,;:!?)]|$)/g, "$1<em>$2</em>");
    var paras = out.split(/\n\s*\n/).map(function (p) { return "<p>" + p.replace(/\n/g, "<br>") + "</p>"; }).join("");
    return paras.replace(new RegExp(SEP + "(\\d+)" + SEP, "g"), function (_, n) { return math[+n]; });
  }
  function setHTML(node, text) { node.innerHTML = fmt(text); return node; }

  /* ---------------- ссылки на источники ---------------- */
  function officialURL(p) { return "https://www.imo-official.org/problems/" + p.year + "/"; }
  function aopsURL(p) { return "https://artofproblemsolving.com/wiki/index.php/" + p.year + "_IMO_Problems"; }

  /* ---------------- состояние ---------------- */
  var state = {
    view: "problems",
    topics: {},               // A/C/G/N -> true
    tiers: {},                // 1/2/3 -> true
    status: "all",            // all | fresh | open | solved
    sort: "year",
    q: "",
    current: null,            // id задачи
    exam: null                // активный экзамен
  };

  /* ---------------- тема ---------------- */
  function applyTheme() {
    if (P.theme === "dark" || P.theme === "light") document.documentElement.setAttribute("data-theme", P.theme);
    else document.documentElement.removeAttribute("data-theme");
    var b = $("#themeBtn");
    if (b) b.title = "Тема: " + (P.theme === "dark" ? "тёмная" : P.theme === "light" ? "светлая" : "как в системе");
  }
  function cycleTheme() {
    P.theme = P.theme === "" ? "light" : P.theme === "light" ? "dark" : "";
    applyTheme(); save();
    toast("Тема: " + (P.theme === "dark" ? "тёмная" : P.theme === "light" ? "светлая" : "системная"));
  }

  var toastT = null;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg; t.hidden = false;
    if (toastT) clearTimeout(toastT);
    toastT = setTimeout(function () { t.hidden = true; }, 2200);
  }

  /* ---------------- фильтрация ---------------- */
  function statusOf(p) {
    var s = P.scores[p.id];
    if (s == null) return "fresh";
    return s >= 5 ? "solved" : "open";
  }
  function filtered() {
    var tk = Object.keys(state.topics).filter(function (k) { return state.topics[k]; });
    var tr = Object.keys(state.tiers).filter(function (k) { return state.tiers[k]; });
    var q = state.q.trim().toLowerCase();
    var list = DATA.filter(function (p) {
      if (tk.length && tk.indexOf(p.topic) < 0) return false;
      if (tr.length && tr.indexOf(String(p.tier)) < 0) return false;
      if (state.status !== "all" && statusOf(p) !== state.status) return false;
      if (q) {
        var hay = (p.title + " " + p.statement + " " + (p.tags || []).join(" ") + " " + p.year + " " + p.id).toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    if (state.sort === "year-desc") list.sort(function (a, b) { return b.year - a.year || a.num - b.num; });
    else if (state.sort === "tier") list.sort(function (a, b) { return a.tier - b.tier || a.year - b.year; });
    else if (state.sort === "score") list.sort(function (a, b) { return (P.scores[a.id] == null ? -1 : P.scores[a.id]) - (P.scores[b.id] == null ? -1 : P.scores[b.id]); });
    else list.sort(function (a, b) { return a.year - b.year || a.num - b.num; });
    return list;
  }

  /* ---------------- панель фильтров ---------------- */
  function buildFilters() {
    var box = $("#filters");
    box.innerHTML = "";

    var search = el("div", "search");
    search.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.8" cy="6.8" r="4.4"/><path d="M10.2 10.2 14 14"/></svg>';
    var inp = el("input");
    inp.type = "search"; inp.id = "q"; inp.placeholder = "Поиск: тема, год, формулировка…";
    inp.value = state.q;
    inp.addEventListener("input", function () { state.q = inp.value; renderList(); });
    search.appendChild(inp);
    box.appendChild(search);

    var row1 = el("div", "chiprow");
    row1.appendChild(el("span", "lbl", "Раздел"));
    ["A", "C", "G", "N"].forEach(function (t) {
      var c = el("button", "chip t-" + t, t);
      c.title = TOPIC[t];
      c.setAttribute("aria-pressed", !!state.topics[t]);
      c.addEventListener("click", function () {
        state.topics[t] = !state.topics[t];
        c.setAttribute("aria-pressed", !!state.topics[t]);
        renderList();
      });
      row1.appendChild(c);
    });
    box.appendChild(row1);

    var row2 = el("div", "chiprow");
    row2.appendChild(el("span", "lbl", "Номер"));
    [1, 2, 3].forEach(function (t) {
      var c = el("button", "chip", t === 1 ? "1·4" : t === 2 ? "2·5" : "3·6");
      c.title = TIER[t];
      c.setAttribute("aria-pressed", !!state.tiers[t]);
      c.addEventListener("click", function () {
        state.tiers[t] = !state.tiers[t];
        c.setAttribute("aria-pressed", !!state.tiers[t]);
        renderList();
      });
      row2.appendChild(c);
    });
    box.appendChild(row2);

    var row3 = el("div", "chiprow");
    var st = el("select");
    [["all", "Все задачи"], ["fresh", "Не начатые"], ["open", "В работе (≤4)"], ["solved", "Решённые (≥5)"]].forEach(function (o) {
      var op = el("option", null, o[1]); op.value = o[0]; if (state.status === o[0]) op.selected = true; st.appendChild(op);
    });
    st.addEventListener("change", function () { state.status = st.value; renderList(); });
    var so = el("select");
    [["year", "По годам ↑"], ["year-desc", "По годам ↓"], ["tier", "По сложности"], ["score", "По моему баллу"]].forEach(function (o) {
      var op = el("option", null, o[1]); op.value = o[0]; if (state.sort === o[0]) op.selected = true; so.appendChild(op);
    });
    so.addEventListener("change", function () { state.sort = so.value; renderList(); });
    row3.appendChild(st); row3.appendChild(so);
    box.appendChild(row3);

    var cnt = el("div", "fcount");
    cnt.id = "fcount";
    var rnd = el("button", "linkish", "случайная задача");
    rnd.addEventListener("click", randomProblem);
    cnt.appendChild(el("span", null, ""));
    cnt.appendChild(rnd);
    box.appendChild(cnt);
  }

  function renderList() {
    var list = filtered();
    var ol = $("#plist");
    ol.innerHTML = "";
    var c = $("#fcount");
    if (c) c.firstChild.textContent = "задач: " + list.length + " из " + DATA.length;
    if (!list.length) {
      ol.appendChild(el("li", "empty", "Ничего не найдено — снимите часть фильтров."));
      return;
    }
    list.forEach(function (p) {
      var li = el("li");
      var b = el("button", "pitem");
      b.setAttribute("aria-current", state.current === p.id);
      b.dataset.id = p.id;
      var bd = el("span", "badge " + p.topic, p.topic);
      bd.title = TOPIC[p.topic];
      var mid = el("span", "ttl");
      mid.appendChild(el("span", "yr", p.year + "/" + p.num + "  "));
      mid.appendChild(document.createTextNode(p.title));
      var s = P.scores[p.id];
      var sc = el("span", "sc" + (s == null ? "" : s >= 5 ? " has" : " low"), s == null ? "—" : s + "/7");
      b.appendChild(bd); b.appendChild(mid); b.appendChild(sc);
      b.addEventListener("click", function () { openProblem(p.id); });
      li.appendChild(b);
      ol.appendChild(li);
    });
  }

  /* ---------------- таймер задачи ---------------- */
  var timer = { id: null, t0: 0, handle: null };
  function timerTick() {
    var d = $("#clock");
    if (!d || !timer.id) return;
    var base = P.time[timer.id] || 0;
    d.textContent = hhmmss(base + (Date.now() - timer.t0) / 1000);
  }
  function timerStart(id) {
    timerStop();
    timer.id = id; timer.t0 = Date.now();
    timer.handle = setInterval(timerTick, 1000);
    var c = $("#clock"); if (c) c.classList.add("run");
    var b = $("#timerBtn"); if (b) b.textContent = "Пауза";
    timerTick();
  }
  function timerStop() {
    if (timer.handle) clearInterval(timer.handle);
    if (timer.id) {
      P.time[timer.id] = (P.time[timer.id] || 0) + (Date.now() - timer.t0) / 1000;
      save();
    }
    timer.handle = null; timer.id = null;
    var c = $("#clock"); if (c) c.classList.remove("run");
    var b = $("#timerBtn"); if (b) b.textContent = "Пуск";
  }
  function timerToggle(id) {
    if (timer.id === id) { timerStop(); var c = $("#clock"); if (c) c.textContent = hhmmss(P.time[id] || 0); }
    else timerStart(id);
  }

  /* ---------------- карточка задачи ---------------- */
  function byId(id) { for (var i = 0; i < DATA.length; i++) if (DATA[i].id === id) return DATA[i]; return null; }

  function openProblem(id, keepPane) {
    if (timer.id && timer.id !== id) timerStop();
    state.current = id;
    $("#split").dataset.pane = "work";
    renderList();
    renderProblem();
    if (!keepPane) window.scrollTo({ top: 0, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
  }
  function randomProblem() {
    var list = filtered();
    if (!list.length) return;
    var p = list[Math.floor(Math.random() * list.length)];
    openProblem(p.id);
  }
  function neighbour(delta) {
    var list = filtered();
    if (!list.length) return;
    var i = -1;
    for (var k = 0; k < list.length; k++) if (list[k].id === state.current) { i = k; break; }
    var j = i < 0 ? 0 : (i + delta + list.length) % list.length;
    openProblem(list[j].id);
  }

  function revealBlock(title, hintKey, bodyBuilder, open) {
    var box = el("div", "reveal");
    var head = el("button", "rhead");
    head.type = "button";
    head.appendChild(el("span", null, title));
    if (hintKey) head.appendChild(el("span", "k kbdhint", hintKey));
    var body = el("div", "rbody");
    body.hidden = !open;
    head.setAttribute("aria-expanded", !!open);
    var built = false;
    function build() { if (!built) { bodyBuilder(body); built = true; } }
    if (open) build();
    head.addEventListener("click", function () {
      build();
      body.hidden = !body.hidden;
      head.setAttribute("aria-expanded", !body.hidden);
    });
    box.appendChild(head); box.appendChild(body);
    box._open = function () { build(); body.hidden = false; head.setAttribute("aria-expanded", true); };
    return box;
  }

  var curHintBox = null;

  function renderProblem() {
    var w = $("#work");
    w.innerHTML = "";
    var p = byId(state.current);
    if (!p) {
      var ph = el("div", "card");
      ph.appendChild(el("h2", "ptitle", "Выберите задачу"));
      ph.appendChild(el("p", "lead", "Слева — индекс всех " + DATA.length + " задач банка: реальные задачи IMO с 1959 по 2025 год. Фильтруйте по разделу (A — алгебра, C — комбинаторика, G — геометрия, N — теория чисел) и по номеру в наборе: задачи 1 и 4 всегда самые простые, 3 и 6 — самые трудные."));
      w.appendChild(ph);
      return;
    }

    var back = el("button", "btn ghost pback", "← К списку");
    back.addEventListener("click", function () { $("#split").dataset.pane = "list"; });
    w.appendChild(back);

    var meta = el("div", "meta");
    var b = el("span", "badge " + p.topic, p.topic); b.title = TOPIC[p.topic];
    meta.appendChild(b);
    meta.appendChild(el("span", "tag strong", "IMO " + p.year + " · задача " + p.num));
    meta.appendChild(el("span", "tag", TIER[p.tier]));
    (p.tags || []).slice(0, 3).forEach(function (t) { meta.appendChild(el("span", "tag", t)); });
    if (p.partial) {
      var pt = el("span", "tag", "разбор — набросок");
      pt.title = "Приведены ключевые идеи и схема, но не полностью оформленное доказательство";
      meta.appendChild(pt);
    }
    if (p.verify) {
      var vt = el("span", "tag warnish", "сверьте формулировку");
      vt.title = "Текст набран по памяти составителя банка — сверьте с официальным по ссылке ниже";
      meta.appendChild(vt);
    }
    w.appendChild(meta);

    w.appendChild(el("h2", "ptitle", p.title));
    var sub = el("div", "psub");
    sub.textContent = TOPIC[p.topic] + " · " + (P.scores[p.id] == null ? "ещё не оценена" : "ваш балл: " + P.scores[p.id] + "/7")
      + " · время: " + humanTime(P.time[p.id] || 0);
    w.appendChild(sub);

    w.appendChild(setHTML(el("div", "statement"), p.statement));

    /* инструменты */
    var tools = el("div", "tools");
    var clock = el("div", "clock num"); clock.id = "clock"; clock.textContent = hhmmss(P.time[p.id] || 0);
    var tb = el("button", "btn primary", "Пуск"); tb.id = "timerBtn";
    tb.addEventListener("click", function () { timerToggle(p.id); });
    tools.appendChild(clock); tools.appendChild(tb);
    var rb = el("button", "btn", "Случайная");
    rb.addEventListener("click", randomProblem);
    tools.appendChild(rb);
    w.appendChild(tools);

    /* подсказки */
    var hints = p.hints || [];
    if (hints.length) {
      var shown = Math.min(P.hints[p.id] || 0, hints.length);
      var hb = el("div", "reveal");
      var hh = el("button", "rhead"); hh.type = "button";
      hh.appendChild(el("span", null, "Подсказки"));
      var kcount = el("span", "k", shown + " из " + hints.length);
      var khint = el("span", "k kbdhint", " ·  клавиша H");
      khint.style.marginLeft = "0";
      hh.appendChild(kcount); hh.appendChild(khint);
      var hbody = el("div", "rbody");
      hbody.hidden = shown === 0;
      function paintHints() {
        hbody.innerHTML = "";
        var n = Math.min(P.hints[p.id] || 0, hints.length);
        for (var i = 0; i < n; i++) {
          var d = el("div", "hint");
          d.appendChild(el("div", "hn", "Подсказка " + (i + 1)));
          d.appendChild(setHTML(el("div"), hints[i]));
          hbody.appendChild(d);
        }
        if (n < hints.length) {
          var more = el("button", "btn ghost", n === 0 ? "Показать первую подсказку" : "Показать следующую подсказку");
          more.style.marginTop = "12px";
          more.addEventListener("click", function () {
            P.hints[p.id] = Math.min((P.hints[p.id] || 0) + 1, hints.length);
            save(); paintHints();
          });
          hbody.appendChild(more);
        } else {
          hbody.appendChild(el("div", "note", "Подсказки закончились. Если решение всё ещё не складывается — откройте разбор, но сначала попробуйте записать то, что уже удалось доказать."));
        }
        kcount.textContent = n + " из " + hints.length;
      }
      paintHints();
      hh.addEventListener("click", function () {
        if (hbody.hidden && !(P.hints[p.id] > 0)) { P.hints[p.id] = 1; save(); paintHints(); }
        hbody.hidden = !hbody.hidden;
      });
      hb.appendChild(hh); hb.appendChild(hbody);
      w.appendChild(hb);
      curHintBox = { paint: paintHints, body: hbody, max: hints.length, id: p.id };
    } else curHintBox = null;

    /* ответ */
    if (p.answer) {
      w.appendChild(revealBlock("Ответ", "", function (body) {
        body.appendChild(setHTML(el("div"), p.answer));
      }));
    }

    /* разбор */
    var solBox = revealBlock("Разбор" + (p.partial ? " (набросок)" : ""), "клавиша S", function (body) {
      if (p.partial) {
        body.appendChild(el("div", "note", "Это набросок: приведены ключевые идеи и схема, но не полностью оформленное доказательство. Технические шаги оставлены для самостоятельной работы."));
      }
      body.appendChild(setHTML(el("div", "solution"), p.solution));
      var links = el("div", "srclinks");
      var a1 = el("a", null, "официальный текст задачи (imo-official.org)");
      a1.href = officialURL(p); a1.target = "_blank"; a1.rel = "noopener";
      var a2 = el("a", null, "разборы на AoPS");
      a2.href = aopsURL(p); a2.target = "_blank"; a2.rel = "noopener";
      links.appendChild(a1); links.appendChild(a2);
      body.appendChild(links);
    });
    solBox.id = "solBox";
    w.appendChild(solBox);

    /* самооценка */
    var sc = el("div", "score");
    sc.appendChild(el("h4", null, "Самооценка по семибалльной шкале"));
    sc.appendChild(el("div", "sdesc", "На IMO каждая задача оценивается от 0 до 7, максимум за два дня — 42 балла. Это ваша собственная рубрика: официальные схемы оценивания индивидуальны для каждой задачи."));
    var grid = el("div", "sgrid");
    var rub = el("div", "srub");
    for (var i = 0; i <= 7; i++) {
      (function (v) {
        var sb = el("button", "sbtn", String(v));
        sb.setAttribute("aria-pressed", P.scores[p.id] === v);
        sb.title = RUBRIC[v];
        sb.addEventListener("mouseenter", function () { rub.textContent = RUBRIC[v]; });
        sb.addEventListener("focus", function () { rub.textContent = RUBRIC[v]; });
        sb.addEventListener("click", function () { setScore(p.id, v); });
        grid.appendChild(sb);
      })(i);
    }
    sc.appendChild(grid);
    rub.textContent = P.scores[p.id] != null ? RUBRIC[P.scores[p.id]] : "Наведите на балл, чтобы увидеть, что он означает.";
    sc.appendChild(rub);

    var ta = el("textarea");
    ta.placeholder = "Мои заметки: что сработало, где застрял, какую технику стоит повторить…";
    ta.value = P.notes[p.id] || "";
    ta.addEventListener("input", function () { P.notes[p.id] = ta.value; save(); });
    sc.appendChild(ta);
    w.appendChild(sc);

    /* навигация */
    var nav = el("div", "navrow");
    var pv = el("button", "btn", "← Предыдущая"); pv.addEventListener("click", function () { neighbour(-1); });
    var nx = el("button", "btn", "Следующая →"); nx.addEventListener("click", function () { neighbour(1); });
    nav.appendChild(pv); nav.appendChild(nx);
    w.appendChild(nav);
  }

  function setScore(id, v) {
    P.scores[id] = v;
    P.log = P.log.filter(function (r) { return !(r.id === id && r.d === today()); });
    P.log.push({ d: today(), id: id, s: v });
    if (P.log.length > 2000) P.log = P.log.slice(-2000);
    save();
    renderList();
    renderProblem();
    toast("Записано: " + v + "/7");
  }

  /* ---------------- тренировка ---------------- */
  function pickPaper() {
    var out = [];
    [1, 2, 3].forEach(function (tier) {
      var pool = DATA.filter(function (p) { return p.tier === tier && (P.scores[p.id] == null || P.scores[p.id] <= 4); });
      if (!pool.length) pool = DATA.filter(function (p) { return p.tier === tier; });
      var pick = pool[Math.floor(Math.random() * pool.length)];
      out.push(pick);
    });
    return out;
  }

  var examHandle = null;
  function renderTrain() {
    var v = $("#view-train");
    v.innerHTML = "";
    var wrap = el("div", "wrap");

    if (!state.exam) {
      wrap.appendChild(el("h1", null, "Тренировочный тур"));
      wrap.appendChild(el("p", "lead", "Настоящий день олимпиады — три задачи и 4 часа 30 минут, максимум 21 балл. Генератор собирает тур по реальной структуре набора: одна задача уровня 1/4, одна уровня 2/5 и одна уровня 3/6, с приоритетом тех, которые вы ещё не решили."));
      var startRow = el("div", "tools");
      var sb = el("button", "btn primary", "Начать тур (4:30:00)");
      sb.addEventListener("click", function () { startExam(EXAM_SECONDS); });
      var sb2 = el("button", "btn", "Короткий тур (1:30:00)");
      sb2.addEventListener("click", function () { startExam(90 * 60); });
      startRow.appendChild(sb); startRow.appendChild(sb2);
      wrap.appendChild(startRow);

      if (P.exams.length) {
        wrap.appendChild(el("h3", "sec", "История туров"));
        var ul = el("ul", "hist");
        P.exams.slice().reverse().slice(0, 12).forEach(function (e) {
          var li = el("li");
          li.appendChild(el("span", "num", e.date));
          var tot = (e.scores || []).reduce(function (a, b) { return a + (b || 0); }, 0);
          li.appendChild(el("strong", null, tot + "/21"));
          li.appendChild(el("span", null, (e.ids || []).join(", ")));
          li.appendChild(el("span", "num", humanTime(e.elapsed)));
          ul.appendChild(li);
        });
        wrap.appendChild(ul);
      } else {
        wrap.appendChild(el("div", "note", "Совет: на IMO почти никто не решает все три задачи. Реалистичная цель на первый тур — полностью разобрать задачу 1 и получить существенное продвижение во второй."));
      }
      v.appendChild(wrap);
      return;
    }

    /* активный тур */
    var e = state.exam;
    var head = el("div", "exam-head");
    var bc = el("div", "bigclock num"); bc.id = "bigclock";
    head.appendChild(bc);
    var pb = el("button", "btn", e.paused ? "Продолжить" : "Пауза");
    pb.addEventListener("click", function () {
      if (e.paused) { e.paused = false; e.t0 = Date.now(); }
      else { e.elapsed += (Date.now() - e.t0) / 1000; e.paused = true; }
      renderTrain();
    });
    var fb = el("button", "btn primary", "Завершить и оценить");
    fb.addEventListener("click", finishExam);
    head.appendChild(pb); head.appendChild(fb);
    wrap.appendChild(head);
    wrap.appendChild(el("div", "secnote", "Лист задач зафиксирован. Подсказки и разборы на время тура лучше не открывать."));

    var cards = el("div", "cards");
    e.ids.forEach(function (id, idx) {
      var p = byId(id);
      var card = el("div", "card");
      var slot = el("div", "exam-slot");
      slot.appendChild(el("div", "pno", "Задача " + (idx + 1)));
      var mid = el("div");
      var m = el("div", "meta");
      var bd = el("span", "badge " + p.topic, p.topic); bd.title = TOPIC[p.topic];
      m.appendChild(bd);
      m.appendChild(el("span", "tag", "IMO " + p.year + "/" + p.num));
      mid.appendChild(m);
      mid.appendChild(setHTML(el("div", "exam-st"), p.statement));
      slot.appendChild(mid);
      if (e.finished) {
        var g = el("div", "sgrid");
        g.style.flexDirection = "column";
        for (var i = 0; i <= 7; i++) {
          (function (val) {
            var sb = el("button", "sbtn", String(val));
            sb.title = RUBRIC[val];
            sb.setAttribute("aria-pressed", e.scores[idx] === val);
            sb.addEventListener("click", function () { e.scores[idx] = val; renderTrain(); });
            g.appendChild(sb);
          })(i);
        }
        slot.appendChild(g);
      } else slot.appendChild(el("div"));
      card.appendChild(slot);
      cards.appendChild(card);
    });
    wrap.appendChild(cards);

    if (e.finished) {
      var tot = e.scores.reduce(function (a, b) { return a + (b || 0); }, 0);
      var res = el("div", "card");
      res.style.marginTop = "16px";
      res.appendChild(el("h3", null, "Итог тура: " + tot + " из 21"));
      res.appendChild(el("p", "secnote", "Время: " + humanTime(e.elapsed) + ". Оцените каждую задачу по семибалльной шкале — баллы попадут и в общий прогресс."));
      var save1 = el("button", "btn primary", "Сохранить результат");
      save1.addEventListener("click", function () {
        P.exams.push({ date: today(), ids: e.ids, scores: e.scores, elapsed: e.elapsed });
        e.ids.forEach(function (id, i) { if (e.scores[i] != null) setScoreSilent(id, e.scores[i]); });
        save();
        state.exam = null;
        renderTrain(); renderList();
        toast("Тур сохранён");
      });
      var drop = el("button", "btn", "Не сохранять");
      drop.addEventListener("click", function () { state.exam = null; renderTrain(); });
      var row = el("div", "tools"); row.appendChild(save1); row.appendChild(drop);
      res.appendChild(row);
      wrap.appendChild(res);
    }
    v.appendChild(wrap);
    paintBigClock();
  }

  function setScoreSilent(id, v) {
    P.scores[id] = v;
    P.log = P.log.filter(function (r) { return !(r.id === id && r.d === today()); });
    P.log.push({ d: today(), id: id, s: v });
  }

  function startExam(seconds) {
    var paper = pickPaper();
    state.exam = { ids: paper.map(function (p) { return p.id; }), limit: seconds, elapsed: 0, t0: Date.now(), paused: false, finished: false, scores: [null, null, null] };
    if (examHandle) clearInterval(examHandle);
    examHandle = setInterval(paintBigClock, 1000);
    renderTrain();
  }
  function paintBigClock() {
    var e = state.exam, d = $("#bigclock");
    if (!e || !d) return;
    var used = e.elapsed + (e.paused || e.finished ? 0 : (Date.now() - e.t0) / 1000);
    var left = e.limit - used;
    d.textContent = hhmmss(Math.max(0, left));
    d.classList.toggle("low", left < 900);
    if (left <= 0 && !e.finished) finishExam();
  }
  function finishExam() {
    var e = state.exam;
    if (!e) return;
    if (!e.paused) e.elapsed += (Date.now() - e.t0) / 1000;
    e.paused = true; e.finished = true;
    if (examHandle) { clearInterval(examHandle); examHandle = null; }
    renderTrain();
  }

  /* ---------------- арсенал ---------------- */
  function renderArsenal() {
    var v = $("#view-arsenal");
    v.innerHTML = "";
    var wrap = el("div", "wrap");
    wrap.appendChild(el("h1", null, "Арсенал"));
    wrap.appendChild(el("p", "lead", "Техники, которые реально закрывают задачи IMO: что утверждает приём, по каким признакам его узнать, где обычно теряют баллы и на каких задачах банка он отрабатывается."));

    ["M", "A", "N", "C", "G"].forEach(function (topic) {
      var items = TECH.filter(function (t) { return t.topic === topic; });
      if (!items.length) return;
      wrap.appendChild(el("h3", "sec", TOPIC[topic]));
      wrap.appendChild(el("div", "secnote", items.length + " " + plural(items.length, ["приём", "приёма", "приёмов"])));
      var cards = el("div", "cards");
      items.forEach(function (t) {
        var box = el("div", "tech");
        var head = el("button", "rhead"); head.type = "button";
        var bd = el("span", "badge " + t.topic, t.topic); bd.title = TOPIC[t.topic];
        head.appendChild(bd);
        head.appendChild(el("span", "tname", t.name));
        var body = el("div", "tbody"); body.hidden = true;
        var built = false;
        head.addEventListener("click", function () {
          if (!built) {
            body.appendChild(setHTML(el("div", "tcore"), t.core));
            if (t.when && t.when.length) {
              body.appendChild(el("div", "sublbl", "Когда применять"));
              var ul = el("ul");
              t.when.forEach(function (x) { var li = el("li"); setHTML(li, x); li.innerHTML = li.innerHTML.replace(/^<p>|<\/p>$/g, ""); ul.appendChild(li); });
              body.appendChild(ul);
            }
            if (t.pitfall) {
              body.appendChild(el("div", "sublbl", "Где теряют баллы"));
              body.appendChild(setHTML(el("div", "tcore"), t.pitfall));
            }
            if (t.problems && t.problems.length) {
              body.appendChild(el("div", "sublbl", "Отработать на задачах"));
              var row = el("div");
              t.problems.forEach(function (pid) {
                var p = byId(pid);
                if (!p) return;
                var pill = el("button", "pill", p.year + "/" + p.num);
                pill.title = p.title;
                pill.addEventListener("click", function () { switchView("problems"); openProblem(pid); });
                row.appendChild(pill);
              });
              body.appendChild(row);
            }
            built = true;
          }
          body.hidden = !body.hidden;
          head.setAttribute("aria-expanded", !body.hidden);
        });
        box.appendChild(head); box.appendChild(body);
        cards.appendChild(box);
      });
      wrap.appendChild(cards);
    });
    v.appendChild(wrap);
  }

  /* ---------------- прогресс ---------------- */
  function renderProgress() {
    var v = $("#view-progress");
    v.innerHTML = "";
    var wrap = el("div", "wrap");
    wrap.appendChild(el("h1", null, "Прогресс"));

    var ids = Object.keys(P.scores);
    var attempted = ids.length;
    var total = ids.reduce(function (a, id) { return a + P.scores[id]; }, 0);
    var solved = ids.filter(function (id) { return P.scores[id] >= 5; }).length;
    var full = ids.filter(function (id) { return P.scores[id] === 7; }).length;
    var avg = attempted ? total / attempted : 0;
    var timeAll = Object.keys(P.time).reduce(function (a, id) { return a + P.time[id]; }, 0);

    var stats = el("div", "stats");
    function stat(val, lbl) {
      var s = el("div", "stat");
      s.appendChild(el("div", "v num", val));
      s.appendChild(el("div", "l", lbl));
      return s;
    }
    stats.appendChild(stat(attempted + "/" + DATA.length, "задач оценено"));
    stats.appendChild(stat(String(total), "баллов набрано"));
    stats.appendChild(stat(solved + " / " + full, "решено (≥5) / полностью (7)"));
    stats.appendChild(stat(avg ? avg.toFixed(1).replace(".", ",") : "—", "средний балл за задачу"));
    stats.appendChild(stat(humanTime(timeAll), "времени за доской"));
    wrap.appendChild(stats);

    /* ориентир по медалям */
    var pace = el("div", "card");
    pace.appendChild(el("h3", null, "Ориентир по медалям"));
    var six = avg * 6;
    pace.appendChild(el("p", "secnote", attempted < 6
      ? "Оцените хотя бы шесть задач — тогда появится осмысленная оценка темпа."
      : "Если ваш средний балл сохранится на полном наборе из шести задач, это примерно " + six.toFixed(0) + " из 42."));
    if (attempted >= 6) {
      var verdict = six >= 30 ? "диапазон золота" : six >= 24 ? "диапазон серебра" : six >= 17 ? "диапазон бронзы" : "ниже бронзы";
      pace.appendChild(el("p", null, "Это " + verdict + "."));
    }
    pace.appendChild(el("div", "note", "Пороги медалей меняются каждый год (примерно: золото 29–35, серебро 22–29, бронза 15–22 балла из 42), и самооценка всегда оптимистичнее настоящей проверки. Считайте эту цифру ориентиром, а не прогнозом."));
    wrap.appendChild(pace);

    /* по разделам */
    wrap.appendChild(el("h3", "sec", "По разделам"));
    wrap.appendChild(el("div", "secnote", "Доля набранных баллов от максимума по оценённым задачам раздела."));
    var bars = el("div", "bars");
    ["A", "C", "G", "N"].forEach(function (t) {
      var inTopic = DATA.filter(function (p) { return p.topic === t; });
      var done = inTopic.filter(function (p) { return P.scores[p.id] != null; });
      var got = done.reduce(function (a, p) { return a + P.scores[p.id]; }, 0);
      var max = done.length * 7;
      var pct = max ? got / max : 0;
      var row = el("div", "bar");
      row.appendChild(el("div", null, TOPIC[t]));
      var tr = el("div", "track");
      var fi = el("div", "fill");
      fi.style.width = Math.round(pct * 100) + "%";
      fi.style.background = "var(--t-" + t + ")";
      tr.appendChild(fi);
      row.appendChild(tr);
      row.appendChild(el("div", "val", done.length ? got + "/" + max + " (" + done.length + " из " + inTopic.length + ")" : "нет оценок"));
      bars.appendChild(row);
    });
    wrap.appendChild(bars);

    /* по сложности */
    wrap.appendChild(el("h3", "sec", "По месту в наборе"));
    var bars2 = el("div", "bars");
    [1, 2, 3].forEach(function (t) {
      var inT = DATA.filter(function (p) { return p.tier === t; });
      var done = inT.filter(function (p) { return P.scores[p.id] != null; });
      var got = done.reduce(function (a, p) { return a + P.scores[p.id]; }, 0);
      var max = done.length * 7;
      var row = el("div", "bar");
      row.appendChild(el("div", null, t === 1 ? "Задачи 1 · 4" : t === 2 ? "Задачи 2 · 5" : "Задачи 3 · 6"));
      var tr = el("div", "track");
      var fi = el("div", "fill");
      fi.style.width = (max ? Math.round(got / max * 100) : 0) + "%";
      fi.style.background = "var(--accent)";
      tr.appendChild(fi); row.appendChild(tr);
      row.appendChild(el("div", "val", done.length ? got + "/" + max : "нет оценок"));
      bars2.appendChild(row);
    });
    wrap.appendChild(bars2);

    /* распределение баллов */
    wrap.appendChild(el("h3", "sec", "Распределение оценок"));
    var counts = [0, 0, 0, 0, 0, 0, 0, 0];
    ids.forEach(function (id) { counts[P.scores[id]]++; });
    var mx = Math.max.apply(null, counts) || 1;
    var dist = el("div", "dist");
    counts.forEach(function (c, i) {
      var col = el("div", "col");
      col.title = c + " задач с баллом " + i;
      var lbl = el("div", "collbl", c ? String(c) : "");
      var bar = el("div", "colbar");
      bar.style.height = Math.round(c / mx * 70) + "px";
      col.appendChild(lbl); col.appendChild(bar);
      col.appendChild(el("div", "collbl", String(i)));
      dist.appendChild(col);
    });
    wrap.appendChild(dist);

    /* очередь повторения */
    var queue = DATA.filter(function (p) { return P.scores[p.id] != null && P.scores[p.id] <= 3; });
    wrap.appendChild(el("h3", "sec", "Вернуться к этим задачам"));
    wrap.appendChild(el("div", "secnote", queue.length
      ? "Задачи с баллом 3 и ниже: ключевая идея ещё не ваша. Перерешайте их через несколько дней — без подсказок."
      : "Пока пусто: задач с баллом 3 и ниже нет."));
    if (queue.length) {
      var qrow = el("div");
      queue.forEach(function (p) {
        var pill = el("button", "pill", p.year + "/" + p.num + " · " + P.scores[p.id] + "/7");
        pill.title = p.title;
        pill.addEventListener("click", function () { switchView("problems"); openProblem(p.id); });
        qrow.appendChild(pill);
      });
      wrap.appendChild(qrow);
    }

    /* активность */
    var days = {};
    P.log.forEach(function (r) { days[r.d] = (days[r.d] || 0) + 1; });
    var dayKeys = Object.keys(days).sort();
    wrap.appendChild(el("h3", "sec", "Активность"));
    wrap.appendChild(el("div", "secnote", dayKeys.length
      ? "Дней с оценёнными задачами: " + dayKeys.length + ". Последний: " + dayKeys[dayKeys.length - 1] + "."
      : "Оценок пока нет."));

    /* данные */
    wrap.appendChild(el("h3", "sec", "Мои данные"));
    wrap.appendChild(el("div", "secnote", "Прогресс хранится только в этом браузере. Экспорт — чтобы перенести на другое устройство или сохранить резервную копию."));
    var io = el("div", "io");
    var exp = el("button", "btn", "Скопировать прогресс");
    exp.addEventListener("click", function () {
      var txt = JSON.stringify(P);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(function () { toast("Скопировано в буфер обмена"); }, function () { showExport(txt); });
      } else showExport(txt);
    });
    var imp = el("button", "btn", "Вставить прогресс");
    imp.addEventListener("click", function () {
      var ta = el("textarea");
      ta.placeholder = "Вставьте сюда ранее скопированный JSON и нажмите «Загрузить»";
      var go = el("button", "btn primary", "Загрузить");
      go.style.marginTop = "8px";
      go.addEventListener("click", function () {
        try {
          var o = JSON.parse(ta.value);
          ["scores", "notes", "hints", "time"].forEach(function (k) { if (o[k]) P[k] = o[k]; });
          if (Array.isArray(o.log)) P.log = o.log;
          if (Array.isArray(o.exams)) P.exams = o.exams;
          save(); renderProgress(); renderList();
          toast("Прогресс загружен");
        } catch (e) { toast("Не удалось разобрать JSON"); }
      });
      io.appendChild(ta); io.appendChild(go);
    });
    var clr = el("button", "btn", "Сбросить всё");
    clr.addEventListener("click", function () {
      var ok = el("button", "btn", "Да, удалить мой прогресс");
      ok.addEventListener("click", function () {
        P.scores = {}; P.notes = {}; P.hints = {}; P.time = {}; P.log = []; P.exams = [];
        save(); renderProgress(); renderList(); toast("Прогресс сброшен");
      });
      io.appendChild(ok);
      clr.disabled = true;
    });
    io.appendChild(exp); io.appendChild(imp); io.appendChild(clr);
    wrap.appendChild(io);
    function showExport(txt) {
      var ta = el("textarea");
      ta.value = txt; ta.rows = 4;
      wrap.appendChild(ta);
      ta.select();
      toast("Скопируйте текст вручную");
    }

    /* горячие клавиши */
    wrap.appendChild(el("h3", "sec", "Горячие клавиши"));
    var kl = el("div", "kbdlist");
    [["/", "поиск"], ["J / K", "следующая / предыдущая"], ["H", "следующая подсказка"], ["S", "разбор"], ["T", "таймер"], ["R", "случайная задача"], ["0–7", "поставить балл"]].forEach(function (k) {
      var d = el("div");
      d.innerHTML = "<kbd>" + esc(k[0]) + "</kbd> — " + esc(k[1]);
      kl.appendChild(d);
    });
    wrap.appendChild(kl);

    var f = el("footer", "foot");
    f.appendChild(el("div", null, "Банк: " + DATA.length + " задач IMO 1959–2025, " + TECH.length + " приёмов в арсенале. Формулировки переведены и набраны вручную; у каждой задачи есть ссылка на официальный текст — сверяйтесь с ним перед тем, как считать условие точным."));
    wrap.appendChild(f);

    v.appendChild(wrap);
  }

  /* ---------------- переключение разделов ---------------- */
  function switchView(name) {
    state.view = name;
    ["problems", "train", "arsenal", "progress"].forEach(function (n) {
      $("#view-" + n).hidden = n !== name;
      var b = $('#tab-' + n);
      if (b) b.setAttribute("aria-selected", n === name);
    });
    if (name === "arsenal") renderArsenal();
    if (name === "progress") renderProgress();
    if (name === "train") renderTrain();
    try { location.hash = name; } catch (e) { }
  }

  /* ---------------- клавиатура ---------------- */
  document.addEventListener("keydown", function (ev) {
    var t = ev.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) {
      if (ev.key === "Escape") t.blur();
      return;
    }
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    var k = ev.key.toLowerCase();
    if (k === "/") { ev.preventDefault(); switchView("problems"); var q = $("#q"); if (q) q.focus(); return; }
    if (state.view !== "problems") return;
    if (k === "j") { ev.preventDefault(); neighbour(1); }
    else if (k === "k") { ev.preventDefault(); neighbour(-1); }
    else if (k === "r") { ev.preventDefault(); randomProblem(); }
    else if (k === "t" && state.current) { ev.preventDefault(); timerToggle(state.current); }
    else if (k === "h" && curHintBox) {
      ev.preventDefault();
      P.hints[curHintBox.id] = Math.min((P.hints[curHintBox.id] || 0) + 1, curHintBox.max);
      save(); curHintBox.paint(); curHintBox.body.hidden = false;
    }
    else if (k === "s") { var sb = $("#solBox"); if (sb && sb._open) { ev.preventDefault(); sb._open(); } }
    else if (/^[0-7]$/.test(k) && state.current) { ev.preventDefault(); setScore(state.current, +k); }
  });

  /* ---------------- старт ---------------- */
  function init() {
    applyTheme();
    $("#themeBtn").addEventListener("click", cycleTheme);
    ["problems", "train", "arsenal", "progress"].forEach(function (n) {
      $("#tab-" + n).addEventListener("click", function () { switchView(n); });
    });
    buildFilters();
    renderList();
    renderProblem();
    var h = (location.hash || "").replace("#", "");
    switchView(["problems", "train", "arsenal", "progress"].indexOf(h) >= 0 ? h : "problems");
    $("#boot").hidden = true;
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
