export default defineAppConfig({
  ui: {
    colors: {
      primary: "red",
      success: "green",
      error: "orange",
      info: "gray",
      neutral: "gray"
    },
    badge: {
      variants: {
        // Variant personnalisé "liquid" pour effet Liquid Glass
        // Utilisé principalement dans les cartes liquid glass (CardLiquidGlass.vue)
        // Note: Non utilisé directement car TS ne reconnaît pas les variants custom
        // On utilise plutôt :ui prop avec liquidBadgeUi dans les composants
        liquid: {
          root: "bg-white/20 dark:bg-white/10 border-white/50 dark:border-white/30 rounded-full backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-4 py-2",
          label: "text-sm font-bold uppercase tracking-widest text-white"
        }
      }
    }
  }
})
