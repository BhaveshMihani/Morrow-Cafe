import { useEffect, useRef } from 'react';
import CopyButton from './CopyButton.jsx';

export default function SuccessState({ claimCode }) {
  const headingRef = useRef(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <div className="py-2 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-olive text-2xl text-cream" aria-hidden="true">✓</span>
      <h2 ref={headingRef} tabIndex={-1} className="display mt-6 focus:outline-none">
        <span className="block text-[4.5rem] text-coffee">₹150 Off</span>
        <span className="mt-2 block text-[1.75rem] tracking-[0.02em] text-olive">Claimed</span>
      </h2>

      {/* Receipt-style ticket with notched sides */}
      <div className="relative mx-auto mt-8 max-w-xs rounded-2xl border border-dashed border-coffee/45 bg-cream/70 px-4 py-6">
        <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-cream" aria-hidden="true" />
        <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-cream" aria-hidden="true" />
        <p className="eyebrow text-muted">Your claim code</p>
        <p id="claim-code" className="display mt-2 select-all text-[2.1rem] tracking-[0.02em] text-ink">{claimCode}</p>
      </div>

      <p className="mt-6 text-[15px] text-muted">Show this code when you visit Morrow Café.</p>
      <div className="mx-auto mt-6 max-w-xs">
        <CopyButton text={claimCode} codeId="claim-code" />
      </div>
    </div>
  );
}
