// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-6 mt-8 rounded-t-xl shadow-inner dark:bg-gray-900">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold mb-2">International Association of Technology and Management (IATM)</p>
        <p className="text-sm">501(c)(3) nonprofit organization based in Pennsylvania, USA</p>
        <p className="text-sm mt-1">© {new Date().getFullYear()} IATM. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
          <span className="text-gray-600">|</span>
          <a href="#" className="hover:text-white transition duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;