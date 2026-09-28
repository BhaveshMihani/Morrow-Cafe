import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Foliage from './Foliage.jsx';
import Reveal from './Reveal.jsx';
import useReducedMotion from '../hooks/useReducedMotion.js';
import coffee from '../assets/morrow-coffee.webp';

export default function PauseSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const leafY = useTransform(scrollYProgress, [0, 1], [40, -60]);

  return (
    <section ref={ref} aria-labelledby="pause-title" className="relative overflow-x-clip border-t border-coffee/10 py-20 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* Photograph: controlled crop, offset lower on desktop for an asymmetric rhythm */}
        <Reveal className="relative mx-auto w-full max-w-[22rem] lg:col-span-5 lg:mt-24 lg:max-w-none">
          <div className="rounded-[24px] border border-coffee/10 bg-paper p-2.5 shadow-[0_24px_50px_-30px_rgba(23,21,18,0.35)]">
            <img
              src={coffee}
              alt="A latte with leaf art on a stone ledge in soft window light"
              width="515"
              height="507"
              loading="lazy"
              decoding="async"
              className="aspect-[5/5.2] w-full rounded-[18px] object-cover"
            />
          </div>
          <motion.div aria-hidden="true" style={reduced ? undefined : { y: leafY }} className="pointer-events-none absolute -bottom-10 -right-2 w-20 lg:-right-10 lg:w-28">
            <Foliage className="h-auto w-full rotate-[-12deg]" leaves={7} />
          </motion.div>
        </Reveal>

        <div className="lg:col-span-7 lg:pt-6">
          <Reveal as="p" className="eyebrow text-coffee">The ritual of Morrow</Reveal>
          <Reveal as="h2" delay={0.08} className="display mt-4 text-[clamp(3rem,15vw,5rem)] lg:text-[7rem]">
            <span id="pause-title">
              Good coffee.
              <span className="block">Slow</span>
              <span className="block">moments.</span>
            </span>
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-8 max-w-md text-base leading-relaxed text-muted">
            Morrow Café is a place to pause, meet, and stay a little longer.
          </Reveal>
          <Reveal delay={0.22} className="mt-8">
            <p className="inline-block rounded-full border border-dashed border-coffee/40 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-coffee">
              Morrow Café — Sector 104 · Noida
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
