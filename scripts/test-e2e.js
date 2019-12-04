const { execSync } = require('shell-utils').exec;

const android = process.argv.includes('--android');
const release = process.argv.includes('--release');
const skipBuild = process.argv.includes( '--skipBuild');
const headless = process.argv.includes( '--headless');
const multi = process.argv.includes( '--multi');

console.log({
  release,
  skipBuild
});

function run() {
  const prefix = android ? `android.emu` : `ios.sim`;
  const suffix = release ? `release` : `debug`;
  const configuration = `${prefix}.${suffix}`;
  const headless$ = android ? headless ? `--headless` : `` : ``;
  const workers = multi ? 3 : 1;


  if (!skipBuild) {
    execSync(`detox build --configuration ${configuration}`);
  }
  execSync(`detox test --configuration ${configuration} ${headless$} ${!android ? `-w ${workers}` : ``}`);
}

run();
