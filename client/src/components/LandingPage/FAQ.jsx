import React, { useState } from "react";
import { ChevronDown } from "../../icons/index.jsx";

const FAQ = ({ darkMode }) => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How do I get my QR code and chest number?",
      a: "After successful registration and event selection, your QR code and chest number will be generated automatically. You can download it from your profile or receive it via email.",
    },
    {
      q: "When do the events start?",
      a: "The athletic meet begins on March 15th at 8:00 AM with the opening ceremony. Individual events will run from March 16-18 according to the schedule.",
    },
    {
      q: "Can I register for multiple events?",
      a: "Yes! You can register for up to 3 individual events and unlimited team events, subject to time slot availability.",
    },
    {
      q: "What should I bring on event day?",
      a: "Bring your college ID, QR code (printed or digital), athletic gear, water bottle, and your chest number badge.",
    },
    {
      q: "Is there a registration fee?",
      a: "No, participation is completely free for all enrolled students. Just register and show up!",
    },
  ];

  return (
    <section
      id="faq"
      className={`py-16 sm:py-20 md:py-24 ${
        darkMode ? "bg-gray-800" : "bg-linear-to-b from-gray-50 to-white"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-2 bg-green-500/10 rounded-full text-green-500 font-semibold text-sm mb-4">
            Help Center
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-linear-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p
            className={`text-lg sm:text-xl ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Got questions? We've got answers
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl ${
                darkMode ? "bg-gray-900" : "bg-white"
              } shadow-lg overflow-hidden transition-all duration-300 ${
                openFaq === idx ? "ring-2 ring-cyan-500" : ""
              }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-cyan-500/5 transition-colors"
              >
                <span className="font-bold text-base sm:text-lg pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-cyan-500 shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ${
                  openFaq === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div
                  className={`px-6 pb-6 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } text-sm sm:text-base leading-relaxed`}
                >
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
