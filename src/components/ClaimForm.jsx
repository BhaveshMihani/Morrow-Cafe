import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FormField from './FormField.jsx';
import LoadingState from './LoadingState.jsx';
import ErrorState from './ErrorState.jsx';
import SuccessState from './SuccessState.jsx';
import useReducedMotion from '../hooks/useReducedMotion.js';
import { claimOffer } from '../services/claimApi.js';
import { normalizePhone, validateClaim } from '../utils/validate.js';

// status: idle -> loading -> success | error (error -> idle via "Try again", values are kept)
export default function ClaimForm() {
  const reduced = useReducedMotion();
  const [values, setValues] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const [claimCode, setClaimCode] = useState('');
  const inFlight = useRef(false); // synchronous guard: state updates are async, double-taps aren't

  const loading = status === 'loading';

  const update = (field) => (e) => {
    const value = field === 'phone' ? normalizePhone(e.target.value) : e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: '' })); // clear as they fix it
  };

  const validateOne = (field) => () =>
    setErrors((er) => ({ ...er, [field]: validateClaim(values)[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inFlight.current) return;

    const found = validateClaim(values);
    setErrors(found);
    const firstInvalid = ['name', 'phone'].find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(`claim-${firstInvalid}`)?.focus();
      return;
    }

    inFlight.current = true;
    setStatus('loading');
    try {
      const res = await claimOffer(values);
      setClaimCode(res.claimCode);
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      inFlight.current = false;
    }
  };

  const view = status === 'success' ? 'success' : status === 'error' ? 'error' : 'form';
  const fade = reduced
    ? {}
    : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.35 } };

  return (
    <section id="claim" aria-labelledby="claim-title" className="scroll-mt-6 px-6 pb-24 pt-16 lg:pb-32 lg:pt-24">
      <div className="relative mx-auto max-w-md overflow-hidden rounded-[24px] border border-coffee/10 bg-paper px-6 pb-8 pt-9 shadow-[0_30px_60px_-34px_rgba(23,21,18,0.35)] sm:px-9">
        <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-coffee/80 via-coffee/40 to-coffee/80" aria-hidden="true" />

        {/* Announces the outcome to screen readers without moving focus twice */}
        <p className="sr-only" role="status" aria-live="polite">
          {status === 'success' && `Your offer has been claimed. Your code is ${claimCode}.`}
        </p>

        <AnimatePresence mode="wait" initial={false}>
          {view === 'form' && (
            <motion.div key="form" {...fade}>
              <p className="eyebrow text-coffee">Your voucher</p>
              <h2 id="claim-title" className="display mt-3 text-[2.25rem]">Claim your ₹150 off</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                Enter your details and your claim code will appear on this screen.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-7" aria-busy={loading}>
                <FormField
                  id="claim-name"
                  label="Name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  value={values.name}
                  onChange={update('name')}
                  onBlur={validateOne('name')}
                  error={errors.name}
                  disabled={loading}
                />
                <div className="mt-2">
                  <FormField
                    id="claim-phone"
                    label="Phone number"
                    type="tel"
                    inputMode="numeric"
                    name="phone"
                    autoComplete="tel"
                    placeholder="98765 43210"
                    prefix="+91"
                    value={values.phone}
                    onChange={update('phone')}
                    onBlur={validateOne('phone')}
                    error={errors.phone}
                    disabled={loading}
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-primary mt-4">
                  {loading ? (
                    <LoadingState />
                  ) : (
                    <>
                      Claim ₹150 off
                      <span aria-hidden="true" className="text-lg leading-none">→</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {view === 'error' && (
            <motion.div key="error" {...fade}>
              <ErrorState onRetry={() => setStatus('idle')} />
            </motion.div>
          )}

          {view === 'success' && (
            <motion.div key="success" {...fade}>
              <SuccessState claimCode={claimCode} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
