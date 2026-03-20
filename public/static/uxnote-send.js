/**
 * UXNote Send Button — Companion script
 * Adds a "Send" button to UXNote toolbar that sends annotations to the API.
 * Load this script AFTER uxnote.min.js.
 */
(function () {
  "use strict"

  var API_URL = "https://kode.ch/uxnotes/feedback.php"

  // Wait for UXNote toolbar to be ready
  var maxAttempts = 50
  var attempts = 0

  function findToolbar() {
    var toolbar = document.querySelector("[class*='uxnote']") ||
      document.querySelector("footer[style]") ||
      document.querySelector("[data-uxnote]")

    // Look for the UXNote bar at the bottom
    var allDivs = document.querySelectorAll("div")
    for (var i = 0; i < allDivs.length; i++) {
      if (allDivs[i].textContent.includes("UxNote") && allDivs[i].offsetHeight < 80) {
        return allDivs[i]
      }
    }
    return toolbar
  }

  function getAnnotations() {
    // UXNote stores annotations in localStorage with keys containing the URL
    var annotations = []
    var pageUrl = window.location.href.split("?")[0]

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i)
      // UXNote uses keys like "uxnote-..." or contains annotation data
      if (key && (key.indexOf("uxnote") !== -1 || key.indexOf("UxNote") !== -1)) {
        try {
          var value = JSON.parse(localStorage.getItem(key))
          if (value) {
            annotations.push({ key: key, data: value })
          }
        } catch (e) {
          // Not JSON, skip
        }
      }
    }

    // Also try to get all localStorage as fallback
    if (annotations.length === 0) {
      for (var j = 0; j < localStorage.length; j++) {
        var k = localStorage.key(j)
        if (k && k.indexOf("referentiel") === -1 && k.indexOf("nuxt") === -1) {
          try {
            var v = JSON.parse(localStorage.getItem(k))
            if (v && typeof v === "object" && (Array.isArray(v) || v.type || v.comment)) {
              annotations.push({ key: k, data: v })
            }
          } catch (e) {
            // Skip
          }
        }
      }
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
      screen: {
        width: window.innerWidth,
        height: window.innerHeight
      },
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
      success: { bg: "#22c55e", fg: "#fff" },
      error: { bg: "#ef4444", fg: "#fff" },
      warning: { bg: "#f59e0b", fg: "#fff" },
      info: { bg: "#3b82f6", fg: "#fff" }
    }
    var c = colors[type] || colors.info

    msg.style.cssText = "position:fixed;bottom:70px;left:50%;transform:translateX(-50%);"
      + "background:" + c.bg + ";color:" + c.fg + ";padding:10px 20px;border-radius:8px;"
      + "font-family:-apple-system,sans-serif;font-size:14px;font-weight:600;"
      + "z-index:999999;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:opacity 0.3s;"

    document.body.appendChild(msg)
    setTimeout(function () {
      msg.style.opacity = "0"
      setTimeout(function () { msg.remove() }, 300)
    }, 3000)
  }

  function addSendButton() {
    var btn = document.createElement("button")
    btn.textContent = "📤 Envoyer"
    btn.title = "Envoyer les annotations au développeur"
    btn.style.cssText = "position:fixed;bottom:12px;right:20px;z-index:999998;"
      + "background:#3b82f6;color:#fff;border:none;padding:8px 16px;border-radius:8px;"
      + "font-family:-apple-system,sans-serif;font-size:13px;font-weight:600;"
      + "cursor:pointer;box-shadow:0 2px 8px rgba(59,130,246,0.4);transition:all 0.2s;"

    btn.addEventListener("mouseenter", function () {
      btn.style.background = "#2563eb"
      btn.style.transform = "translateY(-1px)"
    })
    btn.addEventListener("mouseleave", function () {
      btn.style.background = "#3b82f6"
      btn.style.transform = "translateY(0)"
    })
    btn.addEventListener("click", sendAnnotations)

    document.body.appendChild(btn)
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(addSendButton, 1000)
    })
  } else {
    setTimeout(addSendButton, 1000)
  }
})()
