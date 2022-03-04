import React from "react";
import Head from "next/head";
interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  return (
    <>
      <Head>
        <title>typr | login</title>
        <meta name='keywords' content='login' />
      </Head>
      <div className='m-0 bg-slate-800 h-screen w-full font-jb_mono'>
        <div className='w-11/12 lg:max-w-4xl h-1/2 absolute mr-auto ml-auto mt-auto mb-auto left-0 right-0 md:top-0 -top-40 bottom-0 flex md:flex-row flex-col items-center md:items-start md:justify-between gap-8 md:gap-0'>
          <div className='w-96'>
            <h2 className='font-bold text-slate-100 text-xl mb-4'>register</h2>
            <form className='flex flex-col w-72 gap-4' action=''>
              <input
                className='p-2 rounded-md bg-slate-700 placeholder-slate-500 focus:outline-none text-slate-400'
                type='text'
                placeholder='username'
              />
              <input
                className='p-2 rounded-md bg-slate-700 placeholder-slate-500 focus:outline-none text-slate-400'
                type='email'
                placeholder='email'
              />
              <input
                className='p-2 rounded-md bg-slate-700 placeholder-slate-500 focus:outline-none text-slate-400'
                type='email'
                placeholder='verify email'
              />
              <input
                className='p-2 rounded-md bg-slate-700 placeholder-slate-500 focus:outline-none text-slate-400'
                type='password'
                placeholder='password'
              />
              <input
                className='p-2 rounded-md bg-slate-700 placeholder-slate-500 focus:outline-none text-slate-400'
                type='password'
                placeholder='verify password'
              />
              <button className="mt-1 bg-slate-400 p-2 rounded-md hover:bg-blue-600 hover:text-slate-100 transition-all">sign up</button>
            </form>
          </div>
          <div className='w-96'>
          <h2 className='font-bold text-slate-100 text-xl mb-4'>login</h2>
            <form className='flex flex-col w-72 gap-4' action=''>
              <input
                className='p-2 rounded-md bg-slate-700 placeholder-slate-500 focus:outline-none text-slate-400'
                type='email'
                placeholder='email'
              />
              <input
                className='p-2 rounded-md bg-slate-700 placeholder-slate-500 focus:outline-none text-slate-400'
                type='password'
                placeholder='password'
              />

              <button className="mt-1 bg-slate-400 p-2 rounded-md hover:bg-blue-600 hover:text-slate-100 transition-all">login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
