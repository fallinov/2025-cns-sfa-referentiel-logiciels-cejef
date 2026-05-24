import { describe, it, expect, beforeEach } from "vitest"
import { useSoftware } from "~/composables/useSoftware"
import type { Software } from "~~/types/software"

function makeSoftware(partial: Partial<Software> & { id: string, name: string }): Software {
  return {
    shortDescription: "desc",
    lgpd: { hosting: 1, rgpd: 1, dataCollection: 1 },
    certificationLevel: 1,
    dataLocation: "Suisse",
    cost: "Gratuit",
    toolUrl: "https://example.com",
    ...partial
  }
}

describe("useSoftware — accès partagé via useState", () => {
  const word = makeSoftware({ id: "word-id", name: "Word" })
  const teams = makeSoftware({ id: "teams-id", name: "Microsoft Teams" })

  beforeEach(() => {
    const list = useState<Software[]>("software-list", () => [])
    list.value = [word, teams]
  })

  it("expose un Ref softwareList partagé", () => {
    const { softwareList } = useSoftware()
    expect(softwareList.value).toHaveLength(2)
    expect(softwareList.value[0].name).toBe("Word")
  })

  it("getSoftwareList retourne la liste actuelle non-réactivement", () => {
    const { getSoftwareList } = useSoftware()
    const list = getSoftwareList()
    expect(list).toHaveLength(2)
    expect(list.map(s => s.id)).toEqual(["word-id", "teams-id"])
  })

  it("getSoftwareById trouve par UUID exact", () => {
    const { getSoftwareById } = useSoftware()
    const result = getSoftwareById("teams-id")
    expect(result?.name).toBe("Microsoft Teams")
  })

  it("getSoftwareById retourne undefined pour un id inconnu", () => {
    const { getSoftwareById } = useSoftware()
    expect(getSoftwareById("uuid-inexistant")).toBeUndefined()
  })

  it("partage le useState entre plusieurs appels du composable", () => {
    const a = useSoftware()
    const b = useSoftware()
    // Mutation via une instance visible depuis l'autre (même useState sous-jacent)
    a.softwareList.value = [makeSoftware({ id: "new-id", name: "Nouveau" })]
    expect(b.getSoftwareList().map(s => s.name)).toEqual(["Nouveau"])
  })
})
