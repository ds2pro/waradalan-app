const fs = require("fs");
const path = require("path");
const execSync = require("child_process").execSync;

const bump = (version, type) => {
  const [major, minor, patch] = version.split(".").map(Number);
  if (type === "major") return `${major + 1}.0.0`;
  if (type === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
};

const getBumpType = () => {
  const msg = execSync("git log -1 --pretty=%B").toString().toLowerCase();
  if (msg.includes("major")) return "major";
  if (msg.includes("minor")) return "minor";
  return "patch";
};

const type = getBumpType();

const pkgPath = path.resolve("package.json");
const appPath = path.resolve("app.json");

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const app = JSON.parse(fs.readFileSync(appPath, "utf8"));

const newVersion = bump(pkg.version, type);
const newVersionCode = (app.expo.android.versionCode || 1) + 1;

pkg.version = newVersion;
app.expo.version = newVersion;
app.expo.ios.buildNumber = newVersion;
app.expo.android.versionCode = newVersionCode;

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
fs.writeFileSync(appPath, JSON.stringify(app, null, 2));

console.log(`✅ Bumped to ${newVersion} (${type})`);
