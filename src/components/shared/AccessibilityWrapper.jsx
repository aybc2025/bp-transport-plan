/**
 * Wraps children with screen-reader-only announcements and skip links.
 */
export default function AccessibilityWrapper({ children }) {
  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100]
                   focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg
                   focus:text-sm focus:font-display focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      {children}
    </>
  );
}
