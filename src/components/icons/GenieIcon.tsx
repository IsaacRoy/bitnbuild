export function GenieIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Person head */}
      <circle cx="8" cy="6" r="3" />

      {/* Person body */}
      <path
        d="M2 20c0-4 2.5-6 6-6s6 2 6 6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Verification circle */}
      <circle
        cx="17"
        cy="12"
        r="5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />

      {/* Checkmark */}
      <path
        d="M15 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
