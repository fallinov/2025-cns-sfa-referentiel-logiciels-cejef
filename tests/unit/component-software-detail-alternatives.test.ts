import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import SoftwareDetailAlternatives from "~/components/SoftwareDetailAlternatives.vue"
import type { Software } from "~~/types/software"

function makeSoftware(p: Partial<Software> & { id: string, name: string }): Software {
  return {
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
  UButton: {
    props: ["to", "color", "variant", "size", "icon"],
    template: "<a :href=\"to\" class=\"u-button\"><slot /></a>"
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
    it("affiche un CTA « Proposer une alternative » au lieu d'un message « pas d'alternative »", () => {
      const wrapper = mount(SoftwareDetailAlternatives, {
        props: { alternatives: [], softwareName: "Adobe Acrobat" },
        global: { stubs: globalStubs }
      })
      expect(wrapper.text()).toContain("Proposer une alternative")
      expect(wrapper.text()).not.toContain("Pas d'alternative validée")
    })

    it("le lien CTA est un mailto pré-rempli avec le nom du logiciel courant", () => {
      const wrapper = mount(SoftwareDetailAlternatives, {
        props: { alternatives: [], softwareName: "Adobe Acrobat" },
        global: { stubs: globalStubs }
      })
      const ctaLink = wrapper.find(".u-button")
      expect(ctaLink.exists()).toBe(true)
      const href = ctaLink.attributes("href") ?? ""
      expect(href).toContain("mailto:steve.fallet@jura.ch")
      expect(href).toContain(encodeURIComponent("Adobe Acrobat"))
    })

    it("conserve le titre 'Logiciels alternatifs recommandés' même en état vide", () => {
      const wrapper = mount(SoftwareDetailAlternatives, {
        props: { alternatives: [] },
        global: { stubs: globalStubs }
      })
      expect(wrapper.text()).toContain("Logiciels alternatifs recommandés")
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

    it("NE montre PAS le CTA d'état vide quand des alternatives sont présentes", () => {
      const alts = [makeSoftware({ id: "id-1", name: "Word" })]
      const wrapper = mount(SoftwareDetailAlternatives, {
        props: { alternatives: alts, softwareName: "Adobe Acrobat" },
        global: { stubs: globalStubs }
      })
      expect(wrapper.text()).not.toContain("Proposer une alternative")
      expect(wrapper.text()).not.toContain("Vous connaissez une alternative")
    })
  })
})
