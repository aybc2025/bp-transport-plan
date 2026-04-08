/**
 * Generate a unique ID for ARIA relationships
 */
let counter = 0;
export function uniqueId(prefix = 'bp') {
  return `${prefix}-${++counter}`;
}

/**
 * Announce a message to screen readers via aria-live
 */
export function announce(message) {
  const el = document.getElementById('sr-announcer');
  if (el) {
    el.textContent = '';
    requestAnimationFrame(() => {
      el.textContent = message;
    });
  }
}

/**
 * Trap focus inside a container (for modals/overlays)
 */
export function trapFocus(container) {
  const focusable = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  container.addEventListener('keydown', handler);
  first?.focus();
  return () => container.removeEventListener('keydown', handler);
}
