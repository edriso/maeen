# مَعين

مَعين: مصدر ماء جارٍ لا ينقطع، أو ماء ظاهر سهل الوصول إليه؛ ويُستخدم مجازًا بمعنى مصدر
الخير والعطاء. فالاسم يعطي إحساسًا بأن الذكر مصدر مستمر ترتوي منه الروح.

A quiet, mobile-first Arabic remembrance reader. One dhikr per screen, white surfaces,
generous space, light/dark themes, local fonts, bounded text size, and a source, grade
and count context for every text.

## Run

Node.js 22.13+ and npm. No keys, database or environment file required.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

The server prints its local URL. Preview serves the exported `out/` folder on port 4174.
For a production-like repository build and preview:

```sh
GITHUB_REPOSITORY=edriso/maeen npm run build
BASE_PATH=/maeen npm run preview
```

## Reading

- Opens a time-appropriate collection; direct `#waking`, `#morning`, `#evening`,
  `#prayer`, `#sleep`, and `#general` links override the automatic suggestion.
- Without a chosen city: explicitly approximate device-clock suggestions read from your
  own device clock. Morning is 04:00–12:00, evening 15:00–21:00, general otherwise.
- With a chosen city: local Adhan.js calculations choose morning from Fajr to Dhuhr
  and evening from Asr to Isha. Other times choose general remembrance. These are
  navigation windows, not religious deadlines. Method and Asr convention are editable.
- 35 cities are offered, grouped by region, each with its own timezone and a default
  calculation method for that region. Picking one is the only way to get calculated
  times: the app never asks for your location and never guesses a city for you.
  A city's own calendar date drives the calculation, so the answer is the same
  wherever your device thinks it is.
- Waking, after-prayer and bedtime collections are selected manually, never inferred
  from the clock.
- The screen carries one text and four small pieces of chrome: the wordmark, one button
  naming the open collection and your place in it, settings, and the read and navigation
  controls under the text. Everything else — timing explanation, sources, shortcuts —
  lives inside the panels.
- Swipe right for next / left for previous. Visible labelled arrow buttons and keyboard
  Right (next) / Left (previous) are alternatives. Vertical scroll, selection and multitouch do not navigate.
- Space records a reading from page/text focus and advances when repetitions finish.
  Focused controls retain their normal Space action; holding Space does not count repeatedly.
- Tab moves through controls. Left/Right work from the page; Home/End jump to the first/last
  item and Enter counts when the text is focused. Escape closes panels and restores focus.
  Settings include an Arabic keyboard guide; shortcuts respect text selection and editing.
- Text fits between 18–42px at default size; user scale is 80–160%, with an absolute
  16px minimum. Large or long text scrolls. Short landscape windows allow page scrolling.
  Native browser zoom remains enabled.
- The reading area is the read button: a tap anywhere in that field, or the read button
  below it, records one repetition, then advances when the narrated count is complete.
  A double click or double tap is two repetitions and selects nothing; dragging across
  the text still selects it.
  A quiet fill inside the read button shows progress through that count.
  Undo restores the previous count and card; the last card never wraps, where Next is
  disabled and reads «تم بفضل الله». A single-read
  label differs from prescribed repetition. Unrestricted dhikr has no target.
- Optional “واجهة مختصرة” hides the collection button, supporting text and navigation
  buttons, retaining the text, repetition count and settings button. Swipe and keyboard
  navigation remain available. Sources, collection selection and undo are in settings.
- Alt+S opens settings, Escape opens collections, and Alt+Z undoes the last reading
  (Option on Mac). Escape closes an open panel. Other shortcuts do not override dialogs,
  typing or text selection. The keyboard guide appears at desktop widths (760px and up);
  shortcuts still work with an external keyboard on smaller screens.
- Settings offer light, dark, or system appearance as one segmented control, and a plain
  or patterned page background as another. The pattern is one seamless eight-point star
  tile drawn inline in CSS — no image request, theme-aware, and veiled behind the middle
  of the screen so the remembrance keeps a clean field. Plain stays the default.
