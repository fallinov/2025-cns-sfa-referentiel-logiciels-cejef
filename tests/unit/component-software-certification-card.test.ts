import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import SoftwareCertificationCard from "~/components/SoftwareCertificationCard.vue"
import type { Software } from "~~/types/software"

const globalStubs = {
  UIcon: {
    props: ["name"],
    template: "<span class=\"icon\" :data-icon=\"name\" :class=\"$attrs.class\" />"
  },
  UButton: {
    props: ["color", "icon", "size", "variant"],
    inheritAttrs: false,
    template: "<button type=\"button\" v-bind=\"$attrs\" @click=\"$emit('click')\"><slot /></button>"
  }
}

const lgpdLabels = {
  hosting: { 1: "Suisse / UE", 2: "Autre", 3: "USA" },
  rgpd: { 1: "Conforme", 2: "Partiel", 3: "Non conforme" },
  dataCollection: { 1: "Minimale", 2: "Modérée", 3: "Excessive" }
}

function makeSoftware(overrides: Partial<Software> = {}): Software {
  return {
    id: "test-id",
    name: "Test Software",
    icon: null,
    shortDescription: "Description courte",
    description: null,
    lgpd: { hosting: 1, rgpd: 1, dataCollection: 1 },
    certificationLevel: 1,
    dataLocation: "Suisse",
    cost: "Gratuit",
    toolUrl: "https://example.com",
    documentation: null,
    targetAudience: null,
    requiresParentalConsent: false,
    requiresEduAccount: false,
    requiresEdulog: false,
    approvedBySEN: false,
    approvedBySFP: false,
    usageNotes: null,
    alternatives: [],
    categories: [],
    pedagogicalActivities: [],
    ...overrides
  }
}

function mountCard(software: Software, certificationLevel = software.certificationLevel) {
  return mount(SoftwareCertificationCard, {
    props: { software, certificationLevel, lgpdLabels },
    global: { stubs: globalStubs }
  })
}

describe("SoftwareCertificationCard.vue — bloc Note d'usage", () => {
  describe("Visibilité de la note", () => {
    it("n'affiche pas le bloc Note si usageNotes est null", () => {
      const wrapper = mountCard(makeSoftware({ usageNotes: null, certificationLevel: 2 }))
      expect(wrapper.text()).not.toContain("Note :")
    })

    it("n'affiche pas le bloc Note si usageNotes est une chaîne vide", () => {
      const wrapper = mountCard(makeSoftware({ usageNotes: "", certificationLevel: 2 }))
      expect(wrapper.text()).not.toContain("Note :")
    })

    it("n'affiche pas le bloc Note si usageNotes ne contient que des espaces", () => {
      const wrapper = mountCard(makeSoftware({ usageNotes: "   \n\t  ", certificationLevel: 2 }))
      expect(wrapper.text()).not.toContain("Note :")
    })

    it("affiche le bloc Note quand usageNotes est renseigné, niveau 1 (vert)", () => {
      const wrapper = mountCard(makeSoftware({
        usageNotes: "Configurer le compte enseignant en mode privé",
        certificationLevel: 1,
        lgpd: { hosting: 1, rgpd: 1, dataCollection: 1 }
      }))
      expect(wrapper.text()).toContain("Note :")
      expect(wrapper.text()).toContain("Configurer le compte enseignant en mode privé")
    })

    it("affiche le bloc Note quand usageNotes est renseigné, niveau 2 (orange)", () => {
      const wrapper = mountCard(makeSoftware({
        usageNotes: "Utiliser uniquement avec un alias",
        certificationLevel: 2,
        lgpd: { hosting: 2, rgpd: 1, dataCollection: 1 }
      }))
      expect(wrapper.text()).toContain("Note :")
      expect(wrapper.text()).toContain("Utiliser uniquement avec un alias")
    })

    it("affiche le bloc Note quand usageNotes est renseigné, niveau 3 (rouge)", () => {
      const wrapper = mountCard(makeSoftware({
        usageNotes: "Conservé en attente de l'évaluation SEN",
        certificationLevel: 3,
        lgpd: { hosting: 3, rgpd: 3, dataCollection: 3 }
      }))
      expect(wrapper.text()).toContain("Note :")
      expect(wrapper.text()).toContain("Conservé en attente de l'évaluation SEN")
    })
  })

  describe("Couleur de la note adaptée au niveau", () => {
    it("niveau 1 (vert) : la note utilise les classes vertes", () => {
      const wrapper = mountCard(makeSoftware({
        usageNotes: "Note verte",
        certificationLevel: 1
      }))
      const noteDiv = wrapper.find("div.italic")
      expect(noteDiv.exists()).toBe(true)
      const classAttr = noteDiv.attributes("class") ?? ""
      expect(classAttr).toContain("bg-green-50")
      expect(classAttr).toContain("text-green-800")
    })

    it("niveau 2 (orange) : la note utilise les classes orange", () => {
      const wrapper = mountCard(makeSoftware({
        usageNotes: "Note orange",
        certificationLevel: 2
      }))
      const noteDiv = wrapper.find("div.italic")
      expect(noteDiv.exists()).toBe(true)
      const classAttr = noteDiv.attributes("class") ?? ""
      expect(classAttr).toContain("bg-orange-50")
      expect(classAttr).toContain("text-orange-800")
    })

    it("niveau 3 (rouge) : la note utilise les classes rouges", () => {
      const wrapper = mountCard(makeSoftware({
        usageNotes: "Note rouge",
        certificationLevel: 3
      }))
      const noteDiv = wrapper.find("div.italic")
      expect(noteDiv.exists()).toBe(true)
      const classAttr = noteDiv.attributes("class") ?? ""
      expect(classAttr).toContain("bg-red-50")
      expect(classAttr).toContain("text-red-800")
    })
  })
})
