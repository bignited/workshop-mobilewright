// Downloads the demo app builds into ./apps. Works on macOS and Windows (Node >= 22).
//   npm run setup:apps            -> both platforms
//   npm run setup:apps -- android -> Android only (Windows laptops)
//   npm run setup:apps -- ios     -> iOS only
import { createWriteStream, existsSync, mkdirSync } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const VERSION = 'v2.2.0';
const BASE = `https://github.com/webdriverio/native-demo-app/releases/download/${VERSION}`;
const APPS = {
  android: { url: `${BASE}/android.wdio.native.app.${VERSION}.apk`, file: 'wdio-demo-app-android.apk' },
  // arm64 simulator build: needs an Apple Silicon Mac.
  ios: { url: `${BASE}/ios.simulator.wdio.native.app.${VERSION}.zip`, file: 'wdio-demo-app-ios-sim.zip' },
};

const appsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'apps');
mkdirSync(appsDir, { recursive: true });

const wanted = process.argv.slice(2);
const platforms = wanted.length ? wanted : Object.keys(APPS);

for (const platform of platforms) {
  const app = APPS[platform];
  if (!app) {
    console.error(`Unknown platform "${platform}". Use: ${Object.keys(APPS).join(', ')}`);
    process.exit(1);
  }
  const target = join(appsDir, app.file);
  if (existsSync(target)) {
    console.log(`✔ ${platform}: already downloaded (${app.file})`);
    continue;
  }
  console.log(`↓ ${platform}: ${app.url}`);
  const res = await fetch(app.url);
  if (!res.ok) throw new Error(`Download failed (${res.status}) for ${app.url}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(target));
  console.log(`✔ ${platform}: saved to apps/${app.file}`);
}
