# Development record — evidence journal

This record distinguishes the initial AI-assisted construction, subsequent student manual checks and the scenario-selector iteration. Recorded developer checks are not participant-study evidence.

## Initial assisted implementation — version 0.1 (historical baseline)

- **Decision:** Use plain HTML/CSS/ES modules instead of an LLM and backend. **Reason:** A2 permits prototypes and simulated behaviour, and the A1 problem concerns how advice and mismatch evidence are presented. **Trade-off:** no open-ended dialogue or genuine portfolio suitability determination.
- **Decision:** Use a deterministic 5-item questionnaire with published example thresholds. **Reason:** readers can inspect the inference, reproduce scenarios and identify uncertain states. **Trade-off:** teaching thresholds are not validated financial rules.
- **Decision:** Keep recommendation content identical across standard/inspectable modes. **Reason:** illustrates the variable of interest while limiting confounds. **Trade-off:** the tool is an interaction demonstration, not a controlled user experiment.
- **Decision:** Include contradictory-input clarification and reversible accept/decline actions. **Reason:** user correction and recovery are central module concepts.
- **Checks performed:** `npm test` completed in the coding environment; all 11 unit tests passed. A headless Chromium browser-state walkthrough passed for both recommendation conditions and conflicting-input correction; screenshots were captured and a mobile overflow check passed. These were automated developer checks. Subsequent manual scenario checks are recorded below; a separate manual keyboard/accessibility or mobile review is not documented.
- **AI assistance:** ChatGPT generated initial application files, test cases and documentation from the A1 problem and A2 criteria. Later student review, design changes and publication are recorded below rather than attributed to this initial session.

## Subsequent changes

| Date            | Decision/change                                                                                 | Evidence/check                                                                           | Commit                                                    |
| --------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| 9 November 2026 | Ran RiskLens locally and tested matching, mismatching and contradictory-input scenarios         | Manual browser testing; acceptance, rejection, warning and correction behaviour observed | `d5dc36e` (initial baseline; testing occurred afterwards) |
| 9 November 2026 | Improved scenario selection after discovering that matching/mismatching controls were confusing | Codex reported 12 passing tests; six main interface checks completed manually            | `613ff7b`                                                 |

## Iteration 2 — Improving scenario selection

### Problem identified

During manual testing of RiskLens, the distinction between matching and mismatching risk scenarios was not immediately obvious. When attempting to test the aligned recommendation, I repeatedly selected the mismatched portfolio instead. The small controls in the right-hand panel were easy to overlook. The revision strengthens their hierarchy while keeping simulation controls separate from the adviser conversation.

### Design decision

I decided to make scenario selection more explicit rather than change the underlying recommendation logic. The revised interface uses descriptive radio-card labels showing the scenario type, fictional portfolio and risk category. It also provides clearer selection feedback and keyboard focus handling.

This addresses the visibility of available actions and Norman's gulf of execution: users should be able to recognise the action they need to perform without searching or guessing.

### Implementation

- Updated `src/app.js` with clearer scenario controls and focus restoration.
- Updated `styles.css` to strengthen selected/focus states and improve responsive layout.
- Added `tests/app.test.mjs` to cover scenario selection, labels, focus handling and separation of advice modes.

The questionnaire scoring, fictional portfolio definitions and decision logic were preserved.

### Verification

- Codex reported 12 automated tests passed, with 0 failures.
- Codex reported that `git diff --check` passed.
- I manually completed six principal interface checks covering scenario labels, matching/mismatching portfolio selection, visible selection feedback, mode switching and preservation of the standard advice presentation.
- These checks do not establish separate manual keyboard or mobile testing. The automated interface test uses a DOM stub to check focus calls; it does not exercise native keyboard navigation in a browser.

### Reflection

The initial implementation supported both scenarios, but the interface did not make their selection sufficiently discoverable. This iteration showed that functional correctness does not guarantee usability. Clearer controls reduce the effort required to understand and operate the prototype.

### AI assistance

I used OpenAI Codex in VS Code to inspect the repository, implement the interface improvements and add regression tests based on my instructions. I reviewed the reported changes and manually verified the main interaction behaviours before committing.

## Documentation review for A2 — 9 November 2026

- Local Git history confirms initial commit [d5dc36e](https://github.com/almarej/risklens-robo-adviser/commit/d5dc36e) and usability improvement commit [613ff7b](https://github.com/almarej/risklens-robo-adviser/commit/613ff7b). The configured remote matches the public repository URL supplied by the student: https://github.com/almarej/risklens-robo-adviser.
- Codex assisted with documentation maintenance: updated publication and testing status, retained the v0.1 screenshot provenance, and aligned the architecture formats with the current implementation. The SVG was rebuilt directly using a local Python layout, not rendered from DOT with Graphviz (unavailable locally).
- No application logic, tests or screenshots were changed. Documentation checks cover local relative-link targets, diagram structure/status consistency, SVG XML parsing and whitespace. No new browser walkthrough or participant study was performed for this documentation update.
