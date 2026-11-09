# Development record — evidence journal

This record contains **confirmed work performed in the initial AI-assisted construction session**. It is not a fabricated student diary. Add actual later design decisions, manual checks and commit links as you perform them.

## Initial assisted implementation — version 0.1 (current session)
- **Decision:** Use plain HTML/CSS/ES modules instead of an LLM and backend. **Reason:** A2 permits prototypes and simulated behaviour, and the A1 problem concerns how advice and mismatch evidence are presented. **Trade-off:** no open-ended dialogue or genuine portfolio suitability determination.
- **Decision:** Use a deterministic 5-item questionnaire with published example thresholds. **Reason:** readers can inspect the inference, reproduce scenarios and identify uncertain states. **Trade-off:** teaching thresholds are not validated financial rules.
- **Decision:** Keep recommendation content identical across standard/inspectable modes. **Reason:** illustrates the variable of interest while limiting confounds. **Trade-off:** the tool is an interaction demonstration, not a controlled user experiment.
- **Decision:** Include contradictory-input clarification and reversible accept/decline actions. **Reason:** user correction and recovery are central module concepts.
- **Checks performed:** `npm test` completed in the coding environment; all 11 unit tests passed. A headless Chromium browser-state walkthrough passed for both recommendation conditions and conflicting-input correction; screenshots were captured and a mobile overflow check passed. The student still needs to conduct a manual accessibility/usability review.
- **AI assistance:** ChatGPT generated initial application files, test cases and documentation from the A1 problem and A2 criteria. User review, local inspection, design changes and publication status are not claimed until performed.

## Subsequent changes (fill only when completed)
| Date | Decision/change | Evidence/check | Commit |
|---|---|---|---|
| Pending | Student runs prototype and reviews UX | Not yet done | Not yet created |
