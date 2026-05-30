export type ThemeAudience = "sen" | "cejef" | "both"

export type ResourceType = "link" | "image" | "video" | "schema" | "document"

export interface ThemeResource {
  title: string
  url: string
  source: string
  description?: string
  type: ResourceType
  fileSize?: string
  audience?: string[]
}

// Niveau 3 — contenu dans un tiroir (ou affiché directement si seul item)
export interface DataProtectionItem {
  id: string
  title: string
  icon: string
  description: string
  resources: ThemeResource[]
  audience?: string[]
}

// Niveau 2 — carte visible dans la page
export interface DataProtectionSection {
  id: string
  title: string
  icon: string
  items: DataProtectionItem[]
  audience?: string[]
}

// Niveau 1 — thème principal (sidebar)
export interface DataProtectionTheme {
  id: string
  title: string
  shortTitle: string
  icon: string
  description: string
  sections: DataProtectionSection[]
  audience?: string[]
}
