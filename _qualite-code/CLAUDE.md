# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code quality standards in this repository.

## Directory Overview

The `_qualite-code` directory is a **knowledge base** containing authoritative best practices for Nuxt 3, Vue 3, Nuxt UI, Tailwind CSS, accessibility (WCAG 2.2), security (OWASP), and UX principles. This knowledge base serves as the **source of truth** for code quality standards in the parent project.

**Purpose**: Centralized reference for maintaining high-quality, secure, accessible, and maintainable code across the project.

## Knowledge Base Structure

```
_qualite-code/
├── instructions.md          # Master instructions for using this knowledge base
├── knowledge-base/
│   ├── index.md            # Knowledge base overview
│   ├── rules.md            # Global coding rules and priorities
│   │
│   ├── nuxt/              # Nuxt 3 best practices (8 files)
│   │   ├── guide.md           # General Nuxt architecture principles
│   │   ├── architecture.md    # Project structure and organization
│   │   ├── composables.md     # Composable patterns and best practices
│   │   ├── conventions.md     # Naming and file conventions
│   │   ├── patterns.md        # Common Nuxt patterns
│   │   ├── performance.md     # Performance optimization
│   │   ├── security.md        # Nuxt security best practices
│   │   └── server-api.md      # Server API patterns
│   │
│   ├── nuxt-ui/           # Nuxt UI best practices (4 files)
│   │   ├── components.md      # Component usage guidelines
│   │   ├── forms.md           # Form handling and validation
│   │   ├── layout.md          # Layout patterns
│   │   └── patterns.md        # UI patterns and composables
│   │
│   ├── tailwind/          # Tailwind CSS best practices (4 files)
│   │   ├── best-practices.md  # General Tailwind guidelines
│   │   ├── responsive.md      # Responsive design patterns
│   │   ├── spacing.md         # Spacing and sizing conventions
│   │   └── typography.md      # Typography standards
│   │
│   ├── accessibility/     # UX and Accessibility (5 files)
│   │   ├── wcag.md           # WCAG 2.2 compliance checklist
│   │   ├── aria.md           # ARIA best practices
│   │   ├── checklist.md      # Accessibility validation checklist
│   │   ├── mobile-ux.md      # Mobile UX patterns
│   │   └── ux-checklist.md   # UX principles (Norman, Krug, etc.)
│   │
│   └── security/          # Security best practices (3 files)
│       ├── owasp-top10.md     # OWASP Top 10 vulnerabilities
│       ├── csp.md             # Content Security Policy
│       └── secure-frontend.md # Frontend security patterns
```

**Total**: 26 knowledge base files + 2 root files (instructions.md, index.md)

**Note**: A new `refactoring/` directory has been added containing:
- `audit-checklist.md` - Complete checklist for code audits and refactoring to avoid reinventing the wheel

## How to Use This Knowledge Base

### Rule Priority Hierarchy (ALWAYS apply in this order)

1. **Security** (OWASP, CSP, XSS, CSRF, authentication)
2. **Accessibility & UX** (WCAG 2.2, ARIA, mobile, UX checklists)
3. **Maintainability & Architecture** (separation of concerns, reusability)
4. **Performance** (lazy-load, SSR/SSG, Core Web Vitals)
5. **Style & Aesthetics** (visual consistency, design system)

### Selective Loading Strategy

**⚠️ CRITICAL**: Do NOT load all 25 files for every task. Load only what's needed based on the task type.

#### Task-to-Files Mapping Matrix

