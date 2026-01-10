import React, { useState } from "react";
import axios from "axios";

const MarksSummary = () => {
  const [rollNo, setRollNo] = useState("");
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const handleFetchSummary = async () => {
    if (!rollNo.trim()) {
      setError("Roll Number is required");
      setSummary(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://marksmanagement.onrender.com/api/marks/summary/${rollNo}`
      );

      setSummary(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Student marks summary not found.");
      setSummary(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200 p-6">
      <div className="w-full max-w-xl">
        <div className="bg-white/70 backdrop-blur-md border border-white/40
                        rounded-3xl p-8 shadow-2xl transition-shadow duration-300
                        hover:shadow-[0_20px_60px_rgba(20,20,60,0.18)]">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center
                         bg-clip-text text-transparent bg-gradient-to-r
                         from-indigo-600 to-purple-600 mb-6">
            Student Marks Summary
          </h1>

          {/* Input row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter Roll Number (e.g. 22102A040701)"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300
                         shadow-sm bg-white/90 focus:outline-none focus:ring-2
                         focus:ring-indigo-500 transition"
            />

            <button
              onClick={handleFetchSummary}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r
                         from-indigo-600 to-purple-600 text-white font-semibold
                         shadow-lg hover:from-indigo-700 hover:to-purple-700
                         transform hover:-translate-y-1 transition"
            >
              Get Summary
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-red-600 font-medium mb-4 animate-pulse">
              {error}
            </p>
          )}

          {/* Summary Display */}
          {summary && (
            <div className="mt-4 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100
                              shadow-inner transition transform hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-indigo-700 mb-3 text-center">
                  Summary Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-800">
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <div className="text-sm text-gray-500">Roll No</div>
                    <div className="font-semibold">{summary.rollNo}</div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <div className="text-sm text-gray-500">Total Marks</div>
                    <div className="font-semibold">{summary.totalMarks}</div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <div className="text-sm text-gray-500">Subjects Count</div>
                    <div className="font-semibold">{summary.subjectsCount}</div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <div className="text-sm text-gray-500">Average Marks</div>
                    <div className="font-semibold">{summary.averageMarks}</div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border col-span-1 sm:col-span-2">
                    <div className="text-sm text-gray-500">Percentage</div>
                    <div className="font-semibold">{summary.percentage.toFixed(2)}%</div>
                  </div>
                </div>
              </div>

              {/* optional: subject-wise details if present (keeps your logic unchanged) */}
              {summary.subjectMarks && summary.subjectMarks.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-inner">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Subject-wise Marks</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-indigo-600 text-white">
                          <th className="py-2 px-3">Subject Code</th>
                          <th className="py-2 px-3">Subject Name</th>
                          <th className="py-2 px-3">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {summary.subjectMarks.map((s, idx) => (
                          <tr key={idx} className="odd:bg-gray-50">
                            <td className="py-2 px-3 border">{s.subjectCode}</td>
                            <td className="py-2 px-3 border">{s.subjectName}</td>
                            <td className="py-2 px-3 border">{s.marks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarksSummary;
