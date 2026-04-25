# Course Enrollment Automation Framework

# Project Overview

TBC

<br/>

# Tech Stack

- **Framework**: Playwright
- **Language**: TypeScript
- **Runtime**: Node.js (v18+)

<br/>

# Project Structure

```bash
.
├── tests/
│   └── example.spec.ts    # Example end-to-end test
├── playwright.config.ts   # Playwright configuration
├── package.json
└── README.md
```

<br/>

# Setup / Installation

1. Clone the repository

```bash
git clone https://github.com/vraagakrishna/automation.testing.project.course_enrollment.git
cd automation.testing.project.course_enrollment
```

2. Install dependencies

```bash
npm install
```

This installs all project dependencies defined in `package.json`, including Playwright.

3. Install Playwright browsers

```bash
npx playwright install
```

This downloads the browser binaries (Chromium, Firefox, WebKit) required to run the tests.

> Why both?
>
> - `npm install` -> installs libraries and dependencies
> - `npx playwright install` -> installs actual browsers used for testing

<br/>

# Running Tests

### Run all tests

```bash
npx playwright test
```

Runs the full end-to-end test suite.

### Run tests in UI mode

```bash
npx playwright test --ui
```

Starts the interactive UI mode for running and debugging tests visually.

### Run tests in a specific browser

```bash
npx playwright test --project=chromium
```

Runs the tests only on Desktop Chrome (Chromium).

### Run a specific test file

```bash
npx playwright test example
```

Runs the tests in a specific file (e.g., `example.spec.ts`).

### Run tests in debug mode

```bash
npx playwright test --debug
```

Runs tests step-by-step with debugging enabled.

### Generate tests with Codegen

```bash
npx playwright codegen
```

Automatically generates tests scripts by recording your interactions.

<br/>
