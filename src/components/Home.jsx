import React from 'react';
import { ImagesSlider } from '../ui/images-slider'; // Adjust the path accordingly
import { motion } from 'framer-motion';
import home1 from '../images/home1.jpg';
import home2 from '../images/home2.jpeg';
import home3 from '../images/home3.jpg';
import CategoriesGrid from './CategoriesGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { InfiniteMovingCards } from '../ui/InfiniteMovingCards';
import ContactUs from './ContactUs';

const images = [home1, home2, home3];

const items = [
  { name: "John Doe", title: "CEO", quote: "This is an amazing product!" },
  { name: "Jane Smith", title: "CTO", quote: "I highly recommend it!" },
  // Add more items as needed
];

const Home = () => {
  return (
    <div>
    <div className='flex flex-col h-auto p-5 md:p-10 md:flex-row bg-[#D3D5D7] gap-5'>
      {/* Left Side: Text Section */}
      <div className="flex flex-col justify-center w-full p-3 space-y-5 rounded-lg cursor-pointer md:w-1/2">
      <h1 className="text-4xl font-bold text-black md:text-4xl">
        We help you create spaces of <span className="italic">Comfort</span> and <span className="italic">Elegance</span>.
      </h1>

        <p className="text-lg text-gray-900 md:text-xl">
        Discover premium sofas, custom cushions, and handcrafted furnishings designed to elevate your home and bring your vision to life
        </p>
        {/* Button visible only on medium and larger screens */}
        <a href="https://www.google.com/maps/dir//157,+69,+Nagawara+Main+Rd,+near+Golden+Function+Hall,+Kamraj+Nagar,+Nagavara,+Bengaluru,+Karnataka+560045/@13.027348,77.5380882,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3bae1710368dd589:0xa27d6aab931d9d08!2m2!1d77.6205169!2d13.0273619?entry=ttu&g_ep=EgoyMDI1MDEyNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer">
        <button className="px-6 py-3 mt-5 font-semibold text-xl text-white bg-[#050517] rounded-lg hover:bg-blue-900">
          Shop Now <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
        </a>
      </div>

      {/* Right Side: Image Slideshow */}
      <ImagesSlider className="w-full md:h-[35rem] h-[25rem] rounded-lg" images={images}>
        <motion.div
          initial={{ opacity: 1, y: -80 }}
          animate={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-50 flex flex-col items-center justify-center">
        </motion.div>
      </ImagesSlider>

      {/* Button visible only on mobile screens */}
      <a href="/shop" className="flex items-center justify-center block mt-5 md:hidden">
        <button className="px-6 py-3 mt-3 font-semibold text-xl text-white bg-[#050517] rounded-lg hover:bg-blue-900">
          Shop Now <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
      </a>
      </div>
      <CategoriesGrid />
      <InfiniteMovingCards items={items} />
      <ContactUs />
    </div>
  );
};

export default Home;