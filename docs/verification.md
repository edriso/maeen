# Verification

## 2026-09-25 — Wider morning/evening windows, and the wordmark returns home

- The clock windows were narrow: morning stopped at Dhuhr and evening at Isha, so a reader
  opening the app in the early afternoon or later in the night was routed to general
  instead of the session they wanted. Both now follow the flexibility Ibn Baz describes
  (already cited in `docs/content-policy.md`): morning runs Fajr→Asr, and evening runs
  Asr→the middle of the night (maghrib to the next Fajr, halved, from Adhan's
  `SunnahTimes`). Only the deep pre-dawn hours fall back to general. The device-clock
  fallback widened to match: morning 04:00–15:00, evening 15:00 to midnight, general
  before dawn. These stay routing windows, not rulings; manual selection and the labelled
  high-latitude fallback are unchanged.
- `chooseByTimes` now takes `{ fajr, asr, nightEnd }` and validates all three, so an
  invalid solar event still drops to the approximate suggestion as before. The
  `content-policy.md` and README window descriptions were updated to match.
- The wordmark was inert, so the only way back to the opening screen was to edit the
  address bar. It is now a plain button that clears the collection hash and reopens the
  time-appropriate suggestion, mirroring a fresh visit. It stays hidden with the rest of
  the chrome in minimal mode and leaves no stray hash. `AGENTS.md` carries the rule.
- `npm run check` (60 cards, 30 tests, strict TypeScript, type-aware oxlint), `npm run
  build`, the static-output check (25 files) and `oxfmt --check` all pass.

## 2026-09-20 — Next moves to the left edge, where RTL puts the next text

- The footer read Next on the right with a right-pointing arrow, which disagreed with
  the rest of the reader: the collection rows and the «افتح المقترح الآن» button already
  use a left arrow for forward, because in RTL the next card lies to the left. Previous
  now opens the row at the right edge and Next closes it at the left, each arrow
  pointing the way it travels. `AGENTS.md` carried the old placement as a rule and was
  updated with it.
- Only the placement changed. `swipeDirection` and `keyboardAction` are untouched: a
  rightward swipe and ArrowRight still advance, ArrowLeft and a leftward swipe still go
  back, and each button keeps the `aria-keyshortcuts` of the key that fires it. The two
  help sentences and the keyboard guide describe keys and swipes rather than sides, so
  they were already correct and were left alone.
- Verified in the built `out/index.html`: the footer renders السابق first (the right edge
  under `dir="rtl"`) carrying the right chevron and `disabled` on the first card, then
  التالي with the left chevron. No rule reverses the row at any breakpoint — the footer
  is a plain `space-between` flex with no `row-reverse`, and the four media queries
  change only heights and padding — so the order holds on phones, tablets, desktops and
  short landscape windows, with the 48px buttons still above the 44px target.
- `npm run check` (60 cards, 30 tests, strict TypeScript, oxlint), `npm run build`, the
  static-output check (25 files) and `oxfmt --check` all pass.

## 2026-09-20 — every scaffold package the reader never loads

- Following the security fix, the rest of the unused scaffold went too. Every import in
  `app/`, `components/`, `lib/`, `scripts/` and the config files was listed first, and
  only `adhan`, `lucide-react`, `react`, `react-dom` and `vinext` are reached from
  `dependencies`.
