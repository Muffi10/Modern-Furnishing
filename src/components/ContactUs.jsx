import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaEnvelope } from 'react-icons/fa';

function ContactUs() {
  return (
    <div className="flex flex-col justify-center items-center bg-[#D3D5D7] mt-5 mb-10 mx-4">
        <h1 className="mt-2 mb-8 text-3xl font-bold text-center">
        <span className="italic">Contact-Us</span>
      </h1>
      <div className="w-full max-w-lg p-8 space-y-8 bg-[#F5F5F5] bg-opacity-40 shadow-black shadow-2xl rounded-2xl">
        {/* Location */}
        <div className="flex flex-col items-center text-center">
          <FaMapMarkerAlt className="text-4xl text-[#050517] mb-2" />
          <h2 className="mb-1 text-lg font-bold">Our Office Address</h2>
          <a
            href="https://www.google.com/maps/dir//157,+69,+Nagawara+Main+Rd,+near+Golden+Function+Hall,+Kamraj+Nagar,+Nagavara,+Bengaluru,+Karnataka+560045/@13.027348,77.5380882,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3bae1710368dd589:0xa27d6aab931d9d08!2m2!1d77.6205169!2d13.0273619?entry=ttu&g_ep=EgoyMDI1MDEyNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-gray-600 hover:text-[#050517] transition"
          >
            Mufaddal Furnishing 157, 69, Nagawara Main Rd, near Golden Function Hall, Kamraj Nagar, Nagavara, Bengaluru, Karnataka 560045
          </a>
        </div>

        {/* Phone */}
        <div className="flex flex-col items-center text-center">
          <FaPhoneAlt className="text-4xl text-[#050517] mb-2" />
          <h2 className="mb-1 text-lg font-bold">Call Us</h2>
          <a
            href="tel:+919880151008"
            className="text-base text-gray-600 hover:text-[#050517] transition"
          >
            +91 9880151008
          </a>
        </div>

        {/* Timing */}
        <div className="flex flex-col items-center text-center">
          <FaClock className="text-4xl text-[#050517] mb-2" />
          <h2 className="mb-1 text-lg font-bold">Our Timing</h2>
          <span className="text-base text-gray-600">Mon-Sat: 10:30 AM - 8:00 PM</span>
        </div>

        {/* Email */}
        <div className="flex flex-col items-center text-center">
          <FaEnvelope className="text-4xl text-[#050517]mb-2" />
          <h2 className="mb-1 text-lg font-bold">General Enquiries</h2>
          <a
            href="mailto:aliasgerkp53@gmail.com"
            className="text-base text-gray-600 hover:text-[#050517] transition"
          >
            aliasgerkp53@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
