import useRevealOnScroll from "./useRevealOnScroll";

export default function EventsSection() {
  const ref = useRevealOnScroll();
  const events = ["100m Sprint", "Long Jump", "Cricket", "Football", "Badminton", "Shot Put"];

  return (
    <section id="events" ref={ref} className="reveal py-24 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-10 bg-clip-text text-transparent
                       bg-[linear-gradient(90deg,#a78bfa,#67e8f9,#f0abfc)]">
          Events Line-Up
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur
                         shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
            >
              <h3 className="text-lg font-semibold text-white">{event}</h3>
              <p className="text-slate-300 mt-1">Compete with class and spirit.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
