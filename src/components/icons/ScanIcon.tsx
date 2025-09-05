export function ScanIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Scanner frame corners */}
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />

      {/* Scanning line */}
      <path d="M7 12h10" strokeWidth="3" opacity="0.7" />

      {/* QR code pattern */}
      <rect x="8" y="8" width="2" height="2" fill="currentColor" />
      <rect x="11" y="8" width="2" height="2" fill="currentColor" />
      <rect x="14" y="8" width="2" height="2" fill="currentColor" />
      <rect x="8" y="14" width="2" height="2" fill="currentColor" />
      <rect x="14" y="14" width="2" height="2" fill="currentColor" />
    </svg>
  );
}
