/** @typedef {{index: number, counts: Record<string, number>, history: Array<{index: number, id: string, count: number}>}} ReadingState */
/** @returns {ReadingState} */
export const newReading = () => ({ index: 0, counts: {}, history: [] });
/**
 * Counting and advancing are one atomic action. Only an explicit read action
 * records a repetition; navigation never does. Undo also reverses auto-advance.
 * @param {ReadingState} state
 * @param {{type: string, items?: Array<{id: string, count: number | null}>, index?: number}} action
 * @returns {ReadingState}
 */
export function readingReducer(state, action) {
  if (action.type === 'reset') return newReading();
  const items = action.items ?? [];
  const item = items[state.index];
  if (action.type === 'navigate')
    return {
      ...state,
      index: Math.max(
        0,
        Math.min(items.length - 1, action.index ?? state.index),
      ),
    };
  if (action.type === 'undo') {
    const last = state.history.at(-1);
    if (!last) return state;
    return {
      index: last.index,
      counts: { ...state.counts, [last.id]: last.count },
      history: state.history.slice(0, -1),
    };
  }
  if (action.type !== 'read' || !item) return state;
  if (item.count === null)
    return { ...state, index: Math.min(items.length - 1, state.index + 1) };
  const previous = state.counts[item.id] ?? 0;
  if (previous >= item.count)
    return { ...state, index: Math.min(items.length - 1, state.index + 1) };
  const count = previous + 1;
  return {
    index:
      count === item.count
        ? Math.min(items.length - 1, state.index + 1)
        : state.index,
    counts: { ...state.counts, [item.id]: count },
    history: [
      ...state.history,
      { index: state.index, id: item.id, count: previous },
    ],
  };
}

/** Two activations closer together than this are treated as one bounce. */
export const READ_INTERVAL = 250;
/**
 * One deliberate activation records one repetition. A read arriving inside the
 * bounce window is dropped, unless the browser itself counted it as a later
 * click of one multi-click sequence: a double click is two readings, not noise.
 * @param {number} since milliseconds since the last recorded read
 * @param {number} clicks the click's position in its sequence; 0 for keyboard
 */
export function acceptsRead(since, clicks = 1) {
  return clicks > 1 || since >= READ_INTERVAL;
}
export function isReadingTap(start, end) {
  return Boolean(
    start &&
    end &&
    !start.canceled &&
    !start.moved &&
    !start.multitouch &&
    end.time - start.time < 500 &&
    Math.hypot(end.x - start.x, end.y - start.y) < 10,
  );
}
