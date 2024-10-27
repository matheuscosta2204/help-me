// src/pages/profile.js
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: user.email,
    name: user.name,
    age: user.age,
    companyName: user.companyName,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.put(`${process.env.API_URI}/api/users/${user.id}`, { ...formData, email: user.email, age: parseInt(formData.age, 10)});
      alert("Profile updated successfully!");
      setFormData(response)
      setLoading(false)
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile.");
      setLoading(false)
      setFormData(user)
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="text"
            name="name"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            disabled
          />
        </div>

        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
