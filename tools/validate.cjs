/* Проверка данных: KaTeX-разбор всех формул, парность разметки, ссылки, обязательные поля. */
const katex = require('../assets/vendor/katex/katex.min.js');
global.window = {};
['1','2','3','4','5'].forEach(f => require('../data/problems-' + f + '.js'));
require('../data/techniques.js');
['1','2','3','4','5'].forEach(f => { try { require('../data/en/problems-' + f + '.js'); } catch (e) {} });
try { require('../data/en/techniques.js'); } catch (e) {}
['ru','en','uk','es'].forEach(l => { try { require('../data/lang/' + l + '.js'); } catch (e) {} });
try { require('../data/plan.js'); } catch (e) {}
try { require('../data/diagnostic.js'); } catch (e) {}
const DATA = window.IMO_DATA, TECH = window.IMO_TECHNIQUES;
const EN = (window.IMO_L10N && window.IMO_L10N.en) || { problems: {}, tech: {} };
const I18N = window.IMO_I18N || {}, PLAN = window.IMO_PLAN || [];
const DIAG = window.IMO_DIAGNOSTIC || { recognition: [] };

let errors = [], mathCount = 0, texts = 0;

function checkText(where, text) {
  if (text == null) return;
  texts++;
  let i = 0, plain = '';
  while (i < text.length) {
    if (text[i] === '$') {
      const display = text[i + 1] === '$';
      const open = display ? 2 : 1;
      const close = text.indexOf(display ? '$$' : '$', i + open);
      if (close === -1) { errors.push(where + ': незакрытый $' + (display ? '$' : '')); break; }
      const tex = text.slice(i + open, close);
      mathCount++;
      try { katex.renderToString(tex, { displayMode: display, throwOnError: true, strict: false }); }
      catch (e) { errors.push(where + ': KaTeX — ' + e.message.slice(0, 160) + '  [' + tex.slice(0, 70) + ']'); }
      i = close + open;
      continue;
    }
    plain += text[i]; i++;
  }
  const stars = (plain.match(/\*/g) || []).length;
  if (stars % 2 !== 0) errors.push(where + ': нечётное число * вне формул (' + stars + ')');
}

const need = ['id','year','num','topic','tier','title','statement','solution','hints','tags'];
const ids = new Set();
DATA.forEach(p => {
  need.forEach(k => { if (p[k] == null) errors.push(p.id + ': нет поля ' + k); });
  if (ids.has(p.id)) errors.push('дубль id ' + p.id);
  ids.add(p.id);
  if (!'ACGN'.includes(p.topic)) errors.push(p.id + ': неизвестный раздел ' + p.topic);
  if (![1,2,3].includes(p.tier)) errors.push(p.id + ': неизвестный уровень ' + p.tier);
  if (p.num < 1 || p.num > 6) errors.push(p.id + ': номер задачи вне 1..6');
  if (p.id !== p.year + '-' + p.num) errors.push(p.id + ': id не соответствует year-num');
  if ((p.hints || []).length < 1) errors.push(p.id + ': нет подсказок');
  checkText(p.id + '/statement', p.statement);
  checkText(p.id + '/solution', p.solution);
  checkText(p.id + '/answer', p.answer);
  (p.hints || []).forEach((h, i) => checkText(p.id + '/hint' + (i + 1), h));
});
TECH.forEach(t => {
  ['id','topic','name','core','problems'].forEach(k => { if (t[k] == null) errors.push('tech ' + t.id + ': нет поля ' + k); });
  checkText('tech:' + t.id + '/core', t.core);
  checkText('tech:' + t.id + '/pitfall', t.pitfall);
  (t.when || []).forEach((w, i) => checkText('tech:' + t.id + '/when' + i, w));
  (t.problems || []).forEach(pid => { if (!ids.has(pid)) errors.push('tech ' + t.id + ': нет задачи ' + pid); });
});

