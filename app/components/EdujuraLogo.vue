<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 50"
    role="img"
    aria-label="EduJura Logo"
    class="h-10 w-auto"
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#8b5cf6" />
      </linearGradient>
    </defs>
    
    <!-- Symbol: Stylized Book/Shield -->
    <path
      d="M25 5 L45 15 L45 35 L25 45 L5 35 L5 15 Z"
      fill="url(#logo-gradient)"
      stroke="none"
    />
    <path
      d="M25 5 L25 45"
      stroke="white"
      stroke-width="2"
      stroke-opacity="0.5"
    />
    <path
      d="M25 25 L45 15"
      stroke="white"
      stroke-width="2"
      stroke-opacity="0.5"
    />
    
    <!-- Text -->
    <text
      x="60"
      y="35"
      font-family="ui-sans-serif, system-ui, sans-serif"
      font-weight="800"
      font-size="28"
      fill="currentColor"
      class="text-slate-900 dark:text-white"
    >
      Edu<tspan class="text-primary-600 dark:text-primary-400">Jura</tspan>
    </text>
  </svg>
</template>
