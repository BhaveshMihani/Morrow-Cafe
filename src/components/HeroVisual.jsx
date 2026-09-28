import { motion, useTransform } from 'framer-motion';
import Foliage from './Foliage.jsx';
import interior from '../assets/morrow-interior.webp';
import cup from '../assets/morrow-cup.webp';

/**
 * Four depth planes. Outer motion.divs = scroll parallax (Framer Motion).
 * Inner data-hero / data-float nodes = entrance + ambient motion (Anime.js).
 */
export default function HeroVisual({ progress, reduced }) {
  const yGlow = useTransform(progress, [0, 1], [0, 30]);
  const yPhoto = useTransform(progress, [0, 1], [0, 36]);
  const yLeaf = useTransform(progress, [0, 1], [0, -70]);
  const yLeafBack = useTransform(progress, [0, 1], [0, -30]);
  const yCoffee = useTransform(progress, [0, 1], [0, -100]);
  const s = (y) => (reduced ? undefined : { y });

  return (
    <div className="relative mx-auto w-full max-w-[24rem] lg:mx-0 lg:max-w-none">
      {/* BACKGROUND: warm light */}
      <motion.div
        aria-hidden="true"
        style={s(yGlow)}
        className="absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(107,74,53,0.18),rgba(245,241,232,0)_75%)]"
      />

      {/* MIDGROUND (back): trailing branch behind the photo */}
      <motion.div aria-hidden="true" style={s(yLeafBack)} className="pointer-events-none absolute -bottom-6 -right-3 z-0 w-20 lg:-right-8 lg:w-32">
        <div data-hero="leaf">
          <Foliage className="h-auto w-full rotate-[160deg] opacity-80" leaves={7} />
        </div>
      </motion.div>

      {/* MIDGROUND: hero photograph */}
      <motion.div style={s(yPhoto)} className="relative z-10 rounded-[28px] border border-coffee/10 bg-paper/70 p-2.5 shadow-[0_30px_60px_-32px_rgba(23,21,18,0.4)] lg:p-3">
        <div data-hero="photo" className="relative aspect-[4/5] overflow-hidden rounded-[20px] lg:aspect-[4/5.3]">
          <img
            src={interior}
            alt="Sunlit Morrow Café interior with wooden tables, rattan chairs, an olive tree by the window and guests seated together"
            width="510"
            height="692"
            fetchpriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <p className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-4 py-2 font-subheading text-[10px] font-normal uppercase tracking-[0.2em] text-ink backdrop-blur-sm">
            Morrow Café · Sec 104
          </p>
        </div>
      </motion.div>

      {/* FOREGROUND: eucalyptus in the top-right corner */}
      <motion.div aria-hidden="true" style={s(yLeaf)} className="pointer-events-none absolute -right-2 -top-12 z-20 w-24 lg:-right-10 lg:-top-16 lg:w-40">
        <div data-hero="leaf">
          <div data-float="leaf" className="origin-bottom">
            <Foliage className="h-auto w-full rotate-[8deg]" leaves={10} />
          </div>
        </div>
      </motion.div>

      {/* FOREGROUND: coffee cup + steam */}
      <motion.div style={s(yCoffee)} className="absolute -bottom-8 -left-2 z-20 w-28 lg:-bottom-10 lg:-left-12 lg:w-44">
        <div data-hero="coffee">
          <div data-float="coffee" className="relative">
            <div data-hero="steam" aria-hidden="true" className="absolute -top-12 left-1/2 w-10 -translate-x-1/2">
              <svg viewBox="0 0 60 80" className="h-auto w-full" fill="none" stroke="#6B4A35" strokeWidth="2.5" strokeLinecap="round">
                <path data-float="steam" d="M12 78 C 2 62 22 52 12 36 S 22 10 14 0" />
                <path data-float="steam" d="M30 78 C 20 62 40 52 30 36 S 40 10 32 0" />
                <path data-float="steam" d="M48 78 C 38 62 58 52 48 36 S 58 10 50 0" />
              </svg>
            </div>
            <img
              src={cup}
              alt="Latte with leaf art in a speckled ceramic cup"
              width="360"
              height="360"
              decoding="async"
              className="aspect-square w-full rounded-full border-[5px] border-cream object-cover shadow-[0_18px_30px_-14px_rgba(23,21,18,0.5)]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
