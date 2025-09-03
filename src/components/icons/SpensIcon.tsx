export function SpensIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Chart bars */}
      <rect x="3" y="16" width="3" height="5" rx="0.5" />
      <rect x="7" y="12" width="3" height="9" rx="0.5" />
      <rect x="11" y="14" width="3" height="7" rx="0.5" />
      <rect x="15" y="8" width="3" height="13" rx="0.5" />

      {/* Line chart */}
      <circle cx="4.5" cy="11" r="1.5" />
      <circle cx="8.5" cy="9" r="1.5" />
      <circle cx="12.5" cy="7" r="1.5" />
      <circle cx="16.5" cy="4" r="1.5" />

      {/* Connecting lines */}
      <path
        d="M5.5 10.5L7.5 9.5M9.5 8.5L11.5 7.5M13.5 6.5L15.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
