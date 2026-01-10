import React, { useState } from "react";
import axios from "axios";

const UpdateSubjectName = () => {
  const [subjectCode, setSubjectCode] = useState("");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectCode || !newSubjectName) {
      setSuccess(false);
      setMessage("⛔ Please fill all fields");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/subjects/update/name`,
        null,
        { params: { subjectCode, subjectName: newSubjectName } }
      );

      setSuccess(true);
      setMessage("✅ Subject Name Updated Successfully");

      setSubjectCode("");
      setNewSubjectName("");

      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setSuccess(false);

      if (error.response?.data?.message) {
        setMessage("⛔ " + error.response.data.message);
      } else {
        setMessage("⛔ Failed to Update Subject Name");
      }

      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-600">
          Update Subject Name
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
              Existing Subject Code
            </label>
            <input
              type="text"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              placeholder="Enter subject code"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              New Subject Name
            </label>
            <input
              type="text"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              placeholder="Enter new subject name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl 
                       shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            Update Name
          </button>

        </form>
      </div>
    </div>
  );
};

export default UpdateSubjectName;
