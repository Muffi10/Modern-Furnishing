// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AdminLogin from './components/AdminLogin';
import Home from './components/Home'; // Assuming you'll create Home
import AdminRegister from './components/AdminRegister';
import EditIt from './components/EditIt';
import AddProducts from './components/AddProducts';
import CategoryProducts from './components/CategoryProducts';
import DeleteCategoriesAndProducts from './components/DeleteCategoriesAndProducts';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home component */}
          <Route path="/admin" element={<AdminLogin />} /> {/* Admin login page */}
          {/* <Route path="/register" element={<AdminRegister />} /> Registration route */}
          <Route path="/edit" element={<EditIt />} /> 
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/category/:categoryId" element={<CategoryProducts />} />
          <Route path='/delete-products' element={<DeleteCategoriesAndProducts />} />
        </Routes>
        <FloatingWhatsAppButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
