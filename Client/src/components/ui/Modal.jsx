import { useEffect, useState } from "react";

/**
 * Reusable Modal Component — Cream & Purple Theme
 */
const Modal = ({ isOpen, onClose, title, children, className = "" }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#4A4A4A]/20 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"
          }`}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={`relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
          } ${className}`}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-[#4A4A4A]">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#6C63FF] p-1 rounded-lg transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
