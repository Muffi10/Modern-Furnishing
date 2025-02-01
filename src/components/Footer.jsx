import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // For Gmail icon
import { faPhone } from '@fortawesome/free-solid-svg-icons'; // For phone icon

const Footer = () => {
  return (
    <footer className="bg-[#050517] text-white pt-4">
      <div className="container flex flex-col items-center justify-between px-4 mx-auto md:flex-row">
        {/* Logo Section */}
        <div className="mb-4 text-center md:mb-0 md:text-left">
          <Link to="/" className="cursor-pointer">
            <h1 className="text-3xl font-bold">Mufaddal Furnishing</h1>
          </Link>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-2 text-center md:text-left">
          
          <p>Founder/Owner: Aliasger Kapadiya  </p>
          <p>
            <Link to="/admin" className="text-white hover:text-blue-300">Admin Access: Login Here</Link>
          </p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-4 text-sm text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Mufaddal Furnishing. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
