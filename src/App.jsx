import { MotionConfig } from 'framer-motion';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import PauseSection from './components/PauseSection.jsx';
import OfferSection from './components/OfferSection.jsx';
import ClaimForm from './components/ClaimForm.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#claim"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to claim form
      </a>
      <Header />
      <main>
        <Hero />
        <PauseSection />
        <OfferSection />
        <ClaimForm />
      </main>
      <Footer />
    </MotionConfig>
  );
}
