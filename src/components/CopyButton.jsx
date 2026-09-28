import { useEffect, useRef, useState } from 'react';

function selectNode(id) {
  const node = document.getElementById(id);
  if (!node) return;
  const range = document.createRange();
  range.selectNodeContents(node);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

/** Legacy fallback for browsers/contexts where the async Clipboard API is unavailable. */
function legacyCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  document.body.removeChild(ta);
  return ok;
}

export default function CopyButton({ text, codeId }) {
  const [state, setState] = useState('idle'); // idle | copied | failed
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = legacyCopy(text);
    }
    if (!ok) selectNode(codeId); // last resort: highlight the code so Ctrl/⌘+C works
    setState(ok ? 'copied' : 'failed');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 2400);
  };

  return (
    <div>
      <button type="button" onClick={handleCopy} className="btn-primary justify-center">
        {state === 'copied' ? 'Copied ✓' : 'Copy code'}
      </button>
      <p role="status" className="mt-3 min-h-[1.25rem] font-sans text-[13px] text-muted">
        {state === 'copied' && 'Code copied to clipboard.'}
        {state === 'failed' && 'Couldn’t copy automatically. The code is selected, press Ctrl/⌘ + C.'}
      </p>
    </div>
  );
}
