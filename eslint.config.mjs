// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"

/**
 * Configuration ESLint pour le projet Référentiel Logiciels CEJEF
 *
 * Basée sur les standards Nuxt officiels (@nuxt/eslint)
 * Documentation: https://eslint.nuxt.com
 *
 * Style de code du projet:
 * - Guillemets doubles (")
 * - Pas de virgules finales
 * - Pas de point-virgules
 * - Indentation 2 espaces
 * - One True Brace Style (1tbs)
 */
export default withNuxt(
  // Configuration personnalisée pour respecter les conventions du projet
  {
    rules: {
      // ========================================
      // RÈGLES STYLISTIQUES
      // ========================================

      // Guillemets doubles au lieu de simples (cohérence avec le code existant)
      "@stylistic/quotes": [
        "error",
        "double",
        {
          avoidEscape: true
        }
      ],

      // Pas de virgules finales (trailing commas)
      "@stylistic/comma-dangle": ["error", "never"],

      // Point-virgules obligatoires en fin de ligne
      "@stylistic/semi": ["error", "never"],

      // Style d'accolades : One True Brace Style (1tbs)
      "@stylistic/brace-style": [
        "error",
        "1tbs",
        {
          allowSingleLine: true
        }
      ],

      // Indentation : 2 espaces
      "@stylistic/indent": [
        "error",
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          MemberExpression: 1,
          FunctionDeclaration: { parameters: 1, body: 1 },
          FunctionExpression: { parameters: 1, body: 1 },
          CallExpression: { arguments: 1 },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          ignoreComments: false,
          ignoredNodes: [
            "TemplateLiteral *",
            "TSTypeParameterInstantiation",
            "FunctionExpression > .params[decorators.length > 0]",
            "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
            "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key"
          ],
          offsetTernaryExpressions: true
        }
      ],

      // Espaces avant/après les accolades d'objets
      "@stylistic/object-curly-spacing": ["error", "always"],

      // Espaces autour des opérateurs
      "@stylistic/space-infix-ops": "error",

      // Espace après les mots-clés (if, for, while, etc.)
      "@stylistic/keyword-spacing": [
        "error",
        {
          before: true,
          after: true
        }
      ],

      // Espace après les virgules
      "@stylistic/comma-spacing": [
        "error",
        {
          before: false,
          after: true
        }
      ],

      // Pas d'espaces multiples
      "@stylistic/no-multi-spaces": "error",

      // Une seule ligne vide maximum
      "@stylistic/no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxEOF: 0
        }
      ],

      // Pas d'espace en fin de ligne
      "@stylistic/no-trailing-spaces": "error",

      // ========================================
      // RÈGLES VUE.JS
      // ========================================

      // Ordre des attributs dans les composants Vue
      "vue/attributes-order": [
        "error",
        {
          order: [
            "DEFINITION",
            "LIST_RENDERING",
            "CONDITIONALS",
            "RENDER_MODIFIERS",
            "GLOBAL",
            "UNIQUE",
            "SLOT",
            "TWO_WAY_BINDING",
            "OTHER_DIRECTIVES",
            "OTHER_ATTR",
            "EVENTS",
            "CONTENT"
          ],
          alphabetical: false
        }
      ],

      // Auto-fermeture des composants HTML
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "never",
            component: "always"
          },
          svg: "always",
          math: "always"
        }
      ],

      // Indentation dans les templates Vue
      "vue/html-indent": [
        "error",
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: []
        }
      ],

      // Nombre maximum d'attributs par ligne
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: 3,
          multiline: 1
        }
      ],

      // Ordre des propriétés dans les composants
      "vue/order-in-components": [
        "error",
        {
          order: [
            "el",
            "name",
            "key",
            "parent",
            "functional",
            ["delimiters", "comments"],
            ["components", "directives", "filters"],
            "extends",
            "mixins",
            ["provide", "inject"],
            "ROUTER_GUARDS",
            "layout",
            "middleware",
            "validate",
            "scrollToTop",
            "transition",
            "loading",
            "inheritAttrs",
            "model",
            ["props", "propsData"],
            "emits",
            "setup",
            "asyncData",
            "data",
            "fetch",
            "head",
            "computed",
            "watch",
            "watchQuery",
            "LIFECYCLE_HOOKS",
            "methods",
            ["template", "render"],
            "renderError"
          ]
        }
      ],

      // Multiword component names (désactivé pour app.vue et pages)
      "vue/multi-word-component-names": "off",

      // ========================================
      // RÈGLES TYPESCRIPT
      // ========================================

      // Préférer les interfaces TypeScript aux types
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      // Pas de any explicites (sauf si vraiment nécessaire)
      "@typescript-eslint/no-explicit-any": "warn",

      // Pas de variables inutilisées
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ],

      // ========================================
      // RÈGLES GÉNÉRALES
      // ========================================

      // Préférer const pour les variables non réassignées
      "prefer-const": "error",

      // Pas de var, utiliser let/const
      "no-var": "error",

      // Préférer les template literals pour la concaténation
      "prefer-template": "error",

      // Pas de console.log en production (warning seulement)
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",

      // Pas de debugger en production
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn"
    }
  }
)
