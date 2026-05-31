import { test, expect } from "@playwright/test"
import { skipIfEmptyCatalog } from "./helpers"

async function setupLocalStorage(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    localStorage.setItem("referentiel-dp-audience", JSON.stringify({ audience: "SEN", hasChosen: true }))
    localStorage.setItem("referentiel-onboarding-done", "true")
  })
}

test.describe("Accessibilité — dark mode et light mode", () => {
  test("la page catalogue se charge correctement", async ({ page }) => {
    await setupLocalStorage(page)
    await page.goto("/")
    await page.waitForSelector("[id^='software-']", { timeout: 10000 })

    const heading = page.getByRole("heading", { name: /référentiel logiciels/i })
    await expect(heading).toBeVisible()
  })

  test("le toggle dark mode fonctionne", async ({ page }) => {
    await setupLocalStorage(page)
    await page.goto("/")
    await page.waitForSelector("[id^='software-']", { timeout: 10000 })

    // UColorModeButton de Nuxt UI
    const colorModeButton = page.locator("button").filter({ has: page.locator("[class*='i-lucide-sun'], [class*='i-lucide-moon']") })
    if (await colorModeButton.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      await colorModeButton.first().click()
      await page.waitForTimeout(300)

      const htmlClass = await page.locator("html").getAttribute("class")
      expect(htmlClass).toContain("dark")

      // Le heading doit toujours être visible en dark mode
      const heading = page.getByRole("heading", { name: /référentiel logiciels/i })
      await expect(heading).toBeVisible()
    }
  })

  test("la page détail fonctionne en dark mode", async ({ page }, testInfo) => {
    await skipIfEmptyCatalog(page, testInfo)
    await setupLocalStorage(page)
    await page.addInitScript(() => {
      localStorage.setItem("nuxt-color-mode", "dark")
    })
    // V1 : récupère dynamiquement la 1re fiche depuis la liste (UUIDs Directus)
    await page.goto("/")
    const firstCard = page.locator("a[href^='/logiciels/']").first()
    const href = await firstCard.getAttribute("href")
    await page.goto(href!)
    await page.waitForSelector("h1", { timeout: 10000 })

    const title = page.locator("h1")
    await expect(title).toBeVisible()
  })
})

test.describe("Accessibilité — tailles de caractères", () => {
  test("aucun texte de contenu principal n'est en dessous de 14px", async ({ page }) => {
    await setupLocalStorage(page)
    await page.goto("/")
    await page.waitForSelector("[id^='software-']", { timeout: 10000 })

    const smallTexts = await page.evaluate(() => {
      const elements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, td, th, label")
      const tooSmall: string[] = []

      elements.forEach((el) => {
        const style = window.getComputedStyle(el)
        const fontSize = parseFloat(style.fontSize)
        const text = (el as HTMLElement).innerText?.trim()

        if (!text || text.length === 0) return
        if (style.display === "none" || style.visibility === "hidden") return
        if (el.classList.contains("sr-only")) return
        if ((el as HTMLElement).offsetWidth === 0 || (el as HTMLElement).offsetHeight === 0) return

        if (fontSize < 14 && fontSize > 0) {
          tooSmall.push(`"${text.substring(0, 50)}" = ${fontSize}px (${el.tagName})`)
        }
      })

      return tooSmall
    })

    if (smallTexts.length > 0) {
      console.log("Textes de contenu < 14px trouvés :", smallTexts)
    }
    // Seuls les éléments de contenu (p, h*, li) sont vérifiés, pas les boutons/badges
    expect(smallTexts.length).toBe(0)
  })

  test("les titres ont une hiérarchie correcte", async ({ page }) => {
    await setupLocalStorage(page)
    await page.goto("/")
    await page.waitForSelector("[id^='software-']", { timeout: 10000 })

    const headingSizes = await page.evaluate(() => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      return Array.from(headings).map(h => ({
        tag: h.tagName,
        text: (h as HTMLElement).innerText?.trim().substring(0, 50),
        fontSize: parseFloat(window.getComputedStyle(h).fontSize)
      })).filter(h => h.text && h.text.length > 0)
    })

    const h1 = headingSizes.find(h => h.tag === "H1")
    const h2s = headingSizes.filter(h => h.tag === "H2")

    if (h1 && h2s.length > 0) {
      for (const h2 of h2s) {
        expect(
          h1.fontSize,
          `H1 (${h1.fontSize}px) devrait être >= H2 (${h2.fontSize}px)`
        ).toBeGreaterThanOrEqual(h2.fontSize)
      }
    }
  })
})

