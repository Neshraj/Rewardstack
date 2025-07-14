import axiosInstance from './axiosInstance';

//Get claim history for a user by ID
export const fetchClaimHistory = async (userId) => {
  const res = await axiosInstance.get(`/history/${userId}`);
  return res.data;
};
