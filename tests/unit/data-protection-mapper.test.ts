import { describe, it, expect } from "vitest"
import {
  mapDataProtectionThemes,
  type DirectusDpTheme,
  type DirectusDpSection,
  type DirectusDpItem,
  type DirectusDpResource,
  type DirectusDpResourceOwner
} from "~~/server/utils/data-protection"

describe("mapDataProtectionThemes — Directus → DataProtectionTheme[]", () => {
  const theme: DirectusDpTheme = {
    id: "theme-1",
    sort: 0,
    title: "Cadre légal",
    short_title: "Cadre",
    icon: "i-lucide-scale",
    description: "Bases légales",
    audience: null
  }

  const section: DirectusDpSection = {
    id: "section-1",
    sort: 0,
    title: "Réécriture LEO",
    icon: "i-lucide-book",
    audience: null,
    theme_id: "theme-1"
  }

  const item: DirectusDpItem = {
    id: "item-1",
    sort: 0,
    title: "Réécriture de la LEO",
    icon: "i-lucide-book",
    description: "<p>Texte HTML <strong>en gras</strong></p>",
    audience: null,
    section_id: "section-1"
  }

  const resource: DirectusDpResource = {
    id: "res-1",
    sort: 0,
    title: "nLPD",
    url: "https://fedlex.ch",
    source: "Fedlex",
    type: "link",
    description: null,
    file_size: null,
    audience: null
  }

  const owner: DirectusDpResourceOwner = {
    id: 1,
    dp_resource_id: "res-1",
    collection: "dp_item",
    item: "item-1"
  }

  it("retourne un tableau avec la bonne arborescence imbriquée", () => {
    const result = mapDataProtectionThemes({
      themes: [theme],
      sections: [section],
      items: [item],
      resources: [resource],
      owners: [owner]
    })

    expect(result).toHaveLength(1)
    expect(result[0].title).toBe("Cadre légal")
    expect(result[0].sections).toHaveLength(1)
    expect(result[0].sections[0].items).toHaveLength(1)
    expect(result[0].sections[0].items[0].resources).toHaveLength(1)
    expect(result[0].sections[0].items[0].resources[0].title).toBe("nLPD")
  })

  it("préserve le HTML rich text de description sans le modifier", () => {
    const result = mapDataProtectionThemes({
      themes: [theme],
      sections: [section],
      items: [item],
      resources: [],
      owners: []
    })

    expect(result[0].sections[0].items[0].description).toBe("<p>Texte HTML <strong>en gras</strong></p>")
  })

  it("fallback shortTitle = title si short_title est null", () => {
    const themeWithoutShort: DirectusDpTheme = { ...theme, short_title: null }
    const result = mapDataProtectionThemes({
      themes: [themeWithoutShort],
      sections: [],
      items: [],
      resources: [],
      owners: []
    })

    expect(result[0].shortTitle).toBe("Cadre légal")
  })

  it("retourne une liste vide de sections si aucune section n'est rattachée", () => {
    const result = mapDataProtectionThemes({
      themes: [theme],
      sections: [],
      items: [],
      resources: [],
      owners: []
    })

    expect(result[0].sections).toEqual([])
  })

  it("ignore une ressource dont l'owner pointe vers un item inexistant", () => {
    const orphanOwner: DirectusDpResourceOwner = {
      id: 2,
      dp_resource_id: "res-1",
      collection: "dp_item",
      item: "item-inexistant"
    }
    const result = mapDataProtectionThemes({
      themes: [theme],
      sections: [section],
      items: [item],
      resources: [resource],
      owners: [orphanOwner]
    })

    expect(result[0].sections[0].items[0].resources).toHaveLength(0)
  })

  it("propage le champ audience du thème si renseigné", () => {
    const themeWithAudience: DirectusDpTheme = { ...theme, audience: ["sen"] }
    const result = mapDataProtectionThemes({
      themes: [themeWithAudience],
      sections: [],
      items: [],
      resources: [],
      owners: []
    })

    expect(result[0].audience).toEqual(["sen"])
  })

  it("attache plusieurs ressources au même item via plusieurs owners", () => {
    const resource2: DirectusDpResource = { ...resource, id: "res-2", title: "LEO RSJU", url: "https://rsju.jura.ch" }
    const owner2: DirectusDpResourceOwner = { id: 2, dp_resource_id: "res-2", collection: "dp_item", item: "item-1" }

    const result = mapDataProtectionThemes({
      themes: [theme],
      sections: [section],
      items: [item],
      resources: [resource, resource2],
      owners: [owner, owner2]
    })

    expect(result[0].sections[0].items[0].resources).toHaveLength(2)
    expect(result[0].sections[0].items[0].resources.map(r => r.title)).toEqual(["nLPD", "LEO RSJU"])
  })
})
