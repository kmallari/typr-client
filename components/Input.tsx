import { LargeNumberLike } from "crypto";
import React from "react";

import { MutableRefObject } from "react";

interface InputProps {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  typedCharsPerRow: number;
  charsPerRow: number;
  started: boolean;
  timer: number;
}

export const Input: React.FC<InputProps> = ({
  onChangeHandler,
  inputRef,
  typedCharsPerRow,
  charsPerRow,
  started,
  timer,
}) => {
  return (
    <>
      <input
        // MAX LENGTH OF THE INPUT CAN ONLY BE
        // BELOW THE MAX CHARACTERS PER ROW
        maxLength={
          charsPerRow - typedCharsPerRow > 24
            ? 24
            : charsPerRow - typedCharsPerRow
        }
        autoCapitalize='off'
        autoComplete='off'
        className='absolute -top-96'
        ref={inputRef}
        type='text'
        onChange={onChangeHandler}
        disabled={started === false && timer === 0 ? true : false}
      />
    </>
  );
};
