import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimerProps {
  started: boolean;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
}

export const Timer: React.FC<TimerProps> = ({ started, timer, setTimer }) => {
  const [counter, setCounter] = useState<number>(timer);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    setTimer(counter);
  }, [counter]);

  return (
    <motion.div
      className='w-11/12 lg:max-w-4xl h-auto select-none font-jb_mono text-base text-slate-300'
      animate={{
        opacity: [0, 1],
      }}
    >
      {counter}
    </motion.div>
  );
};
