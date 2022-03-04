import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: any) => {
  return (
    <div className='content'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
