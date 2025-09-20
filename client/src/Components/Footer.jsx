
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#303030] text-white py-3 border-t border-gray-700">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-base">
        
        <span>© 2025 Sample-Json Generator</span>

        <span className="text-gray-400 hidden sm:inline">|</span>

        <a
          href="#"
          className="hover:underline transition-colors duration-200 hover:text-gray-300"
        >
          Terms of Use
        </a>

        <span className="text-gray-400 hidden sm:inline">|</span>

        <a
          href="#"
          className="hover:underline transition-colors duration-200 hover:text-gray-300"
        >
          Privacy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
