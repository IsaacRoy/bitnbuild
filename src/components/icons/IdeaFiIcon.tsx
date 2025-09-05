import React from 'react';

interface IdeaFiIconProps {
  className?: string;
}

export const IdeaFiIcon: React.FC<IdeaFiIconProps> = ({ className = "w-5 h-5" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Lightbulb for Ideas */}
      <path
        d="M9 21h6m-6 0v-1a2 2 0 002-2h2a2 2 0 002 2v1m-6 0H8m8 0h1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3a6 6 0 00-6 6c0 2.5 1.5 4.5 3 5.5V16h6v-1.5c1.5-1 3-3 3-5.5a6 6 0 00-6-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />
      {/* AI Brain Pattern */}
      <circle cx="10" cy="9" r="0.5" fill="currentColor" />
      <circle cx="14" cy="9" r="0.5" fill="currentColor" />
      <path
        d="M10.5 11.5c0.5 0.5 1.5 0.5 2 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Financial Graph Line */}
      <path
        d="M4 20l3-3 2 2 3-3 2 1 3-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
};
