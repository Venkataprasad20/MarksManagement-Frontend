import React, { useState } from "react";
import axios from "axios";

const AddSubject = () => {
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectCode || !subjectName) {
      setSuccess(false);
      setMessage("⛔ Please fill all fields");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      await axios.post("https://marksmanagement.onrender.com/api/subjects", {
        subjectCode,
        subjectName,
      });

      setSuccess(true);
      setMessage("✅ Subject Added Successfully");

      setSubjectCode("");
      setSubjectName("");

      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setSuccess(false);

      if (error.response?.status === 409) {
        setMessage("⛔ Subject already exists");
      } else if (error.response?.data?.message) {
        setMessage("⛔ " + error.response.data.message);
      } else {
        setMessage("⛔ Failed to Add Subject");
      }

      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-200 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-extrabold mb-6 text-center text-teal-600">
          Add New Subject
        </h2>

        {message && (
          <p
            className={`text-center font-medium text-lg mb-4 ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Subject Code
            </label>
            <input
              type="text"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              placeholder="Enter Subject Code (Ex: OS, CN)"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Subject Name
            </label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Enter Subject Name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl 
                       shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            Add Subject
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddSubject;
