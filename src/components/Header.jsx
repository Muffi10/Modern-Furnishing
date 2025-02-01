// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="p-4 bg-[#050517] h-18">
      <nav className="flex items-center justify-between">
        <Link to="/" className='cursor-pointer'><h1 className="text-3xl font-bold text-white">Mufaddal Furnishing</h1></Link>
        {/* Call icon on the right side */}
        <a href="tel:+919880151008" className="ml-4 text-2xl text-white hover:text-gray-400">
          <FontAwesomeIcon icon={faPhone} /> {/* Using the FontAwesome phone icon */}
        </a>
      </nav>
    </header>
  );
}

export default Header;
