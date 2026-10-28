# Setup guide

**Please complete this before the workshop.** It takes 30–90 minutes, mostly downloads.
The setup is done when `npm run test:smoke` is green on at least one platform.

| Your laptop                    | You can test                               | Pick                        |
| ------------------------------ | ------------------------------------------ | --------------------------- |
| Mac with Apple Silicon (M1–M5) | iOS **and** Android                        | iOS track, Android optional |
| Mac with Intel CPU             | Android (the iOS demo build is arm64-only) | Android track               |
| Windows 11                     | Android                                    | Android track               |

> Only have time for one platform? Do **one** fully rather than two halfway. We pair Mac and Windows users during the workshop.

---

## 1. Common (everyone)

1. **Node.js 22.12 or newer**
   - macOS: `brew install node@22` (or download the LTS from <https://nodejs.org>)
   - Windows (PowerShell): `winget install OpenJS.NodeJS.LTS`
   - Check: `node -v` → `v22.12.0` or higher
2. **Git**: `brew install git` / `winget install Git.Git`
3. **An editor**: VS Code recommended (<https://code.visualstudio.com>)
4. **Get the workshop project and install it**
   ```bash
   git clone https://github.com/bignited/workshop-mobilewright.git
   cd workshop-mobilewright
   npm install
   ```

---

## 2a. iOS (macOS only)

1. Install **Xcode** from the App Store (≈ 10 GB) and open it once to accept the license and install components.
2. `xcode-select --install` (Command Line Tools)
3. Xcode → Settings → Components: install an **iOS Simulator runtime**.
4. Boot a simulator: `open -a Simulator`, then pick an iPhone in _File → Open Simulator_.
5. Install the Mobilewright agent on that simulator (one time per simulator):
   ```bash
   npx mobilewright devices                  # copy the ID of your booted iPhone
   npx mobilewright install -d <DEVICE-ID>
   ```
6. Download the demo app: `npm run setup:apps -- ios`

## 2b. Android (macOS and Windows)

1. Install **Android Studio**: <https://developer.android.com/studio>
   - Windows: `winget install Google.AndroidStudio`
2. Android Studio → _More actions → SDK Manager_: make sure an **Android SDK Platform**, **SDK Platform-Tools**, **Build-Tools** and the **Android Emulator** are installed.
3. **JDK 17**: Android Studio ships one. If `doctor` complains, on Windows run `winget install Microsoft.OpenJDK.17`.
4. **Environment variables**
   - macOS (`~/.zshrc`):
     ```bash
     export ANDROID_HOME="$HOME/Library/Android/sdk"
     export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
     ```
   - Windows (PowerShell **as admin**, then open a new terminal):
     ```powershell
     [Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "Machine")
     $p = [Environment]::GetEnvironmentVariable("Path", "Machine")
     [Environment]::SetEnvironmentVariable("Path", "$p;$env:LOCALAPPDATA\Android\Sdk\platform-tools;$env:LOCALAPPDATA\Android\Sdk\emulator", "Machine")
     ```
5. **Windows only: hardware acceleration.** _Turn Windows features on or off_ → enable **Windows Hypervisor Platform** → reboot.
6. Create an emulator: Android Studio → _Device Manager_ → **+** → _Pixel 8_ → a recent system image **with Google Play** (needed for the Teams challenge) → Finish → ▶ start it.
7. Install the Mobilewright agent on the emulator (one time):
   ```bash
   npx mobilewright devices
   npx mobilewright install -d <DEVICE-ID>
   ```
8. Download the demo app: `npm run setup:apps -- android`

---

## 3. Verify

```bash
npx mobilewright doctor                 # all green for the platform(s) you chose?
npx mobilewright devices                # your simulator / emulator is "online"?
npm run test:smoke -- --project=ios      # or --project=android
```

Expected:

```
✓  1 [ios] › tests/00-smoke/smoke.spec.ts › demo app starts and shows the home screen
1 passed
```

🎉 You're ready. Bring your laptop charger, and your phone with its USB cable (for the challenges).

---

## Optional: real phone and AI module

- **Android phone:** enable _Developer options → USB debugging_, connect, accept the prompt, and check `adb devices`.
- **iPhone:** needs a signed agent (`npx mobilewright install --provisioning-profile ...`). We'll help on the day; don't worry if this doesn't work.
- **AI module:** have Claude Code, Cursor or VS Code with Copilot installed and logged in. See [ai-module.md](ai-module.md).

---

## Troubleshooting

| Symptom                                                  | Fix                                                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `Agent is not installed on the device`                   | `npx mobilewright install -d <DEVICE-ID>`                                                   |
| `No device found` / empty `devices` list                 | Mobilewright does **not** boot devices: start the simulator/emulator first                  |
| `iOS simulator requires a .zip of the .app bundle`       | Use the `.zip` from `npm run setup:apps`; don't unzip it                                    |
| App installs but won't open on the simulator (Intel Mac) | The demo build is arm64-only: use the Android track                                         |
| `WebSocket connection closed (code=1006)`                | Transient. Re-run the test. If it keeps happening, restart the simulator/emulator           |
| `Project(s) "tests/..." not found`                       | Write `--project=ios` (with `=`): `--project ios tests/x` treats the path as a project name |
| `ANDROID_HOME` not found (Windows)                       | Close **all** terminals and VS Code after setting variables, then reopen                    |
| `Unsupported platform: win32-x64`                        | `npm install mobilewright@latest`                                                           |
| Emulator is extremely slow (Windows)                     | Enable Windows Hypervisor Platform; add Defender exclusions for the SDK folder              |
| Locale differs (e.g. Dutch keyboard)                     | Fine: our tests use test ids, not visible text, wherever text is localized                  |
