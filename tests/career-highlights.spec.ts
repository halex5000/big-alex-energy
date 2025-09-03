import { test, expect } from '@playwright/test';

test.describe('Career Highlights Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display career highlights section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Career Highlights' })
    ).toBeVisible();
  });

  test('should show mobile grid layout on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE

    // Should show grid layout (not carousel)
    const gridContainer = page.locator('.grid.grid-cols-1.gap-6.md\\:hidden');
    await expect(gridContainer).toBeVisible();

    // Should not show carousel on mobile
    const carousel = page.locator('[data-slot="carousel-content"]');
    await expect(carousel).not.toBeVisible();
  });

  test('should show desktop carousel on desktop devices', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 }); // Desktop

    // Should show carousel (not grid)
    const carousel = page.locator('[data-slot="carousel-content"]');
    await expect(carousel).toBeVisible();

    // Should not show mobile grid on desktop
    const gridContainer = page.locator('.grid.grid-cols-1.gap-6.md\\:hidden');
    await expect(gridContainer).not.toBeVisible();
  });

  test('should display career highlight cards with proper content', async ({
    page,
  }) => {
    // Check for specific career highlights
    await expect(
      page.getByText('Klaviyo AI Hackathon Winner (2025)')
    ).toBeVisible();
    await expect(
      page.getByText('Head of Experimentation & Optimization')
    ).toBeVisible();
    await expect(page.getByText('Conference Speaker')).toBeVisible();
  });

  test('should have working carousel navigation on desktop', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Check for navigation buttons
    const prevButton = page.locator('[data-slot="carousel-previous"]');
    const nextButton = page.locator('[data-slot="carousel-next"]');

    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    // Test navigation (if there are multiple cards)
    const carouselItems = page.locator('[data-slot="carousel-item"]');
    const itemCount = await carouselItems.count();

    if (itemCount > 1) {
      await nextButton.click();
      // Add more specific assertions based on your carousel behavior
    }
  });

  test('should open modal when clicking cards on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Click on first career highlight card
    const firstCard = page
      .locator('.grid.grid-cols-1.gap-6.md\\:hidden .border-2')
      .first();
    await firstCard.click();

    // Check if modal opens (adjust selector based on your modal implementation)
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
  });

  test('should have proper responsive card sizing', async ({ page }) => {
    // Test mobile sizing
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileCard = page
      .locator('.grid.grid-cols-1.gap-6.md\\:hidden .border-2')
      .first();
    await expect(mobileCard).toBeVisible();

    // Test desktop sizing
    await page.setViewportSize({ width: 1280, height: 720 });
    const desktopCard = page
      .locator('[data-slot="carousel-item"] .border-2')
      .first();
    await expect(desktopCard).toBeVisible();
  });
});
