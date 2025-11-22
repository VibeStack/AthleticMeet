import React from 'react';
import { MapPin, Mail, Phone } from '../../icons/index.jsx';

const Contact = ({ darkMode }) => {
    return (
        <section id="contact" className={`py-16 sm:py-20 md:py-24 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <span className="inline-block px-4 py-2 bg-orange-500/10 rounded-full text-orange-500 font-semibold text-sm mb-4">
                        Reach Out
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Get in Touch
                    </h2>
                    <p className={`text-lg sm:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
                        Have questions? We're here to help
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
                    <div className={`p-6 sm:p-8 rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-linear-to-br from-gray-50 to-gray-100'} shadow-xl`}>
                        <form className="space-y-6">
                            <div>
                                <label className="block mb-2 font-bold text-sm">Name</label>
                                <input
                                    type="text"
                                    className={`w-full px-4 py-4 rounded-xl ${darkMode
                                            ? 'bg-gray-900 border-gray-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                        } border-2 focus:border-cyan-500 outline-none transition-all text-sm sm:text-base`}
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-bold text-sm">Email</label>
                                <input
                                    type="email"
                                    className={`w-full px-4 py-4 rounded-xl ${darkMode
                                            ? 'bg-gray-900 border-gray-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                        } border-2 focus:border-cyan-500 outline-none transition-all text-sm sm:text-base`}
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-bold text-sm">Message</label>
                                <textarea
                                    rows="5"
                                    className={`w-full px-4 py-4 rounded-xl ${darkMode
                                            ? 'bg-gray-900 border-gray-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                        } border-2 focus:border-cyan-500 outline-none transition-all resize-none text-sm sm:text-base`}
                                    placeholder="Your message..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="group w-full relative px-6 py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-base sm:text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                            >
                                <span className="relative z-10">Send Message</span>
                                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </button>
                        </form>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-black mb-6">Contact Information</h3>
                            <div className="space-y-4 sm:space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="p-4 bg-linear-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2 text-base sm:text-lg">Address</h4>
                                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>
                                            Sports Department, College Campus<br />
                                            Main Building, Room 305<br />
                                            City, State - 110001
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-4 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2 text-base sm:text-lg">Email</h4>
                                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>
                                            sports@college.edu<br />
                                            athleticmeet@college.edu
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-4 bg-linear-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2 text-base sm:text-lg">Phone</h4>
                                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>
                                            +91 98765 43210<br />
                                            +91 98765 43211
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-80">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.582714851524!2d77.44137431508064!3d28.61252498242638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sIndia!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
