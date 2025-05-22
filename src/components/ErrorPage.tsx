import { useRouteError } from "react-router-dom";

interface RouterError {
    statusText?: string;
    message?: string;
}

export default function ErrorPage() {
    const error = useRouteError() as RouterError;
    console.error("Route error:", error);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center p-8 rounded-2xl shadow-lg bg-white border border-gray-200">
                <h1 className="text-3xl font-bold text-red-600 mb-4">
                    Something went wrong
                </h1>
                <p className="text-gray-700 mb-4">
                    {error?.statusText ||
                        error?.message ||
                        "An unexpected error occurred."}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
