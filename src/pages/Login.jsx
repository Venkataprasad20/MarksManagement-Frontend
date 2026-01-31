import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rollNo || !password) {
      alert("Please enter both Roll Number and Password");
      return;
    }

    try {
      const res = await axios.post("https://marksmanagement.onrender.com/auth/login", {
        rollNo,
        password,
      });

      // Save rollNo in localStorage for dashboard
      localStorage.setItem("studentRollNo", rollNo);

      // Navigate based on user type
      if (res.data.type === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid Login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-200">

      {/* Deployment Note */}
      <div className="mb-8 max-w-md bg-yellow-100 border border-yellow-300 text-yellow-900 text-sm p-3 rounded-lg">
        <span className="font-semibold">ℹ️ Note:</span>{" "}
        This project uses free-tier cloud services. When the backend is inactive,
        the first request may take <strong>1–2 minutes</strong> due to cold starts.
        Subsequent requests will be faster.
      </div>

      {/* Heading above the form */}
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Student Marks Management
      </h1>

      <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm">Roll Number</label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter Roll Number"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-medium transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-300">
          If you have no account,
        </p>

        <div className="flex justify-center gap-4 mt-2 text-sm">
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-500 underline"
          >
            Student SignUp
          </Link>
          <Link
            to="/signup/admin"
            className="text-blue-400 hover:text-blue-500 underline"
          >
            Admin SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}
