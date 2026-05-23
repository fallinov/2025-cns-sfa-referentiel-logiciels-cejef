import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import SoftwareFeatureBadge from "~/components/SoftwareFeatureBadge.vue"

const globalStubs = {
  UTooltip: {
    props: ["text"],
    template: "<div class=\"tooltip\" :data-tooltip=\"text\"><slot /></div>"
  },
  UBadge: {
    inheritAttrs: false,
    props: ["color", "variant"],
    template: "<span class=\"badge\" :data-color=\"color\" :data-variant=\"variant\" v-bind=\"$attrs\"><slot name=\"leading\" /><slot /></span>"
  },
  UIcon: {
    props: ["name"],
    template: "<span :data-icon=\"name\" :class=\"$attrs.class\" />"
  }
}

describe("SoftwareFeatureBadge.vue", () => {
  describe("Variante simple (sans tooltip)", () => {
    it("rend un badge avec icône et label", () => {
      const wrapper = mount(SoftwareFeatureBadge, {
        props: { icon: "i-lucide-star", label: "Favoris" },
        global: { stubs: globalStubs }
      })
      expect(wrapper.find("[data-icon='i-lucide-star']").exists()).toBe(true)
      expect(wrapper.text()).toContain("Favoris")
    })

    it("N'ENVELOPPE PAS dans UTooltip quand tooltip absent", () => {
      const wrapper = mount(SoftwareFeatureBadge, {
        props: { icon: "i-lucide-star", label: "Favoris" },
        global: { stubs: globalStubs }
      })
      expect(wrapper.find(".tooltip").exists()).toBe(false)
    })

    it("applique aria-label pour l'accessibilité", () => {
      const wrapper = mount(SoftwareFeatureBadge, {
        props: { icon: "i-lucide-star", label: "Favoris" },
        global: { stubs: globalStubs }
      })
      const badge = wrapper.find(".badge")
      expect(badge.attributes("aria-label")).toBe("Favoris")
    })
  })

  describe("Variante avec tooltip", () => {
    it("enveloppe le badge dans un UTooltip", () => {
      const wrapper = mount(SoftwareFeatureBadge, {
        props: { icon: "i-lucide-info", label: "Info", tooltip: "Plus d'informations" },
        global: { stubs: globalStubs }
      })
      const tooltip = wrapper.find(".tooltip")
      expect(tooltip.exists()).toBe(true)
      expect(tooltip.attributes("data-tooltip")).toBe("Plus d'informations")
    })
  })

  describe("Option hideLabel", () => {
    it("hideLabel=false : affiche le texte du label", () => {
      const wrapper = mount(SoftwareFeatureBadge, {
        props: { icon: "i-lucide-star", label: "Favoris", hideLabel: false },
        global: { stubs: globalStubs }
      })
      expect(wrapper.text()).toContain("Favoris")
    })

    it("hideLabel=true : cache le texte mais garde l'aria-label", () => {
      const wrapper = mount(SoftwareFeatureBadge, {
        props: { icon: "i-lucide-star", label: "Favoris", hideLabel: true },
        global: { stubs: globalStubs }
      })
      // Le span <span v-if="!hideLabel"> n'est pas rendu
      const visibleText = wrapper.text().trim()
      expect(visibleText).toBe("")
      // Mais aria-label reste pour les lecteurs d'écran
      expect(wrapper.find(".badge").attributes("aria-label")).toBe("Favoris")
    })
  })

  describe("Taille (size)", () => {
    it("size par défaut = 'md' (icône w-4 h-4)", () => {
      const wrapper = mount(SoftwareFeatureBadge, {
        props: { icon: "i-lucide-star", label: "Favoris" },
        global: { stubs: globalStubs }
      })
      const icon = wrapper.find("[data-icon='i-lucide-star']")
      expect(icon.classes().join(" ")).toContain("w-4")
    })

    it("size='sm' utilise une icône plus petite (w-3.5)", () => {
      const wrapper = mount(SoftwareFeatureBadge, {
        props: { icon: "i-lucide-star", label: "Favoris", size: "sm" },
        global: { stubs: globalStubs }
      })
      const icon = wrapper.find("[data-icon='i-lucide-star']")
      expect(icon.classes().join(" ")).toContain("w-3.5")
    })
  })
})
