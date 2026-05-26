import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import IconGridFilter from "~/components/software/IconGridFilter.vue"

/**
 * Stubs pour les composants Nuxt UI utilises dans le template.
 * Le UModal est stubbe pour exposer son contenu (slots) directement,
 * ce qui evite la machinerie teleporte / overlay de la vraie modal.
 */
const globalStubs = {
  UIcon: {
    props: ["name"],
    template: "<span class=\"icon\" :data-icon=\"name\" />"
  },
  UButton: {
    props: ["color", "variant", "size"],
    inheritAttrs: false,
    template: "<button type=\"button\" v-bind=\"$attrs\" @click=\"$emit('click')\"><slot name=\"leading\" /><slot /><slot name=\"trailing\" /></button>"
  },
  UBadge: {
    props: ["color", "size"],
    template: "<span class=\"badge\"><slot /></span>"
  },
  UInput: {
    props: ["modelValue", "placeholder", "icon", "size"],
    emits: ["update:modelValue"],
    template: "<input :placeholder=\"placeholder\" :value=\"modelValue\" @input=\"$emit('update:modelValue', $event.target.value)\" />"
  },
  UModal: {
    props: ["open", "title", "ui"],
    emits: ["update:open"],
    template: "<div v-if=\"open\" class=\"modal\"><div class=\"modal-header\"><slot name=\"header\" /></div><div class=\"modal-body\"><slot name=\"body\" /></div><div class=\"modal-footer\"><slot name=\"footer\" /></div></div>"
  }
}

interface TestItem {
  value: string
  label: string
  count: number
  icon?: string | null
}

const items: TestItem[] = [
  { value: "bureau", label: "Bureautique", count: 12, icon: "i-lucide-briefcase" },
  { value: "creation", label: "Création", count: 8, icon: "i-lucide-palette" },
  { value: "eval", label: "Évaluation", count: 6, icon: "i-lucide-check" },
  { value: "low", label: "Catégorie rare", count: 1, icon: null }
]

describe("IconGridFilter.vue — bouton trigger", () => {
  it("affiche le placeholder quand aucune sélection", () => {
    const wrapper = mount(IconGridFilter, {
      props: { items, title: "Filtrer", placeholder: "Catégories", leadingIcon: "i-lucide-tag", modelValue: [] },
      global: { stubs: globalStubs }
    })
    // le 1er button (trigger) contient le placeholder
    expect(wrapper.find("button").text()).toContain("Catégories")
  })

  it("affiche le label de l'item sélectionné quand 1 seule sélection", () => {
    const wrapper = mount(IconGridFilter, {
      props: { items, title: "Filtrer", placeholder: "Catégories", leadingIcon: "i-lucide-tag", modelValue: ["bureau"] },
      global: { stubs: globalStubs }
    })
    expect(wrapper.find("button").text()).toContain("Bureautique")
  })

  it("affiche le compteur quand plusieurs sélections", () => {
    const wrapper = mount(IconGridFilter, {
      props: { items, title: "Filtrer", placeholder: "Catégories", leadingIcon: "i-lucide-tag", modelValue: ["bureau", "creation", "eval"] },
      global: { stubs: globalStubs }
    })
    expect(wrapper.find("button").text()).toContain("Catégories (3)")
  })
})

describe("IconGridFilter.vue — modal grille", () => {
  it("rend toutes les cartes triées (sélectionnées d'abord puis par count desc)", async () => {
    const wrapper = mount(IconGridFilter, {
      props: { items, title: "Filtrer", placeholder: "Catégories", leadingIcon: "i-lucide-tag", modelValue: ["eval"] },
      global: { stubs: globalStubs }
    })
    await wrapper.find("button").trigger("click")
    // 4 items au total (4 cartes + 2 boutons footer + 1 bouton trigger)
    const allButtons = wrapper.findAll("button")
    // Premier item rendu dans la grille doit être la sélection (eval)
    const cardButtons = allButtons.filter(b => b.attributes("aria-pressed") !== undefined)
    expect(cardButtons).toHaveLength(4)
    expect(cardButtons[0]!.text()).toContain("Évaluation")
    // Ensuite par count desc : Bureautique (12), Création (8), Catégorie rare (1)
    expect(cardButtons[1]!.text()).toContain("Bureautique")
    expect(cardButtons[2]!.text()).toContain("Création")
    expect(cardButtons[3]!.text()).toContain("Catégorie rare")
  })

  it("indique aria-pressed=true sur la carte sélectionnée", async () => {
    const wrapper = mount(IconGridFilter, {
      props: { items, title: "Filtrer", placeholder: "Catégories", leadingIcon: "i-lucide-tag", modelValue: ["bureau"] },
      global: { stubs: globalStubs }
    })
    await wrapper.find("button").trigger("click")
    const cardButtons = wrapper.findAll("button").filter(b => b.attributes("aria-pressed") !== undefined)
    const selected = cardButtons.find(b => b.attributes("aria-pressed") === "true")
    expect(selected).toBeDefined()
    expect(selected!.text()).toContain("Bureautique")
  })

  it("affiche le compteur de logiciels sur chaque carte", async () => {
    const wrapper = mount(IconGridFilter, {
      props: { items, title: "Filtrer", placeholder: "Catégories", leadingIcon: "i-lucide-tag", modelValue: [] },
      global: { stubs: globalStubs }
    })
    await wrapper.find("button").trigger("click")
    const text = wrapper.text()
    expect(text).toContain("12 logiciels")
    expect(text).toContain("8 logiciels")
    expect(text).toContain("1 logiciel")
  })

  it("le badge du header affiche le nombre de sélections", async () => {
    const wrapper = mount(IconGridFilter, {
      props: { items, title: "Filtrer", placeholder: "Catégories", leadingIcon: "i-lucide-tag", modelValue: ["bureau", "creation"] },
      global: { stubs: globalStubs }
    })
    await wrapper.find("button").trigger("click")
    const badge = wrapper.find(".badge")
    expect(badge.text()).toBe("2")
  })

  it("footer affiche 'Aucune sélection' quand vide, 'X sélectionnées' sinon", async () => {
    const wrapperEmpty = mount(IconGridFilter, {
      props: { items, title: "Filtrer", placeholder: "Catégories", leadingIcon: "i-lucide-tag", modelValue: [] },
      global: { stubs: globalStubs }
    })
    await wrapperEmpty.find("button").trigger("click")
    expect(wrapperEmpty.find(".modal-footer").text()).toContain("Aucune sélection")

    const wrapperSelected = mount(IconGridFilter, {
      props: { items, title: "Filtrer", placeholder: "Catégories", leadingIcon: "i-lucide-tag", modelValue: ["bureau", "creation"] },
      global: { stubs: globalStubs }
    })
    await wrapperSelected.find("button").trigger("click")
    expect(wrapperSelected.find(".modal-footer").text()).toContain("2 sélectionnées")
  })
})