- Removed: `@base-ui/react`, `@shadcn/react`, `shadcn`, `class-variance-authority`,
  `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `react-day-picker`,
  `react-resizable-panels`, `recharts`, `tw-animate-css`, `clsx`, `tailwind-merge`,
  `react-server-dom-webpack`, `@fontsource-variable/cairo` and `@fontsource/amiri-quran`,
  along with `components.json`, the empty `components/ui/` and `lib/utils.ts`.
- Two of those needed checking rather than grepping. `lib/utils.ts` exported `cn`, the
  only consumer of `clsx` and `tailwind-merge`, and nothing imported `cn`, so the helper
  and both libraries went together with the shadcn config that pointed at them.
  `react-server-dom-webpack` was declared directly but is also required by `vinext` and
  `@vitejs/plugin-rsc`, so dropping the declaration leaves it installed and RSC intact.
- The Fontsource packages were not building anything: `public/fonts` holds the three
  checked-in subsets and `scripts/prepare-output.mjs` only copies `dist/client`. Their
  versions (both 5.3.0) are now recorded in NOTICE and `public/NOTICE.txt`, so the
  provenance of the subsets survives the removal; the OFL texts were already vendored in
  `public/licenses`.
- A clean `npm ci` installs 170 packages, down from 526, and the lockfile holds 288
  entries, down from 642 after the security fix and 701 before it. Still 0
  vulnerabilities.
- Verified after the trim, with `tsconfig.tsbuildinfo` deleted: `npm run check` (60
  cards, 30 tests, strict TypeScript, oxlint), `npm run build`, the static-output check
  (25 files) and `oxfmt --check` all pass. The built output was driven in the browser:
  the merged surah card still measures three blocks at 19px, double and triple clicks
  still count two and three with no selection, a bounce is still dropped, dragging still
  selects, the last card still reads «تم بفضل الله», and both font subsets still return
  200 with their licence files beside them.

- `.openai/hosting.json` and its directory went too, in a follow-up. The file declared
  the static output directory for Sites hosting, which this project does not publish to;
  nothing in the repo reads it, and `npm run check`, `npm run build` and the
  static-output check pass without it.
- A file-by-file audit of `git ls-files` closes this out. Every tracked file is reached:
  each `lib/` module is imported by the reader or a script, each `scripts/` file is an
  npm script, each `public/licenses/` text belongs to a package or font still shipped,
  and `next.config.ts` and `vite.config.ts` are both live build config. The generic
  ignore lines in `.gitignore` (`.vercel`, `/outputs/`, `/work/`, `.claude/`) are kept:
  they guard against committing scratch output, and are not dependencies of anything.

## 2026-09-20 — the sharp advisory, fixed by deleting what pulled it in

- Dependabot flagged `sharp` <0.35.4 as high (GHSA-rgj7-g3m4-5g8c: libheif
  GHSA-g89c-p67h-r497 and GHSA-2jg2-4ch7-h545). `npm audit` showed four high alerts on
  one chain: `@cloudflare/vite-plugin` → `miniflare` → `sharp`, plus `wrangler`.
- Nothing in this project loads any of it. `vite.config.ts` registers only `vinext()`,
  `next.config.ts` is a static export, the one workflow deploys to GitHub Pages, and
  there is no `wrangler.toml`. They are scaffold for a host this project is told not to
  publish to, so they were removed rather than bumped: `@cloudflare/vite-plugin`,
  `wrangler` and `@cloudflare/workers-types`, with the last also dropped from the
  tsconfig `types` list and `/.wrangler/` dropped from `.gitignore`.
- A follow-up removed `@openai/sites-vite-plugin` on the same reasoning: also in
  devDependencies, also never loaded by `vite.config.ts`, and for the same hosting the
  project does not publish to. It carried no advisory, so it was taken out as tidying
  after the security fix rather than as part of it. `.openai/hosting.json` stays: it is a
  one-line declaration of the output directory, not code, and it brings no packages.
- That takes the lockfile from 701 entries to 642, removing 59 and adding none. `sharp`,
  `libvips` and the `workerd` binaries are gone from the tree entirely, so the advisory
  has nothing left to attach to. `npm audit` reports 0 vulnerabilities.
- Bumping instead would have kept an unused native image library, and a repo that never
  touches an image would keep inheriting every libvips advisory.
- Verified on a clean tree, not just the existing `node_modules`: `npm ci` from the
  committed lockfile succeeds (526 packages installed, 0 vulnerabilities), then
  `npm run check` (60 cards, 30 tests, strict TypeScript, oxlint), `npm run build` and
  the static-output check (25 files) all pass, and `tsc` was rerun with
  `tsconfig.tsbuildinfo` deleted so the dropped `@cloudflare/workers-types` could not
  survive in an incremental cache.
- Both removals were re-verified together from a clean `npm ci`: 525 packages installed
  (526 before this second removal), 0 vulnerabilities, and `npm run check`,
  `npm run build`, the static-output check and `oxfmt --check` all pass, with the rebuilt
  output driven in the browser again.
- devDependencies are now `@tailwindcss/postcss`, the three `@types` packages, the two
  Vite plugins Vinext needs, the three ox tools, `tailwindcss`, `typescript` and `vite`,
  each of which the build or a script loads.

Not verified in this round:

- The shadcn packages in `dependencies` are unreferenced too, but the README recorded
  keeping them on purpose, so they were left here and removed in the entry above.

## 2026-09-20 — the last card's Next button

- On the last card the Next button now reads «تم بفضل الله» instead of a disabled
  «التالي», so it closes the sequence instead of sitting there greyed with no reason.
- The wording is the project owner's decision, made after the alternative was put to
  them. The reservation is recorded rather than hidden: the button is disabled by `last`,
  which is where the reader is standing, not by what was read, so it appears on arriving
  at the end by swipe, by End or from the collection list as well as by reading through.
  «بفضل الله» is what keeps it inside the project's rules — it credits God's favour
  instead of scoring the reader, which is the line AGENTS.md draws. It stays a closing
  word: no count, no praise of the reader, no claim the collection is exhaustive.
- The earned wording remains separate, one row up: the read button turns into
  «تمت القراءة» or «اكتمل العدد» only after the narrated count is actually recorded.
- Checked in the built output on عند الاستيقاظ: cards 1 and 2 read «التالي» and are
  enabled, card 3 reads «تم بفضل الله» and is disabled, recording the last card's own
  reading leaves that label alone while the read button becomes «تمت القراءة», and
  stepping back restores «التالي». Previous keeps «السابق» throughout.
- `npm run check` (60 cards, 30 tests, strict TypeScript, oxlint), `npm run build`, the
  static-output check and `oxfmt --check` pass.

Not verified in this round:

- The first card's Previous button still reads a disabled «السابق»; the same treatment
  was left alone because it was not asked for, so the two ends are worded asymmetrically.
- The Next arrow still sits beside the closing word on the last card. It keeps the footer
  from shifting, but nobody judged how the pairing looks to a reader.

## 2026-09-20 — a double click reads twice and selects nothing

- Double clicking the text used to select a word, and the highlight then blocked the read
  it was meant to record, so the gesture both defaced the card and did nothing. The later
  clicks of a sequence now `preventDefault()` on mousedown, which is the one default they
  have; drag selection is untouched, so copying a dhikr still works.
- The 250ms bounce window was the second half of the problem: it dropped the second click
  as noise. `acceptsRead` in `lib/reading.mjs` now takes the click's number in its
  sequence, and a click the browser counted as the second or later skips the window. A
  repeat the browser did not count into a sequence is still dropped, which is what the
  window was for. Six cases are covered in the committed tests.
- Checked in the built output. On a hundred-count card: double click +2, triple click +3,
  single click +1, two slow clicks +2, and two separate clicks 40ms apart +1, the second
  dropped as a bounce. No selection appears in any of them; a drag across the text still
  selects (13 characters) and still does not count.
- A touch double tap behaves the same: the two taps report click numbers 1 and 2 and
  record two readings. A lone tap records one.
- On a single-recitation card the two readings land on two cards: a double click on
  الحمد لله الذي أحيانا reads it, advances, reads ذكر التعارّ من الليل and advances again.
  That follows from one activation being one repetition, and undo walks back both, one
  card per press. It is worth knowing before double clicking out of habit.
- Held Space still records nothing, and the read button under the text counts twice on a
  double click like the reading area does.
- `npm run check` (60 cards, 30 tests, strict TypeScript, oxlint), `npm run build`, the
  static-output check and `oxfmt --check` pass.

Not verified in this round:

- Chromium only. Safari and Firefox group clicks into sequences with their own
  thresholds, and a trackpad or an assistive pointer may report them differently.
- Nobody tried it with a real finger, so whether a double tap on a phone is deliberate
  often enough for this to feel right in the hand is still unknown.

## 2026-09-20 — the reading area is the read button

- The read control was a button wrapped around the letters inside a plain scrolling
  section, so a tap in the empty field above or below the text did nothing. The section
  is now the button itself and the text is a span inside it, which also removes the
  second tab stop and the two jsx-a11y suppressions that the handlers-on-a-section
  pattern needed. Layout is unchanged: the button keeps the section's flex, scroll,
  `touch-action` and 16px block padding, and the card still renders at the same size.
- Checked in the built output at 390×844. A tap in the top margin counts, a tap in the
  bottom margin counts, a tap on the letters counts, and undo reverses each one.
- The guards all survive the move, because they were already on the element that became
  the button: a vertical drag does not count, a horizontal mouse drag neither counts nor
  navigates, a 700ms press does not count, a click with text selected does not count, and
  five auto-repeating Space presses record nothing.
- Keyboard: Space and Enter record from the area, Right/Left navigate, focus stays on the
  area across navigation, and Tab reaches it once with its own inset focus ring. A long
  card (خواتيم آل عمران) still scrolls by wheel and by ArrowDown.
- Minimal mode keeps the tab order at skip link, settings, reading area, and a tap on the
  area counts there too.
- `npm run check` (60 cards, 29 tests, strict TypeScript, oxlint), `npm run build`, the
  static-output check and `oxfmt --check` pass.

Not verified in this round:

- Only Chromium, and only with synthetic pointer events. Real finger taps near the screen
  edges, and Safari's handling of text selection inside a large button, were not tried.
- The hint still reads «اضغط على النص لتسجيل قراءة». That is true but now understates the
  target; the wording was left alone rather than changed without being asked.

## 2026-09-20 — collection icons

- The "المقترح الآن" button drew a hardcoded `Sunrise` whatever it was suggesting, so a
  general or evening suggestion wore the morning icon and contradicted the row beneath it.
  It now takes the suggested collection's own icon from the same map the list uses.
- أذكار عامة moved from a heart to a leaf. The heart read as a like button — a tap target
  rather than a label — which is the opposite of what this list does. The leaf keeps the
  property the heart was chosen for: it names no time, so it stays outside the family of
  five occasion icons instead of joining it.
- Checked in the built output at three clocks: 03:30 suggests أذكار عامة with a leaf,
  08:00 suggests أذكار الصباح with a sunrise, 18:00 suggests أذكار المساء with a sunset.
  The suggestion icon matches its row in all three, and the list reads alarm-clock,
  sunrise, sunset, sun, moon, leaf.

## 2026-09-20 — the merged card, seen rendered

- Each surah on a card now opens its own block (`groupSurahs` in `lib/core.mjs`, `.surah`
  in the stylesheet) with a 1.4em break between them, so the three no longer read as one
  run of text. A card holding one surah is still one block, and the break is in `em`, so
  it scales with whatever size the fit-text hook settles on.
- This round had a browser, which closes the caveat left below. Driving the built static
  output in headless Chrome at 390×844: the morning card is three blocks at 19px with
  27px breaks, and the reading area fits it exactly with nothing clipped. Bedtime
  (المعوذات مع النفث) and after-prayer (المعوذات بعد الصلاة, now last at 10/10) render the
  same. `خواتيم آل عمران` is one block at the 18px floor and still scrolls, unchanged.
- Counting and undo were exercised on the merged card: three taps count ١، ٢، ٣ and then
  advance to أصبحنا وأصبح الملك لله, and undo returns to the card at two. The source panel
  shows حسن؛ حسنه الألباني, links Abu Dawud 5082 and opens the verses at tanzil.net/#112:1.
- Swept 320×568, 390×844, 844×390 landscape, 1280×800, dark, minimal mode and text zoom at
  80% and 160%. Three blocks everywhere, nothing clipped in any of them. The card needs
  scrolling at 320×568 (258px over), in a short landscape window (87px over) and at 160%
  zoom (635px over). That is the documented fit-text floor plus scrolling, the same
  fallback `waking-imran` already relies on, and the gap is not what causes it: the merged
  reading is simply longer than a 320px-wide screen holds.

## 2026-09-20 — one card per Quran reading, and a full re-read of every source

- `quranRefs` no longer split into one card per surah. The three surahs read together are
  now one card in morning, evening, after prayer and before sleep, so the collections went
  from 66 to 60 cards: waking 3, morning 19, evening 17, prayer 10, sleep 15, general 8.
- This is a count fix, not only a layout one. Abu Dawud 5082 says «قل هو الله أحد
  والمعوذتين حين تمسي وحين تصبح ثلاث مرات» — the three repetitions cover the whole
  reading. Three cards at three each asked for nine readings where the matn asks for
  three. Bukhari 5017 (×3 at bedtime) and Abu Dawud 1523 (after prayer) read the same way.
  The morning/evening card is titled with the narration's own wording, and its context no
  longer says «تقرأ كل سورة ثلاث مرات».
- `data/surah-names.json` only existed to title those split cards, so it is removed
  along with its digest. The manifest now pins the Quran corpus and the source records.
- Every displayed text was re-read against its cited narration: all 50 source URLs were
  fetched through the public reader proxy, and where a page renders no Arabic block the
  matn came from the checksum-comparable Sunnah.com mirror
  (`cdn.jsdelivr.net/gh/fawazahmed0/hadith-api`), matched by the page's own in-book
  reference. Every card's Arabic is a verbatim slice of its narration except the twelve
  places the records already document: the Hisn al-Muslim evening inflections (Abu Dawud
  5069, 5073, 5084), the expanded morning form of Muslim 2723 (شرح حصن المسلم, lesson 77),
  the أراه قال فيهن interjection inside Muslim 2723b, the عوراتي variant Abu Dawud 5074
  attributes to عثمان بن أبي شيبة, and the tasbih segments, which the matn reports as
  actions (سبّح، حمد، كبّر) rather than quoting. Every grade on the card matches the grade
  line on its page.
- Checked against the Hisn al-Muslim morning/evening chapter: the collections carry every
  item in it except the four with recorded reasons — آية الكرسي and حسبي الله ×7 and
  الصلاة على النبي عشرًا on their grades, and أمسينا على فطرة الإسلام, whose page turns out
  to carry a single combined morning-and-evening formula rather than an evening wording
  (see docs/content-policy.md; the earlier note calling that a plumbing block was wrong).
  لا إله إلا الله ×100 and أستغفر الله ×100 stay in the general collection because both
  narrations say في اليوم, not إذا أصبح.
- `npm run check` (60 cards, digests, positions, 28 tests, strict TypeScript, oxlint),
  `npm run build` and the static-output check all pass.

Not verified in this round:

- No browser was available, so the merged card was not seen rendered. It resolves to 538
  characters across fifteen verses, well under `waking-imran` at 1,844, and the reader
  already lays out multi-verse cards; still, look at it before publishing. Verse numbers
  restart at ﴿١﴾ for each surah, which each surah's own basmala separates.
- The scope was the reading cards and their sources. Timing, city and gesture behaviour
  were not re-tested; the 2026-09-16 audit below still stands.

## 2026-09-16 — waking collection, wider city list, timing audit

- Collections grew from 61 to 66 reading cards and from five to six: a new waking
  collection (3), morning 21, evening 19, prayer 12, sleep 17, general 8.
- The waking collection is Hisn al-Muslim's opening chapter, all from the Sahihayn:
  الحمد لله الذي أحيانا (Bukhari 6312), the dhikr for stirring in the night (Bukhari 1154)
  and the ten closing verses of Al ʿImran (Muslim 763b, whose matn names العشر الآيات
  الخواتم rather than quoting them, so 3:190-200 resolve from the pinned corpus).
  General gained الباقيات الصالحات (Muslim 2695, unrestricted) and دعاء الكرب (Bukhari 6346).
  Wording was sliced out of each narration programmatically, not retyped.
- Bukhari 1154 stops where its quoted dhikr stops. The اللهم اغفر لي that follows is a
  separate step in the narration and is reported in the context, not joined to the formula.
- Refused the bedtime السجدة/الملك reading: Tirmidhi 2892 is graded ضعيف مقطوع by Al-Albani
  and ضعيف by Zubair Ali Zai, so it is not even marfu' there. Recorded with its reason.
- Cities went from 7 to 35, grouped by region in the picker, each with its own IANA zone
  and the default calculation method for its region. Methods went from 6 to 12, adding
  Umm al-Qura, Qatar, Kuwait, Tehran, Singapore and ISNA North America. Saudi cities now
  default to Umm al-Qura, the official calendar there, instead of the Muslim World League.
- Timing audit, all by running the real `suggestion`:
  - 153,300 combinations (35 cities × 365 days × 12 hours) produced zero fallbacks to the
    clock, and every city reaches morning, evening and general over a year.
  - The same instant and city gives the same answer with the process timezone set to UTC,
    Africa/Cairo, America/New_York, Pacific/Apia, Pacific/Chatham and Asia/Kathmandu, so
    the result never depends on where the reader's device thinks it is. Spot-checked
    windows are sensible: Cairo morning 06:00–13:00 local, London evening 17:00–20:00.
  - Rebuilding the city's calendar date as a process-local Date was probed across twelve
    process zones, including ones with midnight DST jumps, over a full year: the year,
    month and day always survive.
  - The clock never auto-selects waking, after-prayer or bedtime; those stay manual.
- Backward compatibility was checked explicitly: every city id and method name that
  existed before is still present, so a stored preference keeps working, and an unknown
  id still resets to blank rather than to a wrong city.
- Structural checks pass: unique city ids and labels, every zone usable by
  Intl.DateTimeFormat, every city's method listed, every listed method carrying an Arabic
  label, every collection having an icon and at least one card, and every card keeping a
  grade, narrator, source URL and context. Unrestricted cards carry no target and
  single-recitation cards carry exactly one.
- `node scripts/content.mjs` (66 cards, digests, positions), the 28 committed tests,
  strict TypeScript and oxlint all pass, as does the production static export and the
  static-output check (25 files, RTL, local fonts).

Not verified in this round:

- No browser was available, so nothing was seen rendered. `waking-imran` is 1,844
  characters, roughly three times the previous longest card; reading the stylesheet and
  the fit-text hook says it floors at 18px and then scrolls inside `.reading-area`, which
  is the documented fallback, but that was not watched happening. Look at that card, and
  at the grouped city picker with 35 entries, before publishing.
- `scripts/` and `package.json` are mounted read-only in this environment, so none of the
  timing and structural checks above could be added to `scripts/core.test.mjs` where
  `npm run check` would run them. They were run as a one-off harness against the real
  modules. Fold them into the committed tests when that directory is writable.
- The two candidates from the previous round are still out for the same reason: they need
  a `verifiedLinks` line in `scripts/content.mjs`. See docs/content-policy.md.
- Calculation methods are the published regional defaults, not a ruling that a given
  mosque uses them; the reader can change the method and the Asr convention.

## 2026-09-16 — source audit and weak-narration disclosure

- Re-read every one of the 43 existing records against its cited page before changing
  anything. All 43 resolve: the number exists, the stored Arabic is inside that narration,
  and the stored grade matches the grade the page prints. Two records whose text is not a
  contiguous quotation were checked by hand and are correct as documented: `evening-kingdom`
  concatenates the two halves of Muslim 2723b across its `قال أراه قال فيهن`, and
  `post-prayer-tasbih` renders the narrated actions سبّح/حمد/كبّر, which its own note states.
- Cross-read the Abu Dawud grade list for every narration the project uses or refuses.
  Every included one is sahih or hasan; every refused one is weak or worse, exactly as
  `expansionReview.excluded` recorded: 5069, 5072, 5073, 5083, 5084 = ضعيف, 5081 = موضوع.
- Collections grew from 54 to 61 reading cards: morning 17→21, evening 15→19; prayer 12,
  sleep 17 and general 6 are unchanged. Morning and evening now follow the Hisn al-Muslim
  chapter order with fewer gaps in it.
- Added Abu Dawud 5069, 5072, 5073 and 5084 under the disclosure rule in
  docs/content-policy.md, each card showing its own ضعيف grade. Abu Dawud 5081 stays out on
  موضوع. Wording for all four was sliced out of the mirrored narration programmatically, so
  it carries the narration's own text rather than the printed Hisn wording: 5069 has no
  وحدك لا شريك لك, 5073 has no أو بأحد من خلقك, and 5072 reads رضينا … رسولًا with no ×3.
  Each record says so. The Tirmidhi 3389 رضيت … نبيًّا variant is named but not merged in.
- Evening forms for 5069, 5073 and 5084 follow the existing `morning-kingdom` precedent:
  each narration states the evening timing itself (حين يصبح أو يمسي / مثل ذلك حين يمسي /
  ثم إذا أمسى فليقل مثل ذلك) and only the verb inflection follows Hisn al-Muslim. Each
  record's context and note say that plainly.
- Corrected one wrong exclusion reason. The morning/evening salawat ×10 was recorded as
  unciteable; it is in fact graded ضعيف by al-Albani in السلسلة الضعيفة 5788
  (https://dorar.net/h/Zx6Sk8ey), after he had graded it hasan and retracted. The entry now
  states the grade.
- Morning/evening Ayat al-Kursi stays deferred, now on a fuller record: ضعيف at al-Albani in
  four places, إسناده ضعيف at al-Nawawi, ضعيف at Ibn Baz, غريب at Tirmidhi and al-Baghawi.
- Dorar and Sunnah.com both refuse automated requests, so their pages were read through the
  same public reader proxy the earlier round used, and cross-read against the Arabic mirror
  of the Sunnah.com corpus matched by in-book reference. The two readings agreed everywhere
  they overlapped.
- `node scripts/content.mjs` (61 cards, digests, positions), 28 focused tests, strict
  TypeScript and oxlint all pass, as does the production static export with its base path
  and the static-output check (25 files, RTL, local fonts).

Not verified in this round:

- No browser was available, so nothing was seen rendered. The four added cards and the
  reordered morning/evening sequences were not viewed in the running app at any width, and
  no keyboard, mobile-emulation, screen-reader or 200% zoom pass was made. Re-run the
  earlier device and keyboard checks before publishing.
- `scripts/` is mounted read-only in this environment, so the `verifiedLinks` allowlist
  could not be touched. Two candidates that verified cleanly are therefore still absent:
  `أمسينا على فطرة الإسلام` and آية الكرسي دبر كل صلاة. Both are written up in
  docs/content-policy.md with their pages and grades; each needs one allowlist line.
- Reading source pages is transcription against the cited pages, not qualified scholarly
  review, and admitting a weak narration is a disclosure decision, not a ruling that it is
  authentic. The site does not claim that status.

## 2026-09-05 — reader, content and appearance

- Source researcher inspected the Arabic source pages and repetition contexts before
  data import. The pipeline verifies the pinned records and unmodified Quran corpus.
- Focused tests pass: time-window boundaries, local city calculations, invalid
  stored settings, zoom bounds, swipe direction, ignored gestures, bounded navigation,
  narration suffixes, Quran ranges, unrestricted-count protection, keyboard guards, and
  exact allowlisted source destinations, theme migration, atomic count/advance/undo,
  tap intent, and font-loading/failure gates.
- The original timing tests also passed with the process timezone changed to America/New_York; the Cairo
  calculation still selects morning from the same absolute instant.
- Strict TypeScript and lint pass. The only accessibility lint exceptions are the
  deliberately focusable, keyboard-scrollable reading region; it is not mislabelled
  as a button. It has visible arrow-button alternatives.
- Production static export succeeds with the repository base path /maeen. Output
  validation checks Arabic/RTL metadata, the absence of zoom restrictions, local fonts,
  and referenced assets. Pages staging strips the physical repository directory while
  retaining URL prefixes, as required by GitHub Pages project hosting.
- Independent code review identified short-landscape clipping and a small timing-button
  touch target. Both are fixed with a short-screen scrolling fallback and a 44px target.
- npm audit reported zero known vulnerabilities after updating the starter dependencies.

- Desktop Brave UI verification: arrow navigation from initial page focus, Enter adds
  one reading, End reaches the last item without wrapping, settings isolate shortcuts,
  and Escape restores focus to the settings trigger. The expanded evening collection
  reaches 15 items; its final text fits the desktop reading area, and its source panel
  displays the expected Muslim reference and single-reading explanation.
- Expanded to 16 morning and 15 evening cards with inspected timing/count evidence.
  Source variants and deferred candidates are recorded in data/sources.json.

- New appearance/interaction checks in the production export: dark mode persists on
  refresh; the reader and settings have consistent dark surfaces and readable text.
  Clicking text advances single readings; Enter/Space count all three repetitions
  before advancing and preserve focus. Undo restores the prior card/count. Right
  advances and Left returns, including after undo.
- At 390×844 in Brave device emulation: the long opening prayer fits; a rightward
  touch swipe advances without counting, a text tap records exactly one repetition,
  and a vertical gesture leaves the count and card unchanged.
- First-paint tests simulate slow/failed fonts, late font completion, malformed or denied
  storage, and missing reader initialization. Static checks verify the three font preloads
  and app icon. Refresh was visually inspected; no network-throttled filmstrip was captured.

- Minimal-mode checks: enabling the saved boolean hides supporting text and buttons
  from both view and the accessibility tree; the settings button and repetition count
  remain. Refresh preserves the setting. Option+S/Z and Escape, text activation and arrow
  navigation work in desktop Brave. Sources open from settings with focus on Close.
  Invalid/legacy preferences and shortcut editing/modifier guards have focused tests.

- Space regression: a fresh-page Space press advances a single-reading card; the next
  press records 1/3 without advancing early. Verified in desktop Brave minimal mode.
  Tests also cover page/text focus, native controls, held keys and modifier guards.

Not verified in that round:

- Mobile-device gestures, screen-reader behavior, and 200% zoom.
  Desktop UI was available for keyboard checks; these checks are not a substitute for
  mobile-device or assistive-technology testing.
- Optional WebMCP tools are feature-detected and do not affect ordinary readers. No
  supporting browser registry was available, so registration/state transitions are unverified.
- Source checking is not qualified scholarly review; the site does not claim that status.

## 2026-09-05 — content expansion and interface simplification

- Collections grew from 29 to 54 reading cards: morning 17, evening 15, after prayer 12,
  before sleep 17, general 6. Bedtime went from 2 cards to 17.
- Every added narration was read on its own Sunnah.com page through a text proxy (the
  site refuses automated requests) and cross-read against the Arabic mirror of the same
  Sunnah.com corpus, matched by in-book reference. Displayed wording is sliced out of that
  narration text programmatically rather than retyped.
- Four widely reprinted morning/evening entries were rejected on their own grade lines:
  Abu Dawud 5069 (ضعيف), 5073 (ضعيف), 5084 (ضعيف) and 5081 (موضوع at al-Albani), plus
  رضيت بالله ربًّا (Abu Dawud 5072 / Tirmidhi 3389, ضعيف at al-Albani). Reasons are
  recorded in data/sources.json.
- Muslim citations were confirmed against the number Sunnah.com itself prints, including
  its lettered forms (593a, 594a, 406a, 2702a, 2713a, 2714a, 2710a); each cited URL was
  opened and returned that reference.
- Collection ordering is now data: each remembrance stores its position per collection,
  duplicate positions fail the build, and the generator reports per-collection sizes.
- Default interface reduced from eight stacked bands to five. The wordmark, collection
  heading, item counter and timing note collapsed into one header row whose middle control
  opens the collection list; the tap hint and repetition label merged into one line; the
  footer keeps only Next/Previous. Minimal mode is unchanged in what it hides.
- Appearance is now a three-way segmented radio control instead of a select. Theme values,
  storage format and the pre-paint bootstrap are unchanged.
- The read button shows a quiet progress fill for multi-repetition texts.
- Added an opt-in page pattern: a seamless eight-point star tile inlined as a per-theme
  data URI, painted by a fixed pseudo-element under a radial veil. Plain remains the
  default; the choice is stored, validated as an exact value, and restored before first
  paint alongside the theme. The tile was rendered offline at several opacities in both
  themes to confirm it repeats without seams and leaves the reading field clear; 0.15
  (light) and 0.16 (dark) at a 144px tile were chosen from those renders.
- npm run check (28 tests, digests, positions, strict TypeScript, lint) and the production
  static export with the repository base path both pass.

Not verified in this round:

- No browser was available in this session, so the redesigned layout was not seen
  rendered: no desktop, mobile-emulation, screen-reader, or 200% zoom pass was made on
  the new header, hint line, segmented theme/background controls, progress fill, or the
  pattern in the running app. Only the pattern tile itself was rendered, on its own. The layout math
  (band heights against 100dvh) was checked by reading the stylesheet only. Re-run the
  earlier device and keyboard checks before publishing.
- Source reading is transcription against the cited pages, not qualified scholarly review.
