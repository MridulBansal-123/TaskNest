/**
 * Loading Spinner Component — Cream & Purple Theme
 */
const LoadingSpinner = ({ size = "medium", className = "" }) => {
  const sizes = {
    small: "w-6 h-6 border-2",
    medium: "w-10 h-10 border-3",
    large: "w-16 h-16 border-4",
  };

  return (
    <div
      className={`${sizes[size]} border-gray-200 border-t-[#6C63FF] rounded-full animate-spin ${className}`}
    ></div>
  );
};

export default LoadingSpinner;
