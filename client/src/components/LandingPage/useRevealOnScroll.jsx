import { useEffect, useRef, useState } from "react";

/**
 * Subtle fade+rise on scroll without external libs.
 * Usage: const ref = useRevealOnScroll();
 * <section ref={ref} className="reveal">...</section>
 */
export default function useRevealOnScroll(options = { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("reveal-in");
            setRevealed(true);
            obs.disconnect();
          }
        });
      },
      options
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options, revealed]);

  return ref;
}
