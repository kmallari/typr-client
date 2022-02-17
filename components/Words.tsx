import React, { useEffect, useState, MutableRefObject } from "react";

interface Words {
  words: string[][];
  loading: boolean;
  error: boolean;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
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
  // console.log("joined", words);
  // console.log("curr", currentWordIndex);

  return (
    <div className='w-5/6 h-28 xl:w-7/12 absolute text-2xl overflow-hidden select-none leading-relaxed font-jb_mono text-slate-600 flex flex-row flex-wrap left-0 right-0 ml-auto mr-auto top-0 bottom-0 mt-auto mb-auto'>
      {
        // IF LOADING IS TRUE, SHOW "Loading..."
        loading
          ? "Loading..."
          : // IF ERROR IS TRUE, SHOW "Error"
          error
          ? "Error"
          : // IF DATA IS NOT EMPTY, SHOW DATA
          words.length > 0
          ? words.map((word: string[], i: number) => {
              return (
                <div
                  key={i}
                  className={`flex flex-row flex-wrap ${
                    finishedWords.includes(arrToStr(word))
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {
                    // if word is not empty, show word
                    word.map((letter: string, j: number) => {
                      return (
                        <div
                          key={`${i}${j}`}
                          className={
                            activeWord[j] === input[j] &&
                            arrToStr(word) === arrToStr(activeWord)
                              ? "text-green-500"
                              : activeWord[j] != input[j] &&
                                input[j] != null &&
                                arrToStr(word) === arrToStr(activeWord)
                              ? "text-red-500"
                              : ""
                          }
                        >
                          {letter}
                        </div>
                      );
                    })
                  }
                  <span>&nbsp;</span>
                </div>
              );
            })
          : // IF DATA IS EMPTY, SHOW "No words found."
            "No words found."
      }
    </div>
  );
};
