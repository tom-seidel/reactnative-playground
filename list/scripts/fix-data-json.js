#!/usr/bin/env node
/**
 * Fixes a malformed JSON array file where objects are missing commas
 * between them and/or the closing bracket is missing.
 *
 * Usage: node fix-data-json.js [path-to-json]
 */

const fs = require('fs');
const path = require('path');

function exitWith(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

function main() {
  const inputPath = process.argv[2] || path.join(__dirname, '..', 'data.json');
  const absPath = path.resolve(inputPath);

  if (!fs.existsSync(absPath)) {
    exitWith(`File not found: ${absPath}`);
  }

  const original = fs.readFileSync(absPath, 'utf8');
  const trimmed = original.trim();

  if (!trimmed.startsWith('[')) {
    exitWith('Expected a JSON array starting with [ at the beginning of the file.');
  }

  let fixed = original;

  // 1) Ensure commas between adjacent objects inside the array: `}{` => `},\n{`
  fixed = fixed.replace(/\}\s*\{/g, '},\n{');

  // 2) Ensure there is a closing bracket at the end
  const fixedTrimmed = fixed.trimEnd();
  if (!fixedTrimmed.endsWith(']')) {
    fixed = fixedTrimmed + '\n]';
  }

  // 3) Validate JSON and pretty-print it
  let parsed;
  try {
    parsed = JSON.parse(fixed);
  } catch (e) {
    console.error('Failed to parse after attempted fix. Showing a small excerpt around the error if possible.');
    console.error(e.message);
    exitWith('JSON is still invalid after fix attempt.');
  }

  // 4) Backup and write output
  const backupPath = absPath + '.bak';
  if (!fs.existsSync(backupPath)) {
    fs.writeFileSync(backupPath, original, 'utf8');
    console.log(`Backup written: ${backupPath}`);
  } else {
    console.log(`Backup already exists: ${backupPath}`);
  }

  const pretty = JSON.stringify(parsed, null, 2) + '\n';
  fs.writeFileSync(absPath, pretty, 'utf8');
  console.log(`Fixed and formatted JSON written to: ${absPath}`);
  console.log(`Objects in array: ${Array.isArray(parsed) ? parsed.length : 'N/A'}`);
}

main();
