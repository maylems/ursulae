/**
 * Animate a theme (mode or palette) change with a circular reveal from the
 * pointer position, using the View Transitions API. Falls back to an instant
 * change where the API is unavailable or no origin is given. The reveal
 * keyframes live in `src/styles/globals.css`.
 */
let activeTransition: ViewTransition | null = null;

export function startThemeTransition(
  apply: () => void,
  origin?: { clientX: number; clientY: number }
) {
  const root = document.documentElement;

  if (!document.startViewTransition) {
    apply();
    return;
  }

  if (origin) {
    root.style.setProperty('--x', `${origin.clientX}px`);
    root.style.setProperty('--y', `${origin.clientY}px`);
  }

  // A transition still in flight from a rapid second click throws
  // "InvalidStateError" if left for the browser to resolve on its own, so
  // skip it explicitly first.
  activeTransition?.skipTransition();

  const transition = document.startViewTransition(apply);
  activeTransition = transition;
  // A skipped/aborted transition rejects `finished`, which is the expected
  // outcome above, not a bug, so it shouldn't surface as an unhandled
  // rejection.
  transition.finished
    .catch(() => {})
    .finally(() => {
      if (activeTransition === transition) activeTransition = null;
    });
}
