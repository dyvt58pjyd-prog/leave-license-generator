import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Leave & License Generator Error Caught:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center font-sans">
          <div className="max-w-2xl w-full bg-slate-800 border border-red-500/50 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">⚠️</span>
              <div>
                <h1 className="text-xl font-bold text-red-400">Application Error Encountered</h1>
                <p className="text-xs text-slate-400">An unexpected error occurred during rendering.</p>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 mb-5 overflow-auto max-h-60 text-xs font-mono text-red-300">
              <p className="font-bold text-red-200 mb-2">{this.state.error?.toString()}</p>
              <pre className="text-slate-400 whitespace-pre-wrap">{this.state.errorInfo?.componentStack}</pre>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  try {
                    localStorage.clear();
                    sessionStorage.clear();
                  } catch (e) {}
                  window.location.reload();
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition"
              >
                🔄 Reset to Clean Defaults & Reload
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-lg text-xs transition"
              >
                Simple Reload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
