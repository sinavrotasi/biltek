import fs from 'node:fs';
const html=fs.readFileSync('src/page.html','utf8');
const engine=fs.readFileSync('dist/engine.js','utf8').replaceAll('export function','function');
const app=fs.readFileSync('dist/app.js','utf8').replace(/^import .*;\n/,'');
const data=JSON.stringify(JSON.parse(fs.readFileSync('dist/questions.json','utf8'))).replaceAll('<','\\u003c');
const script=`(()=>{'use strict';\nconst EMBEDDED_QUESTIONS=${data};\n${engine}\n${app}\n})();`.replaceAll('</script','<\\/script');
const css=fs.readFileSync('dist/style.css','utf8');
fs.writeFileSync('dist/index.html',html.replace('<link rel="stylesheet" href="style.css">',`<style>${css}</style>`).replace('<script type="module" src="app.js"></script>','').replace('</body>',`<script>${script}</script></body>`));
