import React, { useState } from "react";
import { updateBranch } from "../../services/studentService"; // Make sure you have this service

const UpdateBranch = () => {
  const [rollNo, setRollNo] = useState("");
  const [branch, setBranch] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false); // track if update succeeded

  const handleSubmit = async () => {
    try {
      await updateBranch(rollNo, branch); // call your backend service
      setMsg("Branch is Updated Successfully!");
      setSuccess(true);
    } catch (error) {
      setMsg("Branch is not Updated!");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-green-600 drop-shadow-lg">
          Update Student Branch
        </h2>

        {/* Roll Number Input */}
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          placeholder="Enter Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />

        {/* New Branch Input */}
        <input
          className="w-full p-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          placeholder="Enter New Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />

        {/* Update Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
        >
          Update Branch
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

export default UpdateBranch;
