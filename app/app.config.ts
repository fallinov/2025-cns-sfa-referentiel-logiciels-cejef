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
        // Variant personnalisé "minimal" pour design minimaliste
        // Note: Non utilisé directement car TS ne reconnaît pas les variants custom
        // On utilise plutôt :ui prop directement sur UBadge pour personnaliser les badges
        minimal: {
          root: "bg-white/80 dark:bg-gray-700/80 border-gray-200 dark:border-gray-600 rounded-full shadow-sm px-4 py-2",
          label: "text-sm font-bold uppercase tracking-widest"
        }
      }
    }
  }
})
