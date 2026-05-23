import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import SoftwareDetailAlternatives from "~/components/SoftwareDetailAlternatives.vue"
import type { Software } from "~~/types/software"

function makeSoftware(p: Partial<Software> & { id: string, name: string }): Software {
  return {
    logo: null,
    shortDescription: "desc",
    lgpd: { hosting: 1, rgpd: 1, dataCollection: 1 },
    certificationLevel: 1,
    dataLocation: "Suisse",
    cost: "Gratuit",
    toolUrl: "https://example.com",
    ...p
  }
}

const globalStubs = {
  UCard: { template: "<div class=\"u-card\"><slot /></div>" },
  UIcon: {
    props: ["name"],
    template: "<span :data-icon=\"name\" />"
  },
  NuxtLink: {
    props: ["to"],
    template: "<a :href=\"to\"><slot /></a>"
  },
  SoftwareLogoWithBadge: {
    props: ["software", "size"],
    template: "<div class=\"logo\" :data-id=\"software.id\" />"
  }
}

describe("SoftwareDetailAlternatives.vue", () => {
  describe("État vide", () => {
    it("affiche le message 'Pas d'alternative validée' quand alternatives est vide", () => {
      const wrapper = mount(SoftwareDetailAlternatives, {
        props: { alternatives: [] },
        global: { stubs: globalStubs }
      })
      expect(wrapper.text()).toContain("Pas d'alternative validée")
    })

    it("NE rend AUCUN lien quand alternatives est vide", () => {
      const wrapper = mount(SoftwareDetailAlternatives, {
        props: { alternatives: [] },
        global: { stubs: globalStubs }
      })
      expect(wrapper.findAll("a")).toHaveLength(0)
    })

    it("conserve le titre 'Alternatives recommandées' même en état vide", () => {
      const wrapper = mount(SoftwareDetailAlternatives, {
        props: { alternatives: [] },
        global: { stubs: globalStubs }
      })
      expect(wrapper.text()).toContain("Alternatives recommandées")
    })
  })

  describe("État rempli", () => {
    it("rend un lien par alternative", () => {
      const alts = [
        makeSoftware({ id: "id-1", name: "Word" }),
        makeSoftware({ id: "id-2", name: "Google Docs" })
      ]
      const wrapper = mount(SoftwareDetailAlternatives, {
        props: { alternatives: alts },
        global: { stubs: globalStubs }
      })
      expect(wrapper.findAll("a")).toHaveLength(2)
    })

    it("génère des liens vers /logiciels/<uuid>", () => {
      const alts = [makeSoftware({ id: "abc-123", name: "Test" })]
      const wrapper = mount(SoftwareDetailAlternatives, {
        props: { alternatives: alts },
        global: { stubs: globalStubs }
      })
      const link = wrapper.find("a")
      expect(link.attributes("href")).toBe("/logiciels/abc-123")
    })

    it("affiche le nom de chaque alternative", () => {
      const alts = [
        makeSoftware({ id: "id-1", name: "Word", shortDescription: "Bureautique" }),
        makeSoftware({ id: "id-2", name: "Google Docs", shortDescription: "Collaboration" })
      ]
      const wrapper = mount(SoftwareDetailAlternatives, {
        props: { alternatives: alts },
        global: { stubs: globalStubs }
      })
      const text = wrapper.text()
      expect(text).toContain("Word")
      expect(text).toContain("Google Docs")
      expect(text).toContain("Bureautique")
      expect(text).toContain("Collaboration")
    })

    it("NE montre PAS le message d'état vide quand des alternatives sont présentes", () => {
      const alts = [makeSoftware({ id: "id-1", name: "Word" })]
      const wrapper = mount(SoftwareDetailAlternatives, {
        props: { alternatives: alts },
        global: { stubs: globalStubs }
      })
      expect(wrapper.text()).not.toContain("Pas d'alternative validée")
    })
  })
})
