# RiskLens interaction storyboards (version 0.1)

These are **storyboard descriptions of real prototype states**. The linked screenshots were captured by an automated Chromium browser-state walkthrough using the same HTML, CSS and JavaScript files as the project. They are implementation evidence, **not** participant observations or evidence of increased investment judgement.

## Storyboard A — Notice a mismatch and decline

![Inspectable mismatch state](screenshots/03-mismatch-inspectable.png)

![Decline summary](screenshots/04-decline-summary.png)
1. **User action:** Start simulation → choose the *Cautious* preset → answer through the five questions.
2. **System inference:** Rule-based score 0/10 → *Low risk*; state and source answers shown.
3. **User action:** Continue → set *Different risk categories* → select *Inspectable advice*.
4. **System output:** Fictional *Summit* example (High risk) appears with an explicit Low ↔ High comparison and mismatch feedback.
5. **User action:** Select *Decline*.
6. **System response/control:** Decision summary records the decline; user may reconsider, revise their answers or reset. No money moves.

## Storyboard B — Matching categories but user remains in control

![Aligned advice view](screenshots/05-aligned-inspectable.png)
1. **User action:** Start → choose *Balanced* preset → proceed to profile.
2. **System inference:** 5/10 → *Moderate risk*; evidence list is visible.
3. **User action:** Continue → choose *Matching risk categories* → inspect advice.
4. **System output:** Fictional *Bridge* example (Moderate risk) matches the inferred category; the screen explicitly warns that a match is not a real suitability assessment.
5. **User action:** Select *Accept example*.
6. **System response/control:** Neutral session summary records the fictional acceptance, never a real trade. Reconsider is available.

## Storyboard C — Clarify contradictory preferences

![Clarification required view](screenshots/06-clarification.png)
1. **User action:** Start → choose *Conflicting* preset → proceed through the populated questionnaire.
2. **System inference:** Answers conflict: prefers stability but would tolerate a large drop.
3. **System output:** Preliminary risk label and an explicit *Clarification needed* message; continuing to advice is disabled.
4. **User action:** Select *Review my answers*, change loss tolerance to the cautious option, then complete the questions.
5. **System response/control:** The updated profile is recalculated; when the contradiction clears, the user can continue.

**Boundary:** all portfolios and scoring thresholds are deliberately simplified; no predictive model, financial-data provider, brokerage integration or user study has been implemented.
