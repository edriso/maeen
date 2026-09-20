# Religious text and timing

Quran: unmodified Tanzil Uthmani 1.1 corpus, inherited from edriso/learn-tajweed via
true-muslim. SHA256 7f30c647331a61100ebf24a80507dc0fcdd9f2df97f1312b5b2dfcb982a7f326.
Keep the complete original file including its notice. The generator resolves references.
Every surah in this corpus already begins with its basmala inside the first ayah, so a
whole short surah (109, 112–114) needs no prefix added. Do not prepend a second basmala.
Sources: https://tanzil.net/download/ and https://tanzil.net/docs/text_license.

Each source record stores exact text or Quran references, source URL, label, narrator,
grade and source inspection date. Each collection item defines a count only when its
contextual evidence supports it. Do not shorten a dhikr without marking it as an excerpt;
this app ordinarily displays the complete text to be recited.

Timing: default suggestions use the device clock and explicitly say they are approximate.
City selection enables local calculations using Adhan.js, with a selectable method and
Asr convention. Fajr–Dhuhr suggests morning, Asr–Isha suggests evening; other times
suggest general remembrance. These are product routing windows, not claims that reading
outside them is invalid. Never automatically choose waking, after-prayer or bedtime based
on clock time alone. Manual selection is always available.

The city table in `lib/core.mjs` is the whole location story: each entry carries its own
IANA zone, coordinates and the default calculation method for its region, and the picker
groups entries by region because the list is long. Adding a city is how coverage grows;
never add a geolocation request or a remote timing API. Never remove or rename a city id
or a method name, because a stored preference holds one and an unknown value silently
resets the reader to the device clock. Saudi cities use Umm al-Qura, the official
calendar there; Egypt and Sudan use the Egyptian survey; the Gulf states, Turkey, Iran,
the subcontinent, southeast Asia and North America each use their own regional method.

Ibn Baz describes flexibility in morning/evening remembrance timing:
https://binbaz.org.sa/fatwas/9949/وقت-اداء-اذكار-الصباح-والمساء
Calculation documentation: https://github.com/batoulapps/adhan-js/blob/master/METHODS.md

Locations are optional and stored on the device only. A chosen city supplies coordinates
and its IANA timezone; calculations use the city's calendar date, not an assumed device
calendar date. Invalid/high-latitude solar events trigger a labelled approximate fallback.
Counts are a reading aid, not a record of spiritual achievement or proof of recitation.

## Reading order

A remembrance names every collection it belongs to together with its position in each of
them: `"groups": { "morning": 8, "evening": 8, "sleep": 12 }`. The build rejects a
duplicate position inside one collection and a position in an unknown collection, and the
reader sorts each collection by its own numbers. Sequences follow the Hisn al-Muslim
chapter order for morning, evening, after-prayer and bedtime. Order is presentation, not
a ruling: nothing in the app claims a required sequence.

Segments (the after-prayer and bedtime tasbih) carry their own title, text and count in
the source record. Never attach one count to a block of several formulas.

## Inclusion standard

Being printed in a popular compilation is not evidence. Before a text is added, open the
narration it is attributed to and read the grade shown there. The grade that page shows is
what the source panel displays, whatever it says.

A narration the inspected page grades weak may be shown, because Ibn Baz and the jumhur act
on a weak narration in fada'il, and several such texts are prayed daily from the printed
Hisn al-Muslim. It is shown with its grade on the card, never relabelled or quietly
promoted. A narration graded fabricated is not shown at all: no allowance covers موضوع.
Abu Dawud 5069, 5072, 5073 and 5084 are in the collections on that basis; Abu Dawud 5081
(حسبي الله ×7) is not, because the same page grades it موضوع.

Entries still refused are listed under `expansionReview.excluded` in `data/sources.json`
with the reason. Recording the grade is the point of the rule; the reader decides what to
read, and the app never implies that a weak text is established or that skipping one is a
shortfall.

Where a narration reports a practice rather than quoting a formula (the hundredfold
istighfar, the after-prayer istighfar), the displayed wording is the shortest known form
and the source panel says so. Do not present such wording as a verbatim quotation.

## Collection coverage and variant review

The morning/evening collections are selected readings, not a fixed religious checklist.
The card count depends on the selected narrations. Never add texts just to reach a
requested numerical total.

