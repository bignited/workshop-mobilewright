# Workshop agenda (6 hours)

**Audience:** QA engineers, a mix of manual testers and automation engineers, on mixed laptops (macOS/Windows) and platforms (iOS/Android).
**Format:** about 30% demo/theory and 70% hands-on, working in **pairs** (one manual tester with one automation engineer, one iOS with one Android where possible).
**Goal:** by the end, everyone has written, run and debugged cross-platform mobile tests, and seen how AI agents can drive a phone.

| Time | Block | What happens | Files |
|---|---|---|---|
| 09:00 – 09:30 | **0. Welcome & setup check** (30') | Intro, pairs formed. Everyone runs `npm run test:smoke`. Helpers fix broken setups; pairs with a green setup try to get the smoke test green on the *other* platform too. | `docs/attendee-setup.md` |
| 09:30 – 10:00 | **1. Why Mobilewright?** (30') | Mobile testing pain (Appium setup, flaky waits, XPath). Mobilewright architecture: test → Mobilewright → mobilecli → agent on device. Playwright API on mobile. Auto-waiting and retrying assertions. Live demo: smoke test on iOS and Android side by side. | slides 1–8 |
| 10:00 – 10:45 | **2. Look before you automate: Inspector & Codegen** (45') | *Manual testers lead here.* `npm run inspect`: explore the accessibility tree and find test ids. `npm run codegen`: record taps and get a test. Discussion: what makes a good locator (role / test id / label vs. text vs. coordinates). Why test ids differ per platform → `byTestId()` helper. **Exercise 1** (first test). | `tests/01-*` |
| 10:45 – 11:00 | ☕ Break | | |
| 11:00 – 12:15 | **3. Real test flows** (75') | Fill, tap, `expect` matchers, native dialogs (`waitForEvent` before the action!), keyboard covering buttons, `test.fixme` for known platform issues. Reading the HTML report & `viewTree` on failure. **Exercises 2 & 3** (login, forms). | `tests/02-*`, `tests/03-*` |
| 12:15 – 13:00 | 🍝 Lunch | | |
| 13:00 – 13:45 | **4. Gestures & the device** (45') | Swipe, scroll, drag with `gesture()`. Gotcha: "visible in the tree" ≠ "on screen". Orientation, foreground app, built-in apps (`autoAppLaunch: false`), platform branching. **Exercises 4 & 5**. | `tests/04-*`, `tests/05-*` |
| 13:45 – 14:30 | **5. Test architecture** (45') | *Automation engineers lead here.* Page objects, `test.extend` fixtures, data-driven tests, projects (ios/android), retries, workers, reporters, CI (`doctor --json`, blob reports + `merge-reports`), cloud devices. **Exercise 6**. | `tests/06-*` |
| 14:30 – 14:45 | ☕ Break | | |
| 14:45 – 15:30 | **6. AI agents drive the phone: Mobile MCP** (45') | Install mobile-mcp in Claude Code/Cursor/Copilot. Exploratory testing in plain language. Turning an AI exploration into a Mobilewright test. Limits & risks (non-determinism, data, credentials). **AI exercise**. | `docs/ai-module.md` |
| 15:30 – 16:30 | **7. Challenge hour 🏆** (60') | Pairs pick challenges from the board (points!). Headline: **first pair to send the trainer a Teams message with an automated test wins**. | `challenges/README.md` |
| 16:30 – 17:00 | **8. Wrap-up** (30') | Winners and demo of the best solutions. Mobilewright vs Appium vs Maestro: when to choose what. How to introduce it in your project. Feedback round. | slides (last section) |

## Pacing tips for the trainer

- **Everyone is green on smoke before module 2.** If more than three people are blocked, pair them up and keep going: setup issues are solved during breaks, not in plenary.
- Run **every demo on both platforms**: put the iOS simulator and the Android emulator side by side on the projector.
- After each exercise: 5 minutes of "show & tell" from one pair (alternate manual and automation, iOS and Android).
- **Fast finishers** do the *(stretch)* / *(exploratory)* TODOs of the current module, or help a neighbour. The challenge board is only released at challenge hour, so nobody runs ahead of the group.
- **Behind schedule?** Skip TODO 4.3 (drag) and 6.4 (report); module 6 can shrink to a 15-minute demo.
- Content is released step by step from git branches (see `TRAINER.md`). The solutions of a module arrive with the *next* step, in `solutions/`: `npm run solutions:ios` / `npm run solutions:android`.

## Learning objectives

Manual testers can:
- explore an app's accessibility tree with the Inspector and explain why an element is (not) automatable;
- record a test with Codegen and turn it into a readable test with assertions;
- write a test case for a bug they would otherwise test by hand;
- use an AI agent to explore an app and report findings.

Automation engineers can:
- write cross-platform tests with stable locators (role, test id, label);
- handle dialogs, keyboards, gestures, system apps and platform differences;
- structure a suite with page objects, fixtures and projects, and run it in CI;
- judge where Mobilewright fits next to Appium, Maestro, Espresso and XCUITest.
