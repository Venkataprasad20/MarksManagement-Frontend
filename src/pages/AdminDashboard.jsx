import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import {
  getPendingComplaints,
  getAllComplaints,
  resolveComplaint
} from "../services/complaintService";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read active tab from URL
  const params = new URLSearchParams(location.search);
  const defaultTab = params.get("tab") || "students";

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [darkMode, setDarkMode] = useState(false);

  // Change active tab & update URL
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/admin/dashboard?tab=${tab}`);
  };

  const [complaints, setComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [showAllResolved, setShowAllResolved] = useState(false);

  useEffect(() => {
    if (activeTab === "complaints") {
      loadComplaints();
    }
  }, [activeTab]);

  const loadComplaints = async () => {
    try {
      const pendingRes = await getPendingComplaints();
      const allRes = await getAllComplaints();

      setComplaints(pendingRes.data || []);

      // filter resolved complaints
      const resolved = (allRes.data || []).filter(
        (c) => c.status === "RESOLVED"
      );
      setResolvedComplaints(resolved);

    } catch (err) {
      console.error("Error loading complaints", err);
    }
  };


  const handleResolve = async (id) => {
    try {
      await resolveComplaint(id, "Resolved by admin");
      loadComplaints(); // refresh list
    } catch (err) {
      console.error("Error resolving complaint", err);
    }
  };

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
          Admin Panel
        </h2>

        <nav className="space-y-4 flex-1">
          {[
            { id: "students", label: "Manage Students" },
            { id: "subjects", label: "Manage Subjects" },
            { id: "marks", label: "Manage Marks" },
            { id: "complaints", label: "Complaints" },
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
              onClick={() => handleTabChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div
          className={`text-center text-sm mt-auto pt-6 ${darkMode ? "text-gray-300" : "text-gray-700"
            }`}
        >
          © 2025 Admin Dashboard
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header
          className={`p-4 flex justify-between items-center shadow-lg transition-all duration-500 ${darkMode
            ? "bg-gradient-to-r from-gray-950 to-gray-800 text-white"
            : "bg-gradient-to-r from-white to-gray-200 text-gray-900"
            }`}
        >
          <h1 className="text-2xl font-bold tracking-wide">
            Marks Management Admin Panel
          </h1>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-16 h-8 rounded-full bg-gray-600 hover:bg-gray-500 transition-all"
          >
            <div
              className={`absolute top-1 left-1 h-6 w-6 rounded-full transition-all duration-500 ${darkMode ? "translate-x-8 bg-yellow-400" : "bg-gray-900"
                }`}
            ></div>
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("adminToken"); // or whatever you store
              window.location.href = "/login";       // redirect to existing login page
            }}
            className="px-5 py-2 rounded-xl bg-red-500 text-white"
          >
            Logout
          </button>
        </header>

        {/* Body */}
        <main className="flex-1 p-6">
          <div
            className={`rounded-3xl p-10 shadow-2xl transition-all duration-500 ${darkMode
              ? "bg-gray-900 bg-opacity-60 backdrop-blur-xl"
              : "bg-white bg-opacity-90 backdrop-blur-xl"
              }`}
          >

            {/* STUDENT MANAGEMENT */}
            {activeTab === "students" && (
              <div className="flex flex-col items-center gap-8">
                <h2 className="text-3xl font-extrabold tracking-wide text-blue-600 drop-shadow-md">
                  Manage Students
                </h2>

                <div className="w-full max-w-md flex flex-col gap-4">

                  <button
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/students/update/name?tab=students")}
                  >
                    ✏️ Update Name (By Roll No)
                  </button>

                  <button
                    className="w-full bg-yellow-700 hover:bg-yellow-800 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/students/update/branch?tab=students")}
                  >
                    ✏️ Update Branch (By Roll No)
                  </button>

                  <button
                    className="w-full bg-yellow-800 hover:bg-yellow-900 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/students/update/section?tab=students")}
                  >
                    ✏️ Update Section (By Roll No)
                  </button>

                  <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/students/roll?tab=students")}
                  >
                    🔍 Get Student by Roll No
                  </button>

                  <button
                    className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/students/search?tab=students")}
                  >
                    🔍 Search Students (By Name)
                  </button>

                  <button
                    className="w-full bg-purple-300 hover:bg-purple-500 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/students/section?tab=students")}
                  >
                    🔍 Get Students (By Section)
                  </button>

                  <button
                    className="w-full bg-purple-500 hover:bg-purple-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/students/branch?tab=students")}
                  >
                    🔍 Get Students (By Branch)
                  </button>

                  <button
                    className="w-full bg-purple-700 hover:bg-purple-900 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/students?tab=students")}
                  >
                    📋 View All Students
                  </button>

                  <button
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/students/delete?tab=students")}
                  >
                    🗑️ Delete Student (By Roll No)
                  </button>

                </div>
              </div>
            )}

            {/* SUBJECT MANAGEMENT */}
            {activeTab === "subjects" && (
              <div className="flex flex-col items-center gap-6">
                <h2 className="text-3xl font-bold text-blue-600 tracking-wide">
                  Manage Subjects
                </h2>

                <div className="w-full max-w-md flex flex-col gap-4">

                  <button
                    onClick={() => navigate("/admin/subjects/add?tab=subjects")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Add Subject
                  </button>

                  <button
                    onClick={() => navigate("/admin/subjects/update/name?tab=subjects")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Update Subject Name
                  </button>

                  <button
                    onClick={() => navigate("/admin/subjects/update/code?tab=subjects")}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Update Subject Code
                  </button>

                  <button
                    onClick={() => navigate("/admin/subjects/delete?tab=subjects")}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Delete Subject
                  </button>

                  <button
                    onClick={() => navigate("/admin/subjects?tab=subjects")}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    View All Subjects
                  </button>

                </div>
              </div>
            )}

            {/* MARKS MANAGEMENT */}
            {activeTab === "marks" && (
              <div className="flex flex-col items-center gap-8">
                <h2 className="text-3xl font-extrabold tracking-wide text-orange-600 drop-shadow-md">
                  Manage Marks
                </h2>

                <div className="w-full max-w-md flex flex-col gap-4">

                  <button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/marks/add?tab=marks")}
                  >
                    ➕ Add Marks
                  </button>

                  <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/marks/update?tab=marks")}
                  >
                    ✏️ Update Marks
                  </button>

                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/marks/roll?tab=marks")}
                  >
                    🎓 Get Marks (By Roll No)
                  </button>

                  <button
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/marks/summary?tab=marks")}
                  >
                    📊 Student Marks Summary
                  </button>

                  <button
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate("/admin/marks/delete?tab=marks")}
                  >
                    🗑️ Delete Marks (By ID)
                  </button>

                </div>
              </div>
            )}

            {/* COMPLAINTS */}
            {activeTab === "complaints" && (
              <div className="flex flex-col items-center gap-6">
                <h2 className="text-3xl font-bold text-blue-600 tracking-wide">
                  Student Complaints
                </h2>

                <div className="w-full max-w-2xl space-y-6">
                  {complaints.length === 0 ? (
                    <p className="text-lg font-semibold text-center">
                      No pending complaints 🎉
                    </p>
                  ) : (
                    complaints.map((c) => (
                      <div
                        key={c.id}
                        className={`p-6 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-2xl ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                      >
                        <p className="text-lg mb-1">
                          <b>Roll No:</b> {c.studentRollNo}
                        </p>

                        <p className="text-sm mb-2">
                          <b>Type:</b> {c.complaintType}
                        </p>

                        <p className="mb-4 italic">"{c.message}"</p>

                        <button
                          onClick={() => handleResolve(c.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                        >
                          Mark Resolved
                        </button>
                      </div>
                    ))
                  )}

                  {/* PREVIOUSLY RESOLVED COMPLAINTS */}
                  {resolvedComplaints.length > 0 && (
                    <>
                      <h3 className="text-2xl font-bold text-green-500 tracking-wide mt-10">
                        Resolved Complaints
                      </h3>

                      <div className="w-full max-w-2xl space-y-6">
                        {(showAllResolved ? resolvedComplaints : resolvedComplaints.slice(0, 5)).map((c) => (
                          <div
                            key={c.id}
                            className={`p-6 rounded-2xl shadow-lg ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800"
                              }`}
                          >
                            <p className="text-lg mb-1">
                              <b>Roll No:</b> {c.studentRollNo}
                            </p>

                            <p className="text-sm mb-2">
                              <b>Type:</b> {c.complaintType}
                            </p>

                            <p className="mb-2 italic">"{c.message}"</p>

                            <p className="text-sm text-green-500 font-semibold">✔ Resolved</p>
                          </div>
                        ))}
                      </div>

                      {resolvedComplaints.length > 5 && (
                        <button
                          onClick={() => setShowAllResolved(!showAllResolved)}
                          className="mt-4 text-blue-500 hover:text-blue-700 font-semibold"
                        >
                          {showAllResolved ? "Show Less" : "See More"}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}



          </div>
        </main>
      </div>
    </div>
  );
}
