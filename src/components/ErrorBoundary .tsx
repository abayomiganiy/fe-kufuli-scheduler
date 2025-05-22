import React, { ErrorInfo } from "react";

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // You can log the error to an error reporting service here
        console.error("Caught by ErrorBoundary:", error, errorInfo);
    }

    handleReload = (): void => {
        // Optionally reset state if needed
        this.setState({ hasError: false, error: null });
        // Reload the page or trigger recovery
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full text-center p-8 rounded-2xl shadow-lg bg-white border border-gray-200">
                        <h1 className="text-3xl font-bold text-red-600 mb-4">
                            Oops! Something went wrong.
                        </h1>
                        <p className="text-gray-600 mb-6">
                            {this.state.error?.message ||
                                "An unexpected error occurred. Please try again later."}
                        </p>
                        <button
                            onClick={this.handleReload}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
