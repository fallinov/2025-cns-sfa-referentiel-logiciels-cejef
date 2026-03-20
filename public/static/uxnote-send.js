/**
 * UXNote Send Button — Injected into UXNote toolbar
 * Adds a "Send" button directly inside UXNote's bottom toolbar.
 * Load this script AFTER uxnote.min.js.
 */
(function () {
  "use strict"

  var API_URL = "https://kode.ch/uxnotes/feedback.php"

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
    svg.setAttribute("width", "20")
    svg.setAttribute("height", "20")
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
    var allElements = document.querySelectorAll("*")
    var toolbar = null

    for (var i = 0; i < allElements.length; i++) {
      var el = allElements[i]
      var style = window.getComputedStyle(el)

      if (style.position === "fixed" && parseInt(style.bottom) <= 5
        && el.offsetHeight < 80 && el.offsetHeight > 20
        && el.querySelectorAll("button, svg").length >= 3) {
        toolbar = el
        break
      }
    }

    if (!toolbar) return false

    var buttonContainer = null
    var children = toolbar.querySelectorAll("div")
    for (var j = 0; j < children.length; j++) {
      var child = children[j]
      if (child.querySelectorAll("button, svg").length >= 3) {
        buttonContainer = child
      }
    }

    if (!buttonContainer) buttonContainer = toolbar

    var btn = document.createElement("button")
    btn.appendChild(createSendSvg())
    btn.title = "Envoyer les annotations"
    btn.style.cssText = "background:none;border:none;cursor:pointer;padding:8px;"
      + "color:inherit;display:flex;align-items:center;justify-content:center;"
      + "border-radius:4px;transition:background 0.2s;"

    btn.addEventListener("mouseenter", function () {
      btn.style.background = "rgba(59,130,246,0.2)"
      btn.style.color = "#3b82f6"
    })
    btn.addEventListener("mouseleave", function () {
      btn.style.background = "none"
      btn.style.color = "inherit"
    })
    btn.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()
      sendAnnotations()
    })

    buttonContainer.appendChild(btn)
    return true
  }

  var attempts = 0
  var maxAttempts = 30

  function tryInject() {
    attempts++
    if (injectIntoToolbar()) return
    if (attempts < maxAttempts) {
      setTimeout(tryInject, 500)
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(tryInject, 1000)
    })
  } else {
    setTimeout(tryInject, 1000)
  }
})()
