import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/productsSlice';
import { auth } from '../firebase/firebaseConfig'; // Importing the initialized auth
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set the logged-in user in Redux state
      dispatch(setUser({ email: user.email }));
      setError('');
      setSuccess('Login successful!');
      navigate('/edit'); // Set success message
      // Redirect or any other actions after successful login

    } catch (err) {
      setError("Invalid email or password");
      setSuccess(''); // Clear success message on error
    }
    setEmail('')
    setPassword('')
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Admin Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
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
            Login
          </button>
        </form>

        {success && <p className="mt-4 text-center text-green-500">{success}</p>} {/* Success message */}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>} {/* Error message */}
      </div>
    </div>
  );
};

export default AdminLogin;
