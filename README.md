# RiskLens — Explainable Conversational Robo-Adviser Simulator

**README prose word count: 481 (excluding headings, code and commands; computed using a simple word tokenizer).**

> **Educational prototype only.** All profiles, portfolios, recommendations and thresholds are fictional. The application does not offer personal financial advice, connect to markets or perform trades.

## Research question

Does an inspectable risk-profile comparison help beginners distinguish matching from mismatching risk-category recommendations in a simulated conversational robo-adviser? This is the design question motivating the project, **not a claim established by user testing**.

## Current status (v0.1)

**Implemented:** five-question interface, deterministic risk inference, contradiction detection and correction, risk-profile display, standard and inspectable advice modes, matching/mismatching comparisons, explanation, accept/decline/reconsider, and browser-session history.

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

Run automated rules tests (Node.js 18+):

```bash
npm test
```

## Replay the three scenarios

1. **Mismatch:** Start → Cautious preset → advance through questions → Continue → Inspectable advice → Different risk categories → Decline.
2. **Aligned:** Start → Balanced preset → advance → Continue → Matching risk categories → Inspectable advice → Accept example.
3. **Clarification:** Start → Conflicting preset → advance → Review answers → change loss-tolerance choice → complete questionnaire again.

## Architecture and interactions

- [`docs/architecture.svg`](docs/architecture.svg): rendered architecture diagram (source: [`architecture.dot`](docs/architecture.dot), plus [`architecture.mmd`](docs/architecture.mmd)).
- [`docs/storyboards.md`](docs/storyboards.md): three example journeys; screenshots below capture the actual prototype states in headless Chromium.
- Screenshots: [welcome](docs/screenshots/01-welcome.png), [profile](docs/screenshots/02-profile.png), [mismatch inspection](docs/screenshots/03-mismatch-inspectable.png), [decline feedback](docs/screenshots/04-decline-summary.png), [aligned example](docs/screenshots/05-aligned-inspectable.png), [clarification](docs/screenshots/06-clarification.png), [mobile](docs/screenshots/07-mobile-welcome.png).
- [`docs/development-record.md`](docs/development-record.md): design decisions and checks; update with your own review and commits.

## Development record and authorship

**Initial milestone:** ChatGPT created the first source files, test cases and documentation from a user-approved project brief. The user will inspect the prototype, make design decisions, run checks and publish the repository. Subsequent changes must be recorded accurately in `docs/development-record.md`; meaningful Git commits are welcome but none are claimed here.

**Checks:** 11 unit tests passed. A headless Chromium walkthrough exercised cautious mismatch, aligned advice, contradictory inputs and correction; a 390px mobile-width check found no horizontal overflow or JavaScript exceptions. These are developer checks, not user-study results. Manual browser accessibility and usability review by the student is still outstanding.

## GitHub submission

**Repository URL:** not yet published.  
**Submitted commit/release:** not yet selected. Set these to actual links after publication.

## Limitations and sources

The prototype does not validate risk categorisation, predict returns, or measure improvements in investor judgement. It draws conceptually on Hildebrand and Bergner (2021), Back et al. (2023), Zhu et al. (2023), and Shneiderman (2022); see the user's A1 literature review for full bibliographic details. Any images or additional assets added later should be credited.
