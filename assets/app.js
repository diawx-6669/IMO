/* IMO Workbench — логика приложения.
   Данные: window.IMO_DATA (задачи), window.IMO_TECHNIQUES (арсенал),
   window.IMO_PLAN (маршрут), window.IMO_I18N (языки), window.IMO_L10N (переводы материалов). */
(function () {
  "use strict";

  var DATA = (window.IMO_DATA || []).slice();
  var TECH = (window.IMO_TECHNIQUES || []).slice();
  var PLAN = (window.IMO_PLAN || []).slice();
  var LANGS = window.IMO_I18N || {};
  var L10N = window.IMO_L10N || {};
  var EXAM_SECONDS = 4 * 3600 + 30 * 60;
  var VIEWS = ["plan", "problems", "train", "arsenal", "progress"];

  DATA.sort(function (a, b) { return a.year - b.year || a.num - b.num; });

  /* ---------------- хранилище ---------------- */
  var KEY = "imo-workbench-v1";
  var P = { scores: {}, notes: {}, hints: {}, time: {}, last: {}, log: [], exams: [], theme: "", lang: "", seen: false };
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var o = JSON.parse(raw);
        ["scores", "notes", "hints", "time", "last"].forEach(function (k) { if (o && o[k] && typeof o[k] === "object") P[k] = o[k]; });
        if (o && Array.isArray(o.log)) P.log = o.log;
        if (o && Array.isArray(o.exams)) P.exams = o.exams;
        if (o && typeof o.theme === "string") P.theme = o.theme;
        if (o && typeof o.lang === "string") P.lang = o.lang;
        if (o && o.seen) P.seen = true;
      }
    } catch (e) { /* приватный режим — работаем без сохранения */ }
  }
  var saveTimer = null;
  function save() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { }
    }, 250);
  }
  load();

  /* ---------------- язык ---------------- */
  function pickLang() {
    if (P.lang && LANGS[P.lang]) return P.lang;
    var nav = (navigator.languages || [navigator.language || "en"]).map(function (x) { return String(x).slice(0, 2).toLowerCase(); });
    for (var i = 0; i < nav.length; i++) if (LANGS[nav[i]]) return nav[i];
    return LANGS.en ? "en" : Object.keys(LANGS)[0];
  }
  var LANG = pickLang();
  function t(key, params) {
    var dict = (LANGS[LANG] && LANGS[LANG].s) || {};
    var s = dict[key];
    if (s == null && LANGS.en) s = LANGS.en.s[key];
    if (s == null) s = key;
    if (params) Object.keys(params).forEach(function (k) { s = s.split("{" + k + "}").join(params[k]); });
    return s;
  }
  /* язык материалов: тот же, если перевод есть, иначе английский */
  function contentLang() { return (LANGS[LANG] && LANGS[LANG].content) ? LANG : "en"; }
  function locP(p, field) {
    var cl = contentLang();
    if (cl === "ru") return p[field];
    var o = L10N[cl] && L10N[cl].problems && L10N[cl].problems[p.id];
    return (o && o[field] != null) ? o[field] : p[field];
  }
  function locT(x, field) {
    var cl = contentLang();
    if (cl === "ru") return x[field];
    var o = L10N[cl] && L10N[cl].tech && L10N[cl].tech[x.id];
    return (o && o[field] != null) ? o[field] : x[field];
  }
  function locPlan(m, field) {
    var cl = contentLang();
    return (m[field] && (m[field][cl] || m[field].en || m[field].ru)) || "";
  }

  /* ---------------- утилиты ---------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function today() { return new Date().toISOString().slice(0, 10); }
  function daysBetween(a, b) { return Math.round((Date.parse(b) - Date.parse(a)) / 86400000); }
  function hhmmss(sec) {
    sec = Math.max(0, Math.round(sec));
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    var p2 = function (x) { return x < 10 ? "0" + x : "" + x; };
    return h > 0 ? h + ":" + p2(m) + ":" + p2(s) : p2(m) + ":" + p2(s);
  }
  var UNIT = { ru: ["с", "мин", "ч"], en: ["s", "min", "h"], uk: ["с", "хв", "год"], es: ["s", "min", "h"] };
  function humanTime(sec) {
    var u = UNIT[LANG] || UNIT.en;
    if (!sec) return "—";
    if (sec < 60) return Math.round(sec) + " " + u[0];
    if (sec < 3600) return Math.round(sec / 60) + " " + u[1];
    return (sec / 3600).toFixed(1).replace(".", LANG === "en" ? "." : ",") + " " + u[2];
  }

  /* --- рендер: сначала выделяем математику, потом разметку --- */
  var SEP = "\u0000";
  function fmt(text) {
    if (!text) return "";
    var math = [], i = 0, out = "";
    while (i < text.length) {
      if (text.charCodeAt(i) === 36) {
        var display = text.charCodeAt(i + 1) === 36;
        var open = display ? 2 : 1;
        var close = text.indexOf(display ? "$$" : "$", i + open);
        if (close > -1) {
          var tex = text.slice(i + open, close), html;
          try {
            html = window.katex.renderToString(tex, { displayMode: display, throwOnError: false, output: "html", strict: false });
          } catch (e) { html = '<code class="num">' + esc(tex) + "</code>"; }
          math.push(html);
          out += SEP + (math.length - 1) + SEP;
          i = close + open;
          continue;
        }
      }
      out += text[i]; i++;
    }
    out = esc(out);
    out = out.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/(^|[\s(])\*([^*\n]+?)\*(?=[\s.,;:!?)]|$)/g, "$1<em>$2</em>");
    var paras = out.split(/\n\s*\n/).map(function (p) { return "<p>" + p.replace(/\n/g, "<br>") + "</p>"; }).join("");
    return paras.replace(new RegExp(SEP + "(\\d+)" + SEP, "g"), function (_, n) { return math[+n]; });
  }
  function setHTML(node, text) { node.innerHTML = fmt(text); return node; }
  function inlineHTML(node, text) { node.innerHTML = fmt(text).replace(/^<p>|<\/p>$/g, ""); return node; }

  function officialURL(p) { return "https://www.imo-official.org/problems/" + p.year + "/"; }
  function aopsURL(p) { return "https://artofproblemsolving.com/wiki/index.php/" + p.year + "_IMO_Problems"; }

  /* ---------------- интервальные повторения ---------------- */
  function dueAfter(score) { return score <= 3 ? 3 : score === 4 ? 7 : score <= 6 ? 21 : null; }
  function dueIn(id) {                      // дней до повторения; null — не требуется
    var s = P.scores[id];
    if (s == null) return null;
    var gap = dueAfter(s);
    if (gap == null) return null;
    var last = P.last[id];
    if (!last) return 0;
    return gap - daysBetween(last, today());
  }
  function isDue(id) { var d = dueIn(id); return d != null && d <= 0; }
  function dueList() {
    return DATA.filter(function (p) { return isDue(p.id); })
      .sort(function (a, b) { return (P.scores[a.id] - P.scores[b.id]) || (dueIn(a.id) - dueIn(b.id)); });
  }

  /* ---------------- маршрут ---------------- */
  function moduleStats(m) {
    var done = m.problems.filter(function (id) { return P.scores[id] != null && P.scores[id] >= 5; }).length;
    return { done: done, total: m.problems.length, complete: done === m.problems.length };
  }
  function currentModule() {
    for (var i = 0; i < PLAN.length; i++) if (!moduleStats(PLAN[i]).complete) return PLAN[i];
    return null;
  }
  function recommend() {
    var rated = Object.keys(P.scores).length;
    if (!rated) return { kind: "first", id: PLAN[0].problems[0] };
    var due = dueList();
    if (due.length) return { kind: "due", id: due[0].id };
    var lastExam = P.exams.length ? P.exams[P.exams.length - 1].date : null;
    if (rated >= 12 && (!lastExam || daysBetween(lastExam, today()) >= 14)) return { kind: "exam" };
    var m = currentModule();
    if (m) {
      var next = m.problems.filter(function (id) { return P.scores[id] == null; })[0]
        || m.problems.filter(function (id) { return P.scores[id] < 5; })[0];
      if (next) return { kind: "module", id: next, module: m };
    }
    return { kind: "done" };
  }

  /* ---------------- состояние ---------------- */
  var state = { view: "plan", topics: {}, tiers: {}, status: "all", sort: "year", q: "", current: null, exam: null, legend: false };

  /* ---------------- тема ---------------- */
  function applyTheme() {
    if (P.theme === "dark" || P.theme === "light") document.documentElement.setAttribute("data-theme", P.theme);
    else document.documentElement.removeAttribute("data-theme");
    var b = $("#themeBtn");
    if (b) b.title = t("theme.tip") + ": " + t("theme." + (P.theme || "system"));
  }
  function cycleTheme() {
    P.theme = P.theme === "" ? "light" : P.theme === "light" ? "dark" : "";
    applyTheme(); save();
    toast(t("theme.toast", { v: t("theme." + (P.theme || "system")) }));
  }
  var toastT = null;
  function toast(msg) {
    var el0 = $("#toast");
    el0.textContent = msg; el0.hidden = false;
    if (toastT) clearTimeout(toastT);
    toastT = setTimeout(function () { el0.hidden = true; }, 2400);
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
      if (state.status === "due") { if (!isDue(p.id)) return false; }
      else if (state.status !== "all" && statusOf(p) !== state.status) return false;
      if (q) {
        var hay = (locP(p, "title") + " " + locP(p, "statement") + " " + (locP(p, "tags") || []).join(" ") + " " +
          p.title + " " + p.year + " " + p.id).toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    if (state.sort === "yeardesc") list.sort(function (a, b) { return b.year - a.year || a.num - b.num; });
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
    search.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="6.8" cy="6.8" r="4.4"/><path d="M10.2 10.2 14 14"/></svg>';
    var inp = el("input");
    inp.type = "search"; inp.id = "q"; inp.placeholder = t("pr.search"); inp.value = state.q;
    inp.setAttribute("aria-label", t("pr.search"));
    inp.addEventListener("input", function () { state.q = inp.value; renderList(); });
    search.appendChild(inp);
    box.appendChild(search);

    var row1 = el("div", "chiprow");
    row1.appendChild(el("span", "lbl", t("pr.f.topic")));
    ["A", "C", "G", "N"].forEach(function (k) {
      var c = el("button", "chip t-" + k, k);
      c.title = t("topic." + k);
      c.setAttribute("aria-pressed", !!state.topics[k]);
      c.addEventListener("click", function () {
        state.topics[k] = !state.topics[k];
        c.setAttribute("aria-pressed", !!state.topics[k]);
        renderList();
      });
      row1.appendChild(c);
    });
    box.appendChild(row1);

    var row2 = el("div", "chiprow");
    row2.appendChild(el("span", "lbl", t("pr.f.num")));
    [1, 2, 3].forEach(function (k) {
      var c = el("button", "chip", t("tier.short." + k));
      c.title = t("tier." + k);
      c.setAttribute("aria-pressed", !!state.tiers[k]);
      c.addEventListener("click", function () {
        state.tiers[k] = !state.tiers[k];
        c.setAttribute("aria-pressed", !!state.tiers[k]);
        renderList();
      });
      row2.appendChild(c);
    });
    box.appendChild(row2);

    var row3 = el("div", "chiprow");
    var st = el("select");
    st.setAttribute("aria-label", t("pr.st.all"));
    var nDue = dueList().length;
    [["all", t("pr.st.all")], ["fresh", t("pr.st.fresh")], ["open", t("pr.st.open")],
     ["solved", t("pr.st.solved")], ["due", t("pr.st.due") + (nDue ? " (" + nDue + ")" : "")]].forEach(function (o) {
      var op = el("option", null, o[1]); op.value = o[0];
      if (state.status === o[0]) op.selected = true;
      st.appendChild(op);
    });
    st.addEventListener("change", function () { state.status = st.value; renderList(); });
    var so = el("select");
    so.setAttribute("aria-label", t("pr.sort.year"));
    [["year", t("pr.sort.year")], ["yeardesc", t("pr.sort.yeardesc")], ["tier", t("pr.sort.tier")], ["score", t("pr.sort.score")]].forEach(function (o) {
      var op = el("option", null, o[1]); op.value = o[0];
      if (state.sort === o[0]) op.selected = true;
      so.appendChild(op);
    });
    so.addEventListener("change", function () { state.sort = so.value; renderList(); });
    row3.appendChild(st); row3.appendChild(so);
    box.appendChild(row3);

    var cnt = el("div", "fcount");
    cnt.id = "fcount";
    cnt.appendChild(el("span", null, ""));
    var rnd = el("button", "linkish", t("pr.random"));
    rnd.addEventListener("click", randomProblem);
    cnt.appendChild(rnd);
    box.appendChild(cnt);

    var lg = el("button", "linkish lgbtn", t("pr.legend"));
    var lgb = el("div", "legend");
    inlineHTML(lgb, t("pr.legend.body"));
    lgb.hidden = !state.legend;
    lg.addEventListener("click", function () { state.legend = !state.legend; lgb.hidden = !state.legend; });
    box.appendChild(lg); box.appendChild(lgb);
  }

  function renderList() {
    var list = filtered();
    var ol = $("#plist");
    ol.innerHTML = "";
    var c = $("#fcount");
    if (c) c.firstChild.textContent = t("pr.count", { n: list.length, total: DATA.length });
    if (!list.length) { ol.appendChild(el("li", "empty", t("pr.empty"))); return; }
    list.forEach(function (p) {
      var li = el("li");
      var b = el("button", "pitem");
      b.setAttribute("aria-current", state.current === p.id);
      var bd = el("span", "badge " + p.topic, p.topic);
      bd.title = t("topic." + p.topic);
      var mid = el("span", "ttl");
      mid.appendChild(el("span", "yr", p.year + "/" + p.num + "  "));
      mid.appendChild(document.createTextNode(locP(p, "title")));
      var s = P.scores[p.id];
      var sc = el("span", "sc" + (s == null ? "" : s >= 5 ? " has" : " low"), s == null ? "—" : s + "/7");
      if (isDue(p.id)) { sc.classList.add("duedot"); sc.title = t("pr.due"); }
      b.appendChild(bd); b.appendChild(mid); b.appendChild(sc);
      b.addEventListener("click", function () { openProblem(p.id); });
      li.appendChild(b); ol.appendChild(li);
    });
  }

  /* ---------------- таймер задачи ---------------- */
  var timer = { id: null, t0: 0, handle: null };
  function timerTick() {
    var d = $("#clock");
    if (!d || !timer.id) return;
    d.textContent = hhmmss((P.time[timer.id] || 0) + (Date.now() - timer.t0) / 1000);
  }
  function timerStart(id) {
    timerStop();
    timer.id = id; timer.t0 = Date.now();
    timer.handle = setInterval(timerTick, 1000);
    var c = $("#clock"); if (c) c.classList.add("run");
    var b = $("#timerBtn"); if (b) b.textContent = t("pr.timer.pause");
    timerTick();
  }
  function timerStop() {
    if (timer.handle) clearInterval(timer.handle);
    if (timer.id) { P.time[timer.id] = (P.time[timer.id] || 0) + (Date.now() - timer.t0) / 1000; save(); }
    timer.handle = null; timer.id = null;
    var c = $("#clock"); if (c) c.classList.remove("run");
    var b = $("#timerBtn"); if (b) b.textContent = t("pr.timer.start");
  }
  function timerToggle(id) {
    if (timer.id === id) { timerStop(); var c = $("#clock"); if (c) c.textContent = hhmmss(P.time[id] || 0); }
    else timerStart(id);
  }

  /* ---------------- карточка задачи ---------------- */
  function byId(id) { for (var i = 0; i < DATA.length; i++) if (DATA[i].id === id) return DATA[i]; return null; }
  function techFor(id) { return TECH.filter(function (x) { return (x.problems || []).indexOf(id) >= 0; }); }

  function openProblem(id, keepView) {
    if (timer.id && timer.id !== id) timerStop();
    state.current = id;
    var sp = $("#split"); if (sp) sp.dataset.pane = "work";
    if (!keepView) switchView("problems");
    renderList();
    renderProblem();
    window.scrollTo(0, 0);
  }
  function randomProblem() {
    var list = filtered();
    if (!list.length) return;
    openProblem(list[Math.floor(Math.random() * list.length)].id);
  }
  function neighbour(delta) {
    var list = filtered();
    if (!list.length) return;
    var i = -1;
    for (var k = 0; k < list.length; k++) if (list[k].id === state.current) { i = k; break; }
    openProblem(list[i < 0 ? 0 : (i + delta + list.length) % list.length].id);
  }

  function revealBlock(title, kbd, builder) {
    var box = el("div", "reveal");
    var head = el("button", "rhead"); head.type = "button";
    head.appendChild(el("span", null, title));
    if (kbd) head.appendChild(el("span", "k kbdhint", kbd));
    var body = el("div", "rbody"); body.hidden = true;
    head.setAttribute("aria-expanded", "false");
    var built = false;
    function build() { if (!built) { builder(body); built = true; } }
    head.addEventListener("click", function () {
      build(); body.hidden = !body.hidden;
      head.setAttribute("aria-expanded", !body.hidden);
    });
    box.appendChild(head); box.appendChild(body);
    box._open = function () { build(); body.hidden = false; head.setAttribute("aria-expanded", "true"); };
    return box;
  }

  var curHintBox = null;

  function renderProblem() {
    var w = $("#work");
    w.innerHTML = "";
    var p = byId(state.current);
    if (!p) {
      var ph = el("div", "card");
      ph.appendChild(el("h2", "ptitle", t("pr.ph.title")));
      ph.appendChild(el("p", "lead", t("pr.ph.body", { n: DATA.length, plan: t("nav.plan") })));
      var cta = el("button", "btn primary", t("pr.ph.cta"));
      cta.addEventListener("click", function () { switchView("plan"); });
      ph.appendChild(cta);
      w.appendChild(ph);
      return;
    }

    var back = el("button", "btn ghost pback", "← " + t("pr.back"));
    back.addEventListener("click", function () { $("#split").dataset.pane = "list"; });
    w.appendChild(back);

    var meta = el("div", "meta");
    var b = el("span", "badge " + p.topic, p.topic); b.title = t("topic." + p.topic);
    meta.appendChild(b);
    meta.appendChild(el("span", "tag strong", t("pr.header", { year: p.year, num: p.num })));
    meta.appendChild(el("span", "tag", t("tier." + p.tier)));
    if (isDue(p.id)) meta.appendChild(el("span", "tag due", t("pr.due")));
    if (p.partial) { var pt = el("span", "tag", t("pr.partial")); pt.title = t("pr.partial.tip"); meta.appendChild(pt); }
    if (p.verify) { var vt = el("span", "tag warnish", t("pr.verify")); vt.title = t("pr.verify.tip"); meta.appendChild(vt); }
    w.appendChild(meta);

    w.appendChild(el("h2", "ptitle", locP(p, "title")));
    var s = P.scores[p.id];
    w.appendChild(el("div", "psub", t("topic." + p.topic) + " · " +
      (s == null ? t("pr.sub.unrated") : t("pr.sub.score", { s: s })) + " · " +
      t("pr.sub.time", { t: humanTime(P.time[p.id] || 0) })));

    if (contentLang() !== LANG) {
      var note = el("div", "langnote");
      note.appendChild(el("strong", null, t("lang.note.title") + ". "));
      note.appendChild(document.createTextNode(t("lang.note.body")));
      w.appendChild(note);
    }

    w.appendChild(setHTML(el("div", "statement"), locP(p, "statement")));

    var tools = el("div", "tools");
    var clock = el("div", "clock num"); clock.id = "clock"; clock.textContent = hhmmss(P.time[p.id] || 0);
    var tb = el("button", "btn primary", t("pr.timer.start")); tb.id = "timerBtn";
    tb.addEventListener("click", function () { timerToggle(p.id); });
    tools.appendChild(clock); tools.appendChild(tb);
    var rb = el("button", "btn", t("pr.random"));
    rb.addEventListener("click", randomProblem);
    tools.appendChild(rb);
    w.appendChild(tools);

    /* подсказки */
    var hints = locP(p, "hints") || [];
    if (hints.length) {
      var hb = el("div", "reveal");
      var hh = el("button", "rhead"); hh.type = "button";
      hh.appendChild(el("span", null, t("pr.hints")));
      var kcount = el("span", "k", t("pr.hints.count", { n: Math.min(P.hints[p.id] || 0, hints.length), total: hints.length }));
      hh.appendChild(kcount);
      hh.appendChild(el("span", "k kbdhint", t("pr.hints.kbd")));
      var hbody = el("div", "rbody");
      hbody.hidden = !(P.hints[p.id] > 0);
      function paintHints() {
        hbody.innerHTML = "";
        var n = Math.min(P.hints[p.id] || 0, hints.length);
        if (!n) hbody.appendChild(el("div", "note", t("pr.hints.warn")));
        for (var i = 0; i < n; i++) {
          var d = el("div", "hint");
          d.appendChild(el("div", "hn", t("pr.hints") + " " + (i + 1)));
          d.appendChild(setHTML(el("div"), hints[i]));
          hbody.appendChild(d);
        }
        if (n < hints.length) {
          var more = el("button", "btn ghost", n === 0 ? t("pr.hints.first") : t("pr.hints.next"));
          more.style.marginTop = "12px";
          more.addEventListener("click", function () {
            P.hints[p.id] = Math.min((P.hints[p.id] || 0) + 1, hints.length);
            save(); paintHints();
          });
          hbody.appendChild(more);
        } else hbody.appendChild(el("div", "note", t("pr.hints.done")));
        kcount.textContent = t("pr.hints.count", { n: n, total: hints.length });
      }
      paintHints();
      hh.addEventListener("click", function () {
        if (hbody.hidden && !(P.hints[p.id] > 0)) { P.hints[p.id] = 1; save(); paintHints(); }
        hbody.hidden = !hbody.hidden;
        hh.setAttribute("aria-expanded", !hbody.hidden);
      });
      hb.appendChild(hh); hb.appendChild(hbody);
      w.appendChild(hb);
      curHintBox = { paint: paintHints, body: hbody, max: hints.length, id: p.id };
    } else curHintBox = null;

    if (locP(p, "answer")) {
      w.appendChild(revealBlock(t("pr.answer"), "", function (body) {
        body.appendChild(setHTML(el("div"), locP(p, "answer")));
      }));
    }

    var solBox = revealBlock(t("pr.solution") + (p.partial ? " · " + t("pr.partial") : ""), t("pr.solution.kbd"), function (body) {
      if (p.partial) body.appendChild(el("div", "note", t("pr.solution.partial")));
      body.appendChild(setHTML(el("div", "solution"), locP(p, "solution")));
      body.appendChild(el("div", "note", t("pr.solution.after")));
      var links = el("div", "srclinks");
      var a1 = el("a", null, t("pr.links.official")); a1.href = officialURL(p); a1.target = "_blank"; a1.rel = "noopener";
      var a2 = el("a", null, t("pr.links.aops")); a2.href = aopsURL(p); a2.target = "_blank"; a2.rel = "noopener";
      links.appendChild(a1); links.appendChild(a2);
      body.appendChild(links);
    });
    solBox.id = "solBox";
    w.appendChild(solBox);

    /* техники для задачи */
    var rel = techFor(p.id);
    if (rel.length) {
      var rb2 = el("div", "relbox");
      rb2.appendChild(el("div", "sublbl", t("pr.related")));
      var rr = el("div");
      rel.forEach(function (x) {
        var pill = el("button", "pill", locT(x, "name"));
        pill.addEventListener("click", function () { switchView("arsenal"); setTimeout(function () { openTech(x.id); }, 30); });
        rr.appendChild(pill);
      });
      rb2.appendChild(rr);
      w.appendChild(rb2);
    }

    /* самооценка */
    var sc = el("div", "score");
    sc.appendChild(el("h4", null, t("pr.score.title")));
    sc.appendChild(el("div", "sdesc", t("pr.score.desc")));
    var grid = el("div", "sgrid");
    var rub = el("div", "srub");
    for (var i = 0; i <= 7; i++) {
      (function (v) {
        var sb = el("button", "sbtn", String(v));
        sb.setAttribute("aria-pressed", P.scores[p.id] === v);
        sb.title = t("rub." + v);
        sb.addEventListener("mouseenter", function () { rub.textContent = t("rub." + v); });
        sb.addEventListener("focus", function () { rub.textContent = t("rub." + v); });
        sb.addEventListener("click", function () { setScore(p.id, v); });
        grid.appendChild(sb);
      })(i);
    }
    sc.appendChild(grid);
    rub.textContent = P.scores[p.id] != null ? t("rub." + P.scores[p.id]) : t("pr.score.hover");
    sc.appendChild(rub);
    var ta = el("textarea");
    ta.placeholder = t("pr.notes");
    ta.value = P.notes[p.id] || "";
    ta.addEventListener("input", function () { P.notes[p.id] = ta.value; save(); });
    sc.appendChild(ta);
    w.appendChild(sc);

    var nav = el("div", "navrow");
    var pv = el("button", "btn", "← " + t("pr.prev")); pv.addEventListener("click", function () { neighbour(-1); });
    var nx = el("button", "btn", t("pr.next") + " →"); nx.addEventListener("click", function () { neighbour(1); });
    nav.appendChild(pv); nav.appendChild(nx);
    w.appendChild(nav);
  }

  function setScore(id, v) {
    P.scores[id] = v;
    P.last[id] = today();
    P.log = P.log.filter(function (r) { return !(r.id === id && r.d === today()); });
    P.log.push({ d: today(), id: id, s: v });
    if (P.log.length > 2000) P.log = P.log.slice(-2000);
    save(); renderList(); renderProblem();
    toast(t("pr.score.saved", { s: v }));
  }
  function setScoreSilent(id, v) {
    P.scores[id] = v; P.last[id] = today();
    P.log = P.log.filter(function (r) { return !(r.id === id && r.d === today()); });
    P.log.push({ d: today(), id: id, s: v });
  }

  /* ---------------- план ---------------- */
  function renderPlan() {
    var v = $("#view-plan");
    v.innerHTML = "";
    var wrap = el("div", "wrap");
    wrap.appendChild(el("h1", null, t("plan.title")));
    wrap.appendChild(el("p", "lead", t("plan.lead", { n: DATA.length })));

    /* рекомендация */
    var r = recommend();
    var card = el("div", "card today");
    card.appendChild(el("div", "sublbl", t("plan.today.title")));
    var line = el("p", "todayline");
    if (r.kind === "exam") {
      line.textContent = t("plan.today.exam");
      card.appendChild(line);
      var eb = el("button", "btn primary", t("tr.start.full"));
      eb.addEventListener("click", function () { switchView("train"); startExam(EXAM_SECONDS); });
      card.appendChild(eb);
    } else if (r.kind === "done") {
      line.textContent = t("plan.today.done");
      card.appendChild(line);
    } else {
      var p = byId(r.id);
      line.textContent = r.kind === "first" ? t("plan.today.first")
        : r.kind === "due" ? t("plan.today.due")
          : t("plan.today.module", { m: locPlan(r.module, "title") });
      card.appendChild(line);
      var row = el("div", "todayrow");
      var bd = el("span", "badge " + p.topic, p.topic); bd.title = t("topic." + p.topic);
      row.appendChild(bd);
      row.appendChild(el("span", "tag strong", t("pr.header", { year: p.year, num: p.num })));
      row.appendChild(el("span", "todayname", locP(p, "title")));
      card.appendChild(row);
      var ob = el("button", "btn primary", t("plan.today.open"));
      ob.addEventListener("click", function () { openProblem(r.id); });
      card.appendChild(ob);
    }
    wrap.appendChild(card);

    /* блоки текста */
    function textBlock(titleKey, items, noteKey, open) {
      var box = el("div", "reveal");
      var head = el("button", "rhead"); head.type = "button";
      head.appendChild(el("span", null, t(titleKey)));
      var body = el("div", "rbody prose");
      body.hidden = !open;
      head.setAttribute("aria-expanded", !!open);
      items.forEach(function (k) { body.appendChild(inlineHTML(el("p"), t(k))); });
      if (noteKey) body.appendChild(el("div", "note", t(noteKey)));
      head.addEventListener("click", function () { body.hidden = !body.hidden; head.setAttribute("aria-expanded", !body.hidden); });
      box.appendChild(head); box.appendChild(body);
      return box;
    }
    var first = !Object.keys(P.scores).length;   // новичку раздел «как тренироваться» открыт сразу
    wrap.appendChild(textBlock("plan.how.title", ["plan.how.1", "plan.how.2", "plan.how.3", "plan.how.4", "plan.how.5", "plan.how.6"], null, first));
    wrap.appendChild(textBlock("plan.path.title", ["plan.path.1", "plan.path.2", "plan.path.3"], "plan.path.note", false));
    wrap.appendChild(textBlock("plan.where.title", ["plan.where.1", "plan.where.2", "plan.where.3", "plan.where.4", "plan.where.5"], null, false));

    /* маршрут */
    wrap.appendChild(el("h3", "sec", t("plan.route.title")));
    wrap.appendChild(el("div", "secnote", t("plan.route.lead")));
    [1, 2, 3].forEach(function (stage) {
      var mods = PLAN.filter(function (m) { return m.stage === stage; });
      var tot = mods.reduce(function (a, m) { return a + m.problems.length; }, 0);
      var don = mods.reduce(function (a, m) { return a + moduleStats(m).done; }, 0);
      var sh = el("div", "stagehead");
      sh.appendChild(el("h4", null, t("plan.stage." + stage)));
      sh.appendChild(el("span", "stageval num", don + " / " + tot));
      wrap.appendChild(sh);
      var tr = el("div", "track stagebar");
      var fi = el("div", "fill"); fi.style.width = (tot ? Math.round(don / tot * 100) : 0) + "%";
      fi.style.background = "var(--accent)";
      tr.appendChild(fi);
      wrap.appendChild(tr);
      wrap.appendChild(el("div", "secnote", t("plan.stage." + stage + ".goal")));

      var cards = el("div", "cards");
      mods.forEach(function (m) {
        var st = moduleStats(m);
        var box = el("div", "tech" + (st.complete ? " done" : ""));
        var head = el("button", "rhead"); head.type = "button";
        head.appendChild(el("span", "tname", locPlan(m, "title")));
        head.appendChild(el("span", "k mprog", st.complete ? t("plan.module.complete") : t("plan.module.done", { done: st.done, total: st.total })));
        var body = el("div", "tbody"); body.hidden = true;
        var built = false;
        head.addEventListener("click", function () {
          if (!built) {
            body.appendChild(el("p", "tcore", locPlan(m, "desc")));
            body.appendChild(el("div", "sublbl", t("plan.module.tech")));
            var tr2 = el("div");
            m.tech.forEach(function (tid) {
              var x = TECH.filter(function (y) { return y.id === tid; })[0];
              if (!x) return;
              var pill = el("button", "pill", locT(x, "name"));
              pill.addEventListener("click", function () { switchView("arsenal"); setTimeout(function () { openTech(tid); }, 30); });
              tr2.appendChild(pill);
            });
            body.appendChild(tr2);
            body.appendChild(el("div", "sublbl", t("plan.module.problems")));
            var pr = el("div");
            m.problems.forEach(function (pid) {
              var pp = byId(pid); if (!pp) return;
              var sc2 = P.scores[pid];
              var pill = el("button", "pill prob" + (sc2 == null ? "" : sc2 >= 5 ? " ok" : " weak"));
              pill.appendChild(el("span", "badge " + pp.topic, pp.topic));
              pill.appendChild(document.createTextNode(pp.year + "/" + pp.num + (sc2 == null ? "" : " · " + sc2 + "/7")));
              pill.title = locP(pp, "title");
              pill.addEventListener("click", function () { openProblem(pid); });
              pr.appendChild(pill);
            });
            body.appendChild(pr);
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

    wrap.appendChild(el("h3", "sec", t("plan.weekly.title")));
    wrap.appendChild(el("p", "lead", t("plan.weekly.body")));
    v.appendChild(wrap);
  }

  /* ---------------- тренировка ---------------- */
  function pickPaper() {
    return [1, 2, 3].map(function (tier) {
      var pool = DATA.filter(function (p) { return p.tier === tier && (P.scores[p.id] == null || P.scores[p.id] <= 4); });
      if (!pool.length) pool = DATA.filter(function (p) { return p.tier === tier; });
      return pool[Math.floor(Math.random() * pool.length)];
    });
  }
  var examHandle = null;
  function renderTrain() {
    var v = $("#view-train");
    v.innerHTML = "";
    var wrap = el("div", "wrap");

    if (!state.exam) {
      wrap.appendChild(el("h1", null, t("tr.title")));
      wrap.appendChild(el("p", "lead", t("tr.lead")));
      wrap.appendChild(el("div", "note", t("tr.rules")));
      var row = el("div", "tools");
      var sb = el("button", "btn primary", t("tr.start.full"));
      sb.addEventListener("click", function () { startExam(EXAM_SECONDS); });
      var sb2 = el("button", "btn", t("tr.start.short"));
      sb2.addEventListener("click", function () { startExam(90 * 60); });
      row.appendChild(sb); row.appendChild(sb2);
      wrap.appendChild(row);

      if (P.exams.length) {
        wrap.appendChild(el("h3", "sec", t("tr.history")));
        var ul = el("ul", "hist");
        P.exams.slice().reverse().slice(0, 12).forEach(function (e) {
          var li = el("li");
          li.appendChild(el("span", "num", e.date));
          li.appendChild(el("strong", null, (e.scores || []).reduce(function (a, b) { return a + (b || 0); }, 0) + "/21"));
          li.appendChild(el("span", null, (e.ids || []).join(", ")));
          li.appendChild(el("span", "num", humanTime(e.elapsed)));
          ul.appendChild(li);
        });
        wrap.appendChild(ul);
      } else wrap.appendChild(el("div", "note", t("tr.empty")));
      v.appendChild(wrap);
      return;
    }

    var e = state.exam;
    var head = el("div", "exam-head");
    var bc = el("div", "bigclock num"); bc.id = "bigclock";
    head.appendChild(bc);
    var pb = el("button", "btn", e.paused ? t("pr.timer.start") : t("pr.timer.pause"));
    pb.addEventListener("click", function () {
      if (e.paused) { e.paused = false; e.t0 = Date.now(); }
      else { e.elapsed += (Date.now() - e.t0) / 1000; e.paused = true; }
      renderTrain();
    });
    var fb = el("button", "btn primary", t("tr.finish"));
    fb.addEventListener("click", finishExam);
    head.appendChild(pb); head.appendChild(fb);
    wrap.appendChild(head);
    wrap.appendChild(el("div", "secnote", t("tr.active")));

    var cards = el("div", "cards");
    e.ids.forEach(function (id, idx) {
      var p = byId(id);
      var card = el("div", "card");
      var slot = el("div", "exam-slot");
      slot.appendChild(el("div", "pno", t("tr.pno", { n: idx + 1 })));
      var mid = el("div");
      var m = el("div", "meta");
      var bd = el("span", "badge " + p.topic, p.topic); bd.title = t("topic." + p.topic);
      m.appendChild(bd);
      m.appendChild(el("span", "tag", t("pr.header", { year: p.year, num: p.num })));
      mid.appendChild(m);
      mid.appendChild(setHTML(el("div", "exam-st"), locP(p, "statement")));
      slot.appendChild(mid);
      if (e.finished) {
        var g = el("div", "sgrid vert");
        for (var i = 0; i <= 7; i++) {
          (function (val) {
            var sb = el("button", "sbtn", String(val));
            sb.title = t("rub." + val);
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
      var res = el("div", "card"); res.style.marginTop = "16px";
      res.appendChild(el("h3", null, t("tr.result", { s: tot })));
      res.appendChild(el("p", "secnote", t("tr.result.desc", { t: humanTime(e.elapsed) })));
      var s1 = el("button", "btn primary", t("tr.save"));
      s1.addEventListener("click", function () {
        P.exams.push({ date: today(), ids: e.ids, scores: e.scores, elapsed: e.elapsed });
        e.ids.forEach(function (id, i) { if (e.scores[i] != null) setScoreSilent(id, e.scores[i]); });
        save(); state.exam = null; renderTrain(); renderList();
        toast(t("tr.saved"));
      });
      var dr = el("button", "btn", t("tr.drop"));
      dr.addEventListener("click", function () { state.exam = null; renderTrain(); });
      var row2 = el("div", "tools"); row2.appendChild(s1); row2.appendChild(dr);
      res.appendChild(row2);
      wrap.appendChild(res);
    }
    v.appendChild(wrap);
    paintBigClock();
  }
  function startExam(seconds) {
    var paper = pickPaper();
    state.exam = { ids: paper.map(function (p) { return p.id; }), limit: seconds, elapsed: 0, t0: Date.now(), paused: false, finished: false, scores: [null, null, null] };
    if (examHandle) clearInterval(examHandle);
    examHandle = setInterval(paintBigClock, 1000);
    switchView("train");
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
    var e = state.exam; if (!e) return;
    if (!e.paused) e.elapsed += (Date.now() - e.t0) / 1000;
    e.paused = true; e.finished = true;
    if (examHandle) { clearInterval(examHandle); examHandle = null; }
    renderTrain();
  }

  /* ---------------- арсенал ---------------- */
  function openTech(id) {
    var h = document.querySelector('[data-tech="' + id + '"] .rhead');
    if (h) {
      var body = h.nextSibling;
      if (body && body.hidden) h.click();
      h.scrollIntoView({ block: "center" });
      h.focus();
    }
  }
  function renderArsenal() {
    var v = $("#view-arsenal");
    v.innerHTML = "";
    var wrap = el("div", "wrap");
    wrap.appendChild(el("h1", null, t("ar.title")));
    wrap.appendChild(el("p", "lead", t("ar.lead")));

    ["M", "A", "N", "C", "G"].forEach(function (topic) {
      var items = TECH.filter(function (x) { return x.topic === topic; });
      if (!items.length) return;
      wrap.appendChild(el("h3", "sec", t("topic." + topic)));
      wrap.appendChild(el("div", "secnote", t("ar.count", { n: items.length })));
      var cards = el("div", "cards");
      items.forEach(function (x) {
        var box = el("div", "tech");
        box.dataset.tech = x.id;
        var head = el("button", "rhead"); head.type = "button";
        var bd = el("span", "badge " + x.topic, x.topic); bd.title = t("topic." + x.topic);
        head.appendChild(bd);
        head.appendChild(el("span", "tname", locT(x, "name")));
        var body = el("div", "tbody"); body.hidden = true;
        var built = false;
        head.addEventListener("click", function () {
          if (!built) {
            body.appendChild(setHTML(el("div", "tcore"), locT(x, "core")));
            var when = locT(x, "when");
            if (when && when.length) {
              body.appendChild(el("div", "sublbl", t("ar.when")));
              var ul = el("ul");
              when.forEach(function (q) { ul.appendChild(inlineHTML(el("li"), q)); });
              body.appendChild(ul);
            }
            if (locT(x, "pitfall")) {
              body.appendChild(el("div", "sublbl", t("ar.pitfall")));
              body.appendChild(setHTML(el("div", "tcore"), locT(x, "pitfall")));
            }
            if (x.problems && x.problems.length) {
              body.appendChild(el("div", "sublbl", t("ar.practice")));
              var row = el("div");
              x.problems.forEach(function (pid) {
                var p = byId(pid); if (!p) return;
                var pill = el("button", "pill", p.year + "/" + p.num);
                pill.title = locP(p, "title");
                pill.addEventListener("click", function () { openProblem(pid); });
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
  function streak() {
    var days = {};
    P.log.forEach(function (r) { days[r.d] = true; });
    var n = 0, d = new Date();
    for (; ;) {
      var key = d.toISOString().slice(0, 10);
      if (days[key]) { n++; d.setDate(d.getDate() - 1); }
      else if (n === 0 && key === today()) { d.setDate(d.getDate() - 1); }
      else break;
      if (n > 999) break;
    }
    return n;
  }
  function renderProgress() {
    var v = $("#view-progress");
    v.innerHTML = "";
    var wrap = el("div", "wrap");
    wrap.appendChild(el("h1", null, t("pg.title")));

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
    stats.appendChild(stat(attempted + "/" + DATA.length, t("pg.rated")));
    stats.appendChild(stat(String(total), t("pg.points")));
    stats.appendChild(stat(solved + " / " + full, t("pg.solved")));
    stats.appendChild(stat(avg ? avg.toFixed(1).replace(".", LANG === "en" ? "." : ",") : "—", t("pg.avg")));
    stats.appendChild(stat(humanTime(timeAll), t("pg.time")));
    stats.appendChild(stat(String(streak()), t("pg.streak")));
    wrap.appendChild(stats);

    var pace = el("div", "card");
    pace.appendChild(el("h3", null, t("pg.medal.title")));
    var six = avg * 6;
    pace.appendChild(el("p", "secnote", attempted < 6 ? t("pg.medal.few") : t("pg.medal.body", { n: six.toFixed(0) })));
    if (attempted >= 6) {
      pace.appendChild(el("p", null, t(six >= 30 ? "pg.medal.gold" : six >= 24 ? "pg.medal.silver" : six >= 17 ? "pg.medal.bronze" : "pg.medal.none")));
    }
    pace.appendChild(el("div", "note", t("pg.medal.note")));
    wrap.appendChild(pace);

    wrap.appendChild(el("h3", "sec", t("pg.topics")));
    wrap.appendChild(el("div", "secnote", t("pg.topics.note")));
    var bars = el("div", "bars");
    ["A", "C", "G", "N"].forEach(function (k) {
      var inTopic = DATA.filter(function (p) { return p.topic === k; });
      var done = inTopic.filter(function (p) { return P.scores[p.id] != null; });
      var got = done.reduce(function (a, p) { return a + P.scores[p.id]; }, 0);
      var max = done.length * 7;
      var row = el("div", "bar");
      row.appendChild(el("div", null, t("topic." + k)));
      var tr = el("div", "track");
      var fi = el("div", "fill");
      fi.style.width = (max ? Math.round(got / max * 100) : 0) + "%";
      fi.style.background = "var(--t-" + k + ")";
      tr.appendChild(fi); row.appendChild(tr);
      row.appendChild(el("div", "val", done.length ? got + "/" + max + " (" + done.length + "/" + inTopic.length + ")" : t("pg.nodata")));
      bars.appendChild(row);
    });
    wrap.appendChild(bars);

    wrap.appendChild(el("h3", "sec", t("pg.tiers")));
    var bars2 = el("div", "bars");
    [1, 2, 3].forEach(function (k) {
      var inT = DATA.filter(function (p) { return p.tier === k; });
      var done = inT.filter(function (p) { return P.scores[p.id] != null; });
      var got = done.reduce(function (a, p) { return a + P.scores[p.id]; }, 0);
      var max = done.length * 7;
      var row = el("div", "bar");
      row.appendChild(el("div", null, t("tier.short." + k)));
      var tr = el("div", "track");
      var fi = el("div", "fill");
      fi.style.width = (max ? Math.round(got / max * 100) : 0) + "%";
      fi.style.background = "var(--accent)";
      tr.appendChild(fi); row.appendChild(tr);
      row.appendChild(el("div", "val", done.length ? got + "/" + max : t("pg.nodata")));
      bars2.appendChild(row);
    });
    wrap.appendChild(bars2);

    wrap.appendChild(el("h3", "sec", t("pg.dist")));
    var counts = [0, 0, 0, 0, 0, 0, 0, 0];
    ids.forEach(function (id) { counts[P.scores[id]]++; });
    var mx = Math.max.apply(null, counts) || 1;
    var dist = el("div", "dist");
    counts.forEach(function (c, i) {
      var col = el("div", "col");
      col.title = c + " · " + t("rub." + i);
      col.appendChild(el("div", "collbl", c ? String(c) : ""));
      var bar = el("div", "colbar");
      bar.style.height = Math.round(c / mx * 70) + "px";
      col.appendChild(bar);
      col.appendChild(el("div", "collbl", String(i)));
      dist.appendChild(col);
    });
    wrap.appendChild(dist);

    var queue = DATA.filter(function (p) { return dueIn(p.id) != null; })
      .sort(function (a, b) { return dueIn(a.id) - dueIn(b.id); });
    var nDue = queue.filter(function (p) { return isDue(p.id); }).length;
    wrap.appendChild(el("h3", "sec", t("pg.queue")));
    wrap.appendChild(el("div", "secnote", queue.length ? t("pg.queue.body") + " " + t("pg.queue.due", { n: nDue }) : t("pg.queue.empty")));
    if (queue.length) {
      var qrow = el("div");
      queue.slice(0, 40).forEach(function (p) {
        var d = dueIn(p.id);
        var pill = el("button", "pill prob" + (d <= 0 ? " weak" : ""));
        pill.appendChild(el("span", "badge " + p.topic, p.topic));
        pill.appendChild(document.createTextNode(p.year + "/" + p.num + " · " + P.scores[p.id] + "/7" + (d > 0 ? " · +" + d + "d" : "")));
        pill.title = locP(p, "title");
        pill.addEventListener("click", function () { openProblem(p.id); });
        qrow.appendChild(pill);
      });
      wrap.appendChild(qrow);
    }

    var days = {};
    P.log.forEach(function (r) { days[r.d] = (days[r.d] || 0) + 1; });
    var dayKeys = Object.keys(days).sort();
    wrap.appendChild(el("h3", "sec", t("pg.activity")));
    wrap.appendChild(el("div", "secnote", dayKeys.length
      ? t("pg.activity.body", { d: dayKeys.length, last: dayKeys[dayKeys.length - 1] })
      : t("pg.activity.empty")));

    wrap.appendChild(el("h3", "sec", t("pg.data")));
    wrap.appendChild(el("div", "secnote", t("pg.data.note")));
    var io = el("div", "io");
    var exp = el("button", "btn", t("pg.export"));
    exp.addEventListener("click", function () {
      var txt = JSON.stringify(P);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(function () { toast(t("pg.copied")); }, function () { showExport(txt); });
      } else showExport(txt);
    });
    var imp = el("button", "btn", t("pg.import"));
    imp.addEventListener("click", function () {
      var ta = el("textarea");
      ta.placeholder = t("pg.import.ph");
      var go = el("button", "btn primary", t("pg.import.go"));
      go.style.marginTop = "8px";
      go.addEventListener("click", function () {
        try {
          var o = JSON.parse(ta.value);
          ["scores", "notes", "hints", "time", "last"].forEach(function (k) { if (o[k]) P[k] = o[k]; });
          if (Array.isArray(o.log)) P.log = o.log;
          if (Array.isArray(o.exams)) P.exams = o.exams;
          save(); renderProgress(); renderList();
          toast(t("pg.import.ok"));
        } catch (e) { toast(t("pg.import.bad")); }
      });
      io.appendChild(ta); io.appendChild(go);
    });
    var clr = el("button", "btn", t("pg.reset"));
    clr.addEventListener("click", function () {
      var ok = el("button", "btn danger", t("pg.reset.confirm"));
      ok.addEventListener("click", function () {
        P.scores = {}; P.notes = {}; P.hints = {}; P.time = {}; P.last = {}; P.log = []; P.exams = [];
        save(); renderProgress(); renderList(); toast(t("pg.reset.done"));
      });
      io.appendChild(ok); clr.disabled = true;
    });
    io.appendChild(exp); io.appendChild(imp); io.appendChild(clr);
    wrap.appendChild(io);
    function showExport(txt) {
      var ta = el("textarea"); ta.value = txt; ta.rows = 4;
      wrap.appendChild(ta); ta.select();
      toast(t("pg.copy.manual"));
    }

    wrap.appendChild(el("h3", "sec", t("pg.keys")));
    var kl = el("div", "kbdlist");
    [["/", "pg.key.search"], ["J / K", "pg.key.nav"], ["H", "pg.key.hint"], ["S", "pg.key.sol"],
     ["T", "pg.key.timer"], ["R", "pg.key.random"], ["0–7", "pg.key.score"]].forEach(function (k) {
      var d = el("div");
      d.innerHTML = "<kbd>" + esc(k[0]) + "</kbd> — " + esc(t(k[1]));
      kl.appendChild(d);
    });
    wrap.appendChild(kl);

    var f = el("footer", "foot");
    f.appendChild(el("div", null, t("pg.foot", { p: DATA.length, t: TECH.length })));
    wrap.appendChild(f);
    v.appendChild(wrap);
  }

  /* ---------------- переключение разделов ---------------- */
  function switchView(name) {
    state.view = name;
    VIEWS.forEach(function (n) {
      $("#view-" + n).hidden = n !== name;
      var b = $("#tab-" + n);
      if (b) b.setAttribute("aria-selected", n === name);
    });
    if (name === "plan") renderPlan();
    if (name === "arsenal") renderArsenal();
    if (name === "progress") renderProgress();
    if (name === "train") renderTrain();
    try { location.hash = name; } catch (e) { }
    window.scrollTo(0, 0);
  }

  /* ---------------- клавиатура ---------------- */
  document.addEventListener("keydown", function (ev) {
    var el0 = ev.target;
    if (el0 && (el0.tagName === "INPUT" || el0.tagName === "TEXTAREA" || el0.tagName === "SELECT")) {
      if (ev.key === "Escape") el0.blur();
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
    } else if (k === "s") { var sb = $("#solBox"); if (sb && sb._open) { ev.preventDefault(); sb._open(); } }
    else if (/^[0-7]$/.test(k) && state.current) { ev.preventDefault(); setScore(state.current, +k); }
  });

  /* ---------------- интерфейс шапки ---------------- */
  function paintChrome() {
    document.documentElement.lang = LANG;
    $("#tagline").textContent = t("brand.tagline", { n: DATA.length });
    VIEWS.forEach(function (n) { $("#tab-" + n).textContent = t("nav." + n); });
    $("#langSel").setAttribute("aria-label", t("lang.tip"));
    $("#langSel").title = t("lang.tip");
    applyTheme();
  }
  function rerenderAll() {
    paintChrome();
    buildFilters();
    renderList();
    renderProblem();
    switchView(state.view);
  }

  function init() {
    var sel = $("#langSel");
    Object.keys(LANGS).forEach(function (code) {
      var op = el("option", null, LANGS[code].name);
      op.value = code;
      if (code === LANG) op.selected = true;
      sel.appendChild(op);
    });
    sel.addEventListener("change", function () {
      LANG = sel.value; P.lang = LANG; save();
      rerenderAll();
    });
    $("#themeBtn").addEventListener("click", cycleTheme);
    VIEWS.forEach(function (n) { $("#tab-" + n).addEventListener("click", function () { switchView(n); }); });
    paintChrome();
    buildFilters();
    renderList();
    renderProblem();
    var h = (location.hash || "").replace("#", "");
    switchView(VIEWS.indexOf(h) >= 0 ? h : (Object.keys(P.scores).length ? "problems" : "plan"));
    $("#boot").hidden = true;
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
