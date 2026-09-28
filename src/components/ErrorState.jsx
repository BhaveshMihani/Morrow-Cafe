import { useEffect, useRef } from 'react';

export default function ErrorState({ onRetry }) {
  const headingRef = useRef(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <div role="alert" className="py-4 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-alert/40 text-xl font-semibold text-alert" aria-hidden="true">!</span>
      <h2 ref={headingRef} tabIndex={-1} className="display mt-5 text-[2.25rem] focus:outline-none">Something went wrong.</h2>
      <p className="mx-auto mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
        We couldn’t process your claim right now. Please try again.
      </p>
      <button type="button" onClick={onRetry} className="btn-primary mt-8 justify-center">Try again</button>
    </div>
  );
}
