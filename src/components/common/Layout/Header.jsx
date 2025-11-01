import { NavLink, Link } from 'react-router-dom';
import { AuthConext } from '../../../contexts/AuthContext';
import { useContext } from 'react';

export default function Header() {
  const { isAuthenticated, user } = useContext(AuthConext);
  const role = user?.role;
  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? 'text-sm/6 font-semibold text-[#6366f1] underline'
      : 'text-sm/6 font-semibold hover:text-[#6366f1]';

  return (
    <header className="bg-white border-b-2 border-gray-100">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <p className="text-black font-bold">ClubManagement</p>
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-12 text-black">
          <NavLink to="/" className={getNavLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/clubs" className={getNavLinkClass}>
            Clubs
          </NavLink>
          <NavLink to="/events" className={getNavLinkClass}>
            Events
          </NavLink>
          <NavLink to="/about" className={getNavLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={getNavLinkClass}>
            Contact
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to={
                role === 'student'
                  ? '/student'
                  : role === 'member'
                    ? '/member'
                    : role === 'admin'
                      ? '/admin'
                      : '/adminMember'
              }
              className={getNavLinkClass}
            >
              Dashboard
            </NavLink>
          )}
        </div>

        {!isAuthenticated && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login" className="text-sm/6 font-semibold text-black px-4 py-2">
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm/6 font-semibold text-white bg-[#6366f1] px-4 py-2 rounded-md hover:bg-[#5a5dcc] active:bg-[#4a4dcc] cursor-pointer"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
