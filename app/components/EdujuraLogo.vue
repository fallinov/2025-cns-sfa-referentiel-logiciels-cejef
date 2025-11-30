<template>
  <div class="flex items-center gap-3">
    <!-- Light Mode Logo -->
    <img
      src="/logos/logo-edujura.svg"
      alt="Logo EduJura"
      class="h-10 w-auto object-contain dark:hidden"
    />
    <!-- Dark Mode Logo -->
    <img
      src="/logos/logo-edujura-light.svg"
      alt="Logo EduJura"
      class="h-10 w-auto object-contain hidden dark:block"
    />
    <span class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
      Edu<span class="text-red-600 dark:text-red-500">Jura</span>
    </span>
  </div>
</template>
