import React, { useState } from "react";
import axios from "axios";

const DeleteStudentByRollNo = () => {
  const [rollNo, setRollNo] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(
  `https://marksmanagement.onrender.com/api/students/roll?rollNo=${rollNo}`
);
      setMsg("Student Deleted Successfully!");
      setSuccess(true);
      setRollNo("");
    } catch (error) {
      setMsg("Failed to Delete Student!");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-orange-200 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-extrabold mb-6 text-center text-red-600">
          Delete Student
        </h2>

        {/* Roll Number Input */}
        <input
          className="w-full p-3 mb-6 border border-gray-300 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-red-400 
                     transition-all duration-300"
          placeholder="Enter Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold 
                     py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all 
                     transform hover:-translate-y-1"
        >
          Delete Student
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
      </div>
    </div>
  );
};

export default DeleteStudentByRollNo;
