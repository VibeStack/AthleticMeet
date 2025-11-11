import { useRef, useEffect } from "react";

export default function InfiniteScroller({
  images = [],
  speed = 30, // lower = faster
  reverse = false,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animation = container.animate(
      [
        { transform: `translateX(${reverse ? "-50%" : "0%"})` },
        { transform: `translateX(${reverse ? "0%" : "-50%"})` },
      ],
      {
        duration: speed * 1000,
        iterations: Infinity,
        easing: "linear",
      }
    );

    return () => animation.cancel();
  }, [speed, reverse]);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={containerRef}
        className="flex gap-4 w-[200%] py-3"
        style={{ flexWrap: "nowrap" }}
      >
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="relative h-36 w-48 shrink-0 rounded-xl overflow-hidden
                       bg-slate-900/40 border border-white/10 backdrop-blur
                       hover:scale-105 hover:z-10 transition-transform duration-500"
          >
            <img
              src={img}
              alt="gallery"
              className="w-full h-full object-cover opacity-90 hover:opacity-100"
            />
            {/* Subtle Aurora Hover Overlay */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition
                            bg-[radial-gradient(circle_at_bottom_right,rgba(103,232,249,0.25),transparent_60%)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
