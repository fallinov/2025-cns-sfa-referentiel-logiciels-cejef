<script setup lang="ts">
import type { DataProtectionTheme, DataProtectionSection, DataProtectionItem } from "~~/types/data-protection"
import type { AccordionItem } from "@nuxt/ui"
import { highlightText } from "~/utils/search"

interface Props {
  theme: DataProtectionTheme
}

defineProps<Props>()

const searchQuery = inject<Ref<string>>("dpSearchQuery", ref(""))

function hl(text: string) {
  return highlightText(text, searchQuery.value)
}

const copiedId = ref<string | null>(null)

function copyLink(id: string) {
  const url = `${window.location.origin}${window.location.pathname}#${id}`
  navigator.clipboard.writeText(url)
  copiedId.value = id
  setTimeout(() => {
    copiedId.value = null
  }, 1500)
}

// Construire les items pour UAccordion
function toAccordionItems(section: DataProtectionSection): AccordionItem[] {
  return section.items.map(item => ({
    label: item.title,
    icon: item.icon,
    value: item.id
  }))
}

// Quand une recherche est active, ouvrir tous les tiroirs
function accordionDefaultValue(section: DataProtectionSection): string[] {
  if (searchQuery.value.trim()) {
    return section.items.map(item => item.id)
  }
  return []
}

// Récupérer un item par son ID
function getItem(section: DataProtectionSection, value: string): DataProtectionItem {
  return section.items.find(item => item.id === value) as DataProtectionItem
}

// Premier item (pour le rendu direct)
function firstItem(section: DataProtectionSection): DataProtectionItem {
  return section.items[0] as DataProtectionItem
}
</script>

<template>
  <div>
    <!-- Header du thème -->
    <div class="flex items-start gap-4 mb-8">
      <div class="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-[var(--ui-radius)] bg-primary-50 dark:bg-primary-900/30 flex-shrink-0 mt-1">
        <UIcon :name="theme.icon" class="w-5 h-5 lg:w-6 lg:h-6 text-primary-500" aria-hidden="true" />
      </div>
      <div>
        <!-- eslint-disable vue/no-v-html -- données statiques, highlight uniquement -->
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white" v-html="hl(theme.title)"></h2>
        <p class="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-2" v-html="hl(theme.description)"></p>
        <!-- eslint-enable vue/no-v-html -->
      </div>
    </div>

    <!-- Sections — une carte par section -->
    <div class="space-y-5">
      <div
        v-for="section in theme.sections"
        :id="section.id"
        :key="section.id"
        class="bg-white dark:bg-gray-800 rounded-[var(--ui-radius)] border border-gray-100 dark:border-gray-700/50 p-5 lg:p-6 scroll-mt-20"
      >
        <!-- Titre de la carte + bouton copier -->
        <div class="flex items-center gap-3 mb-4">
          <UIcon :name="section.icon" class="w-5 h-5 text-primary-500 flex-shrink-0" aria-hidden="true" />
          <!-- eslint-disable-next-line vue/no-v-html -- données statiques -->
          <h3 class="flex-1 text-lg lg:text-xl font-semibold text-gray-900 dark:text-white" v-html="hl(section.title)"></h3>
          <div class="relative flex-shrink-0">
            <Transition
              enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="opacity-100 translate-y-0"
              enter-to-class="opacity-0 -translate-y-4"
            >
              <span
                v-if="copiedId === section.id"
                class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-green-600 dark:text-green-400 whitespace-nowrap pointer-events-none"
              >
                Copié !
              </span>
            </Transition>
            <button
              class="p-2.5 -m-1 rounded-[var(--ui-radius)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              :class="copiedId === section.id
                ? 'text-green-500'
                : 'text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400'"
              :title="`Copier le lien vers ${section.title}`"
              :aria-label="`Copier le lien vers ${section.title}`"
              @click="copyLink(section.id)"
            >
              <UIcon
                :name="copiedId === section.id ? 'i-lucide-check' : 'i-lucide-link'"
                class="w-4 h-4"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <!-- 1 seul item → contenu affiché directement -->
        <template v-if="section.items.length === 1">
          <!-- eslint-disable-next-line vue/no-v-html -- données statiques -->
          <div
            class="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-prose prose-content"
            v-html="hl(firstItem(section).description)"
          ></div>

          <DataProtectionLinkList
            v-if="firstItem(section).resources.length > 0"
            :resources="firstItem(section).resources"
            class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50"
          />
        </template>

        <!-- Plusieurs items → tiroirs/accordéon -->
        <UAccordion
          v-else
          type="multiple"
          :default-value="accordionDefaultValue(section)"
          :items="toAccordionItems(section)"
          :ui="{
            content: 'px-4 pb-4'
          }"
        >
          <template #content="{ item }">
            <!-- eslint-disable-next-line vue/no-v-html -- données statiques -->
            <div
              class="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-prose prose-content"
              v-html="hl(getItem(section, item.value as string).description)"
            ></div>

            <DataProtectionLinkList
              v-if="getItem(section, item.value as string).resources.length > 0"
              :resources="getItem(section, item.value as string).resources"
              class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50"
            />
          </template>
        </UAccordion>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose-content :deep(ul),
.prose-content :deep(ol) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
}
.prose-content :deep(ul) {
  list-style-type: disc;
}
.prose-content :deep(ol) {
  list-style-type: decimal;
}
.prose-content :deep(li) {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.prose-content :deep(strong) {
  font-weight: 600;
  color: var(--color-gray-900);
}
:root.dark .prose-content :deep(strong) {
  color: var(--color-gray-100);
}
.prose-content :deep(em) {
  font-style: italic;
  color: var(--color-gray-500);
}
</style>
