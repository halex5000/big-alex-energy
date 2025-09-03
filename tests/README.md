# Testing Documentation

## Overview

This project uses Playwright for end-to-end testing to ensure the career highlights carousel works correctly across different devices and browsers.

## Setup

### Prerequisites

- Node.js installed
- Dependencies installed (`npm install`)

### Installation

```bash
# Install Playwright
npm install --save-dev @playwright/test

# Install browser binaries
npx playwright install
```

## Running Tests

### Run all tests

```bash
npm run test:e2e
```

### Run specific test file

```bash
npx playwright test tests/career-highlights.spec.ts
```

### Run tests in headed mode (see browser)

```bash
npx playwright test --headed
```

### Run tests for specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests for mobile devices

```bash
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

## Test Structure

### Career Highlights Tests (`tests/career-highlights.spec.ts`)

Tests cover:

- **Section Display**: Verifies the Career Highlights section is visible
- **Mobile Layout**: Ensures grid layout shows on mobile devices
- **Desktop Layout**: Ensures carousel shows on desktop devices
- **Content Verification**: Checks that career highlight cards display proper content
- **Navigation**: Tests carousel navigation buttons on desktop
- **Modal Functionality**: Tests mobile card click interactions
- **Responsive Design**: Verifies proper card sizing across viewports

## Configuration

The test configuration is in `playwright.config.ts`:

- Tests run against `http://localhost:3000`
- Automatically starts dev server before tests
- Tests multiple browsers (Chrome, Firefox, Safari)
- Tests mobile viewports (iPhone, Pixel)
- Generates HTML reports

## Adding New Tests

1. Create new test files in the `tests/` directory
2. Use the `test()` function to define individual tests
3. Use `test.describe()` to group related tests
4. Use `test.beforeEach()` for setup

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Test implementation
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

## Debugging

### View test results

```bash
npx playwright show-report
```

### Debug specific test

```bash
npx playwright test tests/career-highlights.spec.ts --debug
```

### Take screenshots

```bash
npx playwright test --screenshot=on
```

## Best Practices

1. **Use semantic selectors**: Prefer `getByRole()`, `getByText()`, `getByLabel()` over CSS selectors
2. **Test user interactions**: Focus on what users actually do
3. **Test responsive behavior**: Always test mobile and desktop views
4. **Keep tests independent**: Each test should be able to run in isolation
5. **Use proper assertions**: Be specific about what you're testing

## Troubleshooting

### Common Issues

1. **Tests fail with "page not found"**: Make sure dev server is running on port 3000
2. **Element not found**: Check if selectors match the actual DOM structure
3. **Timing issues**: Use `waitFor()` or `toBeVisible()` for dynamic content
4. **Mobile tests failing**: Verify viewport size and responsive breakpoints

### Getting Help

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
