// src/components/AdminRegister.jsx
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("User registered successfully!");
      setError('');
      // Optionally, reset the form or redirect
    } catch (err) {
      console.error("Registration error:", err.code, err.message);
      setError("Failed to register user. " + err.message);
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Register User</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {success && <p className="mt-4 text-center text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default AdminRegister;
