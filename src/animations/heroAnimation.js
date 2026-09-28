import anime from 'animejs';

/**
 * Hero choreography (Anime.js owns everything marked data-hero / data-float).
 * Framer Motion only ever touches the *outer* wrappers of these layers (scroll parallax),
 * so the two libraries never write to the same element.
 *
 *  1. Entrance timeline: text -> photo -> leaves -> coffee -> steam
 *  2. Ambient loops: leaf sway, coffee bob, steam rising (paused when hero is off-screen)
 *
 * Returns a cleanup function (safe under React StrictMode double-invoke).
 */
export function playHero(root) {
  const q = (sel) => root.querySelectorAll(sel);
  const touched = root.querySelectorAll('[data-hero],[data-float]');

  anime.set(q('[data-hero]'), { opacity: 0 });

  const entrance = anime.timeline({ easing: 'easeOutExpo' });
  entrance
    .add({ targets: q('[data-hero="text"]'), opacity: [0, 1], translateY: [28, 0], duration: 900, delay: anime.stagger(90) })
    .add({ targets: q('[data-hero="photo"]'), opacity: [0, 1], scale: [0.965, 1], duration: 1100 }, 250)
    .add({ targets: q('[data-hero="leaf"]'), opacity: [0, 1], translateY: [-18, 0], duration: 1200, delay: anime.stagger(140) }, 550)
    .add({ targets: q('[data-hero="coffee"]'), opacity: [0, 1], translateY: [40, 0], duration: 1000 }, 750)
    .add({ targets: q('[data-hero="steam"]'), opacity: [0, 1], duration: 800 }, 1200);

  const loops = [
    anime({
      targets: q('[data-float="leaf"]'),
      rotate: [-2.2, 2.2],
      duration: 4200,
      direction: 'alternate',
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(600),
    }),
    anime({
      targets: q('[data-float="coffee"]'),
      translateY: [0, -8],
      duration: 3600,
      direction: 'alternate',
      easing: 'easeInOutSine',
      loop: true,
    }),
    anime({
      targets: q('[data-float="steam"]'),
      translateY: [10, -16],
      opacity: [{ value: 0.7, duration: 900 }, { value: 0, duration: 1500 }],
      duration: 2400,
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(550),
    }),
  ];

  // Don't burn frames while the hero is scrolled out of view.
  const io = new IntersectionObserver(([entry]) => {
    loops.forEach((l) => (entry.isIntersecting ? l.play() : l.pause()));
  });
  io.observe(root);

  return () => {
    io.disconnect();
    entrance.pause();
    loops.forEach((l) => l.pause());
    anime.remove(touched);
    touched.forEach((el) => el.removeAttribute('style'));
  };
}
