import { cp, mkdir, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const file of [
  'index.html',
  'curriculum-map.html',
  'curriculum-map.css',
  'curriculum-map.js',
  'curriculum-flow.html',
  'curriculum-flow.css',
  'curriculum-flow.js',
  'technology-icons.css',
  'technology-icons.js',
]) await cp(file, `dist/${file}`);
console.log('Built curriculum maps to dist/');
