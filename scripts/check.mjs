import { readFile } from 'node:fs/promises';

const [root, map, flow, mapCss, flowCss] = await Promise.all([
  readFile('index.html', 'utf8'),
  readFile('curriculum-map.html', 'utf8'),
  readFile('curriculum-flow.html', 'utf8'),
  readFile('curriculum-map.css', 'utf8'),
  readFile('curriculum-flow.css', 'utf8'),
]);

if (!root.includes('curriculum-flow.html')) throw new Error('Root must direct visitors to the curriculum flow.');
for (const [name, html] of [['map', map], ['flow', flow]]) {
  const required = ['<title>', '<main', '<h1'];
  const missing = required.filter((item) => !html.includes(item));
  if (missing.length) throw new Error(`${name} missing: ${missing.join(', ')}`);
}
if (!mapCss.includes('@media') || !flowCss.includes('@media')) throw new Error('Responsive styles missing.');
console.log('Curriculum map checks passed.');
