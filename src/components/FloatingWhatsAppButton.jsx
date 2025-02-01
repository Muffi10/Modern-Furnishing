import React from 'react';

// Font Awesome for WhatsApp icon
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsAppButton = () => {
  const phoneNumber = '919880151008'; // Your desired phone number in international format
  
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I have a query regarding your products.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank'); // Opens WhatsApp
  };

  return (
    <div 
      className="fixed z-10 p-4 transition duration-300 bg-green-500 rounded-full shadow-lg cursor-pointer  bottom-6 right-6 hover:bg-green-600"
      onClick={handleWhatsAppClick}
    >
      <FaWhatsapp size={30} color="#fff" />
    </div>
  );
};

export default FloatingWhatsAppButton;
