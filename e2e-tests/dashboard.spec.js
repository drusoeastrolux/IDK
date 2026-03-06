const { test, expect } = require('@playwright/test');

test.describe('March 6 Dashboard E2E Tests', () => {
  test('should load the dashboard and display main elements', async ({ page }) => {
    await page.goto('/');
    
    // Check if the main header is visible
    await expect(page.locator('h1')).toContainText('March 6 Dashboard');
    
    // Check if stats cards are visible
    await expect(page.locator('text=Total Users')).toBeVisible();
    await expect(page.locator('text=Active Projects')).toBeVisible();
    await expect(page.locator('text=Completed Tasks')).toBeVisible();
    
    // Check if team members section is visible
    await expect(page.locator('text=Team Members')).toBeVisible();
  });

  test('should display user cards with correct information', async ({ page }) => {
    await page.goto('/');
    
    // Wait for users to load
    await page.waitForSelector('[data-testid="user-card"]');
    
    // Check if user cards are displayed
    const userCards = page.locator('[data-testid="user-card"]');
    await expect(userCards).toHaveCount(3);
    
    // Check first user card content
    const firstUserCard = userCards.first();
    await expect(firstUserCard.locator('h3')).toBeVisible();
    await expect(firstUserCard.locator('text=@example.com')).toBeVisible();
  });

  test('should open and close add user modal', async ({ page }) => {
    await page.goto('/');
    
    // Click add user button
    await page.click('button:has-text("Add User")');
    
    // Check if modal is open
    await expect(page.locator('text=Add New User')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="role"]')).toBeVisible();
    
    // Click cancel button
    await page.click('button:has-text("Cancel")');
    
    // Check if modal is closed
    await expect(page.locator('text=Add New User')).not.toBeVisible();
  });

  test('should add a new user successfully', async ({ page }) => {
    await page.goto('/');
    
    // Click add user button
    await page.click('button:has-text("Add User")');
    
    // Fill the form
    await page.fill('input[name="name"]', 'E2E Test User');
    await page.fill('input[name="email"]', 'e2e@example.com');
    await page.fill('input[name="role"]', 'QA Engineer');
    
    // Submit the form
    await page.click('button:has-text("Add User")');
    
    // Check if modal is closed
    await expect(page.locator('text=Add New User')).not.toBeVisible();
    
    // Check if new user is added (wait for API response)
    await page.waitForTimeout(1000);
    
    // Verify the new user appears in the list
    await expect(page.locator('text=E2E Test User')).toBeVisible();
  });

  test('should validate form inputs', async ({ page }) => {
    await page.goto('/');
    
    // Click add user button
    await page.click('button:has-text("Add User")');
    
    // Try to submit empty form
    await page.click('button:has-text("Add User")');
    
    // Check if form validation prevents submission
    await expect(page.locator('text=Add New User')).toBeVisible();
  });

  test('should have responsive design', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Team Members')).toBeVisible();
    
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Team Members')).toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API failure
    await page.route('/api/users', route => route.abort());
    
    await page.goto('/');
    
    // The app should still load the UI
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=March 6 Dashboard')).toBeVisible();
  });
});
