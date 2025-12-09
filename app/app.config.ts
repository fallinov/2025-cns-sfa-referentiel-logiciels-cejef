export default defineAppConfig({
  ui: {
    colors: {
      primary: "red",
      success: "green",
      warning: "orange",
      error: "red",
      info: "gray",
      neutral: "gray"
    },
    badge: {
      variants: {
        liquid: {
          base: "bg-white/20 dark:bg-white/10 border-white/50 dark:border-white/30 rounded-full backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-4 py-2",
          label: "text-sm font-bold uppercase tracking-widest text-white"
        }
      }
    }
  }
})
