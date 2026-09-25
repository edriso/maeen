import {
  CalculationMethod,
  Coordinates,
  Madhab,
  PrayerTimes,
  SunnahTimes,
} from 'adhan';
export const MIN_ZOOM = 0.8;
export const MAX_ZOOM = 1.6;
/**
 * Cities are the only way to get calculated times: the app never asks for a
 * location or infers one. Each carries its own IANA zone so the calculation uses
 * the city's calendar date, and a default method for its region.
 */
export const cities = [
  {
    id: 'makkah',
    label: 'مكة المكرمة',
    lat: 21.4225,
    lng: 39.8262,
    zone: 'Asia/Riyadh',
    method: 'UmmAlQura',
    region: 'الخليج والجزيرة',
  },
  {
    id: 'madinah',
    label: 'المدينة المنورة',
    lat: 24.4672,
    lng: 39.6111,
    zone: 'Asia/Riyadh',
    method: 'UmmAlQura',
    region: 'الخليج والجزيرة',
  },
  {
    id: 'riyadh',
    label: 'الرياض',
    lat: 24.7136,
    lng: 46.6753,
    zone: 'Asia/Riyadh',
    method: 'UmmAlQura',
    region: 'الخليج والجزيرة',
  },
  {
    id: 'jeddah',
    label: 'جدة',
    lat: 21.4858,
    lng: 39.1925,
    zone: 'Asia/Riyadh',
    method: 'UmmAlQura',
    region: 'الخليج والجزيرة',
  },
  {
    id: 'dubai',
    label: 'دبي',
    lat: 25.2048,
    lng: 55.2708,
    zone: 'Asia/Dubai',
    method: 'Dubai',
    region: 'الخليج والجزيرة',
  },
  {
    id: 'doha',
    label: 'الدوحة',
    lat: 25.2854,
    lng: 51.531,
    zone: 'Asia/Qatar',
    method: 'Qatar',
    region: 'الخليج والجزيرة',
  },
  {
    id: 'kuwait',
    label: 'الكويت',
    lat: 29.3759,
    lng: 47.9774,
    zone: 'Asia/Kuwait',
    method: 'Kuwait',
    region: 'الخليج والجزيرة',
  },
  {
    id: 'manama',
    label: 'المنامة',
    lat: 26.2285,
    lng: 50.586,
    zone: 'Asia/Bahrain',
    method: 'Kuwait',
    region: 'الخليج والجزيرة',
  },
  {
    id: 'muscat',
    label: 'مسقط',
    lat: 23.588,
    lng: 58.3829,
    zone: 'Asia/Muscat',
    method: 'MuslimWorldLeague',
    region: 'الخليج والجزيرة',
  },
  {
    id: 'sanaa',
    label: 'صنعاء',
    lat: 15.3694,
    lng: 44.191,
    zone: 'Asia/Aden',
    method: 'MuslimWorldLeague',
    region: 'الخليج والجزيرة',
  },
  {
    id: 'quds',
    label: 'القدس',
    lat: 31.7683,
    lng: 35.2137,
    zone: 'Asia/Hebron',
    method: 'MuslimWorldLeague',
    region: 'الشام والعراق',
  },
  {
    id: 'amman',
    label: 'عمّان',
    lat: 31.9454,
    lng: 35.9284,
    zone: 'Asia/Amman',
    method: 'MuslimWorldLeague',
    region: 'الشام والعراق',
  },
  {
    id: 'damascus',
    label: 'دمشق',
    lat: 33.5138,
    lng: 36.2765,
    zone: 'Asia/Damascus',
    method: 'MuslimWorldLeague',
    region: 'الشام والعراق',
  },
  {
    id: 'beirut',
    label: 'بيروت',
    lat: 33.8938,
    lng: 35.5018,
    zone: 'Asia/Beirut',
    method: 'MuslimWorldLeague',
    region: 'الشام والعراق',
  },
  {
    id: 'baghdad',
    label: 'بغداد',
    lat: 33.3152,
    lng: 44.3661,
    zone: 'Asia/Baghdad',
    method: 'MuslimWorldLeague',
    region: 'الشام والعراق',
  },
  {
    id: 'cairo',
    label: 'القاهرة',
    lat: 30.0444,
    lng: 31.2357,
    zone: 'Africa/Cairo',
    method: 'Egyptian',
    region: 'مصر وشمال إفريقيا',
  },
  {
    id: 'alexandria',
    label: 'الإسكندرية',
    lat: 31.2001,
    lng: 29.9187,
    zone: 'Africa/Cairo',
    method: 'Egyptian',
    region: 'مصر وشمال إفريقيا',
  },
  {
    id: 'khartoum',
    label: 'الخرطوم',
    lat: 15.5007,
    lng: 32.5599,
    zone: 'Africa/Khartoum',
    method: 'Egyptian',
    region: 'مصر وشمال إفريقيا',
  },
  {
    id: 'tripoli',
    label: 'طرابلس',
    lat: 32.8872,
    lng: 13.1913,
    zone: 'Africa/Tripoli',
    method: 'Egyptian',
    region: 'مصر وشمال إفريقيا',
  },
  {
    id: 'tunis',
    label: 'تونس',
    lat: 36.8065,
    lng: 10.1815,
    zone: 'Africa/Tunis',
    method: 'MuslimWorldLeague',
    region: 'مصر وشمال إفريقيا',
  },
  {
    id: 'algiers',
    label: 'الجزائر',
    lat: 36.7538,
    lng: 3.0588,
    zone: 'Africa/Algiers',
    method: 'MuslimWorldLeague',
    region: 'مصر وشمال إفريقيا',
  },
  {
    id: 'casablanca',
    label: 'الدار البيضاء',
    lat: 33.5731,
    lng: -7.5898,
    zone: 'Africa/Casablanca',
    method: 'MuslimWorldLeague',
    region: 'مصر وشمال إفريقيا',
  },
  {
    id: 'istanbul',
    label: 'إسطنبول',
    lat: 41.0082,
    lng: 28.9784,
    zone: 'Europe/Istanbul',
    method: 'Turkey',
    region: 'آسيا',
  },
  {
    id: 'tehran',
    label: 'طهران',
    lat: 35.6892,
    lng: 51.389,
    zone: 'Asia/Tehran',
    method: 'Tehran',
    region: 'آسيا',
  },
  {
    id: 'karachi',
    label: 'كراتشي',
    lat: 24.8607,
    lng: 67.0011,
    zone: 'Asia/Karachi',
    method: 'Karachi',
    region: 'آسيا',
  },
  {
    id: 'lahore',
    label: 'لاهور',
    lat: 31.5204,
    lng: 74.3587,
    zone: 'Asia/Karachi',
    method: 'Karachi',
    region: 'آسيا',
  },
  {
    id: 'delhi',
    label: 'دلهي',
    lat: 28.6139,
    lng: 77.209,
    zone: 'Asia/Kolkata',
    method: 'Karachi',
    region: 'آسيا',
  },
  {
    id: 'dhaka',
    label: 'دكا',
    lat: 23.8103,
    lng: 90.4125,
    zone: 'Asia/Dhaka',
    method: 'Karachi',
    region: 'آسيا',
  },
  {
    id: 'kualalumpur',
    label: 'كوالالمبور',
    lat: 3.139,
    lng: 101.6869,
    zone: 'Asia/Kuala_Lumpur',
    method: 'Singapore',
    region: 'آسيا',
  },
  {
    id: 'jakarta',
    label: 'جاكرتا',
    lat: -6.2088,
    lng: 106.8456,
    zone: 'Asia/Jakarta',
    method: 'Singapore',
    region: 'آسيا',
  },
  {
    id: 'london',
    label: 'لندن',
    lat: 51.5074,
    lng: -0.1278,
    zone: 'Europe/London',
    method: 'MoonsightingCommittee',
    region: 'أوروبا والأمريكتان',
  },
  {
    id: 'paris',
    label: 'باريس',
    lat: 48.8566,
    lng: 2.3522,
    zone: 'Europe/Paris',
    method: 'MuslimWorldLeague',
    region: 'أوروبا والأمريكتان',
  },
  {
    id: 'berlin',
    label: 'برلين',
    lat: 52.52,
    lng: 13.405,
    zone: 'Europe/Berlin',
    method: 'MuslimWorldLeague',
    region: 'أوروبا والأمريكتان',
  },
  {
    id: 'newyork',
    label: 'نيويورك',
    lat: 40.7128,
    lng: -74.006,
    zone: 'America/New_York',
    method: 'NorthAmerica',
    region: 'أوروبا والأمريكتان',
  },
  {
    id: 'toronto',
    label: 'تورونتو',
    lat: 43.6532,
    lng: -79.3832,
    zone: 'America/Toronto',
    method: 'NorthAmerica',
    region: 'أوروبا والأمريكتان',
  },
];
export const methods = [
  'UmmAlQura',
  'Egyptian',
  'MuslimWorldLeague',
  'Dubai',
  'Qatar',
  'Kuwait',
  'Turkey',
  'Tehran',
  'Karachi',
  'Singapore',
  'NorthAmerica',
  'MoonsightingCommittee',
];
export function clampZoom(value) {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(value * 10) / 10))
    : 1;
}
/**
 * @typedef {{zoom: number, minimal: boolean, theme: 'light' | 'dark' | 'system',
 *   background: 'plain' | 'pattern', city: string, method: string, hanafi: boolean}} Preferences
 */
