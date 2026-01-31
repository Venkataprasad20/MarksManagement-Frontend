import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("details");
  const [darkMode, setDarkMode] = useState(false);


  // REAL DATA STATES
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  // ✅ FIXED: missing state
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(null);

  const rollNo = localStorage.getItem("studentRollNo");

  // Complaints State and Handlers

  const [complaints, setComplaints] = useState([]);
  const [complaintMessage, setComplaintMessage] = useState("");
  const [complaintType, setComplaintType] = useState("MARKS");

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        `https://marksmanagement.onrender.com/api/complaints/student/${rollNo}`
      );
      setComplaints(res.data || []);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  const submitComplaint = async () => {
    if (!complaintMessage.trim()) return alert("Complaint message required");

    try {
      await axios.post("https://marksmanagement.onrender.com/api/complaints", {
        studentRollNo: rollNo,
        complaintType,
        message: complaintMessage
      });

      setComplaintMessage("");
      fetchComplaints();
      alert("Complaint submitted successfully");
    } catch (err) {
      console.error("Error submitting complaint:", err);
    }
  };


  useEffect(() => {
    if (!rollNo) {
      alert("No roll number found. Please login again.");
      window.location.href = "/login";
      return;
    }

    fetchStudent();
    fetchSubjects();
    fetchMarks();
    fetchResult();
  }, [rollNo]);

  const fetchStudent = async () => {
    try {
      const res = await axios.get(
        `https://marksmanagement.onrender.com/api/students/details/${rollNo}`
      );
      setStudent(res.data);
    } catch (err) {
      console.error("Error fetching student:", err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(
        `https://marksmanagement.onrender.com/api/subjects/${rollNo}`
      );

      console.log("SUBJECTS API RESPONSE:", res.data);
      setSubjects(res.data || []);
    } catch (err) {
      console.error(
        "Error fetching subjects:",
        err.response?.data || err.message
      );
    }
  };

  const fetchMarks = async () => {
    try {
      const res = await axios.get(
        `https://marksmanagement.onrender.com/api/marks/roll/${rollNo}`
      );
      setMarks(res.data || []);
    } catch (err) {
      console.error("Error fetching marks:", err.response?.data || err.message);
      setMarks([]); // IMPORTANT
    }
  };


  const fetchResult = async () => {
    try {
      const res = await axios.get(
        `https://marksmanagement.onrender.com/api/marks/summary/${rollNo}`
      );
      const s = res.data;
      setFinalResult({
        totalMarks: s.totalMarks,
        averageMarks: s.averageMarks,
        percentage: s.percentage,
        grade:
          s.percentage >= 90
            ? "A+"
            : s.percentage >= 80
              ? "A"
              : s.percentage >= 70
                ? "B"
                : s.percentage >= 60
                  ? "C"
                  : "D",
      });
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "complaints" && rollNo) {
      fetchComplaints();
    }
  }, [activeTab, rollNo]);


  // ✅ FIXED: missing handler
  const handleSubjectClick = (index) => {
    setActiveSubjectIndex(activeSubjectIndex === index ? null : index);
  };

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading student dashboard...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex transition-all duration-500 ${darkMode
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
        : "bg-gradient-to-br from-green-200 to-white text-gray-900"
        }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-72 p-6 hidden md:flex flex-col shadow-xl transition-all duration-500 ${darkMode ? "bg-gray-800" : "bg-gray-100 border-r border-red-100"
          }`}
      >
        <h2 className="text-3xl font-bold mb-12 text-center tracking-wide text-red-600">
          Student Panel
        </h2>

        <nav className="space-y-4 flex-1">
          {[
            { id: "details", label: "Student Details" },
            { id: "subjects", label: "Subjects & Faculty" },
            { id: "marks", label: "Marks" },
            { id: "result", label: "Final Result" },
            { id: "complaints", label: "Complaints" }
          ].map((item) => (
            <button
              key={item.id}
              className={`block w-full text-left p-3 rounded-lg font-medium transition-all duration-300 ${activeTab === item.id
                ? darkMode
                  ? "bg-blue-600 shadow-lg scale-[1.03]"
                  : "bg-blue-500 text-white shadow-lg scale-[1.03]"
                : darkMode
                  ? "bg-gray-800 hover:bg-gray-700 hover:scale-[1.03]"
                  : "bg-gray-200 hover:bg-gray-300 hover:scale-[1.03]"
                }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => {
            localStorage.removeItem("studentRollNo");
            window.location.href = "/login";
          }}
          className="mt-6 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-white transition-all duration-300 shadow-md"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header
          className={`p-4 flex justify-between items-center shadow-lg transition-all duration-500 ${darkMode
            ? "bg-gradient-to-r from-gray-950 to-gray-800 text-white"
            : "bg-gradient-to-r from-white to-gray-200 text-gray-900"
            }`}
        >
          <h1 className="text-2xl font-bold tracking-wide">
            Marks Management System
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-16 h-8 rounded-full bg-gray-600 hover:bg-gray-500 transition-all"
          >
            <div
              className={`absolute top-1 left-1 h-6 w-6 rounded-full transition-all duration-500 ${darkMode ? "translate-x-8 bg-yellow-400" : "bg-gray-900"
                }`}
            ></div>
          </button>
        </header>

        {/* Body */}
        <main className="flex-1 p-6 animate-fadeIn">
          <div
            className={`rounded-3xl p-10 shadow-2xl transition-all duration-500 ${darkMode
              ? "bg-gray-900 bg-opacity-60 backdrop-blur-xl"
              : "bg-white bg-opacity-90 backdrop-blur-xl"
              }`}
          >
            <h2 className="text-4xl font-semibold mb-2 tracking-wide">
              Welcome, {student.name} 👋
            </h2>

            <div className="mt-4">
              {/* STUDENT DETAILS */}
              {activeTab === "details" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <DetailCard darkMode={darkMode} label="Name" value={student.name} />
                  <DetailCard darkMode={darkMode} label="Roll No" value={student.rollNo} />
                  <DetailCard darkMode={darkMode} label="Branch" value={student.branch} />
                  <DetailCard darkMode={darkMode} label="Section" value={student.section} />
                </div>
              )}

              {/* SUBJECTS */}
              {activeTab === "subjects" && (
                <>
                  {subjects.length === 0 ? (
                    <p className="text-center text-xl padding-10px font-semibold">
                      Student has not enrolled in any subjects.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {subjects.map((sub, i) => (
                        <div
                          key={i}
                          onClick={() => handleSubjectClick(i)}
                          className={`cursor-pointer p-6 rounded-xl shadow hover:shadow-xl hover:scale-[1.02] transition-all ${darkMode ? "bg-gray-800" : "bg-gray-100"
                            }`}
                        >
                          {activeSubjectIndex === i ? (
                            <p className="text-lg font-semibold">
                              <b>Subject Code:</b> {sub.subjectCode}
                            </p>
                          ) : (
                            <p className="text-lg font-semibold">
                              <b>Subject:</b> {sub.subjectName}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}


              {/* MARKS */}
              {activeTab === "marks" && (
                marks.length === 0 ? (
                  <p className="text-center text-xl padding-10px font-semibold">
                    Student has no marks records
                  </p>

                ) : (
                  marks.map((m, i) => (
                    <div
                      key={i}
                      className={`p-6 rounded-xl shadow mb-3 ${darkMode ? "bg-gray-800" : "bg-gray-100"
                        }`}
                    >
                      <b>{m.subjectName}:</b> {m.marks} Marks
                    </div>
                  ))
                )
              )}

              {/* RESULT */}
              {activeTab === "result" && finalResult && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <ResultCard darkMode={darkMode} label="Total Marks" value={finalResult.totalMarks} />
                  <ResultCard
                    darkMode={darkMode}
                    label="Average"
                    value={finalResult.averageMarks.toFixed(2)}
                  />

                  <ResultCard
                    darkMode={darkMode}
                    label="Percentage"
                    value={finalResult.percentage.toFixed(2) + "%"}
                  />

                  <ResultCard darkMode={darkMode} label="Grade" value={finalResult.grade} />
                </div>
              )}


              {/* 🔴 COMPLAINTS TAB */}
              {activeTab === "complaints" && (
                <div className="space-y-6">

                  <h2 className="text-3xl font-bold">Raise Complaint</h2>

                  {/* Complaint Type */}
                  <select
                    value={complaintType}
                    onChange={(e) => setComplaintType(e.target.value)}
                    className={`w-full p-3 rounded-lg font-medium border transition-all
        ${darkMode
                        ? "bg-gray-800 text-white border-gray-600 focus:border-blue-500"
                        : "bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500"
                      }`}
                  >
                    <option value="MARKS">Marks</option>
                    <option value="DETAILS">Details</option>
                    <option value="SUBJECT">Subjects</option>
                  </select>

                  {/* Complaint Message */}
                  <textarea
                    value={complaintMessage}
                    onChange={(e) => setComplaintMessage(e.target.value)}
                    placeholder="Describe your issue clearly..."
                    rows={4}
                    className={`w-full p-4 rounded-xl border resize-none transition-all
        ${darkMode
                        ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500"
                        : "bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-300 focus:border-blue-500"
                      }`}
                  />

                  {/* Submit Button */}
                  <button
                    onClick={submitComplaint}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-semibold shadow-md transition-all"
                  >
                    Submit Complaint
                  </button>

                  <h3 className="text-2xl font-semibold mt-6">Your Complaints</h3>

                  {complaints.length === 0 ? (
                    <p className={`text-center font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"
                      }`}>
                      No complaints raised
                    </p>
                  ) : (
                    complaints.map((c, i) => (
                      <div
                        key={i}
                        className={`p-5 rounded-xl shadow transition-all
            ${darkMode ? "bg-gray-800" : "bg-gray-100"}
          `}
                      >
                        <p className="font-semibold">
                          <b>Type:</b> {c.complaintType}
                        </p>
                        <p className="italic mt-1">{c.message}</p>
                        <p className="mt-2">
                          <b>Status:</b>{" "}
                          <span className={`font-semibold ${c.status === "RESOLVED"
                            ? "text-green-500"
                            : "text-yellow-500"
                            }`}>
                            {c.status}
                          </span>
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}


            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper Components
function DetailCard({ darkMode, label, value }) {
  return (
    <div className={`p-5 rounded-xl shadow ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <b>{label}:</b> {value}
    </div>
  );
}

function ResultCard({ darkMode, label, value }) {
  return (
    <div className={`p-6 rounded-xl shadow text-center ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <p className="text-lg font-semibold">{label}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}
