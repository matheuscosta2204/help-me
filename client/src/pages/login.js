// src/pages/login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';

const Login = ({ setIsAuthenticated }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log('REACT_APP_API_URI', process.env.REACT_APP_API_URI)
      // Call the new API endpoint to get the user by email
      const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/users/${formData.email}`);

      // Compare passwords (Note: In real apps, hash the passwords and use bcrypt)
      const storedPassword = response.data.password;

      if (formData.password === storedPassword) {
        // Dispatch the login action with user data
        dispatch(login(response.data));
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/create-user" className="text-blue-500 underline">
              Create User
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
