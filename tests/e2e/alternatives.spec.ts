import { test, expect } from "@playwright/test"
import { skipIfEmptyCatalog } from "./helpers"

/**
 * Tests E2E pour la section « Alternatives recommandées » sur la page détail
 * d'un logiciel. Source de vérité : la relation `software_alternative` saisie
 * manuellement dans Directus.
 *
 * Cas couverts :
 * - Liste vide → composant affiche un message dédié
 * - Liste avec une alternative définie en base → lien cliquable
 *
 * Le test s'appuie sur le state Directus réel (pas de mock). Si la saisie
 * DeepL Standard → DeepL Pro est retirée, le test « avec contenu » échouera —
 * c'est intentionnel pour détecter une régression côté données.
 */

async function setupLocalStorage(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    localStorage.setItem("referentiel-dp-audience", JSON.stringify({ audience: "sen", hasChosen: true }))
    localStorage.setItem("referentiel-onboarding-done", "true")
  })
}

async function findAlternativesCard(page: import("@playwright/test").Page) {
  const heading = page.getByRole("heading", { name: /alternatives recommand/i })
  await heading.waitFor({ state: "visible", timeout: 10000 })
  // Le composant racine est une UCard — on remonte au plus proche bloc avec le bouton/contenu
  return heading.locator("xpath=ancestor::*[contains(@class, 'rounded')][1]")
}

test.describe("Alternatives recommandées — page détail", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await skipIfEmptyCatalog(page, testInfo)
    await setupLocalStorage(page)
  })

  test("affiche le message d'état vide quand aucune alternative n'est définie", async ({ page }) => {
    // On part de l'accueil et on prend le 1er logiciel : très peu de logiciels
    // ont des alternatives saisies pour l'instant, donc le 1er sans alternative
    // sert de cas négatif.
    await page.goto("/")
    await page.waitForSelector("[id^='software-']", { timeout: 10000 })

    // Récupère dynamiquement des UUIDs de cartes — on en visite plusieurs pour
    // tomber sur un sans alternative (DeepL Standard sera testé séparément).
    const cardLinks = await page.locator("a[href^='/logiciels/']").evaluateAll(els =>
      els.slice(0, 5).map(a => (a as HTMLAnchorElement).getAttribute("href"))
    )

    let foundEmpty = false
    for (const href of cardLinks) {
      if (!href) continue
      await page.goto(href)
      await page.waitForSelector("h1.tracking-tight", { timeout: 10000 })

      const emptyMessage = page.getByText(/pas d'alternative validée/i)
      if (await emptyMessage.isVisible({ timeout: 2000 }).catch(() => false)) {
        foundEmpty = true
        break
      }
    }

    expect(
      foundEmpty,
      "Au moins un des 5 premiers logiciels doit afficher le message d'alternative vide"
    ).toBe(true)
  })

  test("affiche DeepL Pro comme alternative cliquable sur la fiche DeepL Standard", async ({ page }) => {
    // UUIDs hardcodés correspondant à la saisie Directus 23.05.2026 (validée par SFA).
    // Si la saisie est retirée, ce test échoue — comportement attendu pour signaler
    // une régression des données de référence.
    const deeplStandardId = "876a1bc1-eecd-4909-bd16-0d7c0c247377"
    const deeplProId = "a36842de-f590-4206-997b-7e7462cdcb77"

    await page.goto(`/logiciels/${deeplStandardId}`)
    await page.waitForSelector("h1.tracking-tight", { timeout: 10000 })

    const card = await findAlternativesCard(page)

    // Le message vide ne doit PAS apparaître
    await expect(card.getByText(/pas d'alternative validée/i)).toHaveCount(0)

    // Le lien vers DeepL Pro doit être présent et cliquable
    const deeplProLink = card.locator(`a[href="/logiciels/${deeplProId}"]`)
    await expect(deeplProLink).toBeVisible()
    await expect(deeplProLink).toContainText(/deepl pro/i)
  })
})
