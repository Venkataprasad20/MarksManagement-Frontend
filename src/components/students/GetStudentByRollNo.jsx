import React, { useState } from "react";
import { getStudentByRollNo } from "../../services/studentService";

const GetStudentByRollNo = () => {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await getStudentByRollNo(rollNo);
      console.log("Backend Response:", response);

      if (response.data) {
        setStudent(response.data);   // FIXED HERE
        setMsg("Student Found!");
        setSuccess(true);
      } else {
        setStudent(null);
        setMsg("Student Not Found!");
        setSuccess(false);
      }
    } catch (error) {
      console.log(error);
      setStudent(null);
      setMsg("Student Not Found!");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-200 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-extrabold mb-6 text-center text-teal-600">
          Search Student By Roll No
        </h2>

        <input
          className="w-full p-3 mb-6 border border-gray-300 rounded-xl"
          placeholder="Enter Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl"
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

        {student && (
          <div className="mt-6 p-5 bg-teal-50 rounded-2xl shadow-md border border-teal-200">

            <h3 className="text-xl font-bold text-teal-700 mb-3">
              Student Details
            </h3>

            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Roll No:</strong> {student.rollNo}</p>
            <p><strong>Branch:</strong> {student.branch}</p>
            <p><strong>Section:</strong> {student.section}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetStudentByRollNo;
