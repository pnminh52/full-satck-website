import React from "react";

const Loader = ({ size = 8, className = "" }) => {
  const sizeClass = `w-${size} h-${size}`;

  return (
    <div role="status" className={`inline-flex items-center justify-center ${className}`}>
      <svg
        className={sizeClass}
        style={{ animation: "spin 2s linear infinite" }} // quay lâu hơn
        viewBox="0 0 50 50"
        aria-hidden="true"
      >
        {/* Background circle (faint) */}
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#F06E00"
          strokeOpacity="0.15"
          strokeWidth="5"
        />
        {/* Foreground arc */}
        <path
          d="M45 25a20 20 0 0 1-20 20"
          fill="none"
          stroke="#F06E00"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      <span className="sr-only">Loading...</span>

      {/* Keyframes spin nếu chưa có trong Tailwind */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
