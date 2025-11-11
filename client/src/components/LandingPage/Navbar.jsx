import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const links = [
    ["Home", "home"],
    ["Register", "register"],
    ["Events", "events"],
    ["Dev Team", "team"],
    ["Gallery", "gallery"],
    ["Contact", "contact"],
  ];

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* subtle aurora line */}
      <div className="h-0.5 bg-linear-to-r from-cyan-400/40 via-violet-400/40 to-fuchsia-400/40" />
      <div className="backdrop-blur-xl bg-slate-900/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="font-extrabold text-lg md:text-xl bg-clip-text text-transparent 
                       bg-[linear-gradient(90deg,#93c5fd,#a78bfa,#f0abfc)]"
          >
            Athletix
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {links.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-slate-300 hover:text-white transition"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 rounded-xl font-semibold text-slate-900
                       bg-linear-to-r from-cyan-300 via-violet-300 to-fuchsia-300
                       hover:from-cyan-200 hover:via-violet-200 hover:to-fuchsia-200
                       transition shadow-sm hover:shadow-md"
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
}
