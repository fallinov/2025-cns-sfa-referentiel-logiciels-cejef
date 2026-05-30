import { test, expect } from "@playwright/test"

test.describe("UXNote", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?uxnote=1")
    // Attendre que la toolbar UXNote soit injectée
    await page.waitForSelector(".wn-annot-group", { timeout: 15000 })
    // Isoler chaque test : retirer toute clé uxnote:* persistée d'un test
    // précédent (Playwright partage le contexte BrowserContext entre tests
    // d'une même worker). `getAnnotations()` côté uxnote-send.js itère tout
    // le localStorage sauf les clés filtrées (referentiel/nuxt/vueuse), donc
    // un `uxnote:site:*` setup par un autre test fausse le compte ici.
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter(k => k.startsWith("uxnote:"))
        .forEach(k => localStorage.removeItem(k))
    })
  })

  test("la toolbar UXNote et le bouton Envoyer sont visibles", async ({ page }) => {
    // La toolbar UXNote est présente avec au moins 2 groupes de boutons
    const groups = page.locator(".wn-annot-group")
    await expect(groups.first()).toBeVisible()
    expect(await groups.count()).toBeGreaterThanOrEqual(2)

    // Bouton Envoyer injecté par uxnote-send.js
    await expect(page.locator("#uxnote-send-btn")).toBeVisible()
  })

  test("le bouton Envoyer affiche un message si aucune annotation", async ({ page }) => {
    // Pré-condition : le beforeEach a vidé toutes les clés uxnote:* du
    // localStorage, donc `getAnnotations()` doit retourner 0 → message
    // « Aucune annotation à envoyer » (vérifié avant le contrôle du nom).
    await page.locator("#uxnote-send-btn").click()

    const toast = page.locator("#uxnote-send-msg")
    await expect(toast).toBeVisible()
    await expect(toast).toContainText("Aucune annotation")
  })

  test("le toast est au-dessus de la barre UXNote (z-index max)", async ({ page }) => {
    await page.locator("#uxnote-send-btn").click()

    const toast = page.locator("#uxnote-send-msg")
    await expect(toast).toBeVisible()

    // Le toast doit avoir z-index = 2147483647 (INT_MAX, même niveau que UXNote)
    const toastZIndex = await toast.evaluate(el => getComputedStyle(el).zIndex)
    expect(Number(toastZIndex)).toBe(2147483647)
  })

  test("le toast est positionné en haut de page (pas en bas)", async ({ page }) => {
    await page.locator("#uxnote-send-btn").click()

    const toast = page.locator("#uxnote-send-msg")
    await expect(toast).toBeVisible()

    const box = await toast.boundingBox()
    expect(box).not.toBeNull()
    // Le toast doit être dans le top 100px de la page
    expect(box!.y).toBeLessThan(100)
  })

  test("le toast disparaît après quelques secondes", async ({ page }) => {
    await page.locator("#uxnote-send-btn").click()

    const toast = page.locator("#uxnote-send-msg")
    await expect(toast).toBeVisible()

    // Attendre la disparition (3s + 0.3s transition)
    await expect(toast).toBeHidden({ timeout: 5000 })
  })

  test("le panneau d'annotations est traduit en français", async ({ page }) => {
    // Le panneau latéral doit contenir les textes traduits
    await expect(page.locator("text=Aucune annotation pour le moment.")).toBeVisible()
    await expect(page.locator("label:has-text('Priorité')")).toBeVisible()
    await expect(page.locator("label:has-text('Évaluateur')")).toBeVisible()
  })

  test("le champ nom du reviewer est vide par défaut", async ({ page }) => {
    // Le nom est stocké dans localStorage — vérifier qu'il est vide
    const authorName = await page.evaluate(() => {
      const key = `uxnote:annotator:${location.protocol}//${location.host}`
      return localStorage.getItem(key) || ""
    })
    expect(authorName).toBe("")
  })

  test("envoyer sans nom affiche un avertissement", async ({ page }) => {
    // Ajouter une annotation pour que le bouton Envoyer ne dise pas "Aucune annotation"
    // On simule en ajoutant une entrée localStorage
    await page.evaluate(() => {
      const key = `uxnote:site:${location.protocol}//${location.host}`
      localStorage.setItem(key, JSON.stringify([{
        id: "test-ann-1",
        type: "text",
        priority: "medium",
        comment: "Test",
        author: ""
      }]))
    })

    // Le champ nom est vide → cliquer Envoyer
    await page.locator("#uxnote-send-btn").click()

    const toast = page.locator("#uxnote-send-msg")
    await expect(toast).toBeVisible()
    await expect(toast).toContainText("Saisissez votre nom")
  })
})
