# Development record — evidence journal

This record contains **confirmed work performed in the initial AI-assisted construction session**. It is not a fabricated student diary. Add actual later design decisions, manual checks and commit links as you perform them.

## Initial assisted implementation — version 0.1 (current session)

- **Decision:** Use plain HTML/CSS/ES modules instead of an LLM and backend. **Reason:** A2 permits prototypes and simulated behaviour, and the A1 problem concerns how advice and mismatch evidence are presented. **Trade-off:** no open-ended dialogue or genuine portfolio suitability determination.
- **Decision:** Use a deterministic 5-item questionnaire with published example thresholds. **Reason:** readers can inspect the inference, reproduce scenarios and identify uncertain states. **Trade-off:** teaching thresholds are not validated financial rules.
- **Decision:** Keep recommendation content identical across standard/inspectable modes. **Reason:** illustrates the variable of interest while limiting confounds. **Trade-off:** the tool is an interaction demonstration, not a controlled user experiment.
- **Decision:** Include contradictory-input clarification and reversible accept/decline actions. **Reason:** user correction and recovery are central module concepts.
- **Checks performed:** `npm test` completed in the coding environment; all 11 unit tests passed. A headless Chromium browser-state walkthrough passed for both recommendation conditions and conflicting-input correction; screenshots were captured and a mobile overflow check passed. The student still needs to conduct a manual accessibility/usability review.
- **AI assistance:** ChatGPT generated initial application files, test cases and documentation from the A1 problem and A2 criteria. User review, local inspection, design changes and publication status are not claimed until performed.

## Subsequent changes

| Date            | Decision/change                                                                                 | Evidence/check                                                                           | Commit                                                    |
| --------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| 9 November 2026 | Ran RiskLens locally and tested matching, mismatching and contradictory-input scenarios         | Manual browser testing; acceptance, rejection, warning and correction behaviour observed | `d5dc36e` (initial baseline; testing occurred afterwards) |
| 9 November 2026 | Improved scenario selection after discovering that matching/mismatching controls were confusing | Codex reported 12 passing tests; six main interface checks completed manually            | Add second commit hash after committing                   |

## Iteration 2 — Improving scenario selection

### Problem identified

During manual testing of RiskLens, the distinction between matching and mismatching risk scenarios was not immediately obvious. When attempting to test the aligned recommendation, I repeatedly selected the mismatched portfolio instead. The scenario controls were also visually separated from the main recommendation, making them easy to overlook.

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
- I manually completed six checks covering scenario labels, matching/mismatching portfolio selection, visible selection feedback, mode switching and preservation of the standard advice presentation.

### Reflection

The initial implementation supported both scenarios, but the interface did not make their selection sufficiently discoverable. This iteration showed that functional correctness does not guarantee usability. Clearer controls reduce the effort required to understand and operate the prototype.

### AI assistance

I used OpenAI Codex in VS Code to inspect the repository, implement the interface improvements and add regression tests based on my instructions. I reviewed the reported changes and manually verified the main interaction behaviours before committing.
