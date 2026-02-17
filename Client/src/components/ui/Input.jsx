/**
 * Reusable Input Component — Cream & Purple Theme
 */
const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-[#4A4A4A] mb-1.5"
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2.5 bg-white border rounded-xl text-[#4A4A4A] placeholder:text-gray-400 focus:ring-2 focus:ring-[#6C63FF]/30 focus:border-[#6C63FF] outline-none transition-all duration-200 ${error ? "border-red-400 focus:ring-red-400/30" : "border-gray-200"
          } ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
