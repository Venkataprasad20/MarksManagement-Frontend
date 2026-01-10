import React, { useState } from "react";
import axios from "axios";

const GetStudentsBySection = () => {
  const [section, setSection] = useState("");
  const [students, setStudents] = useState([]);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://marksmanagement.onrender.com/api/students/section?section=${section}`
      );

      if (response.data.length === 0) {
        setStudents([]);
        setMsg("No Students Found!");
        setSuccess(false);
        return;
      }

      setStudents(response.data);
      setMsg("Students Found Successfully!");
      setSuccess(true);
    } catch (error) {
      setStudents([]);
      setMsg("Failed to Fetch Students!");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-extrabold mb-6 text-center text-green-600">
          Get Students By Section
        </h2>

        {/* Section Input */}
        <input
          className="w-full p-3 mb-6 border border-gray-300 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-green-400 
                     transition-all duration-300"
          placeholder="Enter Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold 
                     py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all transform 
                     hover:-translate-y-1"
        >
          Search
        </button>

        {/* Status Message */}
        {msg && (
          <p
            className={`mt-5 text-center font-medium text-lg ${
              success ? "text-green-600" : "text-red-600"
            } animate-bounce`}
          >
            {msg}
          </p>
        )}

        {/* Display Students */}
        {students.length > 0 && (
          <div className="mt-6 space-y-4">
            {students.map((stu) => (
              <div
                key={stu.id}
                className="p-5 bg-green-50 rounded-2xl shadow-md border border-green-200"
              >
                <h3 className="text-xl font-bold text-green-700 mb-3">
                  Student Details
                </h3>

                <p><strong>ID:</strong> {stu.id}</p>
                <p><strong>Name:</strong> {stu.name}</p>
                <p><strong>Roll No:</strong> {stu.rollNo}</p>
                <p><strong>Branch:</strong> {stu.branch}</p>
                <p><strong>Section:</strong> {stu.section}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetStudentsBySection;
