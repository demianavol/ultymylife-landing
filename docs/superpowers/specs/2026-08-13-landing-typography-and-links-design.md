# Landing typography and links design

## Scope

Change landing pages in Russian and English without redesigning layout, colors, or feature-page templates.

## Typography

- Use `Playfair Display` for landing headings (`h1`, `h2`, `h3`) and other prominent display titles.
- Use `Golos Text` for body copy, navigation, labels, cards, and buttons.
- Keep existing responsive font sizes, spacing, gradients, and hierarchy.
- Load both families from Google Fonts in the RU and EN landing documents.
- Retain system-font fallbacks so the page remains readable before web fonts load.

## Hero links

- Convert hero topic badges into semantic anchor links.
- Russian links target corresponding `/ru/.../` feature pages; English links target `/.../` pages.
- Map habits, workouts, breathing and meditation, mental fitness, and AI assistant directly.
- Replace the duplicate `AI-ready` badge with a useful sleep link.
- Keep current badge appearance and mobile stacking; add visible hover and keyboard-focus states.

## Footer

- Remove the entire upper footer row containing the repeated UltyMyLife description and Telegram/contact buttons.
- Keep only copyright, privacy, and terms in the compact lower row.
- Preserve Russian and English legal paths.

## Verification

- Extend landing self-checks for the font pair, semantic hero links, and absence of the removed footer row.
- Run the project build.
- Verify RU and EN landing pages in the browser at mobile and desktop widths.
- Confirm no new horizontal overflow.
