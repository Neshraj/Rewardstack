import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUser } from '../api/userApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      queryClient.invalidateQueries(['leaderboard']);
      toast.success('User added successfully!', {
        position: 'top-center',
        autoClose: 2000,
      });
      setName('');
    },
    onError: () => {
      toast.error('Failed to add user!', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.warning('Name cannot be empty', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }
    mutation.mutate(name.trim());
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center text-yellow-500">Add User</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter user name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded-md shadow-sm outline-0"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white py-2 rounded-md shadow-sm hover:bg-yellow-700 hover:cursor-pointer"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
