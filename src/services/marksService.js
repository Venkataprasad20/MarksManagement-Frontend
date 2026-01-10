import axios from "axios";

const API = "https://marksmanagement.onrender.com/api/marks";

// ADD MARKS
export const addMarks = (rollNo, subjectCode, marks) =>
    axios.post(`${API}/add`,{ rollNo, subjectCode, marks });

//Upate Marks
export const updateMarks = (rollNo, subjectCode, marks) =>
    axios.put(`${API}/update`, { rollNo, subjectCode, marks });

// GET MARKS BY ROLL NO
export const getMarksByRollNo = (rollNo) =>
    axios.get(`${API}/roll/${rollNo}`);

// DELETE MARKS
export const deleteMarks = (rollNo, subjectCode) =>
    axios.delete(`${API}/delete`, { params: { rollNo, subjectCode } });

// GET ALL MARKS SUMMARY
export const getMarksSummary = (rollNo) =>
    axios.get(`${API}/summary`, { params: { rollNo } });