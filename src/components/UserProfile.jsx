import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/userApi";
import LoadingScreen from "./LoadingScreen";
import { fetchClaimHistory } from "../api/historyApi";

const UserProfile = () => {
  const { id } = useParams();

  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: history = [], isLoading: loadingHistory } = useQuery({
    queryKey: ["history", id],
    queryFn: () => fetchClaimHistory(id),
  });

  const user = users.find((u) => u._id === id);

  if (loadingUsers || loadingHistory) return <LoadingScreen />;
  if (!user) return <p>User not found</p>;

  return (
    <div className="p-6 rounded-2xl shadow-md max-w-3xl mx-auto bg-white">
      <h3 className="text-xl text-yellow-500 font-semibold mb-2 text-center">
        Claim History
      </h3>
      <h2 className="text-2xl font-bold mb-2 text-yellow-500">{user.name}</h2>
      <p className="text-lg mb-4 text-yellow-700">
        Total Points:{" "}
        <strong className="text-yellow-500">{user.totalPoints}</strong>
      </p>

      {/*Scrollable history container */}
      <div className="max-h-98 overflow-y-auto pr-2 scrollbar-custom md:max-h-90">
        {history.length === 0 ? (
          <p>No claims yet</p>
        ) : (
          <ul className="space-y-2 mb-10">
            {history.map((entry) => (
              <li
                key={entry._id}
                className="p-3 shadow-sm rounded-md bg-gray-50 flex justify-between"
              >
                <span className="text-yellow-500">+{entry.points} points</span>
                <span className="text-sm text-gray-500">
                  {new Date(entry.timestamp).toLocaleString("en-IN", {
                    weekday: "long",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
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
