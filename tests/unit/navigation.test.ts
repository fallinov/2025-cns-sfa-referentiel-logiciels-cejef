import { describe, it, expect, beforeEach } from "vitest"
import type { Software } from "~~/types/software"
import { softwareList } from "~/data/software-list"

/**
 * Tests pour la logique de navigation prev/next.
 * On teste l'algorithme directement car useSoftwareNavigation
 * dépend de useState (SSR Nuxt).
 */

// Reproduit la logique de navigation du composable
function getPreviousSoftware(list: Software[], currentId: string): Software | null {
  if (!list.length) return null
  const currentIndex = list.findIndex(s => s.id === currentId)
  if (currentIndex === -1) return null
  const previousIndex = currentIndex === 0 ? list.length - 1 : currentIndex - 1
  return list[previousIndex] || null
}

function getNextSoftware(list: Software[], currentId: string): Software | null {
  if (!list.length) return null
  const currentIndex = list.findIndex(s => s.id === currentId)
  if (currentIndex === -1) return null
  const nextIndex = currentIndex === list.length - 1 ? 0 : currentIndex + 1
  return list[nextIndex] || null
}

function getCurrentPosition(list: Software[], currentId: string): { current: number, total: number } {
  const currentIndex = list.findIndex(s => s.id === currentId)
  return { current: currentIndex + 1, total: list.length }
}

describe("navigation prev/next", () => {
  let sortedList: Software[]

  beforeEach(() => {
    sortedList = [...softwareList].sort((a, b) => a.name.localeCompare(b.name))
  })

  describe("getNextSoftware", () => {
    it("retourne le logiciel suivant", () => {
      const first = sortedList[0]
      const second = sortedList[1]
      expect(getNextSoftware(sortedList, first.id)?.id).toBe(second.id)
    })

    it("boucle au début quand on est à la fin", () => {
      const last = sortedList[sortedList.length - 1]
      const first = sortedList[0]
      expect(getNextSoftware(sortedList, last.id)?.id).toBe(first.id)
    })

    it("retourne null si l'id n'existe pas", () => {
      expect(getNextSoftware(sortedList, "inexistant-id")).toBeNull()
    })

    it("retourne null si la liste est vide", () => {
      expect(getNextSoftware([], "some-id")).toBeNull()
    })
  })

  describe("getPreviousSoftware", () => {
    it("retourne le logiciel précédent", () => {
      const second = sortedList[1]
      const first = sortedList[0]
      expect(getPreviousSoftware(sortedList, second.id)?.id).toBe(first.id)
    })

    it("boucle à la fin quand on est au début", () => {
      const first = sortedList[0]
      const last = sortedList[sortedList.length - 1]
      expect(getPreviousSoftware(sortedList, first.id)?.id).toBe(last.id)
    })

    it("retourne null si l'id n'existe pas", () => {
      expect(getPreviousSoftware(sortedList, "inexistant-id")).toBeNull()
    })

    it("retourne null si la liste est vide", () => {
      expect(getPreviousSoftware([], "some-id")).toBeNull()
    })
  })

  describe("getCurrentPosition", () => {
    it("retourne la position correcte (1-indexed)", () => {
      const third = sortedList[2]
      const pos = getCurrentPosition(sortedList, third.id)
      expect(pos.current).toBe(3)
      expect(pos.total).toBe(sortedList.length)
    })

    it("retourne 0 pour un id inexistant", () => {
      const pos = getCurrentPosition(sortedList, "inexistant-id")
      expect(pos.current).toBe(0) // findIndex retourne -1, +1 = 0
    })

    it("le total correspond à la longueur de la liste", () => {
      const first = sortedList[0]
      const pos = getCurrentPosition(sortedList, first.id)
      expect(pos.total).toBe(sortedList.length)
    })
  })

  describe("navigation circulaire complète", () => {
    it("parcourir toute la liste en avançant revient au point de départ", () => {
      const startId = sortedList[0].id
      let currentId = startId

      for (let i = 0; i < sortedList.length; i++) {
        const next = getNextSoftware(sortedList, currentId)
        expect(next).not.toBeNull()
        currentId = next!.id
      }

      // Après N avancées, on revient au début
      expect(currentId).toBe(startId)
    })

    it("parcourir toute la liste en reculant revient au point de départ", () => {
      const startId = sortedList[0].id
      let currentId = startId

      for (let i = 0; i < sortedList.length; i++) {
        const prev = getPreviousSoftware(sortedList, currentId)
        expect(prev).not.toBeNull()
        currentId = prev!.id
      }

      expect(currentId).toBe(startId)
    })
  })

  describe("navigation avec liste filtrée", () => {
    it("fonctionne avec une sous-liste filtrée", () => {
      // Simuler une liste filtrée (ex: uniquement niveau 1)
      const filteredList = softwareList.filter(s => s.certificationLevel === 1)
        .sort((a, b) => a.name.localeCompare(b.name))

      expect(filteredList.length).toBeGreaterThan(0)

      const first = filteredList[0]
      const next = getNextSoftware(filteredList, first.id)
      expect(next).not.toBeNull()

      if (filteredList.length > 1) {
        expect(next!.id).toBe(filteredList[1].id)
      } else {
        // Un seul élément → boucle sur lui-même
        expect(next!.id).toBe(first.id)
      }
    })

    it("avec un seul élément, next et prev retournent le même élément", () => {
      const singleList = [softwareList[0]]
      const id = singleList[0].id

      expect(getNextSoftware(singleList, id)?.id).toBe(id)
      expect(getPreviousSoftware(singleList, id)?.id).toBe(id)
    })
  })
})
