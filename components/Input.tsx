import React from "react";

import { MutableRefObject } from "react";



interface InputProps {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
}

export const Input: React.FC<InputProps> = ({ onChangeHandler, inputRef }) => {
  return (
    <div>
      <input
        // maxLength={24}
        autoComplete="off"
        className='absolute -top-96'
        ref={inputRef}
        type='text'
        onChange={onChangeHandler}
      />
    </div>
  );
};
