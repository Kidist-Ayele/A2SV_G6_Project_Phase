interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = "md",
  message = "Loading job opportunities...",
  fullScreen = true,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const containerClasses = fullScreen
    ? "min-h-screen bg-gray-50 flex items-center justify-center"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div
          className={`animate-spin rounded-full ${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 mx-auto mb-4`}
          style={{
            borderColor: "#e5e7eb",
            borderTopColor: "#2563eb",
          }}
        ></div>
        {message && <p className="text-gray-600 animate-pulse">{message}</p>}
      </div>
    </div>
  );
}
