# Course Enrollment Automation Framework

# Project Overview

This project is an end-to-end automation framework built with **Playwright** and **TypeScript** to validate the core enrollment workflow of [Ndosi Test Automation](https://www.ndosiautomation.co.za/).

### Objective 

This primary goal of this project is to automate and verify the full enrollment journey across multiple user roles - from an administrator enrolling a student into a course, to the student confirming successful enrollment from their own account. 

### Core Workflow

The framework covers the following business process: 

1. Log in as an **Admin**
2. Navigate to the **Admin Panel**
3. Access the **Enrollmnets** section 
4. Enroll an existing **Student** account into a course
5. Log in as the **Student**
6. Validate that the student is successfully enrolled in the selected course

### Framework Design

The project is structured for scalability, maintainability, and long-term growth using: 

* **Page Object Model (POM)** for reusable page interactions 
* **Fixtures** for pre-configured test states
* **Flows** (Service Layer) for reusable business processes 
* **Factories** (Test Data Utilities) for dynamic data generation 
* **Soft Assertions** for capturing multiple validation issues in a single run
* **Automatic Clean Up** for improved test isolation and repeatability

<br/>

# Tech Stack

* **Framework**: Playwright
* **Language**: TypeScript
* **Runtime**: Node.js (v18+)

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

* Spell checking (CSpell)
* Linting (ESLint)
* Formatting (Prettier)

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
