# Fix Detail Page UI Issues

## Goal Description
The user requests a series of UI and content adjustments on the software detail page (`app/pages/logiciels/[id].vue`):
1. Make the "similar software" icon appear in red.
2. Remove the post‑title validation label (e.g., the "validé" badge).
3. Remove the keyboard‑shortcut icons (`UKbd`) from the previous/next navigation buttons.
4. Ensure all paragraph text is at least 16 px (Tailwind `text-base`).
5. Add a subtitle identified as **ST' 501** (the exact placement is not specified, we will place it under the main title).

## User Review Required
- Confirm the exact location for the **ST' 501** subtitle (under the main title or elsewhere).
- Confirm the desired red color for the similar‑software icon (Tailwind class `text-red-600` is assumed).

## Proposed Changes
### Component: `app/pages/logiciels/[id].vue`
- **Similar Software Icon Color**: Update the `UIcon` within the similar‑software list to use `text-red-600` (or another red class) instead of the current dynamic class.
- **Remove Validation Badge**: Locate the `UBadge` that displays the validation label after the title and delete it.
- **Keyboard Shortcut Icons**: Remove all `<UKbd>` wrappers around the navigation buttons (`Précédent` and `Suivant`).
- **Paragraph Text Size**: Add Tailwind class `text-base` to all `<p>` elements inside the description and other content sections.
- **Subtitle ST' 501**: Insert a new `<h2>` (or appropriate heading) with the text `ST' 501` directly below the main `<h1>` title.

## Verification Plan
### Automated Tests
- Run `npm run dev` and manually inspect the detail page for the visual changes.
- Use a browser console to verify no `[Vue warn]: Failed to resolve component: UIIcon` warnings remain.
- Check that no `<UKbd>` elements are present in the rendered HTML.
- Verify that all `<p>` elements have a computed font size of at least 16 px.
### Manual Verification
- Open a software detail page in the browser and confirm the similar‑software icon is red.
- Ensure the validation badge is no longer displayed.
- Confirm the subtitle `ST' 501` appears correctly.
- Review the page on both light and dark themes for consistency.
