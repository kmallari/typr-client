import React, { useState } from "react";
import { motion } from "framer-motion";

interface TimerOptionsProps {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
}

export const TimerOptions: React.FC<TimerOptionsProps> = ({
  timer,
  setTimer,
}) => {
  const handleClick = (time: number): void => {
    setTimer(time);
  };

  return (
    <motion.div 
      animate={{
        opacity: [0, 1]
      }}
    className='w-11/12 lg:max-w-4xl h-44 select-none text-sm font-jb_mono text-slate-600 flex flex-row justify-start gap-6 items-start'>
      <div className='text-slate-500'>time</div>
      <div className='flex flex-row gap-6'>
        <button
          onClick={() => {
            handleClick(40);
          }}
          className={`hover:text-slate-200 transition-all ${
            timer === 40 ? "text-green-400" : ""
          }`}
        >
          40s
        </button>
        <button
          onClick={() => {
            handleClick(30);
          }}
          className={`hover:text-slate-200 transition-all ${
            timer === 30 ? "text-green-400" : ""
          }`}
        >
          30s
        </button>
        <button
          onClick={() => {
            handleClick(20);
          }}
          className={`hover:text-slate-200 transition-all ${
            timer === 20 ? "text-green-400" : ""
          }`}
        >
          20s
        </button>
        <button
          onClick={() => {
            handleClick(10);
          }}
          className={`hover:text-slate-200 transition-all ${
            timer === 10 ? "text-green-400" : ""
          }`}
        >
          10s
        </button>
      </div>
    </motion.div>
  );
};