- Theme and background are both applied before first paint. Fonts preload before the
  reader appears; failed loading has a bounded, stable fallback.
- Preferences stay in localStorage. Counts stay in memory only and reset when choosing
  a collection/reloading; they are not a daily total or proof of recitation.

## Content and structure

60 reading cards across six collections: 3 on waking, 19 morning, 17 evening, 10 after
prayer, 15 before sleep, and 8 unrestricted daily remembrances. Surahs a narration names
together stay on one card, so the repetition it asks for covers the whole reading rather
than each surah. Some cards belong to more than one collection, and each remembrance
stores its own position in every collection that contains it, so a text can sit ninth in
the morning sequence and twelfth before sleep.
The order follows the Hisn al-Muslim chapters. This is a verified selection, not an
exhaustive book of adhkar. Text, attribution, authenticity and count context are stored
separately from the collection layout.

```text
app/                  static page, layout, white responsive CSS
components/reader/    reader and native dialog panel
content/              collection definitions and generated reading cards
lib/                  timing, reading state, gestures, font/theme bootstrap and hooks
data/                 pinned Quran corpus, source research and checksums
scripts/              source checks, tests, Pages output preparation and local preview
docs/                 content policy, architecture and verification notes
public/               favicon, third-party notices and licenses
.github/workflows/    validation and GitHub Pages deployment
site.config.mjs       one repository-aware base-path definition
```

The generated Sites scaffold uses React, TypeScript, Vinext and Vite. Static export
requires no server after deployment. The requested hosting target is GitHub Pages; no
Sites project or other hosting account is created, and no hosting declaration for one is
kept. Everything the scaffold supplied and this reader never loads has been removed: the
Cloudflare and Sites deploy plugins with their hosting config, the shadcn packages,
config and empty `components/ui`, the chart, calendar, carousel and date libraries, the
`cn` helper, and the Fontsource packages the checked-in font subsets no longer need. What runs the app is what is left: React, Vinext, Adhan.js, Lucide icons,
the local Cairo and Amiri Quran subsets in `public/fonts`, and the Tailwind, oxlint,
oxfmt, TypeScript and Vite toolchain.

## Evidence

Read [AGENTS.md](AGENTS.md) and [the content policy](docs/content-policy.md) before
editing texts, repetitions or timing. Qur'an is resolved from the unchanged Tanzil corpus.
Hadith texts and counts were checked against specific Sunnah.com, Dorar, and Hisn
al-Muslim author pages; the UI links back to each narration and labels its grade. Added
wording is copied out of the inspected narration rather than retyped. Do not alter
variant wording while retaining the old citation. Pinned sources are excluded from formatting.

Well-known entries were left out where the inspected page does not support them —
including `أشهدك` (Abu Dawud 5069, da'if), `ما أصبح بي من نعمة` (5073, da'if),
`حسبي الله` seven times (5081, graded fabricated by al-Albani) and `رضيت بالله ربًّا`
(5072 / Tirmidhi 3389, disputed). Each exclusion and its reason is recorded in
`data/sources.json`.

`npm run check` verifies source digests, references, counts, collection positions, timing
boundaries, preferences, gestures, TypeScript and lint. It cannot certify scholarly
interpretation or substitute for real-device visual testing.
See [verification notes](docs/verification.md).

## GitHub Pages

Push to `main` runs `.github/workflows/pages.yml`: install, verify, build, upload `out/`,
and deploy through the `github-pages` environment. Pull requests run checks/build only.
Enable Pages → Source → GitHub Actions when setting up a fork. No deployment token is
stored in source: Actions uses its scoped built-in token.

`GITHUB_REPOSITORY` provides the repository base path automatically. A user/organization
root site gets `/`; a custom domain may set `BASE_PATH` to an empty string at build time.
Vinext emits repository-prefixed static paths; `prepare-output.mjs` stages their contents
as the Pages artifact root. `check-output.mjs` checks those links before deployment.

Original code and editorial text use [0BSD](LICENSE). Third-party terms are in [NOTICE](NOTICE).
