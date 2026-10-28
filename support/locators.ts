import type { Screen } from 'mobilewright';

type Platform = 'ios' | 'android' | undefined;

/**
 * Find an element by the demo app's test id on BOTH platforms.
 *
 * React Native exposes `testID` differently per platform. The demo app sets:
 *   iOS     -> testID              -> accessibility identifier -> getByTestId()
 *   Android -> accessibilityLabel  -> content-desc             -> getByLabel()
 * `.or()` lets one locator cover both.
 */
export function byTestId(screen: Screen, id: string) {
  return screen.getByTestId(id).or(screen.getByLabel(id));
}

/** Bottom tab bar of the demo app (Home, Webview, Login, Forms, Swipe, Drag, Menu). */
export function tab(screen: Screen, name: string) {
  return screen.getByRole('button', { name });
}

/**
 * Close the on-screen keyboard so it no longer covers the tab bar.
 *
 * iOS: the key is labelled in the simulator's language ("Done", "Gereed", "Terminé"...),
 * but its identifier is stable. Prefer identifiers over visible text!
 * Android: BACK closes the keyboard.
 */
export async function hideKeyboard(screen: Screen, platform: Platform) {
  if (platform === 'android') {
    await screen.pressButton('BACK');
    return;
  }
  const key = screen.getByTestId('Done').or(screen.getByTestId('Return'));
  if (await key.isVisible()) await key.first().tap();
}