| Task Type | Required Files |
|-----------|----------------|
| **All tasks** | `rules.md` (ALWAYS read first) |
| **Full audit/analysis** | ALL 25 files |
| **UI component** | `rules.md` + `nuxt-ui/*` (4) + `tailwind/*` (4) + `accessibility/wcag.md` + `accessibility/aria.md` |
| **Form/validation** | `rules.md` + `nuxt-ui/forms.md` + `accessibility/wcag.md` + `accessibility/aria.md` + `security/secure-frontend.md` |
| **Architecture/refactoring** | `rules.md` + `nuxt/architecture.md` + `nuxt/patterns.md` + `nuxt/composables.md` + `nuxt/conventions.md` |
| **Performance** | `rules.md` + `nuxt/performance.md` + `tailwind/best-practices.md` |
| **Security** | `rules.md` + `security/*` (3) + `nuxt/security.md` + `nuxt/server-api.md` |
| **Accessibility/UX** | `rules.md` + `accessibility/*` (5) + `tailwind/typography.md` + `tailwind/responsive.md` |
| **Responsive/mobile** | `rules.md` + `tailwind/responsive.md` + `accessibility/mobile-ux.md` + `accessibility/ux-checklist.md` |
| **API/backend** | `rules.md` + `nuxt/server-api.md` + `security/*` (3) |
| **New component** | `rules.md` + `nuxt-ui/components.md` + `nuxt-ui/patterns.md` + `tailwind/best-practices.md` + `accessibility/checklist.md` |
| **Code audit/refactoring** | `rules.md` + `refactoring/audit-checklist.md` + `nuxt-ui/components.md` + `tailwind/best-practices.md` |

### Workflow for Code Quality Tasks

1. **Identify task type**: Determine which category from the matrix above
2. **Read instructions.md**: Review the master instructions for context
3. **Load relevant files**: Use the matrix to determine which files to read
4. **Apply rules**: Follow the priority hierarchy (Security → A11y → Maintainability → Performance → Style)
5. **Cite sources**: Reference which files informed your decisions (e.g., "selon `nuxt/patterns.md`...")

### Core Principles from `rules.md`

- **Security first**: Never compromise security for convenience
- **Accessibility mandatory**: Respect WCAG 2.2 standards
- **Favor maintainability**: Clear, modular code over clever code
- **Use existing tools**: Nuxt UI → Tailwind → custom code (in that order)
- **Avoid code duplication**: DRY principle applies everywhere
- **No dead code**: Remove unused code immediately
- **Verify checklists**: Always run through WCAG/ARIA/UX checklists before completion

### Production Code Guidelines

> Les conventions de code (framework, sécurité, accessibilité, performance, langue) sont dans `~/.claude/rules/` (frontend.md, backend.md, code-quality.md). Cette knowledge base les **complète** avec des checklists détaillées dans les fichiers ci-dessus.

## Language and Documentation

**Analysis Reports**: All reports must be in **French** (as specified in `instructions.md`)

**Documentation Standards**:
- Use Google Chrome for UX/functional testing
- Include screenshots and video recordings in test reports
- Always list consulted knowledge base files at the start of analysis

**Format for Analysis Reports**:

```markdown
## 📚 Fichiers de la base de connaissances consultés

**Type de tâche identifié**: [UI Component / Form / Architecture / etc.]

**Fichiers lus** (X fichiers):
✅ rules.md (priorités et règles globales)
✅ [other relevant files]

**Raison de la sélection**: [Brief explanation based on matrix]
```

## Handling Ambiguity

- **If task is ambiguous**: Apply the safest/most accessible rule and cite the source
- **If request conflicts with rules**: Explain why it's discouraged (cite files) and propose compliant alternative
- **If information is missing**: Signal it clearly and choose the safest option (security/accessibility first)

## Response Style

- Clear and concise
- Briefly explain why each choice respects the rules
- Propose compliant alternatives when relevant
- Highlight UX/accessibility/security/maintainability implications
- Always cite which knowledge base file(s) informed the decision

## Related Documentation

- **Parent project CLAUDE.md**: `/Users/fallste/WebstormProjects/2025-cns-sfa-referentiel-logiciels-cejef/CLAUDE.md`
  - Contains project-specific architecture, deployment, and development workflows
  - This knowledge base complements (not replaces) the parent CLAUDE.md
- **Main README**: `/Users/fallste/WebstormProjects/2025-cns-sfa-referentiel-logiciels-cejef/README.md`
  - Project overview and general documentation

## Important Notes

- This knowledge base is **prescriptive**, not descriptive
- Rules here **override** generic AI training when in conflict
- When in doubt, prioritize: Security → Accessibility → Maintainability
- Always verify compliance with checklists before marking tasks complete
- This is a living document - update as patterns evolve
