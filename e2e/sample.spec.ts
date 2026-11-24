import { test, expect } from "@playwright/test";

test.describe("Authentication Flows", () => {
  test("should load the login page with proper elements", async ({ page }) => {
    // Navigate to local port (or fallback if next dev server runs elsewhere)
    await page.goto("/login");

    // Verify page title / heading is visible
    const heading = page.locator("h1");
    await expect(heading).toHaveText("Welcome Back");

    // Verify email and password inputs are present
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });
});
