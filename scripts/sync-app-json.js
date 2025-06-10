const fs = require("fs");
const path = require("path");

const appJsonPath = path.join(__dirname, "..", "app.json");
const packageJsonPath = path.join(__dirname, "..", "package.json");

const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const newVersion = packageJson.version;
const [major, minor, patch] = newVersion.split(".").map(Number);

appJson.expo.version = newVersion;
appJson.expo.ios.buildNumber = newVersion;
appJson.expo.android.versionCode = major * 10000 + minor * 100 + patch;

fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));

console.log(`✅ Synced app.json to version ${newVersion}`);
