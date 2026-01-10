import React, { useState } from "react";
import axios from "axios";

const DeleteMarks = () => {
  const [rollNo, setRollNo] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!rollNo || !subjectCode) {
      setType("error");
      setMessage("Please fill all fields");
      setTimeout(() => setMessage(""), 2500);
      return;
    }

    try {
      await axios.delete("https://marksmanagement.onrender.com/api/marks/delete", {
        params: { rollNo, subjectCode },
      });

      setType("success");
      setMessage("Marks Deleted Successfully");

      setRollNo("");
      setSubjectCode("");

      setTimeout(() => setMessage(""), 2500);
    } catch (error) {
      setType("error");

      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to Delete Marks");
      }

      setTimeout(() => setMessage(""), 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 p-6">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 backdrop-blur-lg">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Delete Marks
        </h1>

        {message && (
          <p
            className={`text-center font-semibold mb-4 ${
              type === "success" ? "text-green-600" : "text-red-600"
            } animate-pulse`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleDelete} className="space-y-5">

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Roll Number
            </label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter Roll Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Subject Code
            </label>
            <input
              type="text"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              placeholder="Enter Subject Code"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 
                       text-white py-3 rounded-lg shadow-md 
                       transition-all duration-300 transform hover:-translate-y-1"
          >
            Delete Marks
          </button>

        </form>

      </div>
    </div>
  );
};

export default DeleteMarks;
