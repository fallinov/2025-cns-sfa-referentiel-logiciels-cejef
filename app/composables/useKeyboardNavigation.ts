/**
 * Composable pour gérer la navigation au clavier dans une liste de suggestions
 * Utilisé par SearchBar pour la navigation dans les résultats d'autocomplétion
 */

export interface NavigationSuggestions {
  categories: string[]
  disciplines: string[]
  activities: string[]
  software: Array<{ id: string, name: string, shortDescription: string, icon?: string | null }>
}

export type NavigationType = "search" | "category" | "discipline" | "activity" | "software"

export function useKeyboardNavigation(
  suggestions: Ref<NavigationSuggestions>,
  onCategorySelect: (category: string) => void,
  onDisciplineSelect: (discipline: string) => void,
  onActivitySelect: (activity: string) => void,
  onSoftwareSelect: (softwareId: string) => void,
  onEnterWithoutSelection: () => void
) {
  const selectedIndex = ref(-1)
  const selectedType = ref<NavigationType>("search")

  const maxCategoryIndex = computed(() => suggestions.value.categories.length - 1)
  const maxDisciplineIndex = computed(() => suggestions.value.disciplines.length - 1)
  const maxActivityIndex = computed(() => suggestions.value.activities.length - 1)
  const maxSoftwareIndex = computed(() => suggestions.value.software.length - 1)

  const resetSelection = () => {
    selectedIndex.value = -1
    selectedType.value = "search"
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const hasCategories = suggestions.value.categories.length > 0
    const hasDisciplines = suggestions.value.disciplines.length > 0
    const hasActivities = suggestions.value.activities.length > 0
    const hasSoftware = suggestions.value.software.length > 0

    if (!hasCategories && !hasDisciplines && !hasActivities && !hasSoftware) return

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        handleArrowDown(hasCategories, hasDisciplines, hasActivities, hasSoftware)
        break

      case "ArrowUp":
        event.preventDefault()
        handleArrowUp(hasCategories, hasDisciplines, hasActivities, hasSoftware)
        break

      case "Enter":
        event.preventDefault()
        handleEnter()
        break

      case "Escape":
        resetSelection()
        break
    }
  }

  const handleArrowDown = (
    hasCategories: boolean,
    hasDisciplines: boolean,
    hasActivities: boolean,
    hasSoftware: boolean
  ) => {
    if (selectedType.value === "search") {
      // Premier élément de la première section disponible
      if (hasCategories) {
        selectedType.value = "category"
        selectedIndex.value = 0
      } else if (hasDisciplines) {
        selectedType.value = "discipline"
        selectedIndex.value = 0
      } else if (hasActivities) {
        selectedType.value = "activity"
        selectedIndex.value = 0
      } else if (hasSoftware) {
        selectedType.value = "software"
        selectedIndex.value = 0
      }
    } else if (selectedType.value === "category") {
      if (selectedIndex.value < maxCategoryIndex.value) {
        selectedIndex.value++
      } else {
        // Passer à la section suivante
        if (hasDisciplines) {
          selectedType.value = "discipline"
          selectedIndex.value = 0
        } else if (hasActivities) {
          selectedType.value = "activity"
          selectedIndex.value = 0
        } else if (hasSoftware) {
          selectedType.value = "software"
          selectedIndex.value = 0
        }
      }
    } else if (selectedType.value === "discipline") {
      if (selectedIndex.value < maxDisciplineIndex.value) {
        selectedIndex.value++
      } else {
        if (hasActivities) {
          selectedType.value = "activity"
          selectedIndex.value = 0
        } else if (hasSoftware) {
          selectedType.value = "software"
          selectedIndex.value = 0
        }
      }
    } else if (selectedType.value === "activity") {
      if (selectedIndex.value < maxActivityIndex.value) {
        selectedIndex.value++
      } else {
        if (hasSoftware) {
          selectedType.value = "software"
          selectedIndex.value = 0
        }
      }
    } else if (selectedType.value === "software") {
      if (selectedIndex.value < maxSoftwareIndex.value) {
        selectedIndex.value++
      }
    }
  }

  const handleArrowUp = (
    hasCategories: boolean,
    hasDisciplines: boolean,
    hasActivities: boolean,
    _hasSoftware: boolean
  ) => {
    if (selectedType.value === "software") {
      if (selectedIndex.value > 0) {
        selectedIndex.value--
      } else {
        // Revenir à la section précédente
        if (hasActivities) {
          selectedType.value = "activity"
          selectedIndex.value = maxActivityIndex.value
        } else if (hasDisciplines) {
          selectedType.value = "discipline"
          selectedIndex.value = maxDisciplineIndex.value
        } else if (hasCategories) {
          selectedType.value = "category"
          selectedIndex.value = maxCategoryIndex.value
        } else {
          selectedType.value = "search"
          selectedIndex.value = -1
        }
      }
    } else if (selectedType.value === "activity") {
      if (selectedIndex.value > 0) {
        selectedIndex.value--
      } else {
        if (hasDisciplines) {
          selectedType.value = "discipline"
          selectedIndex.value = maxDisciplineIndex.value
        } else if (hasCategories) {
          selectedType.value = "category"
          selectedIndex.value = maxCategoryIndex.value
        } else {
          selectedType.value = "search"
          selectedIndex.value = -1
        }
      }
    } else if (selectedType.value === "discipline") {
      if (selectedIndex.value > 0) {
        selectedIndex.value--
      } else {
        if (hasCategories) {
          selectedType.value = "category"
          selectedIndex.value = maxCategoryIndex.value
        } else {
          selectedType.value = "search"
          selectedIndex.value = -1
        }
      }
    } else if (selectedType.value === "category") {
      if (selectedIndex.value > 0) {
        selectedIndex.value--
      } else {
        selectedType.value = "search"
        selectedIndex.value = -1
      }
    }
  }

  const handleEnter = () => {
    if (selectedIndex.value === -1) {
      // Aucun élément sélectionné
      onEnterWithoutSelection()
    } else if (selectedType.value === "category") {
      const category = suggestions.value.categories[selectedIndex.value]
      if (category) {
        onCategorySelect(category)
        resetSelection()
      }
    } else if (selectedType.value === "discipline") {
      const discipline = suggestions.value.disciplines[selectedIndex.value]
      if (discipline) {
        onDisciplineSelect(discipline)
        resetSelection()
      }
    } else if (selectedType.value === "activity") {
      const activity = suggestions.value.activities[selectedIndex.value]
      if (activity) {
        onActivitySelect(activity)
        resetSelection()
      }
    } else if (selectedType.value === "software") {
      const software = suggestions.value.software[selectedIndex.value]
      if (software) {
        onSoftwareSelect(software.id)
        resetSelection()
      }
    }
  }

  return {
    selectedIndex,
    selectedType,
    handleKeyDown,
    resetSelection
  }
}
