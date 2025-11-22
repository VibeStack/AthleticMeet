import React, { useState } from "react";
import { Trophy, Sun, Moon, Menu, X } from "../../icons/index.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode, activeSection, scrollToSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    "Home",
    "Register",
    "Events",
    "Team",
    "Gallery",
    "FAQ",
    "Contact",
  ];

  const handleScrollTo = (id) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  const navigate = useNavigate();

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 backdrop-blur-xl ${
        darkMode ? "bg-gray-900/98 shadow-2xl" : "bg-white/98 shadow-2xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={() => handleScrollTo("home")}
          >
            <div className="relative">
              <Trophy className="w-10 h-10 text-cyan-500 transform group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-cyan-500/20 blur-xl group-hover:bg-cyan-500/40 transition-all duration-300 rounded-full"></div>
            </div>
            <div>
              <span className="font-black text-xl md:text-2xl bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Athletic Meet
              </span>
              <p className="text-xs font-bold hidden sm:block bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">2025</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleScrollTo(item.toLowerCase())}
                className={`relative px-4 py-2 font-semibold text-sm transition-all duration-300 rounded-lg group ${
                  activeSection === item.toLowerCase()
                    ? "text-cyan-500"
                    : darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item}
                <span
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? "w-full"
                      : "group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              className="relative px-6 py-3 rounded-xl font-bold text-white overflow-hidden group cursor-pointer"
              onClick={() => navigate("/register")}
            >
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 group-hover:scale-110 transition-transform duration-300"></div>
              <span className="relative z-10">Register</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ${
          menuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        } ${darkMode ? "bg-gray-800" : "bg-white"} border-t ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleScrollTo(item.toLowerCase())}
              className={`block w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                activeSection === item.toLowerCase()
                  ? "bg-linear-to-r from-cyan-500 to-blue-500 text-white transform scale-105"
                  : darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
          <button
            className="w-full relative px-4 py-3 rounded-lg font-bold text-white overflow-hidden group cursor-pointer"
            onClick={() => navigate("/register")}
          >
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 group-hover:scale-110 transition-transform duration-300"></div>
            <span className="relative z-10">Register</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
