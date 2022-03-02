import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

interface InputProps {
  charsPerLine: number;
  loading: boolean;
  error: boolean;
  isCaretMiddle: boolean;
}

export const Caret: React.FC<InputProps> = ({
  charsPerLine,
  loading,
  error,
  isCaretMiddle,
}) => {
  const [prevChars, setPrevChars] = useState<number>(0);
  const [currChars, setCurrChars] = useState<number>(0);

  useEffect(() => {
    if (charsPerLine === 0) {
      setCurrChars(0);
    }
    setCurrChars(charsPerLine);
    setPrevChars(currChars);
  }, [charsPerLine]);

  useEffect(() => {
    setCurrChars(0);
  }, [isCaretMiddle])

  const variants = {
    started: { opacity: [1, 1, 1] },
    standby: { opacity: [1, 0, 1] },
  };

  console.log("🚀 ~ file: Caret.tsx ~ line 18 ~ prevChars", prevChars);
  console.log("🚀 ~ file: Caret.tsx ~ line 19 ~ currChars", currChars);

  console.log(charsPerLine);

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
              x: [prevChars * 14.43, currChars * 14.43],
            }}
            transition={{
              duration: 0.1,
            }}
            className={`absolute w-0.5 h-8 rounded-lg bg-green-400 ${
              isCaretMiddle ? "top-11" : "top-1"
            }`}
          />
        )
      }
    </motion.div>
  );
};

export default Caret;
