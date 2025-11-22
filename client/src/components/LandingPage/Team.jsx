import React from "react";
import { Linkedin, Github, Globe } from "../../icons/index.jsx";

const Team = ({ darkMode }) => {
  const devTeam = [
    {
      name: "Arshdeep Anand",
      role: "Full Stack Developer",
      image: "/images/MyProfessionalPic.png",
      linkedin: "#",
      github: "#",
      portfolio: "#",
      gradient: "from-gray-300 to-white-100",
    },
  ];

  return (
    <section
      id="team"
      className={`py-16 sm:py-20 md:py-24 ${
        darkMode ? "bg-gray-800" : "bg-linear-to-b from-gray-50 to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-2 bg-blue-500/10 rounded-full text-blue-500 font-semibold text-sm mb-4">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meet the Dev Team
          </h2>
          <p
            className={`text-lg sm:text-xl ${
              darkMode ? "text-gray-400" : "text-gray-600"
            } text-center`}
          >
            The Minds Behind This Platform
          </p>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {devTeam.map((dev, idx) => (
            <div
              key={idx}
              className={`group rounded-3xl overflow-hidden ${
                darkMode ? "bg-gray-900" : "bg-white"
              } shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 w-[350px] my-4`}
            >
              <div className="relative overflow-hidden h-64 sm:h-72">
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-linear-to-t ${dev.gradient} opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-end justify-center pb-6`}
                >
                  <div className="flex gap-3 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <a
                      href={dev.linkedin}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all hover:scale-110"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={dev.github}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all hover:scale-110"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={dev.portfolio}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all hover:scale-110"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-1">
                  {dev.name}
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } mb-4`}
                >
                  {dev.role}
                </p>
                <div
                  className={`h-1 w-36 bg-linear-to-r ${dev.gradient} rounded-full`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
