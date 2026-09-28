/**
 * Claim API abstraction.
 *
 * Contract (POST /api/claim):
 *   request : { name, phone }
 *   success : { success: true,  claimCode: "MORROW-7F2K", message: "Your offer has been claimed." }
 *   error   : { success: false, message: "Unable to process your request." }
 *
 * There is no hosted backend, so by default this module mocks the endpoint.
 * The UI only ever calls `claimOffer()`, so swapping the mock for a real
 * server is a one-line change (set VITE_USE_MOCK_API=false).
 *
 * QA helper: open the page with ?claim=error to force the error state.
 */

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';
const MOCK_LATENCY_MS = 1400;
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid misreads

export class ClaimError extends Error {}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function generateCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  return `MORROW-${Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('')}`;
}

async function mockPost() {
  await sleep(MOCK_LATENCY_MS);
  if (new URLSearchParams(window.location.search).get('claim') === 'error') {
    return { success: false, message: 'Unable to process your request.' };
  }
  return { success: true, claimCode: generateCode(), message: 'Your offer has been claimed.' };
}

async function realPost(body) {
  const res = await fetch('/api/claim', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function claimOffer({ name, phone }) {
  let data;
  try {
    data = await (USE_MOCK ? mockPost() : realPost({ name: name.trim(), phone }));
  } catch {
    throw new ClaimError('Unable to process your request.');
  }
  if (!data?.success) throw new ClaimError(data?.message || 'Unable to process your request.');
  return data;
}
