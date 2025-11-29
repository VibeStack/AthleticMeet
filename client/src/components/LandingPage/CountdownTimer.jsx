import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const targetDate = "February 20, 2026"
  const [timeLeft, setTimeLeft] = useState(null);
  const [eventStarted, setEventStarted] = useState(false);

  function calculateTimeLeft() {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      const tl = calculateTimeLeft();

      if (!tl) {
        setEventStarted(true);
        clearInterval(timer);
      } else {
        setTimeLeft(tl);
      }
    });

    return () => clearInterval(timer);
  }, [targetDate]);

  if (eventStarted) {
    return (
      <div className="animate-pulse text-2xl sm:text-3xl md:text-4xl font-black text-cyan-400 mt-8 tracking-wider uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
        🎉 Event is Going On! 🎉
      </div>
    );
  }

  if (!timeLeft) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-10 mb-12">
      {Object.keys(timeLeft).map((interval) => (
        <div key={interval} className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white relative z-10 font-mono">
              {timeLeft[interval] < 10
                ? `0${timeLeft[interval]}`
                : timeLeft[interval]}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-cyan-200 uppercase tracking-widest mt-2 font-semibold">
            {interval}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
