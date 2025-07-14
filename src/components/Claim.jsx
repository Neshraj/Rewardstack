import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { claimPoints, fetchUsers } from "../api/userApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FILTER_KEY = "rewardstack-filter";

const Claim = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const queryClient = useQueryClient();
  const [showConfetti, setShowConfetti] = useState(false);
  const [filter, setFilter] = useState("default");
  const navigate = useNavigate();

  // Load filter from localStorage on mount
  useEffect(() => {
    const savedFilter = localStorage.getItem(FILTER_KEY);
    if (savedFilter) setFilter(savedFilter);
  }, []);

  // Save filter to localStorage on change
  useEffect(() => {
    localStorage.setItem(FILTER_KEY, filter);
  }, [filter]);

  const mutation = useMutation({
    mutationFn: claimPoints,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["leaderboard"]);
      queryClient.invalidateQueries(["history"]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
      toast.success(`${data.points} points awarded! to ${data.name}`, {
        position: "top-center",
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Something went wrong while claiming points!", {
        position: "top-center",
        autoClose: 2000,
      });
    },
  });

  const handleClaim = (userId) => {
    mutation.mutate(userId);
  };

  const getFilteredUsers = () => {
    const sorted = [...users];
    if (filter === "asc") {
      sorted.sort((a, b) => a.totalPoints - b.totalPoints);
    } else if (filter === "desc") {
      sorted.sort((a, b) => b.totalPoints - a.totalPoints);
    } else if (filter === "alpha") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  };

  if (isLoading) return <p className="mx-auto text-center">Loading users...</p>;

  return (
    <div className="p-6 rounded-2xl text-yellow-700 shadow-xl max-w-2xl mx-auto">
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-xl text-yellow-500 font-semibold">Claim Points</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm focus:outline-none bg-yellow-100 shadow-sm border-none"
        >
          <option value="default">Default</option>
          <option value="asc">Points Ascending</option>
          <option value="desc">Points Descending</option>
          <option value="alpha">Alphabetical</option>
        </select>
      </div>

      <div className="max-h-114 overflow-y-auto pr-2 scrollbar-custom md:max-h-108">
        <ul className="space-y-3">
          {getFilteredUsers().map((user) => (
            <li
              key={user._id}
              className="flex justify-between items-center p-3 rounded-lg shadow-sm hover:cursor-pointer hover:bg-yellow-100"
              onClick={() => navigate(`/user/${user._id}`)}
            >
              <span className="font-medium cursor-pointer hover:underline">
                {user.name} - {user.totalPoints} pts
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClaim(user._id);
                }}
                className="bg-yellow-500 font-medium text-white shadow-lg px-4 py-2 rounded-md hover:bg-yellow-700 hover:cursor-pointer"
              >
                Claim
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showConfetti && <Confetti />}
    </div>
  );
};

export default Claim;
