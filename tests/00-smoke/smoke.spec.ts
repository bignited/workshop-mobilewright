import { test, expect } from '@mobilewright/test';

// Run this first: `npm run test:smoke -- --project ios` (or android).
// If this is green, your laptop is ready for the workshop.
test('demo app starts and shows the home screen', async ({ screen }) => {
  await expect(screen.getByText('Demo app for the appium-boilerplate')).toBeVisible();
  await expect(screen.getByRole('button', { name: 'Login' })).toBeVisible();
});
