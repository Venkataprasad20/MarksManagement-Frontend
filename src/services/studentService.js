import axios from "axios";

const API = "https://marksmanagement.onrender.com/api/students";

// UPDATE NAME BY ROLL NO
export const updateName = (rollNo, name) =>
  axios.put(`${API}/update/name`, null, {
    params: { rollNo, name }
  });

// UPDATE BRANCH
export const updateBranch = (rollNo, branch) =>
  axios.put(`${API}/update/branch`, null, {
    params: { rollNo, branch }
  });

// UPDATE SECTION
export const updateSection = (rollNo, section) =>
  axios.put(`${API}/update/section`, null, {
    params: { rollNo, section }
  });


// GET BY ROLL NO
export const getStudentByRollNo = (rollNo) =>
  axios.get(`${API}/roll`, { params: { rollNo } });

// SEARCH BY NAME
export const getStudentByName = async (name) => {
  const response = await axios.get(`${API}/search`, {
    params: { name }
  });
  return response.data;
};

// GET BY SECTION
export const getBySection = (section) =>
  axios.get(`${API}/section/${section}`);

// GET BY BRANCH
export const getByBranch = (branch) =>
  axios.get(`${API}/branch/${branch}`);

// GET ALL STUDENTS
export const getAllStudents = () =>
  axios.get(API);

// DELETE STUDENT
export const deleteStudent = (rollNo) =>
  axios.delete(`${API}/delete/${rollNo}`);
