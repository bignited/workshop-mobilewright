/**
 * Bundle ids (iOS) / package names (Android) of apps used in the workshop.
 *
 * Built-in apps differ per platform and sometimes per emulator image:
 * run `npx mobilewright inspect` or `adb shell pm list packages` to check yours.
 */
export const APPS = {
  demo: { ios: 'org.wdiodemoapp', android: 'com.wdiodemoapp' },
  settings: { ios: 'com.apple.Preferences', android: 'com.android.settings' },
  browser: { ios: 'com.apple.mobilesafari', android: 'com.android.chrome' },
  contacts: { ios: 'com.apple.MobileAddressBook', android: 'com.google.android.contacts' },
  teams: { ios: 'com.microsoft.skype.teams', android: 'com.microsoft.teams' },
} as const;

export type AppName = keyof typeof APPS;

export function appId(name: AppName, platform: 'ios' | 'android' | undefined): string {
  return APPS[name][platform ?? 'ios'];
}
