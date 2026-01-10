import axios from "axios";

const API = "https://marksmanagement.onrender.com/api/complaints";

/**
 * Raise a new complaint
 * @param {Object} complaintData
 * {
 *   studentRollNo,
 *   studentName,
 *   complaintType,
 *   message
 * }
 */
export const raiseComplaint = (complaintData) => {
  return axios.post(`${API}`, complaintData);
};

/**
 * Get complaints by student roll number
 * @param {string} rollNo
 */
export const getComplaintsByRollNo = (rollNo) => {
  return axios.get(`${API}/student/${rollNo}`);
};

export const getAllComplaints = () => axios.get(API);

export const getPendingComplaints = () => axios.get(`${API}/pending`);

export const resolveComplaint = (id, adminReply) =>
  axios.put(`${API}/${id}/resolve`, { adminReply });