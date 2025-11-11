import useRevealOnScroll from "./useRevealOnScroll";

export default function HowToRegister() {
  const ref = useRevealOnScroll();

  const Step = ({ n, children }) => (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur shadow-sm">
      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-100
                      bg-linear-to-br from-cyan-400/60 to-violet-400/60 mb-3">
        {n}
      </div>
      <p className="text-slate-300">{children}</p>
    </div>
  );

  return (
    <section id="register" ref={ref} className="reveal py-24 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-10 bg-clip-text text-transparent
                       bg-[linear-gradient(90deg,#67e8f9,#a78bfa,#f0abfc)]">
          How to Register
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Step n="1">Open the Register page using the button in the navbar.</Step>
          <Step n="2">Enter GNDEC email, verify with OTP, set a password.</Step>
          <Step n="3">Complete your profile (course, branch, year, contact).</Step>
          <Step n="4">View schedules & results in your dashboard.</Step>
        </div>
      </div>
    </section>
  );
}
