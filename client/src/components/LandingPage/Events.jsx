import React from 'react';
import { Timer, Target, Award } from '../../icons/index.jsx';

const Events = ({ darkMode }) => {
    const trackEvents = [
        { icon: '🏃', title: '100m Sprint', desc: 'Speed and agility showcase', color: 'from-cyan-500 to-blue-500' },
        { icon: '🏃‍♂️', title: '200m Sprint', desc: 'Power and endurance test', color: 'from-blue-500 to-purple-500' },
        { icon: '🏃‍♀️', title: '400m Run', desc: 'Quarter mile challenge', color: 'from-purple-500 to-pink-500' },
        { icon: '🏃', title: '800m Run', desc: 'Middle distance race', color: 'from-pink-500 to-rose-500' },
        { icon: '🏃‍♂️', title: '1500m Run', desc: 'Metric mile event', color: 'from-rose-500 to-orange-500' },
        { icon: '🏃‍♀️', title: '4x100m Relay', desc: 'Team sprint event', color: 'from-orange-500 to-amber-500' }
    ];

    const fieldEvents = [
        { icon: '🤾', title: 'Long Jump', desc: 'Horizontal leap competition', color: 'from-green-500 to-teal-500' },
        { icon: '🤸', title: 'High Jump', desc: 'Vertical clearance event', color: 'from-teal-500 to-cyan-500' },
        { icon: '⚾', title: 'Shot Put', desc: 'Strength throwing event', color: 'from-cyan-500 to-sky-500' },
        { icon: '🥏', title: 'Discus Throw', desc: 'Rotational power event', color: 'from-sky-500 to-blue-500' },
        { icon: '🏏', title: 'Javelin Throw', desc: 'Distance throwing challenge', color: 'from-blue-500 to-indigo-500' },
        { icon: '🤾‍♀️', title: 'Triple Jump', desc: 'Hop, skip, and jump', color: 'from-indigo-500 to-violet-500' }
    ];

    const funEvents = [
        { icon: '🥚', title: 'Egg & Spoon', desc: 'Balance and speed' },
        { icon: '🎒', title: 'Sack Race', desc: 'Jumping fun challenge' },
        { icon: '🪢', title: 'Tug of War', desc: 'Team strength battle' },
        { icon: '🎯', title: 'Musical Chairs', desc: 'Quick reflexes game' }
    ];

    return (
        <section id="events" className={`py-16 sm:py-20 md:py-24 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <span className="inline-block px-4 py-2 bg-purple-500/10 rounded-full text-purple-500 font-semibold text-sm mb-4">
                        Competitions
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Events
                    </h2>
                    <p className={`text-lg sm:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
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
                                className={`group relative p-6 sm:p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-linear-to-br from-gray-50 to-gray-100'
                                    } transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border-2 border-transparent hover:border-cyan-400`}
                            >
                                <div className={`absolute inset-0 bg-linear-to-r ${event.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                <div className="relative z-10">
                                    <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-500">{event.icon}</div>
                                    <h4 className="text-xl sm:text-2xl font-bold mb-2">{event.title}</h4>
                                    <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.desc}</p>
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
                                className={`group relative p-6 sm:p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-linear-to-br from-gray-50 to-gray-100'
                                    } transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border-2 border-transparent hover:border-orange-400`}
                            >
                                <div className={`absolute inset-0 bg-linear-to-r ${event.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                <div className="relative z-10">
                                    <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-500">{event.icon}</div>
                                    <h4 className="text-xl sm:text-2xl font-bold mb-2">{event.title}</h4>
                                    <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.desc}</p>
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
                                className={`group relative p-6 sm:p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-linear-to-br from-gray-50 to-gray-100'
                                    } transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border-2 border-transparent hover:border-purple-400`}
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-500">{event.icon}</div>
                                    <h4 className="text-lg sm:text-xl font-bold mb-2">{event.title}</h4>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.desc}</p>
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
