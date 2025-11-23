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
        liquid: {
          base: "rounded-full border backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)]",
          background: "bg-white/20 dark:bg-white/10",
          border: "border-white/50",
          color: "text-white",
          font: "text-sm font-bold uppercase tracking-widest"
        }
      }
    }
  }
})
