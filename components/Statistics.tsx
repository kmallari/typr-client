import React from "react";
import { motion } from "framer-motion";

interface StatisticsProps {
  constTimer: number;
  typedWords: number;
  typedLetters: number;
  typeAgainHandler: () => void;
}

export const Statistics: React.FC<StatisticsProps> = ({
  constTimer,
  typedWords,
  typedLetters,
  typeAgainHandler,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='w-11/12 lg:max-w-4xl h-28 absolute left-0 right-0 ml-auto mr-auto top-0 bottom-0 mt-auto mb-auto flex flex-row items-center justify-between font-jb_mono gap-2 sm:gap-10'
    >
      <div className='flex flex-col h-full items-start justify-center text-slate-600'>
        <div className='text-3xl md:text-6xl font-bold text-green-500'>
          {typedWords}
        </div>
        typed words
      </div>
      <div className='flex flex-col h-full items-start justify-center text-slate-600'>
        <div className='text-3xl md:text-6xl font-bold text-green-500'>
          {typedWords * (60 / constTimer)}
        </div>
        words per minute
      </div>
      <div className='flex flex-col h-full items-start justify-center text-slate-600'>
        <div className='text-3xl md:text-6xl font-bold text-green-500'>
          {typedLetters * (60 / constTimer)}
        </div>
        characters per minute
      </div>
      <button
        onClick={typeAgainHandler}
        className='bg-slate-700 h-1/2 p-4 rounded-xl font-bold pointer hover:bg-slate-600 text-slate-400 hover:text-green-500 transition-all'
      >
        agane
      </button>
    </motion.div>
  );
};
