'use client';

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    revealEls.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);
}
