/**
 * Reusable Card Component — Cream & Purple Theme
 */
const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
