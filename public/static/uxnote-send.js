/**
 * UXNote Send Button — Injected into UXNote toolbar
 * Adds a "Send" icon button in UXNote's toolbar (class: wn-annot-group).
 * Load this script AFTER uxnote.min.js.
 */
(function () {
  "use strict"

  var API_URL = "https://kode.ch/uxnotes/feedback.php"
  var ANNOTATIONS_URL = "https://kode.ch/uxnotes/annotations/"
  var LIST_URL = "https://kode.ch/uxnotes/list.php"

  function getAnnotations() {
    var annotations = []
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i)
      if (!key) continue
      if (key.indexOf("referentiel") !== -1) continue
      if (key.indexOf("nuxt") !== -1) continue
      if (key.indexOf("vueuse") !== -1) continue
      try {
        var value = JSON.parse(localStorage.getItem(key))
        if (value && typeof value === "object") {
          annotations.push({ key: key, data: value })
        }
      } catch (e) { /* not JSON */ }
    }
    return annotations
  }

  function sendAnnotations() {
    var annotations = getAnnotations()
    if (annotations.length === 0) {
      showMessage("Aucune annotation à envoyer", "warning")
      return
    }

    var payload = {
      pageUrl: window.location.href.split("?")[0],
      pageTitle: document.title,
      sentAt: new Date().toISOString(),
      annotations: annotations,
      screen: { width: window.innerWidth, height: window.innerHeight },
      userAgent: navigator.userAgent
    }

    showMessage("Envoi en cours...", "info")

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json() })
      .then(function (data) {
        if (data.success) {
          showMessage("Retour envoyé !", "success")
        } else {
          showMessage("Erreur : " + (data.error || "inconnue"), "error")
        }
      })
      .catch(function (err) {
        showMessage("Erreur réseau : " + err.message, "error")
      })
  }

  function showMessage(text, type) {
    var existing = document.getElementById("uxnote-send-msg")
    if (existing) existing.remove()

    var msg = document.createElement("div")
    msg.id = "uxnote-send-msg"
    msg.textContent = text

    var colors = {
      success: "#22c55e", error: "#ef4444",
      warning: "#f59e0b", info: "#3b82f6"
    }

    msg.style.cssText = "position:fixed;bottom:70px;left:50%;transform:translateX(-50%);"
      + "background:" + (colors[type] || colors.info) + ";color:#fff;padding:10px 20px;"
      + "border-radius:8px;font-family:-apple-system,sans-serif;font-size:14px;"
      + "font-weight:600;z-index:999999;box-shadow:0 4px 12px rgba(0,0,0,0.15);"

    document.body.appendChild(msg)
    setTimeout(function () {
      msg.style.opacity = "0"
      msg.style.transition = "opacity 0.3s"
      setTimeout(function () { msg.remove() }, 300)
    }, 3000)
  }

  function createSendSvg() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("class", "wn-annot-icon")
    svg.setAttribute("viewBox", "0 0 24 24")
    svg.setAttribute("fill", "none")
    svg.setAttribute("stroke", "currentColor")
    svg.setAttribute("stroke-width", "2")
    svg.setAttribute("stroke-linecap", "round")
    svg.setAttribute("stroke-linejoin", "round")

    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path1.setAttribute("d", "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z")

    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path2.setAttribute("d", "m21.854 2.147-10.94 10.939")

    svg.appendChild(path1)
    svg.appendChild(path2)
    return svg
  }

  function injectIntoToolbar() {
    // Don't inject twice
    if (document.getElementById("uxnote-send-btn")) return true

    // Find UXNote toolbar groups by class
    var groups = document.querySelectorAll(".wn-annot-group")
    if (groups.length < 2) return false

    // The 2nd group contains Import/Export — hide it and replace with our send button
    var targetGroup = groups[1]
    targetGroup.style.display = "none"

    // Also hide the spacer before Import/Export group
    var prevSpacer = targetGroup.previousElementSibling
    if (prevSpacer && prevSpacer.classList.contains("wn-annot-spacer")) {
      prevSpacer.style.display = "none"
    }

    // Create a new group for the send button (replaces Import/Export)
    var spacer = document.createElement("div")
    spacer.className = "wn-annot-spacer wn-annotator"

    var newGroup = document.createElement("div")
    newGroup.className = "wn-annot-group wn-annotator"

    // Create send button with same classes as UXNote buttons
    var btn = document.createElement("button")
    btn.id = "uxnote-send-btn"
    btn.className = "wn-annot-btn wn-annotator"
    btn.title = "Envoyer les annotations"
    btn.appendChild(createSendSvg())

    // Add tooltip span like UXNote does
    var tooltip = document.createElement("span")
    tooltip.className = "wn-annot-tooltip wn-annotator"
    tooltip.textContent = "Envoyer"
    btn.appendChild(tooltip)

    btn.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()
      sendAnnotations()
    })

    newGroup.appendChild(btn)

    // Insert after the 2nd group (Import/Export)
    var toolbar = targetGroup.parentElement
    if (toolbar) {
      // Insert spacer + new group after the import/export group
      var nextSibling = targetGroup.nextSibling
      toolbar.insertBefore(spacer, nextSibling)
      toolbar.insertBefore(newGroup, spacer.nextSibling)
      return true
    }

    return false
  }

  // Poll until UXNote toolbar is ready
  var attempts = 0
  var maxAttempts = 40

  function tryInject() {
    attempts++
    if (injectIntoToolbar()) return
    if (attempts < maxAttempts) {
      setTimeout(tryInject, 500)
    }
  }

  // Auto-load annotations from server if ?load=ID or ?load=all is in the URL
  function loadAnnotations() {
    var params = new URLSearchParams(window.location.search)
    var loadId = params.get("load")
    if (!loadId) return

    var fetchUrl = loadId === "all"
      ? LIST_URL
      : ANNOTATIONS_URL + encodeURIComponent(loadId) + ".json"

    showMessage("Chargement des annotations...", "info")

    fetch(fetchUrl)
      .then(function (res) {
        if (!res.ok) throw new Error("Annotations non trouvées")
        return res.json()
      })
      .then(function (data) {
        var annotations = data.annotations || []
        var imported = 0

        annotations.forEach(function (entry) {
          if (entry.key && entry.data) {
            localStorage.setItem(entry.key, JSON.stringify(entry.data))
            imported++
          }
        })

        var total = data.count || imported
        if (total > 0) {
          var msg = loadId === "all"
            ? total + " annotation(s) de " + (data.files || "?") + " retour(s) chargée(s)"
            : total + " annotation(s) chargée(s)"
          showMessage(msg + " — rechargement...", "success")
          setTimeout(function () {
            var url = new URL(window.location.href)
            url.searchParams.delete("load")
            window.location.href = url.toString()
          }, 2000)
        } else {
          showMessage("Aucune annotation à charger", "warning")
        }
      })
      .catch(function (err) {
        showMessage("Erreur : " + err.message, "error")
      })
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      loadAnnotations()
      setTimeout(tryInject, 1500)
    })
  } else {
    loadAnnotations()
    setTimeout(tryInject, 1500)
  }
})()
