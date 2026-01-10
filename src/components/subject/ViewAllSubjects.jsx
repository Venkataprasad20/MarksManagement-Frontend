import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success / error

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("https://marksmanagement.onrender.com/api/subjects");
      setSubjects(response.data);
      setType("success");
      setMessage("✅ Subjects loaded successfully.");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setSubjects([]);
      setType("error");
      setMessage("⛔ Failed to fetch subjects.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-600">
          All Subjects
        </h2>

        {message && (
          <p
            className={`text-center font-medium text-lg mb-4 ${
              type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-xl">
            <thead>
              <tr className="bg-gray-200 rounded-xl">
                <th className="border border-gray-300 px-4 py-2 text-left">Subject Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Subject Code</th>
              </tr>
            </thead>

            <tbody>
              {subjects.length > 0 ? (
                subjects.map((sub, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{sub.subjectName}</td>
                    <td className="border border-gray-300 px-4 py-2">{sub.subjectCode}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center p-4 text-gray-600 border border-gray-300">
                    No subjects found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={fetchSubjects}
          className="w-full mt-5 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl 
                     shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 font-semibold"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ViewSubjects;
