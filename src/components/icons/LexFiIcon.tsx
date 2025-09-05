import React from "react";

interface LexFiIconProps {
  className?: string;
}

export const LexFiIcon: React.FC<LexFiIconProps> = ({
  className = "w-5 h-5",
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background rounded square */}
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="4"
        ry="4"
        fill="currentColor"
        fillOpacity="0.1"
      />

      {/* Dollar sign */}
      <path
        d="M12 6v2m0 8v2m-1-8h2a2 2 0 110 4h-2m0 0h2a2 2 0 110 4h-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Chart bars */}
      <rect
        x="15"
        y="14"
        width="1.5"
        height="4"
        fill="currentColor"
        opacity="0.8"
      />
      <rect
        x="17"
        y="12"
        width="1.5"
        height="6"
        fill="currentColor"
        opacity="0.8"
      />
      <rect
        x="19"
        y="10"
        width="1.5"
        height="8"
        fill="currentColor"
        opacity="0.8"
      />

      {/* Trending arrow */}
      <path
        d="M16 9l2-2 2 2m-2-2v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
};
