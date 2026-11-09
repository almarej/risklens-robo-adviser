# RiskLens — Explainable Conversational Robo-Adviser Simulator

**README prose word count: 610 (excluding headings, fenced code/commands and this declaration; link labels included, destinations excluded; Unicode words with internal hyphens/apostrophes counted as one).**

> **Educational prototype only.** All profiles, portfolios, recommendations and thresholds are fictional. The application does not offer personal financial advice, connect to markets or perform trades.

## Research question

Does an inspectable risk-profile comparison help beginners distinguish matching from mismatching risk-category recommendations in a simulated conversational robo-adviser? This is the design question motivating the project, **not a claim established by user testing**.

## Current status (after iteration 2)

**Implemented:** five-question interface, deterministic risk inference, contradiction detection and correction, risk-profile display, standard and inspectable advice modes, matching/mismatching comparisons, explanation, accept/decline/reconsider, and browser-session history. The implemented scenario selector now uses descriptive radio cards naming each fictional portfolio and risk category, with selected-state feedback and focus restoration. It remains separate from the adviser conversation.

**Simulated:** fictional portfolio choices and fixed conversational turns. The category match is a teaching device, not a real suitability assessment. Presets enable repeatable walkthroughs.

**Planned, not implemented:** independent usability evaluation, richer clarification turns and optional LLM comparison. No API, authentication, backend or financial-data integration exists.

## Technology

Vanilla **HTML/CSS/JavaScript** with ES modules; Node.js built-in test runner for unit tests. Inference and comparison are rule-based in `src/model.js`; interface and session state are in `src/app.js`. No API keys or third-party dependencies are required. The optional Google Fonts import can be omitted offline.

## Run and test

Start any local static web server from the project root:

```bash
python3 -m http.server 8000
```

Then visit **http://localhost:8000**. On Windows, `python -m http.server 8000` may be needed.

Run automated model and interface regression tests (Node.js 18+):

```bash
npm test
```

## Replay the three scenarios

1. **Mismatch:** Start → Cautious preset → advance through questions → Continue → Inspectable advice → Different risk categories → Decline.
2. **Aligned:** Start → Balanced preset → advance → Continue → Matching risk categories → Inspectable advice → Accept example.
3. **Clarification:** Start → Conflicting preset → advance → Review answers → change loss-tolerance choice → complete questionnaire again.

## Architecture and interactions

- [`docs/architecture.svg`](docs/architecture.svg): architecture diagram (equivalent Graphviz source: [`architecture.dot`](docs/architecture.dot), plus [`architecture.mmd`](docs/architecture.mmd)).
- [`docs/storyboards.md`](docs/storyboards.md): three example journeys. Existing screenshots were captured in headless Chromium from v0.1, before the scenario-selector update; they do not show the revised radio cards.
- Screenshots: [welcome](docs/screenshots/01-welcome.png), [profile](docs/screenshots/02-profile.png), [mismatch inspection](docs/screenshots/03-mismatch-inspectable.png), [decline feedback](docs/screenshots/04-decline-summary.png), [aligned example](docs/screenshots/05-aligned-inspectable.png), [clarification](docs/screenshots/06-clarification.png), [mobile](docs/screenshots/07-mobile-welcome.png).
- [`docs/development-record.md`](docs/development-record.md): design decisions, recorded checks and commit references. The SVG was rebuilt directly as SVG during documentation maintenance; it was not rendered with Graphviz.

## Development record and authorship

**AI assistance:** ChatGPT generated the initial application, tests and documentation from an approved brief. The student ran local manual scenario checks, identified confusing scenario selection, directed the Codex-assisted improvement and reviewed the main behaviours before committing. See the development record for attribution and evidence limits.

**Manual checks:** Matching, mismatching and contradictory-input journeys were exercised, including acceptance, rejection, warning and correction behaviour. After the selector update, the six principal interface checks were completed manually, covering labels, scenario/portfolio selection, selection feedback, mode switching and preservation of Standard advice. These are developer walkthroughs, not participant-study findings. Separate manual keyboard or mobile checks are not documented.

**Automated checks:** Initial construction recorded 11 passing model tests and a headless Chromium walkthrough, including a 390px overflow check. Iteration 2 reported **12 passed, 0 failed**, adding an interface regression test using a DOM stub for labels, selection, focus calls and mode separation. It does not verify native browser keyboard behaviour or responsive appearance. Standard advice keeps the same conversation without the Inspectable risk-comparison panel.

## GitHub submission

**Public repository:** [almarej/risklens-robo-adviser](https://github.com/almarej/risklens-robo-adviser).
**Initial commit:** [d5dc36e](https://github.com/almarej/risklens-robo-adviser/commit/d5dc36e).
**Usability improvement commit:** [613ff7b](https://github.com/almarej/risklens-robo-adviser/commit/613ff7b). These identify the baseline and second iteration; no submission release is asserted.

## Limitations and sources

The prototype does not validate risk categorisation, predict returns, or measure improvements in investor judgement. It draws conceptually on Hildebrand and Bergner (2021), Back et al. (2023), Zhu et al. (2023), and Shneiderman (2022); see the user's A1 literature review for full bibliographic details. Any images or additional assets added later should be credited.
