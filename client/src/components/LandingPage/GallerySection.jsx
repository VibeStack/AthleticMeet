import useRevealOnScroll from "./useRevealOnScroll";
import InfiniteScroller from "./InfiniteScroller";

export default function GallerySection() {
  const ref = useRevealOnScroll();

  // You can replace these later with your real images
  const images = Array.from({ length: 12 }, (_, i) => 
    `https://source.unsplash.com/random/400x400?athlete,sports,stadium,${i}`
  );

  return (
    <section id="gallery" ref={ref} className="reveal py-24 px-6 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl font-extrabold text-center mb-12 bg-clip-text text-transparent
                     bg-[linear-gradient(90deg,#67e8f9,#a78bfa,#f0abfc)]"
        >
          Gallery
        </h2>

        <div className="space-y-6">
          {/* Row 1 → */}
          <InfiniteScroller images={images} speed={35} reverse={false} />

          {/* Row 2 ← */}
          <InfiniteScroller images={images} speed={30} reverse={true} />

          {/* Row 3 → */}
          <InfiniteScroller images={images} speed={38} reverse={false} />
        </div>
      </div>
    </section>
  );
}
