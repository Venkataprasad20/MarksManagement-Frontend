import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AdminSignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rollNo: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://marksmanagement.onrender.com/auth/signup/admin",
        {
          rollNo: formData.rollNo,
          password: formData.password,
        }
      );

      alert("Admin Signup Successful!");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Admin Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Admin SignUp
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Roll Number */}
          <div>
            <label className="block mb-1 text-sm">Admin Roll Number</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="Enter Admin Roll Number"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-medium transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-300">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-500 underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
