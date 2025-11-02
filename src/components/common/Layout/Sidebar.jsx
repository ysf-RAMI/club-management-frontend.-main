import {
  faCalendarAlt,
  faFile,
  faHistory,
  faHome,
  faRightFromBracket,
  faUser,
  faUsers,
  faUserShield,
  faClipboardList,
  faDashboard,
  faShareAlt,
  faChartPie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

export default function Sidebar({ onLinkClick, activeContent }) {
  const [activeLink, setActiveLink] = useState(activeContent || 'Dashboard');
  const [userRole, setUserRole] = useState('');
  const [hasClubs, setHasClubs] = useState(false); // Assume student has no clubs initially
  const { Logout } = useAuth();

  

  useEffect(() => {
    const url = window.location.pathname;
    if (url.includes('/student')) {
      setUserRole('student');
    } else if (url.includes('/adminMember')) {
      setUserRole('admin-member');
    } else if (url.includes('/member')) {
      setUserRole('member');
      setHasClubs(true); // Members always have clubs
    } else if (url.includes('/admin')) {
      setUserRole('admin');
    }
  }, [window.location.pathname]);

  useEffect(() => {
    setActiveLink(activeContent);
  }, [activeContent]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    onLinkClick(link);
  };

  return (
    <div className="w-56 h-screen bg-white text-gray-800 flex flex-col items-center justify-between p-4 border-r border-gray-200">
      <div className="flex flex-col items-center justify-center space-y-4 w-full">
        <a
          href="#"
          className={
            activeLink === 'Dashboard'
              ? 'bg-blue-100 text-blue-500 p-2 rounded-md w-full text-left'
              : 'hover:bg-gray-200 p-2 rounded-md w-full text-left'
          }
          onClick={() => handleLinkClick('Dashboard')}
        >
          <FontAwesomeIcon icon={faChartPie} className="text-1xl" />{' '}
          <span className="ml-2 text-sm font-medium">Dashboard</span>
        </a>

        {userRole === 'student' && (
          <>
            <a
              href="#"
              className={
                activeLink === 'Events Registration'
                  ? 'bg-blue-100 text-blue-500 p-2 rounded-md w-full text-left'
                  : 'hover:bg-gray-200 p-2 rounded-md w-full text-left'
              }
              onClick={() => handleLinkClick('Events Registration')}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="text-1xl" />{' '}
              <span className="ml-2 text-sm font-medium">Events Registration</span>
            </a>
          </>
        )}

        {userRole === 'member' && hasClubs && (
          <>
            <a
              href="#"
              className={
                activeLink === 'My Clubs'
                  ? 'bg-blue-100 text-blue-500 p-2 rounded-md w-full text-left'
                  : 'hover:bg-gray-200 p-2 rounded-md w-full text-left'
              }
              onClick={() => handleLinkClick('My Clubs')}
            >
              <FontAwesomeIcon icon={faUsers} className="text-1xl" />{' '}
              <span className="ml-2 text-sm font-medium">My Clubs</span>
            </a>

            <a
              href="#"
              className={
                activeLink === 'Events'
                  ? 'bg-blue-100 text-blue-500 p-2 rounded-md w-full text-left'
                  : 'hover:bg-gray-200 p-2 rounded-md w-full text-left'
              }
              onClick={() => handleLinkClick('Events')}
            >
              <FontAwesomeIcon icon={faHistory} className="text-1xl" />{' '}
              <span className="ml-2 text-sm font-medium">Events</span>
            </a>
            <a
              href="#"
              className={
                activeLink === 'Club Files'
                  ? 'bg-blue-100 text-blue-500 p-2 rounded-md w-full text-left'
                  : 'hover:bg-gray-200 p-2 rounded-md w-full text-left'
              }
              onClick={() => handleLinkClick('Club Files')}
            >
              <FontAwesomeIcon icon={faFile} className="text-1xl" />{' '}
              <span className="ml-2 text-sm font-medium">Club Files</span>
            </a>
          </>
        )}

        {userRole === 'admin' && (
          <>
            <a
              href="#"
              className={
                activeLink === 'Manage Clubs'
                  ? 'bg-blue-100 text-blue-500 p-2 rounded-md w-full text-left'
                  : 'hover:bg-gray-200 p-2 rounded-md w-full text-left'
              }
              onClick={() => handleLinkClick('Manage Clubs')}
            >
              <FontAwesomeIcon icon={faUsers} className="text-1xl" />{' '}
              <span className="ml-2 text-sm font-medium">Manage Clubs</span>
            </a>
            <a
              href="#"
              className={
                activeLink === 'Manage Events'
                  ? 'bg-blue-100 text-blue-500 p-2 rounded-md w-full text-left'
                  : 'hover:bg-gray-200 p-2 rounded-md w-full text-left'
              }
              onClick={() => handleLinkClick('Manage Events')}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="text-1xl" />{' '}
              <span className="ml-2 text-sm font-medium">Manage Events</span>
            </a>
            <a
              href="#"
              className={
                activeLink === 'Manage Users'
                  ? 'bg-blue-100 text-blue-500 p-2 rounded-md w-full text-left'
                  : 'hover:bg-gray-200 p-2 rounded-md w-full text-left'
              }
              onClick={() => handleLinkClick('Manage Users')}
            >
              <FontAwesomeIcon icon={faUserShield} className="text-1xl" />{' '}
              <span className="ml-2 text-sm font-medium">Manage Users</span>
            </a>
          </>
        )}

        {userRole === 'admin-member' && (
          <>
            <a
              href="#"
              className={
                activeLink === 'Club Management'
                  ? 'bg-blue-100 text-blue-500 p-2 rounded-md w-full text-left'
                  : 'hover:bg-gray-200 p-2 rounded-md w-full text-left'
              }
              onClick={() => handleLinkClick('Club Management')}
            >
              <FontAwesomeIcon icon={faClipboardList} className="text-1xl" />{' '}
              <span className="ml-2 text-sm font-medium">Club Management</span>
            </a>
            <a
              href="#"
              className={
                activeLink === 'Event Management'
                  ? 'bg-blue-100 text-blue-500 p-2 rounded-md w-full text-left'
                  : 'hover:bg-gray-200 p-2 rounded-md w-full text-left'
              }
              onClick={() => handleLinkClick('Event Management')}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="text-1xl" />{' '}
              <span className="ml-2 text-sm font-medium">Event Management</span>
            </a>
            <a
              href="#"
              className={
                activeLink === 'Club Files'
                  ? 'bg-blue-100 text-blue-500 p-2 rounded-md w-full text-left'
                  : 'hover:bg-gray-200 p-2 rounded-md w-full text-left'
              }
              onClick={() => handleLinkClick('Club Files')}
            >
              <FontAwesomeIcon icon={faFile} className="text-1xl" />{' '}
              <span className="ml-2 text-sm font-medium">Manage Club Files</span>
            </a>
          </>
        )}

        <a
          href="#"
          className={
            activeLink === 'Profile'
              ? 'bg-blue-100 text-blue-500 p-2 rounded-md w-full text-left'
              : 'hover:bg-gray-200 p-2 rounded-md w-full text-left'
          }
          onClick={() => handleLinkClick('Profile')}
        >
          <FontAwesomeIcon icon={faUser} className="text-1xl" />{' '}
          <span className="ml-2 text-sm font-medium">Profile</span>
        </a>
        <p className="border-b border-gray-200 w-full"></p>

        <a
          href="#"
          className={'text-red-500 p-2 rounded-md w-full text-left hover:bg-red-100'}
          onClick={() => handleLinkClick('Logout')}
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="text-1xl" />{' '}
          <button className="ml-2 text-sm font-medium cursor-pointer" onClick={Logout}>Logout</button>
        </a>
      </div>
    </div>
  );
}
