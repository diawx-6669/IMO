/* Собирает один самодостаточный HTML для публикации артефактом:
   - весь CSS и JS встроены;
   - шрифты KaTeX встроены как data: URI (внешние файлы шрифтов в артефактах блокируются);
   - сам KaTeX подключается с cdnjs (разрешённый источник скриптов);
   - нет <!doctype>/<html>/<head>/<body> — их добавляет платформа артефактов. */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

/* KaTeX CSS: заменяем ссылки на шрифты на data: URI (только woff2) */
let kcss = read('assets/vendor/katex/katex.min.css');
let embedded = 0;
kcss = kcss.replace(/src:[^;}]*?url\(fonts\/([A-Za-z0-9_\-]+)\.woff2\)[^;}]*/g, (m, name) => {
  const b64 = fs.readFileSync(path.join(ROOT, 'assets/vendor/katex/fonts', name + '.woff2')).toString('base64');
  embedded++;
  return 'src:url(data:font/woff2;base64,' + b64 + ') format("woff2")';
});

const appcss = read('assets/app.css');
const data = [
  'data/lang/ru.js','data/lang/en.js','data/lang/uk.js','data/lang/es.js',
  'data/problems-1.js','data/problems-2.js','data/problems-3.js','data/problems-4.js','data/problems-5.js',
  'data/techniques.js','data/plan.js',
  'data/en/problems-1.js','data/en/problems-2.js','data/en/problems-3.js','data/en/problems-4.js','data/en/problems-5.js',
  'data/en/techniques.js'
].map(read).join('\n');
const app = read('assets/app.js');

/* разметка: берём тело index.html без <script src> и без <link> */
const html = read('index.html');
let body = html.slice(html.indexOf('<body>') + 6, html.indexOf('</body>'));
body = body.replace(/<script src="[^"]*"><\/script>\s*/g, '').trim();

const out = `<title>IMO Workbench</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600&family=Literata:opsz,wght@7..72,400;7..72,600&display=swap">
<style>
/* KaTeX 0.16.9 — MIT, шрифты встроены как data: URI */
${kcss}
</style>
<style>
${appcss}
</style>
${body}
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"></script>
<script>
${data}
</script>
<script>
${app}
</script>
`;
fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'dist/imo-workbench.html'), out);
console.log('шрифтов встроено: ' + embedded);
console.log('dist/imo-workbench.html — ' + (Buffer.byteLength(out) / 1024).toFixed(0) + ' КБ');
