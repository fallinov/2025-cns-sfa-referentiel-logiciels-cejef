import type { RouterConfig } from "@nuxt/schema"

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // If there is a saved position (browser back/forward), try to restore it
    if (savedPosition) {
      return new Promise((resolve) => {
        // Small delay to allow keep-alive components to re-render/re-activate
        setTimeout(() => {
          resolve(savedPosition)
        }, 300)
      })
    }

    // Scroll to anchor if present
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth"
      }
    }

    // Otherwise scroll to top
    return { top: 0 }
  }
}
