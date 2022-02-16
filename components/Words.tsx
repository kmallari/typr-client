import React, { useEffect, useState, MutableRefObject } from "react";

interface Words {
  words: string[][];
  loading: boolean;
  error: boolean;
  currentWordIndex: number;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
}

export const Words: React.FC<Words> = ({
  words,
  loading,
  error,
  currentWordIndex,
  onChangeHandler,
  inputRef,
}) => {
  let i: number = -1;
  let j: number = -1;

  // console.log("joined", words);
  console.log("curr", currentWordIndex);
  let idx = 0;

  return (
    <div className='w-5/6 h-28 xl:w-7/12 absolute text-2xl overflow-hidden select-none leading-relaxed font-jb_mono text-slate-600 flex flex-row flex-wrap left-0 right-0 ml-auto mr-auto top-0 bottom-0 mt-auto mb-auto'>
      {
        // if loading is true, show loading text
        loading
          ? "Loading..."
          : // if error is true, show error text
          error
          ? "Error"
          : // if data is not empty, show data
          words.length > 0
          ? words.map((word: string[]) => {
              i++;
              return (
                <div key={i} className='flex flex-row flex-wrap'>
                  {
                    // if word is not empty, show word
                    word.map((letter: string) => {
                      j++;
                      return (
                        <span key={j}>
                          {letter === " " ? <div>&nbsp;</div> : letter}
                        </span>
                      );
                    })
                  }
                </div>
              );
            })
          : // if data is empty, show empty text
            "No words found"
      }
    </div>
  );
};
