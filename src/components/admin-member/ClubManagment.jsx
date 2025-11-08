import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faCalendarAlt,
  faEdit,
  faTrash,
  faEye,
  faSearch,
  faFilter,
  faCrown,
  faUserCheck,
  faUserTimes,
  faChartPie,
  faCog,
  faUserPlus,
  faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../../config/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClubs, approveJoinClub } from '../../app/clubSlice';
import { toast } from 'react-toastify';
import Loader from '../common/UI/Loader'; export default function ClubManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  // Redux state
  const { clubs, loading } = useSelector((state) => state.clubs);
  const dispatch = useDispatch();

  // Get current user
  const me = localStorage.getItem('user');
  const meId = me ? JSON.parse(me).id : null;

  // Local state for club and members
  const [myClub, setMyClub] = useState(null);
  const [allMembers, setAllMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);

  // Fetch clubs on mount
  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);

  // Find the club where current user is admin-member
  useEffect(() => {
    if (clubs.length > 0 && meId) {
      const foundClub = clubs.find(
        (club) =>
          club.users &&
          club.users.some((user) => user.id === meId && user.pivot.role === 'admin-member'),
      );
      setMyClub(foundClub);

      if (foundClub && foundClub.users) {
        // Set all members
        setAllMembers(foundClub.users);

        // Filter pending members
        const pending = foundClub.users.filter((user) => user.pivot.status === 'pending');
        setPendingMembers(pending);
      }
    }
  }, [clubs, meId]);

  // Approve member handler
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
      dispatch(fetchClubs()); // Re-fetch clubs to update the data
    } catch (error) {
      toast.error(error.message || 'Failed to approve member.');
    }
  };

  // Reject member handler
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
      dispatch(fetchClubs()); // Re-fetch clubs to update the data
    } catch (error) {
      toast.error(error.message || 'Failed to reject member.');
    }
  };

  // Remove member handler (for active members)
  const handleRemoveMember = (memberId) => {
    if (window.confirm('Are you sure you want to remove this member from the club?')) {
      console.log('Removing member:', memberId);
      // Call reject with status 'rejected' to remove member
      handleRejectMember(memberId);
    }
  };

  // Filter members based on search and status
  const filteredMembers = allMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Map pivot status to display status
    let memberStatus = 'Inactive';
    if (member.pivot.status === 'approved') {
      memberStatus = 'Active';
    } else if (member.pivot.status === 'pending') {
      memberStatus = 'Pending';
    } else if (member.pivot.status === 'rejected') {
      memberStatus = 'Inactive';
    }

    const matchesFilter = filterStatus === '' || memberStatus === filterStatus;

    return matchesSearch && matchesFilter;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get member display status
  const getMemberStatus = (member) => {
    if (member.pivot.status === 'approved') return 'Active';
    if (member.pivot.status === 'pending') return 'Pending';
    if (member.pivot.status === 'rejected') return 'Inactive';
    return 'Inactive';
  };

  if (loading) {
    return <Loader />;
  }

  if (!myClub) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faUsers} className="text-gray-300 text-6xl mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">No Club Found</h3>
          <p className="text-gray-400">You are not an admin of any club.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Club Management</h1>
              <p className="text-purple-100 text-lg">
                Manage members and oversee {myClub.name} activities
              </p>
            </div>
            <FontAwesomeIcon icon={faUsers} className="text-white text-6xl opacity-30" />
          </div>
        </div>
      </header>

      {/* Club Overview */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex items-center space-x-6">
          <img
            src={myClub.image ? `${API_BASE_URL}${myClub.image}` : '/img/Club1.png'}
            alt={myClub.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{myClub.name}</h2>
            <p className="text-gray-600 mb-3">{myClub.description}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span>
                Admin:{' '}
                <span className="font-medium text-gray-700">
                  {me ? JSON.parse(me).name : 'You'}
                </span>
              </span>
              <span>•</span>
              <span>{myClub.users_count || allMembers.length} members</span>
              <span>•</span>
              <span>{myClub.events?.length || 0} events</span>
              <span>•</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search members..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faFilter} className="text-gray-500 mr-2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>


          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Club Members ({filteredMembers.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  MEMBER
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  EMAIL
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ROLE
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  STATUS
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => {
                const memberStatus = getMemberStatus(member);
                return (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-purple-600 font-medium text-sm">
                              {member.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {member.name}
                            {member.pivot.role === 'admin-member' && (
                              <FontAwesomeIcon
                                icon={faCrown}
                                className="ml-2 text-purple-500 text-xs"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.pivot.role === 'admin-member' ? 'Admin' : 'Member'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(memberStatus)}`}
                      >
                        {memberStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {memberStatus === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleApproveMember(member.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Approve member"
                            >
                              <FontAwesomeIcon icon={faUserCheck} />
                            </button>
                            <button
                              onClick={() => handleRejectMember(member.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Reject member"
                            >
                              <FontAwesomeIcon icon={faUserTimes} />
                            </button>
                          </>
                        )}
                        {memberStatus === 'Active' && member.pivot.role !== 'admin-member' && (
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Remove member"
                          >
                            <FontAwesomeIcon icon={faUserMinus} />
                          </button>
                        )}

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <FontAwesomeIcon icon={faUsers} className="text-gray-300 text-6xl mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No members found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>


    </main>
  );
}
