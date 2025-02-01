import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig'; // Firestore connection
import { getStorage, ref, deleteObject } from 'firebase/storage'; // Firebase Storage methods
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Firestore methods
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTrash } from '@fortawesome/free-solid-svg-icons';

const storage = getStorage(); // Initialize Firebase Storage

const DeleteCategoriesAndProducts = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null); // To toggle product dropdowns

  // Fetch all categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesRef = collection(db, 'categories');
      const categorySnapshot = await getDocs(categoriesRef);
      const categoriesList = categorySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesList);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  // Function to delete a category and its associated products
  const deleteCategory = async (categoryId, categoryImageUrl) => {
    if (!window.confirm("Are you sure you want to delete this category and its products?")) return;

    try {
      // Delete all products under the category
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('categoryId', '==', categoryId));
      const productSnapshot = await getDocs(q);

      const batchDeletes = productSnapshot.docs.map(async (productDoc) => {
        const productData = productDoc.data();
        const productImageRef = ref(storage, productData.image);
        await deleteObject(productImageRef);
        await deleteDoc(doc(db, 'products', productDoc.id));
      });

      await Promise.all(batchDeletes);
      const categoryImageRef = ref(storage, categoryImageUrl);
      await deleteObject(categoryImageRef);
      await deleteDoc(doc(db, 'categories', categoryId));

      setCategories(categories.filter(category => category.id !== categoryId));
      alert("Category and its products deleted successfully.");
    } catch (error) {
      console.error("Error deleting category: ", error);
      alert("Error deleting category.");
    }
  };

  // Function to delete a single product
  const deleteProduct = async (productId, productImageUrl) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const productImageRef = ref(storage, productImageUrl);
      await deleteObject(productImageRef);
      await deleteDoc(doc(db, 'products', productId));
      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product: ", error);
      alert("Error deleting product.");
    }
  };

  // Toggle to show/hide products under a category
  const toggleProducts = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Delete Categories and Products</h1>
      {categories.length > 0 ? (
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <div>
                  <button
                    className="mr-4 text-blue-500"
                    onClick={() => toggleProducts(category.id)}
                  >
                    <FontAwesomeIcon icon={faList} className="mr-1" />
                    {expandedCategory === category.id ? "Hide" : "Show"}
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                    onClick={() => deleteCategory(category.id, category.image)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-1" />
                    Delete Category
                  </button>
                </div>
              </div>

              {/* Products Dropdown */}
              {expandedCategory === category.id && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold">Products under {category.name}</h3>
                  <ProductList categoryId={category.id} deleteProduct={deleteProduct} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

// Component to list products under a specific category
const ProductList = ({ categoryId, deleteProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('categoryId', '==', categoryId));
      const productSnapshot = await getDocs(q);
      const productsList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
      setLoading(false);
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="space-y-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="flex justify-between items-center bg-white p-2 rounded-md">
            <p className="text-lg">{product.title}</p>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition"
              onClick={() => deleteProduct(product.id, product.image)}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-1" />
              Delete Product
            </button>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default DeleteCategoriesAndProducts;
