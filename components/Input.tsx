import React from "react";

import { MutableRefObject } from "react";

interface InputProps {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
}

export const Input: React.FC<InputProps> = ({ onChangeHandler, inputRef }) => {
  const correct: string = "text-green-500";
  const incorrect: string = "text-red-500";

  return (
    <div>
      <input
        className='absolute -top-96'
        ref={inputRef}
        type='text'
        onChange={onChangeHandler}
      />
    </div>
  );
};
