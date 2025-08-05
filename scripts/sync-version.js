const fs = require("fs");

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const appJsonPath = "./app.json";
const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));

const newVersion = packageJson.version;

if (!appJson.expo) {
  console.error("❌ expo config not found in app.json");
  process.exit(1);
}

// Sync version
appJson.expo.version = newVersion;

// Sync iOS build number
if (appJson.expo.ios) {
  appJson.expo.ios.buildNumber = newVersion;
}

// Increment Android versionCode
if (appJson.expo.android) {
  const currentVersionCode = appJson.expo.android.versionCode || 1;
  appJson.expo.android.versionCode = currentVersionCode + 1;
}

fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
console.log(`✅ Synced app.json:
  - version: ${newVersion}
  - ios.buildNumber: ${newVersion}
  - android.versionCode: ${appJson.expo.android.versionCode}`);