A record's `quranRefs` resolve into one card, whatever the reference covers: a verse, a
surah, a range, or the three surahs a narration names in one breath. The count on the
record then belongs to that whole reading, which is what the narration says. Abu Dawud
5082 puts ثلاث مرات on «قل هو الله أحد والمعوذتين» together, not on each surah, so three
cards at three repetitions each would ask for triple what the matn asks. The same holds
for Bukhari 5017 at bedtime and Abu Dawud 1523 after prayer.

One reading is not one paragraph. The reader groups the verses by surah and opens each
surah on its own line, so the three run as three passages rather than one block of text;
`groupSurahs` in `lib/core.mjs` does the grouping and a card of a single surah, however
many verses, stays one block.

Collections follow the Hisn al-Muslim chapter order, waking first. The waking collection
covers that book's opening chapter from the Sahihayn: the praise on waking, the dhikr for
stirring in the night, and the ten closing verses of Al ʿImran. `waking-imran` resolves
eleven verses into one card and is by far the longest card in the app, so it relies on
the reading area's own scrolling and on the fit-text floor rather than shrinking to fit.

Additional source destinations are individually allowlisted in scripts/content.mjs.
Sunnah.com combines Muslim 2709a with 2708b at the 2708b URL; preserve the actual
narration number 2709a for the evening text. Morning Muslim 2723 is expanded explicitly
in Hisn al-Muslim; the displayed context explains this, and the link points to the
author's page. Dorar entries preserve the named scholar's grade and exact quoted variant.
Narrations that Sunnah.com serves under a lettered number (593a, 2713a) are cited and
linked with that letter.

`المعوذات دبر كل صلاة` (Abu Dawud 1523) uses a plural whose scope is an editorial
reading: al-Ikhlas is shown with al-Falaq and an-Nas, and the record says so. Do not
present that reading as extra wording inside the narration.

Deferred records are documented in data/sources.json. Morning/evening Ayat al-Kursi is not
added: the narration that ties it to morning and evening is graded ضعيف by al-Albani
(ضعيف الجامع 5769, ضعيف الترغيب 390, ضعيف الترمذي 2879, and ضعيف جدًا in هداية الرواة 2086),
إسناده ضعيف by al-Nawawi, and ضعيف by Ibn Baz, with Tirmidhi and al-Baghawi calling it غريب.
That is weaker than the entries admitted above, and the strongest wordings for it sit
outside what this project can cite, so it waits for qualified review. The bedtime reading is
unaffected and rests on Bukhari 2311. This selection does not rule on a reader's practice or
claim consensus on grading.

Two candidates are still out, and neither is in the six books Sunnah.com serves, so each
would also need its own line in the `verifiedLinks` allowlist in `scripts/content.mjs`.

آية الكرسي دبر كل صلاة (الصحيح المسند 478, https://dorar.net/h/v2xoKlbX, and صحيح at
al-Albani in صحيح الجامع 6464) is blocked by that allowlist alone.

`أمسينا على فطرة الإسلام` is not: re-reading https://dorar.net/h/wco7YVhF on 2026-09-20
shows one formula covering both ends of the day — «أصبَحنا على فِطرةِ الإسلامِ، وأمسَينا
على فِطرةِ الإسلامِ...» — graded `[رجاله] رجال الصحيح` by محمد بن يوسف الصالحي in
سبل الهدى والرشاد 7/258. There is no evening-only wording on that page, so an evening card
would mean either showing a text that also says أصبحنا or re-inflecting the verb, and this
project does not manufacture morning/evening variants. Morning keeps its own narration
(نتائج الأفكار 2/401). The evening side waits for a narration that states it, or for
qualified review, not for plumbing.

## How source pages were read

Sunnah.com refuses automated requests, so its pages were retrieved as rendered text
through a public reader proxy, which returns the page's own Arabic, reference numbers,
in-book reference and grade line. Where a page renders no Arabic block, the matn was
taken from a checksum-comparable mirror of the same Sunnah.com corpus
(`cdn.jsdelivr.net/gh/fawazahmed0/hadith-api`, Arabic editions, which carry the same
grade lists) and matched to the page by its in-book reference. Added wording is sliced
out of that verified narration text programmatically, so no character is introduced by
an editor. Both readings agreed everywhere they overlapped. This is careful transcription,
not qualified scholarly review, and the app never claims otherwise.
