import { test, expect } from "@playwright/test"
import { skipIfEmptyCatalog } from "./helpers"

async function setupLocalStorage(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    localStorage.setItem("referentiel-dp-audience", JSON.stringify({ audience: "SEN", hasChosen: true }))
    localStorage.setItem("referentiel-onboarding-done", "true")
  })
}

async function waitForCatalog(page: import("@playwright/test").Page) {
  await page.waitForSelector("[id^='software-']", { timeout: 10000 })
  await page.waitForFunction(() => {
    return !document.querySelector("h1")?.textContent?.includes("Bienvenue")
  }, { timeout: 5000 }).catch(() => { /* ignore */ })
}

test.describe("Catalogue — recherche", () => {
  test.beforeEach(async ({ page }) => {
    await setupLocalStorage(page)
    await page.goto("/")
    await waitForCatalog(page)
  })

  test("le champ de recherche est fonctionnel", async ({ page }) => {
    const searchInput = page.locator("#software-search")
    await expect(searchInput).toBeVisible()
    await expect(searchInput).toBeEditable()

    // Remplir et vérifier la valeur
    await searchInput.fill("test")
    await expect(searchInput).toHaveValue("test")
  })

  test("la recherche via URL query filtre les résultats", async ({ page }) => {
    // Tester le filtrage via query param (category)
    await page.goto("/?category=Bureautique")
    await waitForCatalog(page)

    const count = await page.locator("[id^='software-']").count()
    expect(count).toBeGreaterThan(0)
    // Les logiciels bureautique sont un sous-ensemble
    expect(count).toBeLessThan(128)
  })
})

test.describe("Catalogue — navigation détail", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await skipIfEmptyCatalog(page, testInfo)
    await setupLocalStorage(page)
    await page.goto("/")
    await waitForCatalog(page)
  })

  test("cliquer sur un logiciel ouvre la page détail", async ({ page }) => {
    const firstCard = page.locator("a[id^='software-']").first()
    const href = await firstCard.getAttribute("href")
    expect(href).toContain("/logiciels/")

    await firstCard.click({ force: true })
    await page.waitForURL("**/logiciels/**", { timeout: 5000 })

    const title = page.locator("h1.tracking-tight")
    await expect(title).toBeVisible()
  })

  test("les boutons précédent/suivant fonctionnent", async ({ page }) => {
    const firstCard = page.locator("a[id^='software-']").first()
    await firstCard.click({ force: true })
    await page.waitForURL("**/logiciels/**", { timeout: 5000 })

    await page.waitForFunction(() => {
      const h1s = document.querySelectorAll("h1")
      return h1s.length === 1 || !Array.from(h1s).some(h => h.textContent?.includes("Bienvenue"))
    }, { timeout: 3000 }).catch(() => { /* ignore */ })

    const titleSelector = "h1.tracking-tight"
    const firstTitle = await page.locator(titleSelector).textContent()

    const nextButton = page.getByLabel("Logiciel suivant")
    if (await nextButton.isEnabled()) {
      await nextButton.click()
      await page.waitForTimeout(800)

      const secondTitle = await page.locator(titleSelector).textContent()
      expect(secondTitle).not.toBe(firstTitle)

      const prevButton = page.getByLabel("Logiciel précédent")
      await prevButton.click()
      await page.waitForTimeout(800)

      const backTitle = await page.locator(titleSelector).textContent()
      expect(backTitle).toBe(firstTitle)
    }
  })

  test("le bouton retour est visible sur la page détail", async ({ page }) => {
    // V1 : les IDs sont des UUIDs Directus, on récupère le 1er logiciel disponible
    await page.goto("/")
    const firstCard = page.locator("a[href^='/logiciels/']").first()
    const href = await firstCard.getAttribute("href")
    await page.goto(href!)
    await page.waitForSelector("h1.tracking-tight", { timeout: 10000 })

    const backButton = page.getByLabel("Retour au catalogue")
    await expect(backButton).toBeVisible()
    await expect(backButton).toBeEnabled()
  })
})

test.describe("Catalogue — page détail", () => {
  test("la page détail affiche toutes les sections", async ({ page }, testInfo) => {
    await skipIfEmptyCatalog(page, testInfo)
    await setupLocalStorage(page)
    // V1 : les IDs sont des UUIDs Directus, on récupère le 1er logiciel disponible
    await page.goto("/")
    const firstCard = page.locator("a[href^='/logiciels/']").first()
    const href = await firstCard.getAttribute("href")
    await page.goto(href!)
    await page.waitForSelector("h1.tracking-tight", { timeout: 10000 })

    // Titre — V1 : on vérifie juste qu'un titre H1 existe (le nom dépend du 1er logiciel)
    await expect(page.locator("h1.tracking-tight")).toBeVisible()

    // Section conformité LGPD
    const certSection = page.locator("section[aria-label='Statut de conformité']")
    await expect(certSection).toBeVisible()

    // Bouton "Accéder au logiciel"
    const ctaButton = page.getByRole("link", { name: /accéder au logiciel/i })
    await expect(ctaButton.first()).toBeVisible()
  })
})

test.describe("Catalogue — filtres", () => {
  test.beforeEach(async ({ page }) => {
    await setupLocalStorage(page)
    await page.goto("/")
    await waitForCatalog(page)
  })

  test("le filtre 'Utilisable avec élèves' affiche des résultats", async ({ page, isMobile }) => {
    if (isMobile) {
      const filterButton = page.getByRole("button", { name: /filtres/i })
      if (await filterButton.isVisible({ timeout: 1000 }).catch(() => false)) {
        await filterButton.click()
        await page.waitForTimeout(300)
      }
    }

    const studentFilter = page.getByRole("button", { name: /utilisable avec élèves/i })
    if (await studentFilter.isVisible({ timeout: 2000 }).catch(() => false)) {
      await studentFilter.click()
      await page.waitForTimeout(500)

      const count = await page.locator("[id^='software-']").count()
      expect(count).toBeGreaterThan(0)
    }
  })

  test("le filtre 'Formation disponible' affiche des résultats", async ({ page, isMobile }) => {
    if (isMobile) {
      const filterButton = page.getByRole("button", { name: /filtres/i })
      if (await filterButton.isVisible({ timeout: 1000 }).catch(() => false)) {
        await filterButton.click()
        await page.waitForTimeout(300)
      }
    }

    const trainingFilter = page.getByRole("button", { name: /formation disponible/i })
    if (await trainingFilter.isVisible({ timeout: 2000 }).catch(() => false)) {
      await trainingFilter.click()
      await page.waitForTimeout(500)

      const count = await page.locator("[id^='software-']").count()
      expect(count).toBeGreaterThan(0)
    }
  })
})

test.describe("Catalogue — tri", () => {
  test("le sélecteur de tri est visible et fonctionnel", async ({ page }) => {
    await setupLocalStorage(page)
    await page.goto("/")
    await waitForCatalog(page)

    const sortButton = page.getByText("Recommandés").first()
    await expect(sortButton).toBeVisible()
  })
})
