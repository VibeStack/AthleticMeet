import { useNavigate } from "react-router-dom";
import useRevealOnScroll from "./useRevealOnScroll";

export default function HeroSection() {
  const navigate = useNavigate();
  const ref = useRevealOnScroll();

  return (
    <section id="home" ref={ref} className="reveal relative min-h-[92vh] pt-28 flex items-center justify-center text-center overflow-hidden bg-slate-950">
      {/* Aurora background (subtle) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 h-112 w-md rounded-full blur-3xl opacity-25 bg-cyan-500/30" />
        <div className="absolute top-16 right-0 h-104 w-104 rounded-full blur-3xl opacity-25 bg-fuchsia-500/30" />
        <div className="absolute bottom-0 left-1/3 h-96 w-[24rem] rounded-full blur-3xl opacity-20 bg-violet-500/30" />
      </div>

      <div className="relative px-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4
                         bg-white/5 border border-white/10 text-slate-300 backdrop-blur">
          GNDEC • Annual Athletics Meet
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
          Elevate Your <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#67e8f9,#a78bfa,#f0abfc)]">Game</span>
        </h1>

        <p className="mt-5 text-slate-300/90 text-lg max-w-2xl mx-auto">
          A premium night-aurora themed celebration of sportsmanship and teamwork. Compete with class.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 rounded-xl font-semibold text-white
                       bg-white/10 border border-white/15 backdrop-blur
                       hover:bg-white/15 transition shadow-sm hover:shadow-md"
          >
            View Dashboard
          </button>
          <button
            onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 rounded-xl font-semibold text-slate-900
                       bg-linear-to-r from-cyan-300 via-violet-300 to-fuchsia-300
                       hover:from-cyan-200 hover:via-violet-200 hover:to-fuchsia-200
                       transition shadow-sm hover:shadow-md"
          >
            How to Register
          </button>
        </div>
      </div>
    </section>
  );
}
