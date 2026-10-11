/* Проверка данных: KaTeX-разбор всех формул, парность разметки, ссылки, обязательные поля. */
const katex = require('../assets/vendor/katex/katex.min.js');
global.window = {};
['1','2','3','4','5'].forEach(f => require('../data/problems-' + f + '.js'));
require('../data/techniques.js');
const DATA = window.IMO_DATA, TECH = window.IMO_TECHNIQUES;

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

console.log('задач: ' + DATA.length + ' | техник: ' + TECH.length + ' | текстовых полей: ' + texts + ' | формул: ' + mathCount);
if (errors.length) { console.log('\nОШИБКИ (' + errors.length + '):'); errors.slice(0, 60).forEach(e => console.log(' - ' + e)); process.exit(1); }
console.log('Ошибок нет.');
