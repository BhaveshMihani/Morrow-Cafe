/** Inline progress indicator used inside the submit button while the claim is in flight. */
export default function LoadingState() {
  return (
    <span className="flex w-full items-center justify-between" role="status">
      <span>Creating voucher…</span>
      <svg className="h-5 w-5 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}
