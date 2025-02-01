import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, getDocs, addDoc } from "firebase/firestore"; 
import { db } from '../firebase/firebaseConfig';

const storage = getStorage(); // Initialize Firebase Storage

const AddProducts = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Fetch categories from Firestore
    const fetchCategories = async () => {
      const categoriesCollection = collection(db, 'categories');
      const categorySnapshot = await getDocs(categoriesCollection);
      const categoriesList = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesList);
    };

    fetchCategories();
  }, []);

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory || !productTitle || !productImage) {
      setMessage('All fields are required.');
      return;
    }

    setUploading(true);

    try {
      // Upload product image to Firebase Storage
      const storageRef = ref(storage, `products/${productImage.name}`);
      await uploadBytes(storageRef, productImage);
      const imageUrl = await getDownloadURL(storageRef);

      // Add product to Firestore 'products' collection
      await addDoc(collection(db, 'products'), {
        title: productTitle,
        image: imageUrl,
        categoryId: selectedCategory, // Reference to selected category
      });

      setMessage('Product added successfully!');
      setProductTitle('');
      setProductImage(null);
      setSelectedCategory('');
    } catch (error) {
      console.error("Error adding product: ", error);
      setMessage('Error adding product.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Add New Product</h2>

        <form onSubmit={handleProductSubmit} className="space-y-4">
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder="Product Title"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <input
              type="file"
              onChange={(e) => setProductImage(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Add Product'}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default AddProducts;
