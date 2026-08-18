/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

// Use the Chromium Headless Shell that's pre-installed in this environment
// instead of letting Remotion download its own (network egress to
// remotion.media is blocked here).
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
if (process.env.REMOTION_CHROME_MODE) {
  Config.setChromeMode(process.env.REMOTION_CHROME_MODE as "chrome-for-testing" | "headless-shell");
}

// This sandbox's outbound HTTPS goes through a proxy with its own CA, which
// Chromium doesn't trust by default — needed so Google Fonts can load.
if (process.env.REMOTION_IGNORE_CERT_ERRORS) {
  Config.setChromiumIgnoreCertificateErrors(true);
}
