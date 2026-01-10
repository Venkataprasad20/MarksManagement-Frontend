import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    branch: "",
    section: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("https://marksmanagement.onrender.com/auth/signup/student", {
        name: formData.name,
        rollNo: formData.rollNo,
        branch: formData.branch,
        section: formData.section,
        password: formData.password,
        confirmPassword: formData.confirmPassword, // IMPORTANT ✔
      });

      alert("Signup Successful!");
      navigate("/login");

    } catch (error) {
      console.error(error);

      if (error.response && error.response.data) {
        alert(error.response.data); // shows backend error message
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Student SignUp
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              placeholder="Enter your Name"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Roll Number</label>
            <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange}
              placeholder="Enter Roll Number"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Branch</label>
            <input type="text" name="branch" value={formData.branch} onChange={handleChange}
              placeholder="Enter Branch"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Section</label>
            <input type="text" name="section" value={formData.section} onChange={handleChange}
              placeholder="Enter Section"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input type="password" name="password" value={formData.password}
              onChange={handleChange} placeholder="Enter Password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Re-type Password</label>
            <input type="password" name="confirmPassword"
              value={formData.confirmPassword} onChange={handleChange}
              placeholder="Re-enter Password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>

          <button type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white">
            Sign Up
          </button>

          <p className="text-center text-sm mt-4 text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-500 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
