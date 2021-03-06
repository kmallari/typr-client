import React, { useEffect, useState, MutableRefObject } from "react";
import { ThreeDots } from "react-loader-spinner";
import { motion } from "framer-motion";

interface Words {
  words: string[][];
  loading: boolean;
  error: boolean;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeWord: string[];
  input: string[];
  arrToStr: (s: string[]) => string;
  finishedWords: string[];
}

export const Words: React.FC<Words> = ({
  words,
  loading,
  error,
  activeWord,
  input,
  arrToStr,
  finishedWords,
}) => {
  return (
    <div
      id='words-wrapper'
      className='w-11/12 lg:max-w-4xl h-28 text-2xl overflow-hidden select-none leading-relaxed font-jb_mono text-slate-600 flex flex-row flex-wrap mx-auto mt-2'
    >
      {
        // IF LOADING IS TRUE, SHOW "Loading..."
        loading ? (
          <ThreeDots />
        ) : // IF ERROR IS TRUE, SHOW "Error"
        error ? (
          "Error fetching data."
        ) : // IF DATA IS NOT EMPTY, SHOW DATA
        words.length > 0 ? (
          words.map((word: string[], i: number) => {
            return (
              // THIS DIV IS THE DIV PER BOX
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={i}
                className={`flex flex-row flex-wrap ${
                  // IF THE WORD IS ALREADY IN FINISHED WORDS,
                  // COLOR IT GREEN.
                  finishedWords.includes(arrToStr(word))
                    ? "text-green-500 font"
                    : ""
                }`}
              >
                {
                  // DISPLAY THE WORD
                  word.map((letter: string, j: number) => {
                    return (
                      <div
                        key={`${i}${j}`}
                        className={
                          // IF THE CURRENT WORD IS THE SAME AS THE ACTIVE WORD,
                          // AND IF THE CHARACTERS ENTERED ARE CORRECT, COLOR
                          // THE CORRESPONDING LETTER GREEN. OTHERWISE,
                          // COLOR IT RED, WITH AN UNDERLINE.
                          activeWord[j] === input[j] &&
                          arrToStr(word) === arrToStr(activeWord)
                            ? "text-green-500 font"
                            : activeWord[j] != input[j] &&
                              input[j] != null &&
                              arrToStr(word) === arrToStr(activeWord)
                            ? "text-red-500 underline underline-offset-2"
                            : ""
                        }
                      >
                        {/* PRINT THE LETTER ON THE SCREEN */}
                        {letter}
                      </div>
                    );
                  })
                }
                {/* IF THE CURRENT INPUT IS LONGER THAN THE ACTIVE WORD,
                  ADD THE EXTRA CHARACTERS AND COLOR THEM RED. */}
                {input.length > activeWord.length &&
                arrToStr(word) === arrToStr(activeWord)
                  ? input.map((letter: string, k: number) => {
                      if (k >= activeWord.length) {
                        return (
                          <div
                            className='text-red-700 underline underline-offset-2'
                            key={`input-${letter}-${k}`}
                          >
                            {letter}
                          </div>
                        );
                      }
                    })
                  : ""}
                <span>&nbsp;</span>
              </motion.div>
            );
          })
        ) : (
          // IF DATA IS EMPTY, SHOW "No words found."
          "No words found."
        )
      }
    </div>
  );
};
