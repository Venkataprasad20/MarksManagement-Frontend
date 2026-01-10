import axios from "axios";

const API = "http://localhost:8080/api/subjects";

// ADD SUBJECT
export const addSubject = (subjectName, subjectCode) =>
    axios.post(API, { subjectName, subjectCode });

// DELETE SUBJECT
export const deleteSubject = (subjectCode) =>
    axios.delete(`${API}/delete`, { params: { subjectCode } });

// GET ALL SUBJECTS
export const getAllSubjects = () =>
    axios.get(API);

// GET SUBJECT BY ROLL NO
export const getSubjectsByRollNo = (rollNo) => {
  return axios.get(`${API}/${rollNo}`);
};

// UPDATE SUBJECT NAME
export const updateSubjectName = (subjectCode, newName) =>
  axios.put(`${API}/update/subjectname`, null, {
    params: { subjectCode, subjectName: newName },
  });

// UPDATE SUBJECT CODE
export const updateSubjectCode = (subjectName, newCode) =>
  axios.put(`${API}/update/subjectcode`, null, {
    params: { subjectName, newSubjectCode: newCode },
  });
