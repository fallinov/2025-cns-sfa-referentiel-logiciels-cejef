export type ThemeAudience = "sen" | "cejef" | "both"

export type ResourceType = "link" | "image" | "video" | "schema" | "document"

export interface ThemeResource {
  title: string
  url: string
  source: string
  description?: string
  type: ResourceType
  fileSize?: string
}

export interface DataProtectionSubTheme {
  id: string
  title: string
  icon: string
  description: string
  audience: ThemeAudience
  resources: ThemeResource[]
}

export interface DataProtectionTheme {
  id: string
  title: string
  icon: string
  description: string
  audience: ThemeAudience
  subThemes: DataProtectionSubTheme[]
}
