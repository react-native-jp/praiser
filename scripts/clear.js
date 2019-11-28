const { execSync, killPort } = require('shell-utils').exec;

function run() {
  killPort(8081);
  execSync('watchman watch-del-all || true');
  execSync('adb reverse tcp:8081 tcp:8081 || true');
  execSync('rm -rf $TMPDIR/react-native-packager-cache-*');
  execSync('rm -rf $TMPDIR/metro-bundler-cache-*');
  execSync('rm -rf $TMPDIR/haste-map-react-native-packager-*');
  // reset ios simulator
  execSync('killall "Simulator" 2> /dev/null; xcrun simctl erase all');
}

run();
