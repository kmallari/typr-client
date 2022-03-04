import React from "react";
import { AnimatePresence, motion } from "framer-motion";
interface ErrorProps {
  widthError: boolean;
}

export const Error: React.FC<ErrorProps> = ({ widthError }) => {
  return (
    <AnimatePresence>
      {widthError && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 80 }}
          exit={{ y: -120 }}
          className='w-80 h-28 absolute top-0 ml-auto right-10 bg-red-500 p-8 rounded-xl font-rubik text-white'
        >
          <h3 className='font-bold'>Error!</h3>
          <p>Window was resized while typing.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
