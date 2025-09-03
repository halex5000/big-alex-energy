# Conventional Commits Guide

## Overview

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to ensure consistent, meaningful commit messages that improve project maintainability and enable automated tooling.

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types

### Core Types

- **`feat`**: A new feature
- **`fix`**: A bug fix
- **`docs`**: Documentation only changes
- **`style`**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **`refactor`**: A code change that neither fixes a bug nor adds a feature
- **`perf`**: A code change that improves performance
- **`test`**: Adding missing tests or correcting existing tests
- **`build`**: Changes that affect the build system or external dependencies
- **`ci`**: Changes to our CI configuration files and scripts
- **`chore`**: Other changes that don't modify src or test files
- **`revert`**: Reverts a previous commit

## Examples

### Features

```bash
git commit -m "feat: add carousel navigation arrows"
git commit -m "feat(carousel): implement single-card display mode"
git commit -m "feat(mobile): add touch gesture support for carousel"
```

### Bug Fixes

```bash
git commit -m "fix: resolve carousel centering issue on desktop"
git commit -m "fix(mobile): prevent card overflow on small screens"
git commit -m "fix(carousel): handle navigation edge cases"
```

### Documentation

```bash
git commit -m "docs: add testing setup instructions"
git commit -m "docs(carousel): update component usage examples"
git commit -m "docs: improve README with deployment steps"
```

### Styling

```bash
git commit -m "style: format code with prettier"
git commit -m "style(carousel): improve card spacing and typography"
git commit -m "style: fix linting issues in test files"
```

### Refactoring

```bash
git commit -m "refactor: extract carousel logic into custom hook"
git commit -m "refactor(components): simplify card layout structure"
git commit -m "refactor: improve test organization and naming"
```

### Performance

```bash
git commit -m "perf: optimize carousel rendering performance"
git commit -m "perf(images): implement lazy loading for card images"
git commit -m "perf: reduce bundle size by tree-shaking unused code"
```

### Testing

```bash
git commit -m "test: add carousel navigation tests"
git commit -m "test(mobile): add responsive layout tests"
git commit -m "test: improve test coverage for career highlights"
```

### Build/CI

```bash
git commit -m "build: update Next.js to latest version"
git commit -m "ci: add pre-push test hooks"
git commit -m "build: optimize production bundle"
```

### Chores

```bash
git commit -m "chore: update dependencies"
git commit -m "chore: clean up unused imports"
git commit -m "chore: update package.json scripts"
```

## Scopes (Optional)

Use scopes to indicate the area of the codebase affected:

- **`carousel`**: Carousel-related changes
- **`mobile`**: Mobile-specific changes
- **`desktop`**: Desktop-specific changes
- **`tests`**: Test-related changes
- **`docs`**: Documentation changes
- **`ci`**: CI/CD changes
- **`build`**: Build system changes

## Breaking Changes

Use `!` after the type/scope to indicate breaking changes:

```bash
git commit -m "feat!: redesign carousel API"
git commit -m "fix(carousel)!: change navigation behavior"
```

Or use the footer:

```bash
git commit -m "feat: add new carousel props

BREAKING CHANGE: The carousel component now requires a new required prop"
```

## Best Practices

### 1. Use Imperative Mood

- ✅ `feat: add carousel navigation`
- ❌ `feat: added carousel navigation`

### 2. Keep Description Under 50 Characters

- ✅ `fix: resolve mobile layout issue`
- ❌ `fix: resolve the mobile layout issue that was causing problems on small screens`

### 3. Capitalize First Letter

- ✅ `feat: Add new carousel feature`
- ❌ `feat: add new carousel feature`

### 4. No Period at End

- ✅ `docs: update testing guide`
- ❌ `docs: update testing guide.`

### 5. Be Specific

- ✅ `fix(carousel): resolve centering issue on desktop`
- ❌ `fix: fix carousel`

## Validation

The project uses `@commitlint/cli` to validate commit messages. Invalid commits will be rejected with helpful error messages.

### Common Validation Errors

#### Missing Type

```
❌ "Update carousel component"
✅ "feat: update carousel component"
```

#### Invalid Type

```
❌ "feature: add new carousel"
✅ "feat: add new carousel"
```

#### Missing Description

```
❌ "fix:"
✅ "fix: resolve carousel centering issue"
```

#### Too Long

```
❌ "feat: add a really long description that goes way beyond the recommended character limit"
✅ "feat: add carousel navigation"
```

## Tools Integration

### Pre-commit Hook

- Validates commit message format
- Runs linting and formatting
- Prevents invalid commits

### CI/CD

- Uses commit messages for automated changelog generation
- Triggers appropriate deployment pipelines
- Provides context for code reviews

### IDE Integration

- VS Code extensions for conventional commits
- Git commit message templates
- Auto-completion for commit types

## Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Commitlint Documentation](https://commitlint.js.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)
