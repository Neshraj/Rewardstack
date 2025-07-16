import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLeaderboard } from '../api/leaderboardApi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL);

const Leaderboard = () => {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
  });

  const navigate = useNavigate();

  // Listen for real-time updates via socket
  useEffect(() => {
    socket.on('pointsClaimed', () => {
      queryClient.invalidateQueries(['leaderboard']);
    });

    return () => {
      socket.off('pointsClaimed');
    };
  }, [queryClient]);

  if (isLoading) return <LoadingScreen />;

  const topThree = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <div className="rounded-2xl shadow-lg max-h-140 overflow-hidden max-w-4xl mx-auto md:max-h-134 bg-white">
      <h2 className="text-2xl font-bold text-center text-yellow-500 mb-6">
        Wealth Ranking
      </h2>

      {/* Top 3 Section */}
      <div className="flex justify-center items-end mx-2 gap-4 mb-4">
        {/* 2nd */}
        {topThree[1] && (
          <div
            className="flex flex-col items-center justify-between p-4 rounded-xl shadow-md bg-yellow-100 w-30 h-38 cursor-pointer"
            onClick={() => navigate(`/user/${topThree[1]._id}`)}
          >
            <div className="text-3xl">🥈</div>
            <div className="text-lg font-bold text-yellow-800 text-center truncate">
              {topThree[1].name}
            </div>
            <div className="text-yellow-700 font-semibold">
              {topThree[1].totalPoints} pts
            </div>
          </div>
        )}

        {/* 1st */}
        {topThree[0] && (
          <div
            className="flex flex-col items-center justify-between p-5 rounded-xl shadow-md bg-yellow-300 w-34 h-46 scale-110 z-10 cursor-pointer"
            onClick={() => navigate(`/user/${topThree[0]._id}`)}
          >
            <div className="text-4xl">🥇</div>
            <div className="text-xl font-bold text-yellow-900 text-center truncate">
              {topThree[0].name}
            </div>
            <div className="text-yellow-800 font-semibold">
              {topThree[0].totalPoints} pts
            </div>
          </div>
        )}

        {/* 3rd */}
        {topThree[2] && (
          <div
            className="flex flex-col items-center justify-between p-4 rounded-xl shadow-md bg-yellow-100 w-30 h-38 cursor-pointer"
            onClick={() => navigate(`/user/${topThree[2]._id}`)}
          >
            <div className="text-3xl">🥉</div>
            <div className="text-lg font-bold text-yellow-800 text-center truncate">
              {topThree[2].name}
            </div>
            <div className="text-yellow-700 font-semibold">
              {topThree[2].totalPoints} pts
            </div>
          </div>
        )}
      </div>

      {/* Rest of Leaderboard */}
      <div className="max-h-96 overflow-y-auto scrollbar-custom pr-2 bg-white rounded-xl shadow-inner">
        <ul className="space-y-2 p-2 mb-30">
          {rest.map((user, index) => (
            <li
              key={user._id}
              className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-100 hover:bg-yellow-100 cursor-pointer shadow-sm"
              onClick={() => navigate(`/user/${user._id}`)}
            >
              <span className="font-medium text-yellow-800">
                #{index + 4} {user.name}
              </span>
              <span className="text-yellow-600 font-bold">
                {user.totalPoints} pts
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
