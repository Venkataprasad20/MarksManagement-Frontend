import React, { useState } from "react";
import axios from "axios";

const AddMarks = () => {
  const [rollNo, setRollNo] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [marks, setMarks] = useState("");

  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success or error

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rollNo || !subjectCode || !marks) {
      setType("error");
      setMessage("Please fill all fields");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/marks/add", {
        rollNo,
        subjectCode,
        marks: Number(marks),
      });

      setType("success");
      setMessage("Marks Added Successfully");

      setRollNo("");
      setSubjectCode("");
      setMarks("");

      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setType("error");
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to Add Marks");
      }
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-green-100 to-blue-200 p-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 
                      transform transition-all duration-500 hover:scale-[1.02]">

        <h1 className="text-3xl font-extrabold text-center text-green-600 mb-6 drop-shadow-lg">
          Add Marks
        </h1>

        {message && (
          <p
            className={`text-center font-medium text-lg mb-4 ${
              type === "success" ? "text-green-600" : "text-red-600"
            } animate-bounce`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Roll No */}
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter Roll Number"
            className="w-full p-3 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-green-400 
                       transition-all duration-300"
          />

          {/* Subject Code */}
          <input
            type="text"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            placeholder="Enter Subject Code"
            className="w-full p-3 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-green-400 
                       transition-all duration-300"
          />

          {/* Marks */}
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="Enter Marks"
            className="w-full p-3 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-green-400 
                       transition-all duration-300"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 
                       text-white font-semibold py-3 rounded-xl 
                       shadow-lg hover:shadow-2xl 
                       transition-all transform hover:-translate-y-1"
          >
            Add Marks
          </button>
        </form>

      </div>
    </div>
  );
};

export default AddMarks;
