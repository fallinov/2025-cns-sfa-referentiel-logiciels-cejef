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

describe("IconGridFilter.vue — seuil barre de recherche", () => {
  it("masque la barre de recherche pour les listes < 15 items", async () => {
    // 4 items < seuil → pas de barre
    const wrapper = mount(IconGridFilter, {
      props: { items, title: "Filtrer", placeholder: "Activités", leadingIcon: "i-lucide-puzzle", modelValue: [] },
      global: { stubs: globalStubs }
    })
    await wrapper.find("button").trigger("click")
    // Aucun input texte rendu dans la modale
    expect(wrapper.find("input").exists()).toBe(false)
  })

  it("affiche la barre de recherche pour les listes >= 15 items", async () => {
    const manyItems: TestItem[] = Array.from({ length: 15 }, (_, i) => ({
      value: `item-${i}`,
      label: `Item ${i}`,
      count: i + 1,
      icon: null
    }))
    const wrapper = mount(IconGridFilter, {
      props: { items: manyItems, title: "Filtrer", placeholder: "Catégories", leadingIcon: "i-lucide-tag", modelValue: [] },
      global: { stubs: globalStubs }
    })
    await wrapper.find("button").trigger("click")
    expect(wrapper.find("input").exists()).toBe(true)
  })
})

describe("IconGridFilter.vue — modal grille", () => {
  it("rend toutes les cartes triées par count desc puis alphabétique (position stable, pas de selected-first)", async () => {
    // La carte selectionnee NE remonte PAS en haut — la position reste stable
    // pour preserver la reconnaissance spatiale (Material Design 3 / NN/g 2024).
    const wrapper = mount(IconGridFilter, {
      props: { items, title: "Filtrer", placeholder: "Catégories", leadingIcon: "i-lucide-tag", modelValue: ["eval"] },
      global: { stubs: globalStubs }
    })
    await wrapper.find("button").trigger("click")
    const allButtons = wrapper.findAll("button")
    const cardButtons = allButtons.filter(b => b.attributes("aria-pressed") !== undefined || b.attributes("aria-disabled") === "true")
    expect(cardButtons).toHaveLength(4)
    // Tri par count decroissant : Bureautique (12), Création (8), Évaluation (6), Catégorie rare (1)
    expect(cardButtons[0]!.text()).toContain("Bureautique")
    expect(cardButtons[1]!.text()).toContain("Création")
    expect(cardButtons[2]!.text()).toContain("Évaluation")
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

  it("rend les cartes avec count=0 en mode disabled (aria-disabled + bouton :disabled)", async () => {
    const withEmpty: TestItem[] = [
      ...items,
      { value: "empty", label: "Catégorie vide", count: 0, icon: "i-lucide-shield-check" }
    ]
    const wrapper = mount(IconGridFilter, {
      props: { items: withEmpty, title: "Filtrer", placeholder: "Catégories", leadingIcon: "i-lucide-tag", modelValue: [] },
      global: { stubs: globalStubs }
    })
    await wrapper.find("button").trigger("click")
    const allButtons = wrapper.findAll("button")
    const emptyCard = allButtons.find(b => b.text().includes("Catégorie vide"))
    expect(emptyCard).toBeDefined()
    expect(emptyCard!.attributes("aria-disabled")).toBe("true")
    expect(emptyCard!.attributes("disabled")).toBeDefined()
  })

  it("clic sur une carte count=0 ne modifie pas la sélection (defense-in-depth)", async () => {
    const withEmpty: TestItem[] = [
      ...items,
      { value: "empty", label: "Catégorie vide", count: 0, icon: null }
    ]
    const wrapper = mount(IconGridFilter, {
      props: { items: withEmpty, title: "Filtrer", placeholder: "Catégories", leadingIcon: "i-lucide-tag", modelValue: [] },
      global: { stubs: globalStubs }
    })
    await wrapper.find("button").trigger("click")
    const emptyCard = wrapper.findAll("button").find(b => b.text().includes("Catégorie vide"))
    // Force le click pour bypasser le :disabled HTML — verifie la garde JS
    await emptyCard!.trigger("click")
    expect(wrapper.props("modelValue")).toEqual([])
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
