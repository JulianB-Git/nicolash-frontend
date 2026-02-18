"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const weddingDate = new Date(
      process.env.NEXT_PUBLIC_WEDDING_DATE || "2026-04-01T14:30:00+02:00",
    );

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const difference = weddingDate.getTime() - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]);

  if (!isClient || !timeLeft) {
    return (
      <div className='flex gap-4 sm:gap-6 md:gap-8'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='flex flex-col items-center'>
            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 min-w-[60px] sm:min-w-[80px] md:min-w-[100px]'>
              <div className='text-3xl sm:text-4xl md:text-5xl font-bold'>
                --
              </div>
            </div>
            <div className='text-xs sm:text-sm md:text-base mt-2 uppercase tracking-wider'>
              Loading
            </div>
          </div>
        ))}
      </div>
    );
  }

  const { days, hours, minutes, seconds } = timeLeft;

  // Check if wedding day has arrived
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className='text-2xl sm:text-3xl md:text-4xl font-playfair font-bold'
      >
        The big day is here! 🎉
      </motion.div>
    );
  }

  const timeUnits = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <div
      className='flex gap-4 sm:gap-6 md:gap-8'
      aria-label='Time until wedding'
    >
      {timeUnits.map(({ value, label }) => (
        <div key={label} className='flex flex-col items-center'>
          <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 min-w-[60px] sm:min-w-[80px] md:min-w-[100px] shadow-lg'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={value}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='text-3xl sm:text-4xl md:text-5xl font-bold font-lato'
              >
                {String(value).padStart(2, "0")}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className='text-xs sm:text-sm md:text-base mt-2 uppercase tracking-wider font-lato'>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
