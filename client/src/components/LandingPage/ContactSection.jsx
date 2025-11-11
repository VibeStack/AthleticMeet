import { useForm } from "react-hook-form";
import useRevealOnScroll from "./useRevealOnScroll";

export default function ContactSection() {
  const { register, handleSubmit, reset } = useForm();
  const ref = useRevealOnScroll();

  const onSubmit = (data) => {
    console.log("Contact Form Submitted:", data);
    alert("Thank you for reaching out! We’ll get back to you soon.");
    reset();
  };

  return (
    <section id="contact" ref={ref} className="reveal py-24 px-6 bg-slate-950">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold mb-3 text-white">Contact Us</h2>
        <p className="text-slate-300 mb-8">Have questions? Fill the form below.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <input
            {...register("name", { required: true })}
            placeholder="Your Name"
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none
                       focus:ring-2 focus:ring-violet-400/30 backdrop-blur"
          />
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none
                       focus:ring-2 focus:ring-violet-400/30 backdrop-blur"
          />
          <input
            {...register("subject")}
            placeholder="Subject"
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none
                       focus:ring-2 focus:ring-violet-400/30 backdrop-blur md:col-span-2"
          />
          <textarea
            {...register("message", { required: true })}
            placeholder="Your Message"
            rows="5"
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none
                       focus:ring-2 focus:ring-violet-400/30 backdrop-blur md:col-span-2"
          />
          <button
            type="submit"
            className="md:col-span-2 px-6 py-3 rounded-xl font-semibold text-slate-900
                       bg-linear-to-r from-cyan-300 via-violet-300 to-fuchsia-300
                       hover:from-cyan-200 hover:via-violet-200 hover:to-fuchsia-200
                       transition shadow-sm hover:shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
