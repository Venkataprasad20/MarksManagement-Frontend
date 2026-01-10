import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/students");

      if (response.data.length === 0) {
        setStudents([]);
        setMsg("No Students Available!");
        setSuccess(false);
        return;
      }

      setStudents(response.data);
      setMsg("All Students Loaded Successfully!");
      setSuccess(true);
    } catch (error) {
      setMsg("Failed to Load Students!");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-200 p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-extrabold mb-6 text-center text-yellow-600">
          View All Students
        </h2>

        {/* Status Message */}
        {msg && (
          <p
            className={`mt-2 text-center font-medium text-lg ${
              success ? "text-green-600" : "text-red-600"
            } animate-bounce`}
          >
            {msg}
          </p>
        )}

        {/* Students List */}
        {students.length > 0 && (
          <div className="mt-6 space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="p-5 bg-yellow-50 rounded-2xl shadow-md border border-yellow-300"
              >
                <h3 className="text-xl font-bold text-yellow-700 mb-3">
                  Student Details
                </h3>

                <p><strong>ID:</strong> {student.id}</p>
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

export default ViewAllStudents;
