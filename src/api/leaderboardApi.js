import axiosInstance from './axiosInstance';

//Fetch leaderboard
export const fetchLeaderboard = async () => {
  const res = await axiosInstance.get('/leaderboard');
  return res.data;
};
