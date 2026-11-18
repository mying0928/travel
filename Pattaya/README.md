# Pattaya travel handout

`index.html` is the only webpage. `app.js` holds the itinerary and UI, `planner-core.js` contains the pure search/date/state/expense helpers, and `styles.css` preserves the existing travel-handout design. Original photos are retained; responsive WebP files are under `images/optimized/`.

## Local development

Install development dependencies with `npm install`. Build in this order after changing HTML, JavaScript, styles, or images:

```sh
npm run build:css
npm run build:offline
npm test
```

`build:css` compiles utility classes locally. `build:offline` updates content-versioned resource links and emits `sw.js` from `offline-worker.js`. Rebuild it last. `tailwind.config.cjs` scans the HTML and application JavaScript.

To preview all functionality, serve the **travel repository root** over localhost (for example `python3 -m http.server 8080 --bind 127.0.0.1`) and open `http://localhost:8080/Pattaya/`. Opening `index.html` directly does not support service-worker storage. Print can be saved as PDF using the browser's print dialog.

## Reading and data

- Each itinerary item has a persistent explicit `id`; keep it when editing or moving an item. Do not regenerate existing IDs. `legacyItemIds` is a frozen index map for migrating the older reading state. Item links use `#day3/item-id`.
- Reading state, quick mode, expanded photos/details, manual next stop, booking notes, and expense edits live only in this browser under `pattaya-reading-v3`. Existing `v2` records are migrated. Packing checkboxes retain their original keys. No booking is submitted and there is no shared backend.
- Booking statuses start at **待處理**, including activities already arranged in the itinerary: the user must mark their real orders manually.
- Expense seeds combine the existing user quotes with ticket research checked on 2026-11-17; see `ticket-price-sources.json`. The selected Thai Sky Adventures Deluxe plan replaces the basic jump at 15,650 THB per person (62,600 for four). Confirmed quotes, reference estimates, and unknown amounts remain distinct. THB and TWD are summed separately; party size is four. A quote does not mean paid. Unknown rows are not zero-cost activities. The front summary shows compact group/per-person totals. Its collapsed daily breakdown lists all eight days and each identified cost, including unpriced items; rows are created on first expansion and refreshed after edits. The THB chart and numeric table use the same live expense rows and load the chart library only on expansion.
- Expense revision upgrades refresh unchanged default quotes, add newly researched tickets, and preserve custom amounts and intentionally removed old rows.
- The daily handout uses `Asia/Bangkok`. The first outbound flight's start is normalized from Taiwan time for the schedule reference. Manual next-stop selection is independent of the reading highlight and GPS.

## Overview loading

Supporting overview sections use native keyboard-accessible details disclosures. Booking rows are created on first panel expansion, expense rows on panel expansion or editing. Weather is fetched once after the live-information section opens; the countdown pauses while that section is closed or the document is hidden. Hero entrance motion uses native Web Animations and respects reduced motion, without remote GSAP dependencies or an initial loading overlay. Daily search, stable links, print and expense data remain available independently of overview disclosures.

## Offline and print

Offline preparation is explicit. It registers a service worker scoped to this directory, stores the versioned local HTML/CSS/JS shell, and downloads 23 basic photos with bounded concurrency. Larger images fall back to those basic photos while offline. Google Maps, live weather and external booking pages still need internet. Remote animation/font failures have a fallback; the local reading tools do not require those libraries.

A cached document stays with its matching version until the user accepts a waiting update. The update action reloads the page; at most the immediately previous cache is retained for other open tabs. Clearing site storage removes offline copies and local notes. A failed or partial download is reported as incomplete and can be retried.

Print builds a dedicated text itinerary for the current day or all eight days, with route place names, original details/links, and local expense summaries. It does not switch active dates or change expanded sections. Maps, animations and navigation controls are omitted. PDF pagination and actual mobile/touch layouts need real-browser verification; DOM tests do not establish visual quality.

## Tests

`tests/experience.test.cjs` checks stable IDs, state migration, search, Bangkok dates, expense arithmetic, map mapping and image existence. `tests/planner-dom.test.cjs` exercises navigation history, one-scroll quick mode, search/direct links, local editing, print, chart retry, and offline UI with jsdom. `tests/offline-worker.test.cjs` simulates service-worker caching, failures, image fallbacks and scope boundaries. These are programmatic checks, not physical-device or live-map verification.
