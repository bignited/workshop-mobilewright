# Mobilewright workshop: mobile test automation for QA engineers

A hands-on workshop on [Mobilewright](https://mobilewright.dev): Playwright-style test automation for iOS and Android apps, on simulators, emulators and real devices.

## Before the workshop: setup

```bash
git clone https://github.com/bignited/workshop-mobilewright.git
cd workshop-mobilewright
npm install
npm run setup:apps            # downloads the demo app (add "-- ios" or "-- android" for one platform)
# boot an iOS simulator and/or an Android emulator, then once per device:
npx mobilewright devices
npx mobilewright install -d <DEVICE-ID>

npm run test:smoke -- --project=ios        # or --project=android
```

Full instructions, including Windows and Android: **[docs/setup.md](docs/Setup.md)**

## Project layout

| Path                     | What                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `tests/`                 | Exercise files with `TODO`s: you work here                                             |
| `solutions/`             | Reference solutions, one module behind (`npm run solutions:ios` / `solutions:android`) |
| `support/`               | Shared helpers: cross-platform locators, app ids                                       |
| `docs/`                  | Setup guide, agenda, and later the cheat sheet, gotchas and AI module                  |
| `mobilewright.config.ts` | Two projects, `ios` and `android`: every test runs on both                             |

## The app under test

The [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app) (v2.2.0): one React Native code base with identical screens on iOS and Android: login/sign-up, forms, swipe, drag & drop, webview, dialogs.
Bundle ids: `org.wdiodemoapp` (iOS), `com.wdiodemoapp` (Android). The iOS simulator build is **arm64-only** (Apple Silicon Macs).

## Useful scripts

| Script                         | Does                                  |
| ------------------------------ | ------------------------------------- |
| `npm run doctor`               | Check the machine's setup             |
| `npm run devices`              | List simulators/emulators/phones      |
| `npm run inspect`              | Live element inspector in the browser |
| `npm run codegen`              | Record taps → test code               |
| `npm run test:ios -- tests/02` | Run one exercise on one platform      |
| `npm run report`               | Open the last HTML report             |
