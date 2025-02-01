import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory } from '../store/productsSlice';
import { auth, db } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { logoutUser } from '../store/productsSlice';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, query, where, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const storage = getStorage(); // Initialize Firebase Storage

const EditIt = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.products.user);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [brandImage, setBrandImage] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Handle sign-out
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logoutUser());
      })
      .catch((error) => console.error("Error logging out: ", error));
  };

  // Check if category exists
  const checkCategoryExists = async (categoryName) => {
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, where('name', '==', categoryName));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length > 0 ? querySnapshot.docs[0] : null;
  };

  // Handle category submission
  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      setMessage("Both category name and image are required.");
      return;
    }

    setUploading(true);

    try {
      const existingCategory = await checkCategoryExists(categoryName);

      if (existingCategory) {
        const updateConfirmed = window.confirm("Category name already exists. Do you want to update the image?");
        if (!updateConfirmed) {
          setMessage("Category not updated.");
          setUploading(false);
          return;
        }

        const existingImageUrl = existingCategory.data().image;
        const oldImageRef = ref(storage, existingImageUrl);
        await deleteObject(oldImageRef);

        const storageRef = ref(storage, `categories/${categoryImage.name}`);
        await uploadBytes(storageRef, categoryImage);
        const imageUrl = await getDownloadURL(storageRef);

        const categoryDocRef = doc(db, 'categories', existingCategory.id);
        await updateDoc(categoryDocRef, { image: imageUrl });

        setMessage("Category image updated successfully!");
      } else {
        const storageRef = ref(storage, `categories/${categoryImage.name}`);
        await uploadBytes(storageRef, categoryImage);
        const imageUrl = await getDownloadURL(storageRef);

        await addDoc(collection(db, 'categories'), {
          name: categoryName,
          image: imageUrl,
        });

        dispatch(addCategory({ name: categoryName, image: imageUrl }));
        setMessage("Category added successfully!");
      }

      setCategoryName('');
      setCategoryImage(null);
    } catch (error) {
      console.error("Error uploading category image: ", error);
      setMessage("Error uploading category image.");
    } finally {
      setUploading(false);
    }
  };

  // Handle brand submission
  const handleBrandSubmit = async (e) => {
    e.preventDefault();

    if (!brandName || !brandImage) {
      setMessage("Both brand name and image are required.");
      return;
    }

    setUploading(true);

    try {
      const storageRef = ref(storage, `brands/${brandImage.name}`);
      await uploadBytes(storageRef, brandImage);
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'brands'), {
        name: brandName,
        logo: imageUrl,
      });

      setMessage("Brand added successfully!");
      setBrandName('');
      setBrandImage(null);
    } catch (error) {
      console.error("Error uploading brand logo: ", error);
      setMessage("Error uploading brand logo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Admin Panel</h2>
        <h3 className="mb-2 text-lg font-semibold">Logged in as: {user.email}</h3>

        {/* Category Form */}
        <form onSubmit={handleCategorySubmit} className="space-y-4">
          <h3 className="text-xl font-bold">Add Category</h3>
          <div>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => setCategoryImage(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Category"}
          </button>
        </form>

        {/* Brand Form */}
        <form onSubmit={handleBrandSubmit} className="mt-8 space-y-4">
          <h3 className="text-xl font-bold">Add Brand</h3>
          <div>
            <input
              type="text"
              placeholder="Brand Name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => setBrandImage(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Brand"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-green-500">{message}</p>}

        <button
          onClick={() => navigate('/add-products')}
          className="w-full py-2 mt-6 text-white transition duration-300 bg-green-500 rounded hover:bg-green-600"
        >
          Go to Add Products
        </button>

        <button
          onClick={() => navigate('/delete-products')}
          className="w-full py-2 mt-6 text-white transition duration-300 bg-red-700 rounded hover:bg-red-400"
        >
          Go to Delete Products and Category
        </button>

        <button
          onClick={handleLogout}
          className="w-full py-2 mt-6 text-white transition duration-300 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default EditIt;
