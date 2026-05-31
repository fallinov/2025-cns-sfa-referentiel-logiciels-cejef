import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { setActivePinia, createPinia } from "pinia"
import SoftwareListEmpty from "~/components/SoftwareListEmpty.vue"

/**
 * Stubs pour les composants Nuxt UI utilisés dans le template.
 * UButton forwarde $attrs pour préserver `to` (mailto), data-* et aria-*.
 */
const globalStubs = {
  UIcon: {
    props: ["name"],
    template: "<span class=\"icon\" :data-icon=\"name\" />"
  },
  UButton: {
    props: ["color", "to", "icon", "size", "variant"],
    inheritAttrs: false,
    template: "<button type=\"button\" :data-to=\"to\" v-bind=\"$attrs\" @click=\"$emit('click')\"><slot /></button>"
  }
}

function mountEmpty(props: { hasActiveFilters: boolean, searchQuery?: string }) {
  setActivePinia(createPinia())
  return mount(SoftwareListEmpty, {
    props,
    global: { stubs: globalStubs }
  })
}

describe("SoftwareListEmpty.vue", () => {
  it("affiche le titre éditorial 'Aidez-nous à enrichir le référentiel'", () => {
    const wrapper = mountEmpty({ hasActiveFilters: false })
    expect(wrapper.text()).toContain("Aidez-nous à enrichir")
    expect(wrapper.text()).toContain("le référentiel")
  })

  it("affiche le message participatif", () => {
    const wrapper = mountEmpty({ hasActiveFilters: false })
    expect(wrapper.text()).toContain("Cet outil se construit avec vous")
  })

  it("affiche le CTA 'Proposer un logiciel' avec un mailto", () => {
    const wrapper = mountEmpty({ hasActiveFilters: false })
    const proposeBtn = wrapper.findAll("button").find(b => b.text().includes("Proposer un logiciel"))
    expect(proposeBtn).toBeDefined()
    expect(proposeBtn!.attributes("data-to")).toMatch(/^mailto:steve\.fallet@jura\.ch/)
  })

  it("pré-remplit le mailto avec la recherche utilisateur", () => {
    const wrapper = mountEmpty({ hasActiveFilters: true, searchQuery: "Canva" })
    const proposeBtn = wrapper.findAll("button").find(b => b.text().includes("Proposer un logiciel"))!
    const mailto = decodeURIComponent(proposeBtn.attributes("data-to") ?? "")
    expect(mailto).toContain("Nom du logiciel : Canva")
  })

  it("NE montre PAS le bouton 'Réinitialiser' quand hasActiveFilters=false", () => {
    const wrapper = mountEmpty({ hasActiveFilters: false })
    const resetBtn = wrapper.findAll("button").find(b => b.text().includes("Réinitialiser"))
    expect(resetBtn).toBeUndefined()
  })

  it("montre le bouton 'Réinitialiser les filtres' quand hasActiveFilters=true", () => {
    const wrapper = mountEmpty({ hasActiveFilters: true })
    const resetBtn = wrapper.findAll("button").find(b => b.text().includes("Réinitialiser les filtres"))
    expect(resetBtn).toBeDefined()
  })

  it("émet l'événement 'clear' quand le bouton Réinitialiser est cliqué", async () => {
    const wrapper = mountEmpty({ hasActiveFilters: true })
    const resetBtn = wrapper.findAll("button").find(b => b.text().includes("Réinitialiser les filtres"))!
    await resetBtn.trigger("click")
    expect(wrapper.emitted("clear")).toBeTruthy()
  })

  it("n'émet aucun événement avant clic", () => {
    const wrapper = mountEmpty({ hasActiveFilters: true })
    expect(wrapper.emitted("clear")).toBeFalsy()
  })
})
