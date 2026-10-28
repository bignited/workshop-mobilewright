import { defineConfig } from 'mobilewright';

/**
 * Workshop configuration.
 *
 * One test suite, two projects: every test runs on iOS *and* Android.
 *   npm run test:ios       -> only the iOS project
 *   npm run test:android   -> only the Android project
 *
 * The app under test is the WebdriverIO native demo app (one React Native code base,
 * same screens on both platforms). Download it once with `npm run setup:apps`.
 *
 * Mobilewright does NOT boot devices for you: start a simulator/emulator first.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  viewTree: 'on-failure',

  projects: [
    {
      name: 'ios',
      use: {
        platform: 'ios',
        deviceType: 'simulator',
        bundleId: 'org.wdiodemoapp',
        installApps: './apps/wdio-demo-app-ios-sim.zip',
        animations: 'off',
      },
    },
    {
      name: 'android',
      use: {
        platform: 'android',
        bundleId: 'com.wdiodemoapp',
        installApps: './apps/wdio-demo-app-android.apk',
        animations: 'off',
      },
    },
  ],
});
