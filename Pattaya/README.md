# Pattaya travel page

`index.html` is the only webpage. `app.js` contains itinerary data and behavior; `styles.css` contains the existing visual design and reading enhancements. Responsive WebP assets are in `images/optimized/`; source photos are retained.

Tailwind is compiled to `utilities.css` so the published page does not need the Tailwind browser compiler. After changing utility classes in HTML or JavaScript, rebuild from this directory:

```sh
npm exec --yes --package=tailwindcss@3.4.18 -- tailwindcss -c tailwind.config.cjs -i tailwind-input.css -o utilities.css --minify
```

Reading position, expanded details/photos, quick mode and packing checkboxes are stored only in this browser. Dates for the daily handout use `Asia/Bangkok`. Google Maps remains an external embed; its load event cannot verify the contents of the cross-origin map. External links remain available during slow or failed loads.

Run the dependency-free regression checks from this directory:

```sh
node --test tests/experience.test.cjs
```