/**
 * Anything older, malformed or unreadable reads as the plain default screen.
 * @returns {Preferences}
 */
export const defaultPreferences = () => ({
  zoom: 1,
  city: '',
  method: '',
  hanafi: false,
  theme: 'light',
  background: 'plain',
  minimal: false,
});
/**
 * @param {string | null} raw
 * @returns {Preferences}
 */
export function parsePreferences(raw) {
  try {
    const value = JSON.parse(raw ?? 'null');
    if (!value || value.version !== 1) return defaultPreferences();
    return {
      zoom: clampZoom(value.zoom),
      minimal: value.minimal === true,
      theme: ['light', 'dark', 'system'].includes(value.theme)
        ? value.theme
        : 'light',
      background: value.background === 'pattern' ? 'pattern' : 'plain',
      city: cities.some((city) => city.id === value.city) ? value.city : '',
      method: methods.includes(value.method) ? value.method : '',
      hanafi: value.hanafi === true,
    };
  } catch {
    return defaultPreferences();
  }
}
/**
 * The device-clock fallback. Morning runs from dawn through the forenoon into
 * the early afternoon, evening from mid-afternoon into the night, and only the
 * deep pre-dawn hours fall back to general. These are generous routing windows,
 * not a ruling that reading outside them is invalid.
 */
