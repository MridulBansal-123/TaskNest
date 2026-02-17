/**
 * Reusable Button Component — Cream & Purple Theme
 */
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-[#6C63FF] hover:bg-[#5A52D5] text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5",
    secondary:
      "bg-white hover:bg-gray-50 text-[#4A4A4A] border border-gray-200 shadow-sm",
    danger:
      "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20",
    success:
      "bg-[#4CAF50] hover:bg-[#43A047] text-white shadow-md shadow-green-500/20",
    outline:
      "border-2 border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF]/5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
