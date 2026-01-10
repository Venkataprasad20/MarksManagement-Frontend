import React, { useState } from "react";
import axios from "axios";

const UpdateSubjectCode = () => {
  const [subjectName, setSubjectName] = useState("");
  const [newSubjectCode, setNewSubjectCode] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectName || !newSubjectCode) {
      setSuccess(false);
      setMessage("⛔ Please fill all fields");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      await axios.put(
        `https://marksmanagement.onrender.com/api/subjects/update/code`,
        null,
        { params: { subjectName, subjectCode: newSubjectCode } }
      );

      setSuccess(true);
      setMessage("✅ Subject Code Updated Successfully");

      setSubjectName("");
      setNewSubjectCode("");

      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setSuccess(false);

      if (error.response?.data?.message) {
        setMessage("⛔ " + error.response.data.message);
      } else {
        setMessage("⛔ Failed to Update Subject Code");
      }

      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-cyan-100 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
          Update Subject Code
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
              Existing Subject Name
            </label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Enter existing subject name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              New Subject Code
            </label>
            <input
              type="text"
              value={newSubjectCode}
              onChange={(e) => setNewSubjectCode(e.target.value)}
              placeholder="Enter new subject code"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl 
                       shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            Update Code
          </button>

        </form>
      </div>
    </div>
  );
};

export default UpdateSubjectCode;
