import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig'; // Firestore connection
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore methods
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import LazyImage from './LazyImage';

const CategoryProducts = () => {
  const { categoryId } = useParams(); // Get category ID from URL
  const location = useLocation(); // Access the state passed from CategoriesGrid
  const { categoryName } = location.state || {}; // Get category name from location state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('categoryId', '==', categoryId));
      const productSnapshot = await getDocs(q);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setLoading(false);
    };

    fetchProducts();
  }, [categoryId]);

  const handleWhatsAppClick = (productTitle) => {
    const phoneNumber = '+919880151008'; // Replace with the desired phone number
    const message = `Hello, I would like to inquire about the availability of "${productTitle}".`; // Predefined message
    const encodedMessage = encodeURIComponent(message); // Encode the message
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank'); // Open WhatsApp in a new tab
  };

  const handleViewMoreClick = (productName) => {
    const phoneNumber = '+919880151008'; // Replace with the desired phone number
    const message = `Hello, I would like to view more of "${productName}".`; // Predefined message for view more
    const encodedMessage = encodeURIComponent(message); // Encode the message
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappURL, '_blank'); // Open WhatsApp in a new tab
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto mb-10">
      <h1 className="mb-8 text-3xl font-bold text-center"> <span className="italic">{categoryName} Collection </span></h1> {/* Display category name */}

      <div className="grid grid-cols-1 gap-6 px-5 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#050517] p-4 rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => handleWhatsAppClick(product.title)} // Add click event handler
          >
            <LazyImage
              src={product.image}
              alt={product.title}
              className="object-cover w-full rounded-lg h-60"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white">
                {product.title} <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* View More Link */}
      <div className="mt-8 text-center">
      <a href="https://www.google.com/maps/dir//157,+69,+Nagawara+Main+Rd,+near+Golden+Function+Hall,+Kamraj+Nagar,+Nagavara,+Bengaluru,+Karnataka+560045/@13.027348,77.5380882,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3bae1710368dd589:0xa27d6aab931d9d08!2m2!1d77.6205169!2d13.0273619?entry=ttu&g_ep=EgoyMDI1MDEyNi4wIKXMDSoASAFQAw%3D%3D" className="hidden md:block">
        <button className="px-6 py-3 mt-5 font-semibold text-xl text-white bg-[#050517] rounded-lg hover:bg-blue-900">
          View More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
        </a>
      </div>
    </div>
  );
};

export default CategoryProducts;
