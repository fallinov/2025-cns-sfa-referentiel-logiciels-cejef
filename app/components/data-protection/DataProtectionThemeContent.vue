<script setup lang="ts">
import type { DataProtectionTheme } from "~~/types/data-protection"
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

function copyLink(subThemeId: string) {
  const url = `${window.location.origin}${window.location.pathname}#${subThemeId}`
  navigator.clipboard.writeText(url)
  copiedId.value = subThemeId
  setTimeout(() => {
    copiedId.value = null
  }, 1500)
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

    <!-- Sous-thèmes -->
    <div class="space-y-4 lg:space-y-5">
      <div
        v-for="sub in theme.subThemes"
        :key="sub.id"
        class="bg-white dark:bg-gray-800 rounded-[var(--ui-radius)] border border-gray-100 dark:border-gray-700/50 p-5 lg:p-6"
      >
        <div :id="sub.id" class="flex items-center gap-3 mb-3 scroll-mt-20">
          <UIcon :name="sub.icon" class="w-5 h-5 text-primary-500 flex-shrink-0" aria-hidden="true" />
          <!-- eslint-disable-next-line vue/no-v-html -- données statiques -->
          <h3 class="flex-1 text-lg lg:text-xl font-semibold text-gray-900 dark:text-white" v-html="hl(sub.title)"></h3>
          <div class="relative flex-shrink-0">
            <!-- Animation "Copié !" -->
            <Transition
              enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="opacity-100 translate-y-0"
              enter-to-class="opacity-0 -translate-y-4"
            >
              <span
                v-if="copiedId === sub.id"
                class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-green-600 dark:text-green-400 whitespace-nowrap pointer-events-none"
              >
                Copié !
              </span>
            </Transition>
            <button
              class="p-2.5 -m-1 rounded-[var(--ui-radius)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              :class="copiedId === sub.id
                ? 'text-green-500'
                : 'text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400'"
              :title="`Copier le lien vers ${sub.title}`"
              :aria-label="`Copier le lien vers ${sub.title}`"
              @click="copyLink(sub.id)"
            >
              <UIcon
                :name="copiedId === sub.id ? 'i-lucide-check' : 'i-lucide-link'"
                class="w-4 h-4"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <!-- eslint-disable-next-line vue/no-v-html -- données statiques -->
        <p
          class="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-prose"
          v-html="hl(sub.description)"
        ></p>

        <DataProtectionLinkList
          v-if="sub.resources.length > 0"
          :resources="sub.resources"
          class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50"
        />
      </div>
    </div>
  </div>
</template>
