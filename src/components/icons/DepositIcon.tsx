export function DepositIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Open book base */}
      <path
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M6.5 2H20v15H6.5A2.5 2.5 0 0 0 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M12 17v-15"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Graduation cap */}
      <path d="M8 8l4-2 4 2-4 2-4-2z" fill="currentColor" />
      <path
        d="M16 8v3a4 4 0 0 1-8 0V8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Graduation cap tassel */}
      <circle cx="16.5" cy="7.5" r="0.5" fill="currentColor" />
      <path
        d="M16.5 8v2"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
