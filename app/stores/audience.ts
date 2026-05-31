import type { ThemeAudience } from "~~/types/data-protection"

const STORAGE_KEY = "referentiel-dp-audience"

export const useAudienceStore = defineStore("audience", () => {
  const audience = ref<ThemeAudience>("SEN")
  const hasChosen = ref(false)

  function init() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    // Migration des valeurs minuscules persistées par les anciennes versions
    // (sen → SEN, cejef → SFP). Une fois migrées, la nouvelle valeur est
    // réécrite en localStorage.
    const upgraded: ThemeAudience | null
      = stored === "sen" || stored === "SEN"
        ? "SEN"
        : stored === "cejef" || stored === "SFP"
          ? "SFP"
          : null
    if (upgraded) {
      audience.value = upgraded
      hasChosen.value = true
      if (stored !== upgraded) {
        localStorage.setItem(STORAGE_KEY, upgraded)
      }
    }
  }

  function setAudience(value: ThemeAudience) {
    audience.value = value
    hasChosen.value = true
    localStorage.setItem(STORAGE_KEY, value)
  }

  function reset() {
    hasChosen.value = false
    localStorage.removeItem(STORAGE_KEY)
  }

  return { audience, hasChosen, init, setAudience, reset }
})
