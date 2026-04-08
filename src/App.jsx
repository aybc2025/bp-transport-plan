import AppShell from './components/layout/AppShell';
import ErrorBoundary from './components/shared/ErrorBoundary';
import AccessibilityWrapper from './components/shared/AccessibilityWrapper';

export default function App() {
  return (
    <ErrorBoundary>
      <AccessibilityWrapper>
        <AppShell />
      </AccessibilityWrapper>
    </ErrorBoundary>
  );
}
