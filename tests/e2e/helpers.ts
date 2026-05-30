import type { Page, TestInfo } from "@playwright/test"
import { test } from "@playwright/test"

/**
 * Skip le test courant si le catalogue Directus est vide (aucune fiche
 * `status: published`). Sert à dégager les tests E2E qui exigent au moins
 * un logiciel publié pour s'exécuter, pendant les phases de validation
 * humaine où tout le catalogue est temporairement en `pending`.
 */
export async function skipIfEmptyCatalog(page: Page, testInfo: TestInfo): Promise<void> {
  const baseURL = testInfo.project.use.baseURL ?? "http://localhost:3000"
  const res = await page.request.get(`${baseURL}/api/software`)
  if (!res.ok()) {
    test.skip(true, `endpoint /api/software indisponible (HTTP ${res.status()})`)
    return
  }
  const items = await res.json() as unknown[]
  if (items.length === 0) {
    test.skip(true, "catalogue Directus vide (validation humaine en cours) — skip tests qui dépendent d'une fiche publiée")
  }
}
