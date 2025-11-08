export default function Loader({ fullScreen = false, size = 'medium', message = '' }) {
  const sizeClasses = {
    small: 'h-8 w-8 border-2',
    medium: 'h-16 w-16 border-4',
    large: 'h-24 w-24 border-4',
  };

  const containerClasses = fullScreen
    ? 'flex flex-col justify-center items-center min-h-screen bg-gray-50'
    : 'flex flex-col justify-center items-center h-64';

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Outer spinning ring */}
        <div
          className={`animate-spin rounded-full ${sizeClasses[size]} border-purple-200 border-t-purple-600`}
        ></div>
        {/* Inner pulsing circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-1/2 bg-purple-600 rounded-full animate-pulse opacity-75"></div>
        </div>
      </div>
      {message && (
        <p className="mt-4 text-gray-600 text-sm font-medium animate-pulse">{message}</p>
      )}
    </div>
  );
}
