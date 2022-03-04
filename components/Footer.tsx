import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className='bg-slate-800 w-full absolute bottom-8 flex items-center justify-center'>
      <p className='font-jb_mono text-slate-400'>
        made with ♥ by{" "}
        <a
          className='text-blue-500 underline underline-offset-4 hover:text-green-500 transition-all'
          href='https://github.com/kmallari/'
        >
          Kevin Mallari
        </a>
      </p>
    </footer>
  );
};
