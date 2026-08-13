# Mobile one-section flow

## Goal

Make the Russian and English landing pages and all 18 feature pages comfortable on phones. Each vertical swipe should normally reveal one complete semantic section without clipping text, images, or video.

## Chosen interaction

Use adaptive scroll snapping on screens up to 780 px wide:

- Major sections align to the top of the viewport with `scroll-snap-align: start`.
- The page uses `scroll-snap-type: y proximity`, not `mandatory`, so long content remains reachable and browser navigation is not trapped.
- Compact sections target one visible mobile viewport using `min-height: 100svh` minus the sticky header allowance.
- Sections whose content cannot fit naturally may grow beyond one viewport. Nothing is hidden, cropped, or scaled below readable sizes.
- `prefers-reduced-motion` disables smooth scrolling and snap behavior.

## Landing pages

- Apply the same mobile rules to `/` and `/ru/`.
- Keep the hero as one coherent first screen: copy, product switcher, actions, and product visual remain readable without overlap.
- Convert multi-card grids into horizontal snap rails on phones. One card is visually dominant; the next card peeks in to communicate sideways navigation.
- Keep product tabs horizontally scrollable. The selected product panel remains a single vertical composition.
- Reduce decorative glow, blur, and costly motion on mobile.
- Use `100svh` rather than `100vh` so mobile browser chrome does not shift layouts.

## Feature pages

- Apply one shared mobile layout to all Russian and English feature pages.
- Preserve every video and image aspect ratio with `object-fit: contain`.
- Hero, benefits, video demo, explanation, FAQ, CTA, related links, and footer become clear mobile sections.
- Benefits and related links use horizontal snap rails where vertical stacking would make a section excessively tall.
- FAQ stays vertically readable and may exceed one viewport when answers are opened.
- Move the final CTA before the related-feature section on every generated page.
- Keep CTA background transparent and button touch target at least 56 px high.

## Accessibility and navigation

- Horizontal rails remain native touch scrolling with no drag-only JavaScript.
- Focused cards and controls stay visible.
- Touch targets are at least 44 px.
- No essential text is hidden to force an exact viewport fit.
- Anchor navigation accounts for the sticky header.

## Performance

- Continue lazy-loading feature videos and images.
- Disable nonessential transforms, backdrop filters, and continuous animation on mobile.
- Avoid new runtime layout scripts; responsive behavior is CSS-first.

## Verification

- Generate all feature pages, then run existing site and SEO self-checks.
- Check RU and EN landing pages at 360 × 800 and 390 × 844.
- Check representative RU and EN feature pages at the same sizes.
- Confirm no horizontal page overflow, no cropped media, reachable FAQ content, correct CTA order, and reduced-motion behavior.
- Check desktop pages to ensure mobile rules do not change layouts above 780 px.
