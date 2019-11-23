const cp = require('child_process');
const WHITESPACE_REGEX = /\s+/g;

function normalizeSpace(str) {
  if (typeof str !== 'string') {
    return '';
  }
  return str.trim().replace(WHITESPACE_REGEX, ' ')

}

function execSync(command, silent = false) {
  const normalized = normalizeSpace(command);
  if (!silent) console.log(normalized);
  const io = silent ? 'ignore' : 'inherit';
  cp.execSync(normalized, { stdio: [io, io, io] });
}

module.exports = {
  execSync,
};
