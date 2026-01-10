import React, { useState } from "react";
import axios from "axios";

const GetMarksByRollNo = () => {
  const [rollNo, setRollNo] = useState("");
  const [marksData, setMarksData] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!rollNo) {
      setType("error");
      setMessage("Please enter a Roll Number");
      setTimeout(() => setMessage(""), 2500);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/marks/roll/${rollNo}`
      );

      setMarksData(res.data);
      setType("success");
      setMessage("Marks Retrieved Successfully");

      setTimeout(() => setMessage(""), 2500);
    } catch (error) {
      setMarksData([]);
      setType("error");

      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to fetch marks");
      }

      setTimeout(() => setMessage(""), 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 p-6">

      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 backdrop-blur-lg">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Get Marks By Roll Number
        </h1>

        {message && (
          <p
            className={`text-center font-semibold mb-4 ${
              type === "success" ? "text-green-600" : "text-red-600"
            } animate-pulse`}
          >
            {message}
          </p>
        )}

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-5">

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Roll Number
            </label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter Roll Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 
                       rounded-lg shadow-md transition-all duration-300 
                       transform hover:-translate-y-1"
          >
            Get Marks
          </button>

        </form>

        {/* Results Table */}
        {marksData.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-700 mb-3">Marks Details</h2>

            <table className="w-full border border-gray-300 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-3 px-4 border">Subject Code</th>
                  <th className="py-3 px-4 border">Marks</th>
                </tr>
              </thead>

              <tbody>
                {marksData.map((item, index) => (
                  <tr
                    key={index}
                    className="text-center border hover:bg-gray-100 transition-all"
                  >
                    <td className="py-2 px-4 border">{item.subjectCode}</td>
                    <td className="py-2 px-4 border">{item.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default GetMarksByRollNo;
