import React from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField.jsx";
import TextAreaField from "./TextAreaField.jsx";
import { MapPin, Mail, Phone, ExternalLink } from "../../icons/index.jsx";

const Contact = ({ darkMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    reset();
  };

  return (
    <section
      id="contact"
      className={`py-20 sm:py-24 ${
        darkMode ? "bg-gray-900" : "bg-linear-to-b from-gray-50 to-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-orange-500/10 rounded-full text-orange-500 font-semibold text-sm mb-4">
            Reach Out
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Get in Touch
          </h2>

          <p
            className={`mt-4 text-lg sm:text-xl ${
              darkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            We're here to help you with any questions about the athletic meet.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-4 justify-center py-6">
          <div
            className={`flex flex-col p-6 rounded-2xl shadow-xl border ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } hover:shadow-2xl transition-all duration-300`}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-4 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 shadow-md">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold">Address</h4>
            </div>

            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } leading-relaxed`}
            >
              GNDEC Sports Department <br />
              Gill Park, Ludhiana <br />
              Punjab — 141006
            </p>
          </div>

          <div
            className={`flex flex-col p-6 rounded-2xl shadow-xl border ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } hover:shadow-2xl transition-all duration-300`}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-4 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 shadow-md">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold">Email</h4>
            </div>

            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } leading-relaxed`}
            >
              gndecathletic2025@gmail.com
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row max-w-6xl gap-8 md:gap-6 items-stretch w-full">
          <div
            className={`p-8 rounded-3xl shadow-2xl border w-full md:w-1/2 ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="h-full flex flex-col"
            >
              <InputField
                label="Full Name"
                id="name"
                placeholder="John Doe"
                register={register}
                rules={{ required: "Name is required" }}
                errors={errors}
                darkMode={darkMode}
              />

              <InputField
                label="Email Address"
                id="email"
                type="email"
                placeholder="example@gmail.com"
                register={register}
                rules={{
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
                }}
                errors={errors}
                darkMode={darkMode}
              />

              <TextAreaField
                label="Message"
                id="message"
                placeholder="Write your message..."
                register={register}
                rules={{ required: "Message cannot be empty" }}
                errors={errors}
                rows="5"
                darkMode={darkMode}
              />

              <button
                type="submit"
                className="group mt-auto w-full relative px-6 py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg rounded-xl font-semibold text-lg overflow-hidden hover:shadow-2xl transition"
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </form>
          </div>


          <div class="flex flex-col md:w-1/2 space-y-6">
            <div className="grow rounded-3xl overflow-hidden shadow-2xl bg-white/50 backdrop-blur-xl border border-white/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2900.5692847593396!2d75.85840628259152!3d30.859124548052815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a828ff6aaaaab%3A0xc4fd6949a7f34411!2sGNDEC%20Athletic%20Sports%20ground!5e0!3m2!1sen!2sin!4v1763802622855!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>

            <a
              href="https://maps.app.goo.gl/cifZ4pzRN5HLQUsJ8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-white/70 backdrop-blur-xl text-gray-700 font-semibold border border-white/60 shadow-lg hover:bg-white transition"
            >
              <ExternalLink className="w-5 h-5" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
