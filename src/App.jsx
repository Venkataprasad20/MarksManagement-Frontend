import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AdminSignUp from "./pages/AdmiSignUp";
import AdminDashboard from "./pages/AdminDashboard";
import UpdateStudentName from "./components/students/UpdateStudentName";
import UpdateBranch from "./components/students/UpdateBranch";
import UpdateSection from "./components/students/UpdateSection";
import GetStudentByName from "./components/students/GetStudentByName";
import GetStudentByRollNo from "./components/students/GetStudentByRollNo";
import GetStudentsBySection from "./components/students/GetStudentsBySection";
import ViewAllStudents from "./components/students/ViewAllStudents";
import GetStudentsByBranch from "./components/students/GetStudentsByBranch";
import DeleteStudentByRollNo from "./components/students/DeleteStudentByRollNo";
import AddSubject from "./components/subject/AddSubject";
import DeleteSubject from "./components/subject/DeleteSubject";
import UpdateSubjectName from "./components/subject/UpdateSubjectName";
import UpdateSubjectCode from "./components/subject/UpdateSubjectCode";
import ViewAllSubjects from "./components/subject/ViewAllSubjects";
import AddMarks from "./components/marks/AddMarks";
import UpdateMarks from "./components/marks/UpdateMarks";
// Correct:
import GetMarksByRollNo from "./components/marks/GetMarksByRollNo";

import DeleteMarks from "./components/marks/DeleteMarks";
import MarksSummary from "./components/marks/MarksSummary";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/admin" element={<AdminSignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/students/update/name" element={<UpdateStudentName />} />
      <Route path="/admin/students/update/branch" element={<UpdateBranch />} />
      <Route path="/admin/students/update/section" element={<UpdateSection />} />
      <Route path="/admin/students/search" element={<GetStudentByName/>} />
      <Route path="/admin/students/roll" element={<GetStudentByRollNo />} />
      <Route path="/admin/students/section" element={<GetStudentsBySection />} />
      <Route path="/admin/students" element={<ViewAllStudents />} />
      <Route path="/admin/students/branch" element={<GetStudentsByBranch />} />
      <Route path="/admin/students/delete" element={<DeleteStudentByRollNo/>} /> 
      <Route path="/admin/subjects/add" element={<AddSubject />} />
      <Route path="/admin/subjects/delete" element={<DeleteSubject />} />
      <Route path="/admin/subjects/update/name" element={<UpdateSubjectName />} />
      <Route path="/admin/subjects" element={<ViewAllSubjects />} />
      <Route path="/admin/subjects/update/code" element={<UpdateSubjectCode />} />
      <Route path="/admin/marks/add" element={<AddMarks />} />
      <Route path="/admin/marks/update" element={<UpdateMarks />} />
      <Route path="/admin/marks/roll" element={<GetMarksByRollNo />} />
      <Route path="/admin/marks/delete" element={<DeleteMarks />} />
      <Route path="/admin/marks/summary" element={<MarksSummary />} />
    </Routes>
  );
}
