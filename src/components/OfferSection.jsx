import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Foliage from './Foliage.jsx';
import useReducedMotion from '../hooks/useReducedMotion.js';

/** The climax: ₹150 scales into focus and the botanicals gather around it as you scroll. */
export default function OfferSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const leftX = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const rightX = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const on = (style) => (reduced ? undefined : style);

  return (
    <section ref={ref} aria-labelledby="offer-title" className="relative overflow-x-clip bg-cream-deep py-24 text-center lg:py-36">
      <motion.div aria-hidden="true" style={on({ x: leftX })} className="pointer-events-none absolute -left-6 bottom-0 w-24 lg:left-10 lg:w-40">
        <Foliage className="h-auto w-full rotate-[-8deg]" leaves={9} />
      </motion.div>
      <motion.div aria-hidden="true" style={on({ x: rightX })} className="pointer-events-none absolute -right-6 top-6 w-20 lg:right-10 lg:w-32">
        <Foliage className="h-auto w-full rotate-[172deg]" leaves={8} />
      </motion.div>

      <motion.div style={on({ scale })} className="relative mx-auto max-w-3xl px-6">
        <h2 id="offer-title" className="display text-ink">
          <span className="block text-[clamp(1.75rem,8vw,2.75rem)]">Claim</span>
          <span className="block text-[clamp(6.5rem,38vw,13rem)] text-coffee">₹150</span>
          <span className="block text-[clamp(3.5rem,20vw,7rem)]">Off</span>
          <span className="mt-4 block text-[clamp(1.25rem,6vw,2rem)] tracking-[-0.02em]">Your next visit</span>
        </h2>
        <span aria-hidden="true" className="mt-10 block text-2xl text-olive">↓</span>
      </motion.div>
    </section>
  );
}
