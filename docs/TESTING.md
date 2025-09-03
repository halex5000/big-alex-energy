# Testing & CI/CD Documentation

## Overview

This project has a comprehensive testing setup with automated CI/CD pipelines to ensure code quality and prevent regressions.

## Testing Stack

- **Playwright**: End-to-end testing across multiple browsers and devices
- **Husky**: Git hooks for pre-push testing
- **GitHub Actions**: CI/CD pipeline with automated testing
- **Lighthouse CI**: Performance and accessibility testing

## Pre-Push Hooks

### Setup

The project uses Husky to run tests automatically before each push:

```bash
# Install dependencies (already done)
npm install

# Husky is configured to run on git init
npx husky init
```

### What Happens on Push

When you run `git push`, the following happens automatically:

1. **Pre-push hook triggers** (`.husky/pre-push`)
2. **Tests run** (`npm run test:e2e`)
3. **If tests pass**: Push proceeds ✅
4. **If tests fail**: Push is blocked ❌

### Bypassing Pre-Push (Emergency Only)

```bash
# Skip pre-push hook (use sparingly!)
git push --no-verify
```

## GitHub Actions CI/CD

### Workflow Triggers

- **Push to main/develop**: Full test suite + Lighthouse
- **Pull Requests**: Full test suite only

### Jobs

#### 1. Test Job

- **Runs on**: Ubuntu Latest
- **Node Version**: 18
- **Steps**:
  - Checkout code
  - Install dependencies
  - Install Playwright browsers
  - Build application
  - Run Playwright tests
  - Upload test reports

#### 2. Lighthouse Job (Main Branch Only)

- **Runs on**: Ubuntu Latest
- **Triggers**: Only on pushes to main
- **Steps**:
  - Build and start application
  - Run Lighthouse CI
  - Check performance/accessibility scores
  - Upload results

### Performance Thresholds

- **Performance**: ≥ 80% (warning)
- **Accessibility**: ≥ 90% (error)
- **Best Practices**: ≥ 80% (warning)
- **SEO**: ≥ 80% (warning)

## Running Tests Locally

### All Tests

```bash
npm run test:e2e
```

### With UI (Visual Test Runner)

```bash
npm run test:e2e:ui
```

### Headed Mode (See Browser)

```bash
npm run test:e2e:headed
```

### CI Mode (GitHub Reporter)

```bash
npm run test:e2e:ci
```

### Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Mobile Testing

```bash
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

## Test Structure

### Career Highlights Tests

Located in `tests/career-highlights.spec.ts`:

- ✅ Section visibility
- ✅ Mobile grid layout
- ✅ Desktop carousel functionality
- ✅ Card content verification
- ✅ Navigation testing
- ✅ Modal interactions
- ✅ Responsive design

### Adding New Tests

1. **Create test file** in `tests/` directory
2. **Follow naming convention**: `feature-name.spec.ts`
3. **Use semantic selectors**: `getByRole()`, `getByText()`, etc.
4. **Test responsive behavior**: Include mobile and desktop tests
5. **Keep tests independent**: Each test should run in isolation

### Example Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Click me' })).toBeVisible();
    await page.getByRole('button', { name: 'Click me' }).click();
    await expect(page.getByText('Success!')).toBeVisible();
  });
});
```

## Debugging

### View Test Reports

```bash
npx playwright show-report
```

### Debug Specific Test

```bash
npx playwright test tests/career-highlights.spec.ts --debug
```

### Take Screenshots

```bash
npx playwright test --screenshot=on
```

### Record Test Run

```bash
npx playwright test --video=on
```

## CI/CD Best Practices

### Commit Messages

Use conventional commits for better CI integration:

```bash
git commit -m "feat: add new carousel feature"
git commit -m "fix: resolve mobile layout issue"
git commit -m "test: add carousel navigation tests"
```

### Branch Strategy

- **main**: Production-ready code
- **develop**: Integration branch
- **feature/\***: Feature development
- **hotfix/\***: Critical fixes

### Pull Request Process

1. Create feature branch
2. Make changes
3. Add/update tests
4. Run tests locally
5. Create PR
6. CI runs automatically
7. Review and merge

## Troubleshooting

### Common Issues

#### Tests Fail on Push

```bash
# Check what's failing
npm run test:e2e

# Fix issues and try again
git add .
git commit -m "fix: resolve test failures"
git push
```

#### CI Pipeline Fails

1. Check GitHub Actions tab
2. Review test logs
3. Fix issues locally
4. Push fixes

#### Performance Issues

- Check Lighthouse scores
- Optimize images and assets
- Review bundle size
- Check Core Web Vitals

### Getting Help

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Husky Docs](https://typicode.github.io/husky/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Lighthouse CI Docs](https://github.com/GoogleChrome/lighthouse-ci)

## Monitoring

### Test Coverage

- Monitor test results in GitHub Actions
- Review Playwright reports
- Track performance metrics

### Performance Monitoring

- Lighthouse CI scores
- Core Web Vitals
- Bundle size tracking

### Quality Gates

- All tests must pass
- Performance scores must meet thresholds
- No accessibility regressions
- SEO scores maintained
