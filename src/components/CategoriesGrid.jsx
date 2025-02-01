import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig'; // Firestore connection
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import LazyImage from './LazyImage';

const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For navigation to category-specific pages

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesRef = collection(db, 'categories');
      const categorySnapshot = await getDocs(categoriesRef);
      const categoriesList = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesList);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  // Handle click event on category card
  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/category/${categoryId}`, { state: { categoryName } }); // Pass categoryName to the route
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-4 mx-auto mt-10">
      <h1 className="mb-8 text-3xl font-bold text-center">
      <span className="italic">Explore Our Collection</span>
      </h1>

      <div className="grid grid-cols-1 gap-6 px-5 md:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-[#050517] p-4 rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => handleCategoryClick(category.id, category.name)} // Pass category name on click
          >
            <LazyImage
              src={category.image}
              alt={category.name}
              className="object-cover w-full rounded-lg h-60"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-white">
                {category.name} <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;
