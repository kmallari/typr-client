import React, { useState } from "react";
import { motion } from "framer-motion";

interface TimerOptionsProps {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  setConstTimer: React.Dispatch<React.SetStateAction<number>>;
  constTimer: number;
  setCharsPerLine: React.Dispatch<React.SetStateAction<number>>;
  setTypedCharsPerRow: React.Dispatch<React.SetStateAction<number>>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}

export const TimerOptions: React.FC<TimerOptionsProps> = ({
  timer,
  setTimer,
  setConstTimer,
  constTimer,
  setCharsPerLine,
  setTypedCharsPerRow,
  inputRef,
}) => {
  const handleClick = (time: number): void => {
    setTimer(time);
    setConstTimer(time);
    setCharsPerLine(0);
    setTypedCharsPerRow(0);
    if (inputRef.current?.value != null) {
      inputRef.current.value = "";
      inputRef.current?.focus();
    }
    inputRef.current?.focus();
  };

  return (
    <motion.div
      animate={{
        opacity: [0, 1],
      }}
      className='w-11/12 lg:max-w-4xl h-auto select-none font-jb_mono text-base text-slate-600 flex flex-row justify-start gap-6 items-start mx-auto'
    >
      <div className='text-slate-500'>time</div>
      <div className='flex flex-row gap-6'>
        <button
          onClick={() => {
            handleClick(40);
          }}
          className={`hover:text-slate-200 transition-all ${
            constTimer === 40 ? "text-green-400" : ""
          }`}
        >
          40s
        </button>
        <button
          onClick={() => {
            handleClick(30);
          }}
          className={`hover:text-slate-200 transition-all ${
            constTimer === 30 ? "text-green-400" : ""
          }`}
        >
          30s
        </button>
        <button
          onClick={() => {
            handleClick(20);
          }}
          className={`hover:text-slate-200 transition-all ${
            constTimer === 20 ? "text-green-400" : ""
          }`}
        >
          20s
        </button>
        <button
          onClick={() => {
            handleClick(10);
          }}
          className={`hover:text-slate-200 transition-all ${
            constTimer === 10 ? "text-green-400" : ""
          }`}
        >
          10s
        </button>
      </div>
    </motion.div>
  );
};
