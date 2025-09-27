<<<<<<< HEAD


import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-[rgb(245,250,255)] border-b-2 border-[#d1e4f5]  z-50 flex items-center px-8">
      <img src="/jsonformatLogo.svg" alt="logo" className="h-10 w-auto" />
      <a
        href="https://blog.json-format.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto  mr-[4rem] text-blue-700 text-lg font-bold hover:text-black"
      >
        BLOG
      </a>
    </header>
=======
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <>
      <header className="w-full bg-[#41b666] border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Sample-Json Generator</h1>
      </header>
    </>
>>>>>>> 7a5295270b3dccbf695fc409c940dfb4951c10a6
  );
};

export default Header;
