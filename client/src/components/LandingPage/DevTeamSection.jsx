import { LinkedInIcon, GitHubIcon, WebsiteIcon } from "./CustomIcons";
import useRevealOnScroll from "./useRevealOnScroll";

export default function DevTeamSection() {
  const ref = useRevealOnScroll();

  const devTeam = [
    {
      name: "Arshdeep Singh",
      role: "Full Stack Developer",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80",
      linkedin: "#",
      github: "#",
      website: "#",
    },
    {
      name: "Simranjeet Kaur",
      role: "UI/UX Designer",
      image:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=900&q=80",
      linkedin: "#",
      github: "#",
      website: "#",
    },
  ];

  return (
    <section id="team" ref={ref} className="reveal py-24 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl font-extrabold text-center mb-12 bg-clip-text text-transparent
                     bg-[linear-gradient(90deg,#e879f9,#a78bfa,#67e8f9)]"
        >
          Meet the Dev Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {devTeam.map((dev) => (
            <div
              key={dev.name}
              className="rounded-2xl overflow-hidden bg-slate-900/60 backdrop-blur-xl shadow-lg
                         border border-white/10 hover:border-white/20 group transition
                         hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Banner Image */}
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="h-full w-full object-cover object-center
                             group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-950/70" />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-white">{dev.name}</h3>
                <p className="text-violet-300 font-medium text-sm">{dev.role}</p>

                {/* Divider */}
                <div className="mt-4 h-0.5 bg-linear-to-r from-transparent via-violet-400/40 to-transparent" />

                {/* Social Icons */}
                <div className="flex gap-4 justify-center mt-4">
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/40 
                               hover:text-cyan-300 transition shadow-sm hover:shadow-md"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-violet-400/40 
                               hover:text-violet-300 transition shadow-sm hover:shadow-md"
                  >
                    <GitHubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={dev.website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-fuchsia-400/40 
                               hover:text-fuchsia-300 transition shadow-sm hover:shadow-md"
                  >
                    <WebsiteIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
