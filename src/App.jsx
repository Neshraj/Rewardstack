import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Claim from './components/Claim';
import AddUser from './components/AddUser';
import Leaderboard from './components/Leaderboard';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans bg-gray-50">
        {/* Navigation */}
        <Navbar />

        {/* Toast Notifications */}
        <ToastContainer position="top-center" autoClose={2000} />

        {/* Main Content */}
        <main className="p-4">
          <Routes>
            {/* Default Redirect */}
            <Route path="/" element={<Navigate to="/claim" />} />

            {/* Claim Page */}
            <Route path="/claim" element={<Claim />} />

            {/* Add User Page */}
            <Route path="/add-user" element={<AddUser />} />

            {/* Leaderboard */}
            <Route path="/leaderboard" element={<Leaderboard />} />

            {/* User Profile */}
            <Route path="/user/:id" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
