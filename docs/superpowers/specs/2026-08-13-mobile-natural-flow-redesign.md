# Mobile natural-flow redesign

## Scope

Redesign only mobile and tablet layouts at widths up to 768 px. Desktop styling and structure above 768 px remain unchanged. Apply the same layout policy to the Russian and English landing pages and all generated feature pages.

## Layout

- Remove vertical scroll snapping and all artificial viewport-height sections.
- Use normal document flow with full-width containers and 20 px side padding.
- Prevent page-level horizontal overflow.
- Use one-column grids. Cards occupy 100% width and never peek or clip at the right edge.
- Keep horizontal scrolling only for the product tabs, where the behavior is explicit and controls remain fully readable.
- Use 64–88 px between sections and 20–32 px inside sections.

## Landing hero and showcase

- Hero heading uses 36–42 px, body 16–18 px, and buttons at least 48 px high.
- Hero explains the product and exposes the primary CTA without a large empty top area.
- Primary CTA becomes full-width; secondary action remains visually quieter.
- Product showcase stacks tabs, screenshot, then copy. Screenshot uses nearly the full content width and keeps its aspect ratio.
- Footer becomes a compact one-column composition.

## Feature pages

- Hero stacks copy and large product image in natural flow.
- Benefits and related cards use one full-width column.
- Video stays large enough to inspect, uses its original portrait ratio, and never crops.
- How, FAQ, CTA, and related sections use content-driven heights with compact spacing.

## Breakpoints and checks

- Primary mobile/tablet breakpoint: 768 px.
- Narrow-phone refinement: 480 px.
- Validate at 320, 375, 390, 430, and 768 px.
- Check no horizontal page overflow, minimum readable type, media containment, CTA prominence, and unchanged desktop rules.
