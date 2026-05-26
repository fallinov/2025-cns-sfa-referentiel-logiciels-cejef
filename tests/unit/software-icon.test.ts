import { describe, it, expect } from "vitest"
import { getSoftwareIcon, DEFAULT_SOFTWARE_ICON } from "~/utils/software-icon"

describe("getSoftwareIcon — cascade de fallback", () => {
  it("retourne l'icône propre du logiciel quand elle est définie", () => {
    const software = {
      icon: "i-simple-icons-canva",
      categories: [{ name: "Création", icon: "i-lucide-palette" }]
    }
    expect(getSoftwareIcon(software)).toBe("i-simple-icons-canva")
  })

  it("retourne l'icône de la première catégorie si software.icon est null", () => {
    const software = {
      icon: null,
      categories: [
        { name: "Présentation", icon: "i-lucide-presentation" },
        { name: "Création", icon: "i-lucide-palette" }
      ]
    }
    expect(getSoftwareIcon(software)).toBe("i-lucide-presentation")
  })

  it("retourne l'icône de la première catégorie si software.icon est une chaîne vide", () => {
    const software = {
      icon: "",
      categories: [{ name: "Maths", icon: "i-lucide-compass" }]
    }
    expect(getSoftwareIcon(software)).toBe("i-lucide-compass")
  })

  it("retourne le fallback i-lucide-app-window si pas d'icône ni catégories", () => {
    const software = { icon: null, categories: [] }
    expect(getSoftwareIcon(software)).toBe(DEFAULT_SOFTWARE_ICON)
    expect(getSoftwareIcon(software)).toBe("i-lucide-app-window")
  })

  it("retourne le fallback si categories est undefined", () => {
    const software = { icon: null }
    expect(getSoftwareIcon(software)).toBe(DEFAULT_SOFTWARE_ICON)
  })

  it("retourne le fallback si la première catégorie n'a pas d'icône", () => {
    const software = {
      icon: null,
      categories: [{ name: "Sans icône", icon: null }]
    }
    expect(getSoftwareIcon(software)).toBe(DEFAULT_SOFTWARE_ICON)
  })

  it("ignore une icône de catégorie nulle et passe au fallback (pas de regard plus loin)", () => {
    // Choix produit : on n'essaie PAS la 2e catégorie. La première gagne ou on
    // tombe directement sur le fallback générique — règle simple, prévisible.
    const software = {
      icon: null,
      categories: [
        { name: "Première", icon: null },
        { name: "Seconde", icon: "i-lucide-book" }
      ]
    }
    expect(getSoftwareIcon(software)).toBe(DEFAULT_SOFTWARE_ICON)
  })
})
