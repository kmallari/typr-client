import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

interface InputProps {
  charsPerLine: number;
  loading: boolean;
  error: boolean;
}

export const Caret: React.FC<InputProps> = ({
  charsPerLine,
  loading,
  error,
}) => {
  const [prevChars, setPrevChars] = useState<number>(0);
  const [currChars, setCurrChars] = useState<number>(0);

  let x: number[] = [];

  useEffect(() => {
    setCurrChars(charsPerLine);
    setPrevChars(currChars);
    
  }, [charsPerLine]);

  x = [prevChars * 14.43, currChars * 14.43];

  const variants = {
    started: { opacity: [1, 1, 1] },
    standby: { opacity: [1, 0, 1] },
  };

  return (
    <motion.div
      animate={charsPerLine > 0 ? "started" : "standby"}
      variants={variants}
      transition={{
        repeat: Infinity,
        duration: 1,
      }}
      className='w-11/12 lg:max-w-4xl h-28 text-2xl absolute left-0 right-1 ml-auto mr-auto top-0 bottom-0 mt-auto mb-auto'
    >
      {
        // IF LOADING IS TRUE, SHOW "Loading..."
        loading ? null : error ? null : ( // IF ERROR IS TRUE, SHOW "Error"
          // IF DATA IS NOT EMPTY, SHOW DATA
          <motion.div
            initial={false}
            animate={{
              x: x,
            }}
            transition={{
              duration: 0.1,
            }}
            className={`absolute top-1 w-0.5 h-8 rounded-lg bg-green-400`}
          />
        )
      }
    </motion.div>
  );
};

export default Caret;