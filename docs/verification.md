# Verification

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
- Production static export succeeds with the repository base path /zaadi. Output
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
