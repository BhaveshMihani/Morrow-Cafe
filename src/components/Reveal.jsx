import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion.js';

/** Fade + rise on first entering the viewport. Static when reduced motion is requested. */
export default function Reveal({ as = 'div', delay = 0, className = '', children }) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  if (reduced) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
