import React, { useState } from "react";
import { getStudentByName } from "../../services/studentService";

const GetStudentByName = () => {
  const [name, setName] = useState("");
  const [students, setStudents] = useState([]); // list
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await getStudentByName(name); // already data
      console.log("Backend Response:", response); // debug

      setStudents(response); // IMPORTANT FIX
      setMsg("Student Found!");
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setStudents([]);
      setMsg("Student Not Found!");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
          Search Student By Name
        </h2>

        <input
          className="w-full p-3 mb-6 border border-gray-300 rounded-xl"
          placeholder="Enter Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl"
        >
          Search
        </button>

        {msg && (
          <p
            className={`mt-5 text-center font-medium text-lg ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}

        {/* Render Student List */}
        {students.length > 0 && (
          <div className="mt-6 space-y-4">
            {students.map((student, index) => (
              <div
                key={index}
                className="p-5 bg-indigo-50 rounded-2xl shadow-md border border-indigo-200"
              >
                <h3 className="text-xl font-bold text-indigo-700 mb-3">
                  Student Details
                </h3>

                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Roll No:</strong> {student.rollNo}</p>
                <p><strong>Branch:</strong> {student.branch}</p>
                <p><strong>Section:</strong> {student.section}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetStudentByName;
