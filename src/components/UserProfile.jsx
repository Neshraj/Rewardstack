import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/userApi';
import { fetchClaimHistory } from '../api/historyApi';

const UserProfile = () => {
  const { id } = useParams();

  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { data: history = [], isLoading: loadingHistory } = useQuery({
    queryKey: ['history', id],
    queryFn: () => fetchClaimHistory(id),
  });

  const user = users.find((u) => u._id === id);

  if (loadingUsers || loadingHistory) return <p className="mx-auto text-center">Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto">
      <h3 className="text-xl text-yellow-500 font-semibold mb-2 text-center">Claim History</h3>
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p className="text-lg mb-4 text-yellow-700">
        Total Points: <strong className='text-yellow-500'>{user.totalPoints}</strong>
      </p>

      

      {/*Scrollable history container */}
      <div className="max-h-90 overflow-y-auto pr-2 scrollbar-custom">
        {history.length === 0 ? (
          <p>No claims yet</p>
        ) : (
          <ul className="space-y-2">
            {history.map((entry) => (
              <li
                key={entry._id}
                className="p-3 shadow-sm rounded-md bg-gray-50 flex justify-between"
              >
                <span className='text-yellow-500'>+{entry.points} points</span>
                <span className="text-sm text-gray-500">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