test.describe("Accessibilité — contrastes", () => {
  test("le texte principal a un contraste suffisant", async ({ page }) => {
    await setupLocalStorage(page)
    await page.goto("/")
    await page.waitForSelector("[id^='software-']", { timeout: 10000 })

    const contrastIssues = await page.evaluate(() => {
      function getLuminance(r: number, g: number, b: number): number {
        const [rs, gs, bs] = [r, g, b].map((c) => {
          c = c / 255
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
        })
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
      }

      function getContrastRatio(l1: number, l2: number): number {
        const lighter = Math.max(l1, l2)
        const darker = Math.min(l1, l2)
        return (lighter + 0.05) / (darker + 0.05)
      }

      function parseColor(color: string): [number, number, number] | null {
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (!match) return null
        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
      }

      function isTransparent(color: string): boolean {
        return color === "rgba(0, 0, 0, 0)" || color === "transparent"
      }

      // Remonter le DOM pour trouver le vrai background
      function getEffectiveBgColor(el: Element): string | null {
        let current: Element | null = el
        while (current) {
          const bg = window.getComputedStyle(current).backgroundColor
          if (!isTransparent(bg)) return bg
          current = current.parentElement
        }
        return "rgb(255, 255, 255)" // Fond blanc par défaut
      }

      const issues: string[] = []
      // Ne vérifier que les éléments de contenu, pas les éléments interactifs stylisés
      const elements = document.querySelectorAll("p, h1, h2, h3")

      elements.forEach((el) => {
        const style = window.getComputedStyle(el)
        const text = (el as HTMLElement).innerText?.trim()

        if (!text || text.length === 0) return
        if (style.display === "none" || style.visibility === "hidden") return
        if (el.classList.contains("sr-only")) return
        if ((el as HTMLElement).offsetWidth === 0 || (el as HTMLElement).offsetHeight === 0) return

        const textColor = parseColor(style.color)
        const bgColorStr = getEffectiveBgColor(el)
        const bgColor = bgColorStr ? parseColor(bgColorStr) : null

        if (textColor && bgColor) {
          const textLum = getLuminance(...textColor)
          const bgLum = getLuminance(...bgColor)
          const ratio = getContrastRatio(textLum, bgLum)
          const fontSize = parseFloat(style.fontSize)
          const minRatio = fontSize >= 18 ? 3 : 4.5 // WCAG AA

          if (ratio < minRatio) {
            issues.push(
              `"${text.substring(0, 30)}" ratio=${ratio.toFixed(1)} (min ${minRatio}) — ${style.color} sur ${bgColorStr}`
            )
          }
        }
      })

      return issues
    })

    if (contrastIssues.length > 0) {
      console.log("Problèmes de contraste :", contrastIssues)
    }
    expect(contrastIssues.length).toBe(0)
  })
})

test.describe("Responsive — mobile", () => {
  test("le menu hamburger est visible sur mobile", async ({ page, isMobile }) => {
    if (!isMobile) return

    await setupLocalStorage(page)
    await page.goto("/")
    await page.waitForSelector("[id^='software-']", { timeout: 10000 })

    // Nuxt UI UHeader génère un bouton menu sur mobile
    const menuButton = page.locator("header button").first()
    await expect(menuButton).toBeVisible()
  })

  test("les cartes sont empilées sur mobile", async ({ page, isMobile }) => {
    if (!isMobile) return

    await setupLocalStorage(page)
    await page.goto("/")
    await page.waitForSelector("[id^='software-']", { timeout: 10000 })

    const cards = page.locator("[id^='software-']")
    const count = await cards.count()

    if (count >= 2) {
      const firstBox = await cards.first().boundingBox()
      const secondBox = await cards.nth(1).boundingBox()

      if (firstBox && secondBox) {
        // En colonne unique, la deuxième carte est en dessous
        expect(secondBox.y).toBeGreaterThan(firstBox.y)
      }
    }
  })
})

test.describe("Navigation — header", () => {
  test("le lien 'Protection des données' navigue correctement", async ({ page, isMobile }) => {
    await setupLocalStorage(page)
    await page.goto("/")
    await page.waitForSelector("[id^='software-']", { timeout: 10000 })

    if (isMobile) {
      // Ouvrir le menu mobile
      const menuButton = page.locator("header button").first()
      await menuButton.click()
      await page.waitForTimeout(300)
    }

    const dpLink = page.getByRole("link", { name: /protection des données/i }).first()
    if (await dpLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await dpLink.click()
      await expect(page).toHaveURL(/protection-des-donnees/)
    }
  })
})
