import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="w-12 h-12 bg-danger/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-danger text-xl">!</span>
          </div>
          <h2 className="font-display font-bold text-lg text-neutral-900 mb-2">
            Something went wrong
          </h2>
          <p className="font-body text-sm text-neutral-500 mb-4">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
