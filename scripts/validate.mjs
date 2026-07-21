import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const requiredFiles = [
  'index.html', '.nojekyll', 'favicon.svg', 'site.webmanifest', 'robots.txt', '404.html',
  'README.md', 'LICENSE', 'CITATION.cff', 'CONTRIBUTING.md', 'SECURITY.md',
  '.github/workflows/ci.yml', '.github/workflows/pages.yml'
];

const errors = [];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Missing required file: ${file}`);
}

const htmlPath = path.join(root, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

for (const needle of [
  '<title>Gel Profile Studio',
  'site.webmanifest',
  'favicon.svg',
  'https://matteobroketa.github.io/Gel-Profile-Studio/',
  'id="gelCanvas"',
  'id="overlayCanvas"',
  'id="profileList"',
  'id="ladderMode"',
  'id="exportBtn"',
  'Export profile CSV',
  'Save project JSON',
  'calibrateFromLadder',
  'cdn.jsdelivr.net/npm/utif@3.1.0/UTIF.min.js'
]) {
  if (!html.includes(needle)) errors.push(`index.html missing expected content: ${needle}`);
}

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]);
const duplicates = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
if (duplicates.length) errors.push(`Duplicate DOM id(s): ${duplicates.join(', ')}`);

const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]).filter(Boolean);
if (!scripts.length) errors.push('No inline JavaScript found.');
for (const [i, script] of scripts.entries()) {
  try {
    new vm.Script(script, { filename: `index-inline-${i + 1}.js` });
  } catch (error) {
    errors.push(`Inline JavaScript syntax error: ${error.message}`);
  }
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'site.webmanifest'), 'utf8'));
if (manifest.start_url !== './' || manifest.scope !== './') errors.push('site.webmanifest must use project-relative start_url and scope.');

const pages = fs.readFileSync(path.join(root, '.github/workflows/pages.yml'), 'utf8');
for (const file of ['index.html', 'favicon.svg', 'site.webmanifest', 'robots.txt', '404.html', '.nojekyll']) {
  if (!pages.includes(file)) errors.push(`Pages workflow does not stage ${file}`);
}

if (errors.length) {
  console.error(`Validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validation passed. ${ids.length} DOM IDs checked; ${scripts.length} inline script block(s) parsed.`);
