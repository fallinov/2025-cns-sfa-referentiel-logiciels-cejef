import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import SoftwareListEmpty from "~/components/SoftwareListEmpty.vue"

/**
 * Stubs pour les composants Nuxt UI utilisés dans le template :
 * - UIcon : rendu avec data-icon pour vérifier
 * - UButton : préserve les events click et le slot
 */
const globalStubs = {
  UIcon: {
    props: ["name"],
    template: "<span class=\"icon\" :data-icon=\"name\" />"
  },
  UButton: {
    props: ["color"],
    template: "<button type=\"button\" @click=\"$emit('click')\"><slot /></button>"
  }
}

describe("SoftwareListEmpty.vue", () => {
  it("affiche le titre 'Aucun logiciel trouvé'", () => {
    const wrapper = mount(SoftwareListEmpty, {
      props: { hasActiveFilters: false },
      global: { stubs: globalStubs }
    })
    expect(wrapper.text()).toContain("Aucun logiciel trouvé")
  })

  it("affiche le texte d'aide complet", () => {
    const wrapper = mount(SoftwareListEmpty, {
      props: { hasActiveFilters: false },
      global: { stubs: globalStubs }
    })
    expect(wrapper.text()).toContain("modifier vos critères de recherche")
  })

  it("affiche l'icône search-x", () => {
    const wrapper = mount(SoftwareListEmpty, {
      props: { hasActiveFilters: false },
      global: { stubs: globalStubs }
    })
    expect(wrapper.find("[data-icon='i-lucide-search-x']").exists()).toBe(true)
  })

  it("NE montre PAS le bouton 'Réinitialiser' quand hasActiveFilters=false", () => {
    const wrapper = mount(SoftwareListEmpty, {
      props: { hasActiveFilters: false },
      global: { stubs: globalStubs }
    })
    expect(wrapper.find("button").exists()).toBe(false)
  })

  it("montre le bouton 'Réinitialiser les filtres' quand hasActiveFilters=true", () => {
    const wrapper = mount(SoftwareListEmpty, {
      props: { hasActiveFilters: true },
      global: { stubs: globalStubs }
    })
    const button = wrapper.find("button")
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain("Réinitialiser les filtres")
  })

  it("émet l'événement 'clear' quand le bouton est cliqué", async () => {
    const wrapper = mount(SoftwareListEmpty, {
      props: { hasActiveFilters: true },
      global: { stubs: globalStubs }
    })
    await wrapper.find("button").trigger("click")
    // Le stub UButton ré-émet 'click' qui propage 'clear' au parent.
    // On vérifie juste que l'événement a été émis au moins une fois.
    expect(wrapper.emitted("clear")).toBeTruthy()
    expect(wrapper.emitted("clear")!.length).toBeGreaterThanOrEqual(1)
  })

  it("n'émet aucun événement avant clic", () => {
    const wrapper = mount(SoftwareListEmpty, {
      props: { hasActiveFilters: true },
      global: { stubs: globalStubs }
    })
    expect(wrapper.emitted("clear")).toBeFalsy()
  })
})
