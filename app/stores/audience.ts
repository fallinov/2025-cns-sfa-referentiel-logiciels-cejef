import type { ThemeAudience } from "~~/types/data-protection"

const STORAGE_KEY = "referentiel-dp-audience"

export const useAudienceStore = defineStore("audience", () => {
  const audience = ref<ThemeAudience>("sen")
  const hasChosen = ref(false)

  function init() {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeAudience | null
    if (stored === "sen" || stored === "cejef") {
      audience.value = stored
      hasChosen.value = true
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
