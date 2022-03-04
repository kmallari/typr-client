import React from "react";
import Link from "next/link";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav className='absolute top-8 w-11/12 lg:max-w-4xl h-10 left-0 right-0 ml-auto mr-auto flex flex-row justify-between items-center'>
      <h1 className='font-rubik font-bold text-3xl text-slate-100'>typr.</h1>
      <div className='flex flex-row gap-10 text-slate-500 font-jb_mono'>
        <Link href='/'>
          <a className="hover:text-slate-100 transition-all">home</a>
        </Link>
        <Link href='/login'>
          <a className="hover:text-slate-100 transition-all">login</a>
        </Link>
      </div>
    </nav>
  );
};
