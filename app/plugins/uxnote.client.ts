/**
 * UXNote — outil d'annotation pour recueillir les retours des testeurs.
 * Chargé uniquement sur GitHub Pages (staging) via ?uxnote=1 dans l'URL.
 * Self-hosted depuis /static/uxnote.min.js (pas de CDN externe).
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL

  // Vérifier si ?uxnote=1 est dans l'URL
  const urlParams = new URLSearchParams(window.location.search)
  const isActivated = urlParams.get("uxnote") === "1"

  if (!isActivated) return

  // Activer uniquement sur staging (GitHub Pages) ou en dev local
  const isStaging = baseURL.length > 1
  const isDev = import.meta.dev

  if (!isStaging && !isDev) return

  // Injecter le script UXNote
  const script = document.createElement("script")
  script.src = `${baseURL}static/uxnote.min.js`.replace(/\/+/g, "/")
  script.setAttribute("data-mailto", "steve.fallet@divtec.ch")
  script.setAttribute("data-is-tool-visible-at-first-launch", "true")
  script.defer = true
  document.body.appendChild(script)

  // Injecter le bouton "Envoyer" (companion script)
  const sendScript = document.createElement("script")
  sendScript.src = `${baseURL}static/uxnote-send.js`.replace(/\/+/g, "/")
  sendScript.defer = true
  document.body.appendChild(sendScript)
})