export function approximateCollection(hour) {
  return hour >= 4 && hour < 15
    ? 'morning'
    : hour >= 15
      ? 'evening'
      : 'general';
}
/**
 * Prayer-time routing, widened to match the flexibility Ibn Baz describes for
 * morning/evening remembrance (see docs/content-policy.md):
 *   Fajr → Asr             → morning (dawn through the forenoon)
 *   Asr  → middle of night → evening (the night half in which it stays timely)
 *   the deep pre-dawn hours → general
 * `nightEnd` is the middle of the night, computed from maghrib to the next
 * Fajr; an invalid solar event drops the reader to the labelled approximate
 * fallback, as before.
 */
export function chooseByTimes(now, times) {
  const time = now.getTime();
  if (
    ![times.fajr, times.asr, times.nightEnd].every(
      (value) => value instanceof Date && Number.isFinite(value.getTime()),
    )
  )
    return null;
  if (time >= times.fajr.getTime() && time < times.asr.getTime())
    return 'morning';
  if (time >= times.asr.getTime() && time < times.nightEnd.getTime())
    return 'evening';
  return 'general';
}
export function suggestion(now, preferences) {
  const city = cities.find((value) => value.id === preferences.city);
  if (!city)
    return {
      id: approximateCollection(now.getHours()),
      approximate: true,
      label: 'اقتراح تقريبي بحسب ساعة جهازك',
    };
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: city.zone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const part = (type) =>
    Number(parts.find((value) => value.type === type)?.value);
  try {
    const params = CalculationMethod[preferences.method || city.method]();
    params.madhab = preferences.hanafi ? Madhab.Hanafi : Madhab.Shafi;
    const times = new PrayerTimes(
      new Coordinates(city.lat, city.lng),
      new Date(part('year'), part('month') - 1, part('day')),
      params,
    );
    const selected = chooseByTimes(now, {
      fajr: times.fajr,
      asr: times.asr,
      nightEnd: new SunnahTimes(times).middleOfTheNight,
    });
    if (selected)
      return {
        id: selected,
        approximate: false,
        label: `بحسب المواقيت المحسوبة في ${city.label}`,
      };
  } catch {
    /* Local clock fallback remains explicitly labelled. */
  }
  return {
    id: approximateCollection(part('hour')),
    approximate: true,
    label: `اقتراح تقريبي لمدينة ${city.label} لتعذّر حساب المواقيت`,
  };
}
export function swipeDirection(start, end) {
  if (!start || !end || start.canceled || start.multitouch) return 0;
  const dx = end.x - start.x,
    dy = end.y - start.y;
  if (
    end.time - start.time > 750 ||
    Math.abs(dx) < 60 ||
    Math.abs(dx) < Math.abs(dy) * 1.8
  )
    return 0;
  return dx > 0 ? 1 : -1; // RTL: a rightward swipe turns to the next text.
}
export function boundedIndex(index, delta, length) {
  return Math.max(0, Math.min(length - 1, index + delta));
}
/**
 * A narration that names several surahs is one reading on one card, but the
 * surahs are still separate texts: group them so each starts on its own line
 * instead of running into the previous ayah.
 */
export function groupSurahs(verses) {
  const groups = [];
  for (const verse of verses) {
    const surah = verse.reference.split(':')[0];
    const open = groups.at(-1);
    if (open?.surah === surah) open.verses.push(verse);
    else groups.push({ surah, verses: [verse] });
  }
  return groups;
}
export function referenceNumber(value) {
  return String(value).replace(
    /[0-9]/g,
    (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)],
  );
}

// Escape opens collections; Alt shortcuts and native control behavior remain available.
export function keyboardAction(
  event,
  { blocked = false, reading = false, page = false } = {},
) {
  if (
    blocked ||
    event.defaultPrevented ||
    event.isComposing ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  )
    return null;
  if (event.repeat)
    return event.key === ' ' && !event.altKey && (reading || page)
      ? 'suppress'
      : null;
  if (event.altKey)
    return { KeyS: 'settings', KeyZ: 'undo' }[event.code] ?? null;
  if (event.key === 'Escape') return 'list';
  if (event.key === 'ArrowRight') return 'next';
  if (event.key === 'ArrowLeft') return 'previous';
  if (event.key === ' ' && (reading || page)) return 'count';
  if (!reading) return null;
  return { Home: 'first', End: 'last', Enter: 'count' }[event.key] ?? null;
}
