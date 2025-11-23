import React from "react";
import { Timer, Target, Award } from "../../icons/index.jsx";

const Events = ({ darkMode }) => {
  const trackEvents = [
    {
      id: "100m",
      title: "100m",
      desc: "Short sprint",
      color: "from-cyan-500 to-blue-500",
      icon: "🏃‍♂️",
    },
    {
      id: "200m",
      title: "200m",
      desc: "Half-lap sprint",
      color: "from-blue-500 to-purple-500",
      icon: "🏃‍♂️",
    },
    {
      id: "400m",
      title: "400m",
      desc: "One-lap race",
      color: "from-purple-500 to-pink-500",
      icon: "🏃‍♂️",
    },
    {
      id: "800m",
      title: "800m",
      desc: "Middle-distance run",
      color: "from-pink-500 to-rose-500",
      icon: "🏃",
    },
    {
      id: "1500m",
      title: "1500m",
      desc: "Long middle-distance",
      color: "from-rose-500 to-orange-500",
      icon: "🏃",
    },
    {
      id: "3000m",
      title: "3000m",
      desc: "Long-distance run",
      color: "from-orange-500 to-amber-500",
      icon: "🏃",
    },
    {
      id: "10000m",
      title: "10,000m",
      desc: "Endurance race",
      color: "from-amber-500 to-lime-500",
      icon: "🏃",
    },
    {
      id: "100m-hurdles",
      title: "100m Hurdles",
      desc: "Sprint with hurdles",
      color: "from-lime-500 to-green-500",
      icon: "🚧",
    },
    {
      id: "110m-hurdles",
      title: "110m Hurdles",
      desc: "Sprint with hurdles",
      color: "from-green-500 to-teal-500",
      icon: "🚧",
    },
    {
      id: "400m-hurdles",
      title: "400m Hurdles",
      desc: "Long hurdles race",
      color: "from-teal-500 to-cyan-500",
      icon: "🚧",
    },
  ];
  const fieldEvents = [
    {
      id: "javelin-throw",
      title: "Javelin Throw",
      desc: "Spear distance throw",
      color: "from-green-500 to-teal-500",
      icon: "🥢",
    },
    {
      id: "shot-put",
      title: "Shot Put",
      desc: "Powerful weight throw",
      color: "from-teal-500 to-cyan-500",
      icon: "🤾🏽",
    },
    {
      id: "discus-throw",
      title: "Discus Throw",
      desc: "Rotational disc throw",
      color: "from-cyan-500 to-sky-500",
      icon: "🥏",
    },
    {
      id: "hammer-throw",
      title: "Hammer Throw",
      desc: "Heavy weighted throw",
      color: "from-sky-500 to-blue-500",
      icon: "🔨",
    },
    {
      id: "long-jump",
      title: "Long Jump",
      desc: "Horizontal leap",
      color: "from-blue-500 to-indigo-500",
      icon: "🏃‍♂️💨",
    },
    {
      id: "high-jump",
      title: "High Jump",
      desc: "Vertical clearance",
      color: "from-indigo-500 to-violet-500",
      icon: "🤸‍♂️",
    },
    {
      id: "triple-jump",
      title: "Triple Jump",
      desc: "Hop, step, jump",
      color: "from-violet-500 to-fuchsia-500",
      icon: "⤐",
    },
  ];

  const funEvents = [
    {
      id: "tug-of-war",
      title: "Tug of War",
      desc: "Team rope pulling contest",
      color: "from-orange-500 to-amber-500",
      icon: "🪢",
    },
    {
      id: "4x100-relay",
      title: "4x100m Relay",
      desc: "Sprint relay event",
      color: "from-indigo-500 to-violet-500",
      icon: "🏃‍♂️➝🏃‍♂️",
    },
    {
      id: "4x400-relay",
      title: "4x400m Relay",
      desc: "Long relay event",
      color: "from-fuchsia-500 to-rose-500",
      icon: "🏃‍♂️➝🏃‍♂️",
    },
  ];

  return (
    <section
      id="events"
      className={`py-16 sm:py-20 md:py-24 ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-2 bg-purple-500/10 rounded-full text-purple-500 font-semibold text-sm mb-4">
            Competitions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Events
          </h2>
          <p
            className={`text-lg sm:text-xl ${
              darkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            Choose your arena of excellence
          </p>
        </div>

        {/* Track Events */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 bg-linear-to-r from-cyan-500 to-blue-500 rounded-xl">
              <Timer className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            Track Events
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {trackEvents.map((event, idx) => (
              <div
                key={idx}
                className={`group relative p-6 sm:p-8 rounded-2xl ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-linear-to-br from-gray-50 to-gray-100"
                } transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border-2 border-transparent hover:border-cyan-400`}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-r ${event.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <div className="relative z-10">
                  <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-500">
                    {event.icon}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold mb-2">
                    {event.title}
                  </h4>
                  <p
                    className={`text-sm sm:text-base ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Field Events */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
              <Target className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            Field Events
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {fieldEvents.map((event, idx) => (
              <div
                key={idx}
                className={`group relative p-6 sm:p-8 rounded-2xl ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-linear-to-br from-gray-50 to-gray-100"
                } transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border-2 border-transparent hover:border-orange-400`}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-r ${event.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <div className="relative z-10">
                  <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-500">
                    {event.icon}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold mb-2">
                    {event.title}
                  </h4>
                  <p
                    className={`text-sm sm:text-base ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Events */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl">
              <Award className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            Fun Events
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {funEvents.map((event, idx) => (
              <div
                key={idx}
                className={`group relative p-6 sm:p-8 rounded-2xl ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-linear-to-br from-gray-50 to-gray-100"
                } transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border-2 border-transparent hover:border-purple-400`}
              >
                <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-500">
                    {event.icon}
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold mb-2">
                    {event.title}
                  </h4>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
