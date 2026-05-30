import type {
  DataProtectionTheme,
  DataProtectionSection,
  DataProtectionItem,
  ThemeResource,
  ResourceType
} from "~~/types/data-protection"

export interface DirectusDpTheme {
  id: string
  sort: number | null
  title: string
  short_title: string | null
  icon: string | null
  description: string | null
  audience: string[] | null
}

export interface DirectusDpSection {
  id: string
  sort: number | null
  title: string
  icon: string | null
  audience: string[] | null
  theme_id: string
}

export interface DirectusDpItem {
  id: string
  sort: number | null
  title: string
  icon: string | null
  description: string | null
  audience: string[] | null
  section_id: string
}

export interface DirectusDpResource {
  id: string
  sort: number | null
  title: string
  url: string
  source: string | null
  type: string
  description: string | null
  file_size: string | null
  audience: string[] | null
}

export interface DirectusDpResourceOwner {
  id: number
  dp_resource_id: string
  collection: "dp_theme" | "dp_section" | "dp_item"
  item: string
}

interface MapperInput {
  themes: DirectusDpTheme[]
  sections: DirectusDpSection[]
  items: DirectusDpItem[]
  resources: DirectusDpResource[]
  owners: DirectusDpResourceOwner[]
}

function mapResource(r: DirectusDpResource): ThemeResource {
  return {
    title: r.title,
    url: r.url,
    source: r.source ?? "",
    description: r.description ?? undefined,
    type: (r.type as ResourceType) ?? "link",
    fileSize: r.file_size ?? undefined
  }
}

export function mapDataProtectionThemes(input: MapperInput): DataProtectionTheme[] {
  const { themes, sections, items, resources, owners } = input

  const resourceById = new Map(resources.map(r => [r.id, r]))

  const resourcesByOwner = new Map<string, ThemeResource[]>()
  for (const o of owners) {
    const key = `${o.collection}:${o.item}`
    const resource = resourceById.get(o.dp_resource_id)
    if (!resource) continue
    const list = resourcesByOwner.get(key) ?? []
    list.push(mapResource(resource))
    resourcesByOwner.set(key, list)
  }

  const mappedItems = new Map<string, DataProtectionItem>()
  for (const it of items) {
    mappedItems.set(it.id, {
      id: it.id,
      title: it.title,
      icon: it.icon ?? "i-lucide-circle",
      description: it.description ?? "",
      resources: resourcesByOwner.get(`dp_item:${it.id}`) ?? []
    })
  }

  const itemsBySection = new Map<string, DataProtectionItem[]>()
  for (const it of items) {
    const list = itemsBySection.get(it.section_id) ?? []
    const mapped = mappedItems.get(it.id)
    if (mapped) list.push(mapped)
    itemsBySection.set(it.section_id, list)
  }

  const mappedSections = new Map<string, DataProtectionSection>()
  for (const s of sections) {
    mappedSections.set(s.id, {
      id: s.id,
      title: s.title,
      icon: s.icon ?? "i-lucide-circle",
      items: itemsBySection.get(s.id) ?? []
    })
  }

  const sectionsByTheme = new Map<string, DataProtectionSection[]>()
  for (const s of sections) {
    const list = sectionsByTheme.get(s.theme_id) ?? []
    const mapped = mappedSections.get(s.id)
    if (mapped) list.push(mapped)
    sectionsByTheme.set(s.theme_id, list)
  }

  return themes.map(t => ({
    id: t.id,
    title: t.title,
    shortTitle: t.short_title ?? t.title,
    icon: t.icon ?? "i-lucide-circle",
    description: t.description ?? "",
    sections: sectionsByTheme.get(t.id) ?? [],
    audience: t.audience ?? undefined
  }))
}
