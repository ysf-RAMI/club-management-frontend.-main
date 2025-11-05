import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faCalendarAlt,
  faClock,
  faGraduationCap,
  faPlus,
  faChartPie,
  faChartLine,
  faFileAlt,
  faBell,
  faDownload,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubs } from '../../app/clubSlice';
import { API_BASE_URL } from '../../config/api';

export default function MemberDashboard(props) {
  const { clubs, loading } = useSelector((state) => state.clubs);
  const dispatch = useDispatch();

  // Get current user
  const me = localStorage.getItem('user');
  const meId = me ? JSON.parse(me).id : null;
  const { user } = useContext(AuthContext);
  const url = API_BASE_URL;

  // Local state for joined 
  const [joinedClubs, setJoinedClubs] = useState([]);

  // Fetch clubs on mount
  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);

  // Filter clubs where user is a member with approved status
  useEffect(() => {
    if (clubs.length > 0 && meId) {
      const myJoinedClubs = clubs.filter((club) => {
        if (!club.users) return false;

        // Check if user is in the club with approved status
        const userInClub = club.users.find(
          (user) => user.id === meId && user.pivot.status === 'approved',
        );

        return userInClub !== undefined;
      });

      setJoinedClubs(myJoinedClubs);
    }
  }, [clubs, meId]);

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen 
    "
    >
      <main className="flex-1">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-xl shadow-lg mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold mb-1">Welcome back, {user.name} 👋</h2>
            <p className="text-purple-100 text-sm">Here's your club activity overview</p>
            <div className="mt-4 flex space-x-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUsers} className="text-purple-300 mr-2" />
                <div>
                  <p className="text-lg font-bold">{joinedClubs.length}</p>
                  <p className="text-purple-100 text-xs">Clubs Joined</p>
                </div>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-300 mr-2" />
                <div>
                  <p className="text-lg font-bold">23</p>
                  <p className="text-purple-100 text-xs">Events Attended</p>
                </div>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="text-purple-300 mr-2" />
                <div>
                  <p className="text-lg font-bold">6</p>
                  <p className="text-purple-100 text-xs">Upcoming Events</p>
                </div>
              </div>
            </div>
          </div>
          <FontAwesomeIcon icon={faGraduationCap} className="text-white text-5xl opacity-30" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Clubs */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-800">My Clubs</h3>
                <a href="#" className="text-purple-600 hover:underline text-xs font-medium cursor-pointer">
                  View All
                </a>
              </div>
              <div className="space-y-2 mt-3">
                {/* Club Item 1 */}
                {
                  joinedClubs.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <img src='/public/vite.svg' alt="Photography Club" className="h-7 w-7 mr-2" />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{c.name}</p>
                          <p className="text-xs text-gray-500">
                            <span className="text-purple-600 font-semibold">Member</span> • {c.users_count} members
                          </p>
                        </div>
                      </div>
                      <a href={`/clubs/${c.id}`} className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 text-xs font-medium cursor-pointer">
                        View Club
                      </a>
                    </div>

                  ))

                }

              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-base font-semibold text-gray-800 mb-3">Upcoming Events</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        EVENT
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        CLUB
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        DATE
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        LOCATION
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        Photography Workshop
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                        Photography Club
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                        Dec 15, 2:00 PM
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                        Room A-101
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-green-600">
                        Registered
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        Robot Competition
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                        Robotics Club
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                        Dec 18, 10:00 AM
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                        Engineering Lab
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-yellow-600">
                        Pending
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        Debate Tournament
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                        Debate Society
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                        Dec 20, 6:00 PM
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                        Auditorium
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-green-600">
                        Registered
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Announcements */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-base font-semibold text-gray-800 mb-3">Recent Announcements</h3>
              <div className="space-y-2">
                <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="font-medium text-gray-800 text-sm">New Photography Equipment</p>
                  <p className="text-xs text-gray-500">Photography Club • 2 hours ago</p>
                </div>
                <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-200">
                  <p className="font-medium text-gray-800 text-sm">Competition Registration Open</p>
                  <p className="text-xs text-gray-500">Robotics Club • 1 day ago</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="font-medium text-gray-800 text-sm">Tournament Schedule Released</p>
                  <p className="text-xs text-gray-500">Debate Society • 2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md mt-6">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Quick Links</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-md hover:bg-purple-50 hover:border-purple-300 transition cursor-pointer"
              onClick={() => { props.onLinkClick('My Clubs'); props.activeContent('My Clubs') }}  >
              <span className="bg-purple-100 p-2 rounded-md">
                <FontAwesomeIcon icon={faChartPie} className="text-purple-600" />
              </span>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">My Clubs</p>
                <p className="text-xs text-gray-500">Review your joined clubs</p>
              </div>
            </li>
            <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-md hover:bg-purple-50 hover:border-purple-300 transition cursor-pointer"
              onClick={() => { props.onLinkClick('Events'); props.activeContent('Events') }}  >
              <span className="bg-purple-100 p-2 rounded-md">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-600" />
              </span>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">Events</p>
                <p className="text-xs text-gray-500">See upcoming events</p>
              </div>
            </li>
            <li className="flex items-center gap-2 border border-gray-200 p-2 rounded-md hover:bg-purple-50 hover:border-purple-300 transition cursor-pointer"
              onClick={() => { props.onLinkClick('Profile'); props.activeContent('Profile') }}  >
              <span className="bg-purple-100 p-2 rounded-md">
                <FontAwesomeIcon icon={faUser} className="text-purple-600" />
              </span>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">Profile</p>
                <p className="text-xs text-gray-500">Manage your profile</p>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
