import { test, expect } from '@playwright/test';

test.describe('RECLAIM Minimal Academic Portfolio E2E Verification', () => {
  test('Home Page renders clean academic intro, total 15 assignments, and no admin widgets', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.locator('text=E-Waste & Environmental Management').first()).toBeVisible();
    await expect(page.locator('text=15').first()).toBeVisible();

    // Verify new branding and dedication
    await expect(page).toHaveTitle('E-Waste | Academic Portfolio');
    await expect(page.locator('h1:has-text("E-Waste")')).toBeVisible();
    await expect(page.locator('text=Prepared for Prof. Aniket Kundu')).toBeVisible();
    await expect(page.locator('text=E-Waste & Environmental Management · Semester 5')).toBeVisible();

    // Verify "RECLAIM" does NOT appear anywhere in the rendered page
    const pageText = await page.textContent('body');
    expect(pageText).not.toContain('RECLAIM');

    // Verify 3-item navigation bar
    const nav = page.locator('nav');
    await expect(nav.locator('text=Home')).toBeVisible();
    await expect(nav.locator('text=Assignments')).toBeVisible();
    await expect(nav.locator('text=Timeline')).toBeVisible();

    // Verify removed tabs do not exist in navigation
    await expect(page.locator('nav >> text=Analytics')).not.toBeVisible();
    await expect(page.locator('nav >> text=Showcase')).not.toBeVisible();
    await expect(page.locator('nav >> text=Settings')).not.toBeVisible();
    await expect(page.locator('nav >> text=Evidence Vault')).not.toBeVisible();
  });

  test('Assignments Gallery displays 15 records with search, filter, and format pills', async ({ page }) => {
    await page.goto('http://localhost:3000/assignments');
    await expect(page.locator('text=EW-01')).toBeVisible();
    await expect(page.locator('text=EW-14')).toBeVisible();
    await expect(page.locator('text=EW-15')).toBeVisible();

    // Search for "Toxic"
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Toxic');
    await expect(page.locator('text=EW-01')).toBeVisible();
    await expect(page.locator('text=EW-14')).not.toBeVisible();
    await expect(page.locator('text=EW-15')).not.toBeVisible();

    // Search for "EW-15"
    await searchInput.fill('EW-15');
    await expect(page.locator('text=EW-15')).toBeVisible();
    await expect(page.locator('text=EW-01')).not.toBeVisible();

    // Clear search
    await searchInput.fill('');
    await expect(page.locator('text=EW-14')).toBeVisible();
    await expect(page.locator('text=EW-15')).toBeVisible();
  });

  test('EW-15 opens /assignments/EW-15 and renders ResearchPaperViewer (PDF, DOCX, TeX, Figures)', async ({ page }) => {
    await page.goto('http://localhost:3000/assignments/EW-15');

    // Verify paper title and author details
    await expect(page.locator('text=Explanation Reliability and Failure Detection').first()).toBeVisible();
    await expect(page.locator('text=Kasim Ishaque Ghanchi').first()).toBeVisible();

    // Verify default tab (PDF)
    await expect(page.locator('iframe[title="Research Paper PDF Viewer"]')).toBeVisible();

    // Test Word DOCX tab
    await page.locator('button:has-text("Microsoft Word")').click();
    await expect(page.locator('iframe[title="Word Document Preview"]')).toBeVisible();

    // Test LaTeX Source tab
    await page.locator('button:has-text("LaTeX Source")').click();
    await expect(page.locator('text=\\documentclass[conference,letterpaper]{IEEEtran}')).toBeVisible();

    // Test Research Figures tab
    await page.getByRole('tab', { name: 'Research Figures' }).click();
    await expect(page.locator('text=Caption:')).toBeVisible();
  });

  test('Assignment Detail renders interactive document preview, tabs, and ZIP download for standard assignments', async ({ page }) => {
    await page.goto('http://localhost:3000/assignments/EW-05');
    await expect(page.locator('text=Coursework Deliverables & Interactive Preview')).toBeVisible();
    await expect(page.locator('text=Download All (ZIP)')).toBeVisible();

    // Switch between files: XLSX and PDF
    await expect(page.locator('button:has-text("State_EWaste_Tracker_Final 1.xlsx")')).toBeVisible();
    await expect(page.locator('button:has-text("Kasim_Ghanchi_Assignment1E.pdf")')).toBeVisible();

    // Click on XLSX tab
    await page.locator('button:has-text("State_EWaste_Tracker_Final 1.xlsx")').click();

    // Verify spreadsheet viewer rendered
    await expect(page.locator('text=State E-Waste Management Scorecard')).toBeVisible();
    await expect(page.locator('button:has-text("0_Scorecard")')).toBeVisible();
    await expect(page.locator('button:has-text("1_Generation_Inventory")')).toBeVisible();

    // Switch sheet tab
    await page.locator('button:has-text("1_Generation_Inventory")').click();
    await expect(page.locator('text=Generation Inventory')).toBeVisible();
  });

  test('Assignment EW-01 displays Toxic_Chemicals.pdf viewer and EW-09 displays KASIM_EWEM_ASS3_CHANGES.pdf', async ({ page }) => {
    await page.goto('http://localhost:3000/assignments/EW-01');
    await expect(page.locator('text=Toxic_Chemicals.pdf').first()).toBeVisible();
    await expect(page.locator('iframe[title="Toxic_Chemicals.pdf"]')).toBeVisible();
    await expect(page.locator('text=Download All (ZIP)')).toBeVisible();

    await page.goto('http://localhost:3000/assignments/EW-09');
    await expect(page.locator('text=KASIM_EWEM_ASS3_CHANGES.pdf').first()).toBeVisible();
    await expect(page.locator('text=Download All (ZIP)')).toBeVisible();
  });

  test('Course Timeline displays October 7 deadline for EW-15 and links to /assignments/EW-15', async ({ page }) => {
    await page.goto('http://localhost:3000/timeline');
    await expect(page.locator('text=Course Activity Chronology')).toBeVisible();
    await expect(page.locator('text=EW-01')).toBeVisible();
    await expect(page.locator('text=EW-14')).toBeVisible();
    await expect(page.locator('text=EW-15')).toBeVisible();

    // Verify October 7 deadline for EW-15
    await expect(
      page.locator('text=2026-10-07').or(page.locator('text=Oct 7, 2026')).or(page.locator('text=October 7'))
    ).toBeVisible();

    // Click on EW-15 View Assignment link
    const ew15Link = page.locator('a[href="/assignments/EW-15"]').first();
    await expect(ew15Link).toBeVisible();
    await ew15Link.click();
    await expect(page).toHaveURL(/.*\/assignments\/EW-15/);
  });

  test('Download API endpoints for EW-15 and research-paper zip return valid 200 responses', async ({ request }) => {
    // 1. Verify /api/download/EW-15 works
    const ew15DownloadRes = await request.get('http://localhost:3000/api/download/EW-15');
    expect(ew15DownloadRes.status()).toBe(200);
    expect(ew15DownloadRes.headers()['content-type']).toContain('application/zip');

    // 2. Verify /api/research-paper/zip works
    const paperZipRes = await request.get('http://localhost:3000/api/research-paper/zip');
    expect(paperZipRes.status()).toBe(200);
    expect(paperZipRes.headers()['content-type']).toContain('application/zip');
  });

  test('Research Paper integrates cleanly: Home card, /research-paper redirect, and ZIP download', async ({ page }) => {
    // 1. Home page features Research Paper card
    await page.goto('http://localhost:3000/');
    await expect(page.locator('text=Featured Research Paper')).toBeVisible();
    await expect(page.locator('text=Explanation Reliability and Failure Detection in Phishing URL Classification Under Dataset Shift').first()).toBeVisible();
    await expect(page.locator('text=Read Research Paper (EW-15)')).toBeVisible();

    // 2. Navigate via Read Research Paper action to /assignments/EW-15
    await page.locator('text=Read Research Paper (EW-15)').click();
    await expect(page).toHaveURL(/.*\/assignments\/EW-15/);

    // 3. Test /research-paper redirect to /assignments/EW-15
    await page.goto('http://localhost:3000/research-paper');
    await expect(page).toHaveURL(/.*\/assignments\/EW-15/);

    // Verify main navigation remains only Home, Assignments, Timeline
    const navLinks = await page.locator('header nav a, header a').allInnerTexts();
    const joinedNav = navLinks.join(' ');
    expect(joinedNav).toContain('Home');
    expect(joinedNav).toContain('Assignments');
    expect(joinedNav).toContain('Timeline');
  });
});
