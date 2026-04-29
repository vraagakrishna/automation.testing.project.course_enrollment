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
├── src/
│   ├── components/        # Reusable UI components (e.g. navigation, headers)
│   ├── models/            # TypeScript models / data structures
│   ├── pages/             # Page Objects (Page Object Model)
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── base-page.ts   # Shared page functionality
│   │
│   ├── tests/             # Test specs and fixtures
│   │   ├── fixtures/      # Custom Playwright fixtures
│   │   └── *.spec.ts      # Test cases
│   │
│   └── utils/             # Test utilities and helpers
│
├── playwright.config.ts   # Playwright configuration
├── package.json           # Dependencies & scripts
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

# Code Quality Checks

This project enforces code quality using:

- Spell checking (CSpell)
- Linting (ESLint)
- Formatting (Prettier)

## Spell check

Check spelling issues:

```bash
npm run spell
```

Fix / clean up spelling output:

```bash
npm run spell:fix
```

> CSpell does NOT reliably auto-fix words.

> `spell:fix` mainly reduces noise, not bulk fixer.

## Lint

```bash
npm run lint
```

Fix lint issues automatically:

```bash
npm run lint:fix
```

## Formatting

Check formatting:

```bash
npm run format
```

Auto-fix formatting:

```bash
npm run format:fix
```

<br/>

## Run Everything Before Push

Recommended before pushing code:

```bash
npm run spell
npm run lint
npm run format
npm run test
```

<br/>

## CI Pipeline

On every push and pull request, the pipeline automatically runs:

1. Spell check
2. Lint check
3. Format check
4. Playwright tests

If any steps fails, the pipeline stops immediately.

<br/>