// --- английские материалы ---
const enFields = ['title','statement','solution','hints'];
Object.keys(EN.problems).forEach(id => {
  const o = EN.problems[id];
  if (!DATA.some(p => p.id === id)) errors.push('en: нет задачи ' + id);
  enFields.forEach(k => { if (o[k] == null) errors.push('en/' + id + ': нет поля ' + k); });
  const base = DATA.filter(p => p.id === id)[0] || {};
  if (base.answer && o.answer == null) errors.push('en/' + id + ': нет ответа, а в оригинале он есть');
  if (base.hints && o.hints && base.hints.length !== o.hints.length) errors.push('en/' + id + ': подсказок ' + o.hints.length + ' вместо ' + base.hints.length);
  checkText('en/' + id + '/statement', o.statement);
  checkText('en/' + id + '/solution', o.solution);
  checkText('en/' + id + '/answer', o.answer);
  (o.hints || []).forEach((h, i) => checkText('en/' + id + '/hint' + (i + 1), h));
});
Object.keys(EN.tech).forEach(id => {
  const o = EN.tech[id];
  if (!TECH.some(x => x.id === id)) errors.push('en tech: нет приёма ' + id);
  if (o.name == null || o.core == null) errors.push('en tech/' + id + ': нет name или core');
  checkText('en tech:' + id + '/core', o.core);
  checkText('en tech:' + id + '/pitfall', o.pitfall);
  (o.when || []).forEach((w, i) => checkText('en tech:' + id + '/when' + i, w));
});
const missingEn = DATA.filter(p => !EN.problems[p.id]).map(p => p.id);
const missingEnT = TECH.filter(x => !EN.tech[x.id]).map(x => x.id);

// --- локализация интерфейса ---
const baseKeys = Object.keys((I18N.ru && I18N.ru.s) || {});
Object.keys(I18N).forEach(l => {
  const miss = baseKeys.filter(k => !I18N[l].s[k]);
  if (miss.length) errors.push('i18n ' + l + ': нет ключей ' + miss.slice(0, 5).join(','));
});

// --- маршрут ---
const inPlan = [];
PLAN.forEach(m => {
  m.problems.forEach(pid => { inPlan.push(pid); if (!ids.has(pid)) errors.push('plan ' + m.id + ': нет задачи ' + pid); });
  m.tech.forEach(tid => { if (!TECH.some(x => x.id === tid)) errors.push('plan ' + m.id + ': нет приёма ' + tid); });
});
inPlan.filter((x, i) => inPlan.indexOf(x) !== i).forEach(x => errors.push('plan: дубль задачи ' + x));
DATA.filter(p => inPlan.indexOf(p.id) < 0).forEach(p => errors.push('plan: задача ' + p.id + ' не входит в маршрут'));

// --- диагностика ---
const techFor = id => TECH.filter(t => (t.problems || []).indexOf(id) >= 0).map(t => t.id);
const diagTopics = {};
DIAG.recognition.forEach(it => {
  const base = DATA.filter(p => p.id === it.problem)[0];
  if (!base) { errors.push('diag: нет задачи ' + it.problem); return; }
  diagTopics[base.topic] = (diagTopics[base.topic] || 0) + 1;
  const my = techFor(it.problem);
  if (my.indexOf(it.correct) < 0) errors.push('diag ' + it.problem + ': верный ответ ' + it.correct + ' не связан с задачей');
  (it.options || []).forEach(o => {
    if (!TECH.some(t => t.id === o)) errors.push('diag ' + it.problem + ': нет приёма ' + o);
    if (my.indexOf(o) >= 0) errors.push('diag ' + it.problem + ': отвлекающий вариант ' + o + ' на самом деле подходит');
  });
  if ((it.options || []).length !== 3) errors.push('diag ' + it.problem + ': должно быть 3 отвлекающих варианта');
  ['ru', 'en'].forEach(l => { if (!it.why || !it.why[l]) errors.push('diag ' + it.problem + ': нет пояснения (' + l + ')'); });
  checkText('diag/' + it.problem + '/why.ru', it.why && it.why.ru);
  checkText('diag/' + it.problem + '/why.en', it.why && it.why.en);
});
Object.keys(diagTopics).forEach(k => {
  if (diagTopics[k] !== DIAG.perTopic) errors.push('diag: в разделе ' + k + ' вопросов ' + diagTopics[k] + ', а ожидается ' + DIAG.perTopic);
});
PLAN.forEach(m => { if (!'ACGN'.includes(m.topic || '')) errors.push('plan ' + m.id + ': не указан раздел'); });

console.log('вопросов диагностики: ' + DIAG.recognition.length + ' | по разделам: ' + JSON.stringify(diagTopics));
console.log('языков интерфейса: ' + Object.keys(I18N).length + ' | модулей маршрута: ' + PLAN.length);
console.log('английских задач: ' + Object.keys(EN.problems).length + '/' + DATA.length +
  (missingEn.length ? ' | нет перевода: ' + missingEn.length : '') +
  ' | английских приёмов: ' + Object.keys(EN.tech).length + '/' + TECH.length);
console.log('задач: ' + DATA.length + ' | техник: ' + TECH.length + ' | текстовых полей: ' + texts + ' | формул: ' + mathCount);
if (errors.length) { console.log('\nОШИБКИ (' + errors.length + '):'); errors.slice(0, 60).forEach(e => console.log(' - ' + e)); process.exit(1); }
console.log('Ошибок нет.');
