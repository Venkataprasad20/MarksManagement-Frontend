import React, { useState } from "react";
import { updateSection } from "../../services/studentService"; // Make sure this service exists

const UpdateSection = () => {
  const [rollNo, setRollNo] = useState("");
  const [section, setSection] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false); // track if update succeeded

  const handleSubmit = async () => {
    try {
      await updateSection(rollNo, section); // backend call
      setMsg("Section is Updated Successfully!");
      setSuccess(true);
    } catch (error) {
      setMsg("Section is not Updated!");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-red-200 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-[1.02]">
        
        <h2 className="text-3xl font-extrabold mb-6 text-center text-red-600 drop-shadow-lg">
          Update Student Section
        </h2>

        {/* Roll Number Input */}
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          placeholder="Enter Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />

        {/* New Section Input */}
        <input
          className="w-full p-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          placeholder="Enter New Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />

        {/* Update Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
        >
          Update Section
        </button>

        {/* Status Message with animation */}
        {msg && (
          <p
            className={`mt-5 text-center font-medium text-lg ${
              success ? "text-green-600" : "text-red-600"
            } transition-opacity duration-500 ease-in-out animate-bounce`}
          >
            {msg}
          </p>
        )}

      </div>
    </div>
  );
};

export default UpdateSection;
