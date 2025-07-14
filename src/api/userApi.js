import axiosInstance from './axiosInstance';

//Get all users
export const fetchUsers = async () => {
  const res = await axiosInstance.get('/users');
  return res.data;
};

//Add a new user
export const addUser = async (name) => {
  const res = await axiosInstance.post('/users', { name });
  return res.data;
};

//Claim random points
export const claimPoints = async (userId) => {
  const res = await axiosInstance.post(`/claim/${userId}`);
  return res.data;
};
