import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faCalendarAlt,
  faHourglassHalf,
  faPlus,
  faUserCheck,
  faUserTimes,
  faEye,
  faCrown,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../common/Header';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClubs, approveJoinClub } from '../../app/clubSlice';
import { toast } from 'react-toastify';
import Loader from '../common/UI/Loader';
import { AuthContext } from '../../contexts/AuthContext';

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-lg flex items-center justify-between border-l-4 border-${color}-500`}
  >
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className={`text-3xl font-bold text-gray-800`}>{value}</p>
    </div>
    <div className={`w-16 h-16 bg-${color}-100 rounded-full flex items-center justify-center`}>
      <FontAwesomeIcon icon={icon} className={`text-${color}-500 text-3xl`} />
    </div>
  </div>
);

// Reusable Quick Action Card Component
const QuickActionCard = ({ title, subtitle, icon, onClick, color }) => (
  <div
    className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
    onClick={onClick}
  >
    <div className={`w-16 h-16 bg-${color}-100 rounded-full flex items-center justify-center mb-4`}>
      <FontAwesomeIcon icon={icon} className={`text-${color}-500 text-2xl`} />
    </div>
    <h3 className="font-bold text-gray-800 text-lg mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{subtitle}</p>
  </div>
);

export default function AdMemberDashboard({ onLinkClick }) {
  const { clubs, loading } = useSelector((state) => state.clubs);
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);
  const meId = userId;

  const [myClub, setMyClub] = useState(null);
  const [pendingMembers, setPendingMembers] = useState([]);

  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);

  useEffect(() => {
    if (clubs.length > 0 && meId) {
      const foundClub = clubs.find(
        (club) =>
          club.users &&
          club.users.some((user) => user.id === meId && user.pivot.role === 'admin-member'),
      );
      setMyClub(foundClub);

      if (foundClub) {
        const pending = foundClub.users.filter((user) => user.pivot.status === 'pending');
        setPendingMembers(pending);
      }
    }
  }, [clubs, meId]);

  const handleApproveMember = async (memberId) => {
    if (!myClub) {
      console.error('myClub is undefined, cannot approve member.');
      toast.error('Club information not available.');
      return;
    }
    try {
      await dispatch(
        approveJoinClub({ clubId: myClub.id, userId: memberId, status: 'approved' }),
      ).unwrap();
      toast.success('Member approved successfully!');
      dispatch(fetchClubs()); // Re-fetch clubs to update the dashboard
    } catch (error) {
      toast.error(error.message || 'Failed to approve member.');
    }
  };

  const handleRejectMember = async (memberId) => {
    if (!myClub) {
      console.error('myClub is undefined, cannot reject member.');
      toast.error('Club information not available.');
      return;
    }
    try {
      await dispatch(
        approveJoinClub({ clubId: myClub.id, userId: memberId, status: 'rejected' }),
      ).unwrap();
      toast.success('Member rejected successfully!');
      dispatch(fetchClubs()); // Re-fetch clubs to update the dashboard
    } catch (error) {
      toast.error(error.message || 'Failed to reject member.');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <Header
        title={`${myClub?.name || 'Your Club'} Dashboard`}
        subtitle={`Welcome, Manage your club and oversee member activities.`}
        icon={faCrown}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Members"
          value={myClub?.users_count || 0}
          icon={faUsers}
          color="blue"
        />
        <StatCard
          title="Events Created"
          value={myClub?.events?.length || 0}
          icon={faCalendarAlt}
          color="green"
        />
        <StatCard
          title="Pending Requests"
          value={pendingMembers.length}
          icon={faHourglassHalf}
          color="yellow"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickActionCard
            title="Manage Members"
            subtitle="View and manage club members"
            icon={faUsers}
            color="blue"
            onClick={() => onLinkClick('Club Management')}
          />
          <QuickActionCard
            title="Create Event"
            subtitle="Schedule new club events"
            icon={faPlus}
            color="green"
            onClick={() => onLinkClick('Event Management')}
          />
          <QuickActionCard
            title="Review Requests"
            subtitle="Approve/reject members"
            icon={faUserCheck}
            color="yellow"
            onClick={() => onLinkClick('Club Management')}
          />
          <QuickActionCard
            title="View Events"
            subtitle="See all club events"
            icon={faCalendarAlt}
            color="purple"
            onClick={() => onLinkClick('Event Management')}
          />
        </div>
      </div>

      {/* Pending Members and Recent Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Member Requests */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Member Requests</h2>
          <div className="space-y-4">
            {pendingMembers.length > 0 ? (
              pendingMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleApproveMember(member.id)}
                      className="text-green-500 hover:text-green-700 p-2 rounded-full bg-green-100"
                    >
                      <FontAwesomeIcon icon={faUserCheck} />
                    </button>
                    <button
                      onClick={() => handleRejectMember(member.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full bg-red-100"
                    >
                      <FontAwesomeIcon icon={faUserTimes} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No pending member requests.</p>
            )}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Events</h2>
          <div className="space-y-4">
            {myClub?.events?.length > 0 ? (
              myClub.events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-500">
                      {event.date} - {event.attendees || 0} attendees
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                    >
                      {event.status}
                    </span>
                    <a
                      href={`/events/${event.id}`}
                      className="text-gray-500 hover:text-gray-700"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent events.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
