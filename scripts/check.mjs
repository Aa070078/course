import { readFile } from 'node:fs/promises';

const [root, map, flow, roadmap, mapCss, flowCss, roadmapCss, sessionMap] = await Promise.all([
  readFile('index.html', 'utf8'),
  readFile('curriculum-map.html', 'utf8'),
  readFile('curriculum-flow.html', 'utf8'),
  readFile('engineering-roadmap.html', 'utf8'),
  readFile('curriculum-map.css', 'utf8'),
  readFile('curriculum-flow.css', 'utf8'),
  readFile('engineering-roadmap.css', 'utf8'),
  readFile('engineering-roadmap-session-map.js', 'utf8'),
]);

if (!root.includes('engineering-roadmap.html')) throw new Error('Root must direct visitors to the engineering roadmap.');
for (const [name, html] of [['map', map], ['flow', flow], ['roadmap', roadmap]]) {
  const required = ['<title>', '<main', '<h1'];
  const missing = required.filter((item) => !html.includes(item));
  if (missing.length) throw new Error(`${name} missing: ${missing.join(', ')}`);
}
if (!mapCss.includes('@media') || !flowCss.includes('@media') || !roadmapCss.includes('@media')) throw new Error('Responsive styles missing.');
if (!sessionMap.includes('Team Integration') || !sessionMap.includes('project-node')) throw new Error('Session project map content missing.');
console.log('Curriculum map checks passed.');
