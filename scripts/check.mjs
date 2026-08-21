import { readFile } from 'node:fs/promises';
const html = await readFile('index.html', 'utf8');
const css = await readFile('styles.css', 'utf8');
const required = ['<title>', '<meta name="description"', '<main', '<h1', 'id="curriculum"', 'id="research"'];
const missing = required.filter((item) => !html.includes(item));
if (missing.length) throw new Error(`Missing: ${missing.join(', ')}`);
if (!css.includes('@media')) throw new Error('Responsive styles missing');
console.log('Semantic and responsive checks passed.');
