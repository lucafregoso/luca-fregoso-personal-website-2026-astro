import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'yaml';

const root = process.cwd();
const configPath = resolve(root, 'admin/config.yml');

const fail = (message) => {
  console.error(`CMS check failed: ${message}`);
  process.exitCode = 1;
};

const assert = (condition, message) => {
  if (!condition) fail(message);
};

const readConfig = () => {
  assert(existsSync(configPath), 'admin/config.yml is missing.');

  try {
    return parse(readFileSync(configPath, 'utf8'));
  } catch (error) {
    fail(`admin/config.yml is not valid YAML: ${error.message}`);
    return {};
  }
};

const getCollection = (config, name) =>
  config.collections?.find((collection) => collection.name === name);

const getField = (collection, name) =>
  collection.fields?.find((field) => field.name === name);

const optionValues = (field) => {
  const options = field?.options ?? [];
  return options.map((option) => (typeof option === 'string' ? option : option.value)).sort();
};

const assertOptions = (collection, fieldName, expected) => {
  const field = getField(collection, fieldName);
  assert(field, `${collection.name}.${fieldName} is missing.`);
  const actual = optionValues(field);
  assert(
    JSON.stringify(actual) === JSON.stringify([...expected].sort()),
    `${collection.name}.${fieldName} options are ${actual.join(', ') || 'empty'}, expected ${expected.join(', ')}.`
  );
};

const assertLocalizedObject = (collection, fieldName, required = true) => {
  const field = getField(collection, fieldName);
  assert(field, `${collection.name}.${fieldName} is missing.`);
  assert(field.widget === 'object', `${collection.name}.${fieldName} must be an object widget.`);
  assert(required ? field.required !== false : true, `${collection.name}.${fieldName} must be required.`);

  const localizedNames = (field.fields ?? []).map((child) => child.name).sort();
  assert(
    JSON.stringify(localizedNames) === JSON.stringify(['en', 'it']),
    `${collection.name}.${fieldName} must expose en and it fields.`
  );
};

const assertCollection = (config, name, folder) => {
  const collection = getCollection(config, name);
  assert(collection, `collection "${name}" is missing.`);
  assert(collection.folder === folder, `collection "${name}" points to ${collection.folder}, expected ${folder}.`);
  assert(collection.create === true, `collection "${name}" should allow creating entries.`);
  assert(collection.extension === 'md', `collection "${name}" must write .md files.`);
  assert(collection.format === 'frontmatter', `collection "${name}" must use frontmatter format.`);
  return collection;
};

const assertContentFiles = (collection) => {
  const folder = resolve(root, collection.folder);
  const ids = new Map();
  const files = readdirSync(folder, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name);

  for (const file of files) {
    const id = file.replace(/\.md$/, '');
    const existing = ids.get(id);
    assert(!existing, `${collection.name} has duplicate id "${id}" in ${existing} and ${file}.`);
    ids.set(id, file);

    const mode = statSync(resolve(folder, file)).mode & 0o777;
    assert(
      mode === 0o644 || mode === 0o664,
      `${collection.name}/${file} has unusual permissions ${mode.toString(8)}; expected 644 or 664.`
    );
  }
};

const config = readConfig();

assert(config.backend?.name === 'github', 'backend.name must be github.');
assert(
  config.backend?.repo === 'lucafregoso/luca-fregoso-personal-website-2026-astro',
  'backend.repo must target this repository.'
);
assert(config.backend?.branch === 'develop', 'backend.branch must be develop.');
assert(config.local_backend === true, 'local_backend must stay enabled for local editorial testing.');
assert(config.media_folder === 'public/media', 'media_folder must stay public/media.');
assert(config.public_folder === '/media', 'public_folder must stay /media.');
assert(Array.isArray(config.collections), 'collections must be an array.');

assert(!existsSync(resolve(root, 'public/admin')), 'public/admin exists; CMS must not be public.');
if (existsSync(resolve(root, 'dist'))) {
  assert(!existsSync(resolve(root, 'dist/admin')), 'dist/admin exists; CMS was copied into the static build.');
}

const now = assertCollection(config, 'now', 'src/content/now');
assertContentFiles(now);
assertLocalizedObject(now, 'title');
assertLocalizedObject(now, 'blurb', false);
assertLocalizedObject(now, 'location', false);
assertOptions(now, 'kind', ['speaking', 'writing', 'milestone', 'building', 'note']);
assertOptions(now, 'mediaPresentation', ['contact-sheet', 'lead', 'sidecar']);

const appearances = assertCollection(config, 'appearances', 'src/content/appearances');
assertContentFiles(appearances);
assertLocalizedObject(appearances, 'title');
assertLocalizedObject(appearances, 'summary');
assertOptions(appearances, 'format', ['video', 'live-recording', 'podcast']);
assertOptions(appearances, 'platform', ['youtube', 'spotify']);
assertOptions(appearances, 'role', ['host', 'speaker', 'guest']);
assertOptions(appearances, 'placements', ['lately', 'library']);
assertOptions(appearances, 'mobilePresentation', ['stamp', 'poster', 'text-only']);

const writing = assertCollection(config, 'writing', 'src/content/writing');
assertContentFiles(writing);
assertLocalizedObject(writing, 'title');
assertLocalizedObject(writing, 'summary');

const talks = assertCollection(config, 'talks', 'src/content/talks');
assertContentFiles(talks);
assertLocalizedObject(talks, 'title');
assertLocalizedObject(talks, 'abstract');

if (!process.exitCode) {
  console.log('CMS check passed: Sveltia config matches the content model and is not public.');
}
