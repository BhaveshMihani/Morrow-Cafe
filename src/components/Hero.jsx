import { useLayoutEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import HeroVisual from './HeroVisual.jsx';
import useReducedMotion from '../hooks/useReducedMotion.js';
import { playHero } from '../animations/heroAnimation.js';

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  useLayoutEffect(() => {
    if (reduced || !ref.current) return undefined;
    return playHero(ref.current);
  }, [reduced]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-x-clip pb-20 pt-10 lg:pb-32 lg:pt-20">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-10">
        <div className="lg:col-span-6">
          <p data-hero="text" className="eyebrow flex items-center gap-3 text-olive">
            <span className="h-px w-8 bg-olive" aria-hidden="true" />
            A little something for your next visit
          </p>

          <h1 id="hero-title" className="display mt-5 text-ink">
            <span className="sr-only">Get </span>
            <span data-hero="text" className="block text-[clamp(5.5rem,31vw,8.5rem)] text-coffee lg:text-[9.5rem]">
              ₹150
            </span>
            <span data-hero="text" className="mt-2 flex items-baseline gap-4">
              <span className="text-[clamp(3.25rem,17vw,5rem)] lg:text-[6rem]">Off</span>
              <span className="text-[clamp(1.1rem,5vw,1.5rem)] tracking-[-0.02em] lg:text-[1.75rem]">Your next visit</span>
            </span>
          </h1>

          <p data-hero="text" className="mt-7 max-w-md font-sans text-base leading-relaxed text-muted">
            A little something from Morrow Café. Claim your <strong className="font-bold text-ink">₹150 credit</strong> and bring it with you next time.
          </p>

          <a data-hero="text" href="#claim" className="btn-primary mt-8 lg:max-w-sm">
            Claim ₹150 off
            <span aria-hidden="true" className="text-lg leading-none">↓</span>
          </a>
        </div>

        <div className="lg:col-span-6 lg:pl-8">
          <HeroVisual progress={scrollYProgress} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
