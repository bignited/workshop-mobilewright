import { defineConfig } from 'mobilewright';
import base from './mobilewright.config.ts';

/** Same setup as the workshop config, but runs the reference solutions. */
export default defineConfig({
  ...base,
  testDir: './solutions',
});
