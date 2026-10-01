import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("page renders without browser errors and has no horizontal overflow", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Saulė dirba.Jūs gyvenate.",
  );
  await page.evaluate(() => document.fonts.ready);
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  for (const img of await page.locator("img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveJSProperty("complete", true);
    expect(await img.evaluate((el) => el.naturalWidth)).toBeGreaterThan(0);
  }
  expect(errors).toEqual([]);
});

test("audience tabs update content with both pointer and keyboard", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Verslui" }).click();
  await expect(
    page.getByRole("heading", { name: "Saulės elektrinės verslui" }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Verslui" }).press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Ūkiui" })).toBeFocused();
  await expect(
    page.getByRole("heading", { name: "Saulės elektrinės ūkiui" }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Ūkiui" }).press("Home");
  await expect(page.getByRole("tab", { name: "Namams" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("contact form is present on the landing page and primary buttons scroll to it", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#kontaktai").getByRole("form")).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Atraskime jūsų sprendimą" }).click();
  await expect(page.getByLabel("Jūsų vardas")).toBeInViewport();
  await expect(
    page.getByRole("heading", { name: "Papasakokite apie savo planus." }),
  ).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .getByRole("button", { name: "Pasikalbėkime", exact: true })
    .click();
  await expect(page.getByLabel("Jūsų vardas")).toBeInViewport();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("service detail selects the inline form and preserves entered information", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Jūsų vardas").fill("Aistė");
  await page
    .getByRole("button", { name: "Plačiau: įkrovimo stotelės" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Įkrovimo stotelės",
  );
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Plačiau: įkrovimo stotelės" }),
  ).toBeFocused();
  await page
    .getByRole("button", { name: "Plačiau: įkrovimo stotelės" })
    .click();
  await page.getByRole("button", { name: "Aptarkime jūsų projektą" }).click();
  await expect(page.getByLabel("Kas jus domina?")).toHaveValue(
    "Įkrovimo stotelė",
  );
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByLabel("Jūsų vardas")).toHaveValue("Aistė");
  await expect(page.getByLabel("Jūsų vardas")).toBeInViewport();
  await page
    .getByRole("button", { name: "Pasikalbėkime", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByLabel("Jūsų vardas")).toHaveValue("Aistė");
  await expect(page.getByLabel("Kas jus domina?")).toHaveValue(
    "Saulės elektrinė",
  );
});

test("inquiry validates input, prepares a real SMS draft, and copies its text", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await expect(page.locator("#kontaktai").getByRole("form")).toBeVisible();
  await page.getByRole("button", { name: "Paruošti užklausą" }).click();
  await expect(page.getByLabel("Jūsų vardas")).toBeFocused();
  await page.getByLabel("Jūsų vardas").fill("Aistė");
  await page.getByLabel("Telefono numeris").fill("abc");
  expect(
    await page
      .getByLabel("Telefono numeris")
      .evaluate((el) => el.checkValidity()),
  ).toBe(false);
  await page.getByLabel("Telefono numeris").fill("+370 612 34567");
  await page.getByLabel("Miestas ar rajonas").fill("Kaunas");
  await page
    .getByLabel("Papildoma informacija")
    .fill("Domina elektrinė ant namo stogo.");
  await page.getByRole("button", { name: "Paruošti užklausą" }).click();
  await expect(
    page.getByRole("heading", { name: "Jūsų užklausa paruošta." }),
  ).toBeVisible();
  const sms = await page
    .getByRole("link", { name: "Atidaryti SMS" })
    .getAttribute("href");
  expect(sms).toContain("sms:+37066609997?body=");
  expect(decodeURIComponent(sms)).toContain("Aistė");
  expect(decodeURIComponent(sms)).toContain("Kaunas");
  await page.getByRole("button", { name: "Kopijuoti tekstą" }).click();
  await expect(page.getByRole("button", { name: "Nukopijuota" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Domina elektrinė ant namo stogo.",
  );
  await page.getByRole("button", { name: "Grįžti ir redaguoti" }).click();
  await expect(page.getByLabel("Jūsų vardas")).toHaveValue("Aistė");
  await expect(page.getByLabel("Jūsų vardas")).toBeFocused();
  await page.getByRole("button", { name: "Paruošti užklausą" }).click();
  await page
    .getByRole("button", { name: "Pasikalbėkime", exact: true })
    .click();
  await expect(page.getByLabel("Jūsų vardas")).toHaveValue("Aistė");
  await expect(page.getByLabel("Jūsų vardas")).toBeInViewport();
});

test("mobile navigation, FAQ, and privacy dialog work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Atidaryti meniu" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Kontaktai" })
    .click();
  await expect(page.getByRole("navigation")).toBeHidden();
  await expect(page).toHaveURL(/#kontaktai$/);
  const question = page.getByRole("button", {
    name: "Ar padedate su ESO ir APVA dokumentais?",
  });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#faq-answer-1")).toBeVisible();
  await question.click();
  await expect(page.locator("#faq-answer-1")).toBeHidden();
  await page.getByRole("button", { name: "Privatumas", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Jūsų privatumas" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Uždaryti langą" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("page and inquiry meet automated accessibility checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  let report = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(report.violations).toEqual([]);
  await page.getByLabel("Jūsų vardas").fill("Aistė");
  await page.getByLabel("Telefono numeris").fill("+370 612 34567");
  await page.getByRole("button", { name: "Paruošti užklausą" }).click();
  report = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(report.violations).toEqual([]);
});

test("desktop and mobile visual captures", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "artifacts/desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  await page
    .locator("#kontaktai")
    .screenshot({
      path: "artifacts/contact-desktop.png",
      animations: "disabled",
    });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "artifacts/mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  await page
    .locator("#kontaktai")
    .screenshot({
      path: "artifacts/contact-mobile.png",
      animations: "disabled",
    });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: "artifacts/mobile-hero.png",
    animations: "disabled",
  });
});
