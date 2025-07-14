import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl transition-colors duration-200 font-semibold ${
      isActive
        ? 'bg-yellow-500 text-white shadow-md'
        : 'text-yellow-800 hover:bg-yellow-200'
    }`;

  return (
    <nav className="px-6 py-4 flex gap-4 justify-end shadow-md rounded-b-2xl bg-white">
      <NavLink to="/claim" className={navLinkClass}>
        Claim
      </NavLink>
      <NavLink to="/add-user" className={navLinkClass}>
        Add User
      </NavLink>
      <NavLink to="/leaderboard" className={navLinkClass}>
        Leaderboard
      </NavLink>
    </nav>
  );
};

export default Navbar;
