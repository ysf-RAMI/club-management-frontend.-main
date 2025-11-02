import { useEffect, useState } from 'react';
import Header from '../common/Header';
import {
  faUserShield,
  faUsers,
  faUniversity,
  faCheckCircle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, makeAdmin } from '../../app/userSlice';
import { fetchClubs } from '../../app/clubSlice';

export default function UserManagement() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAssigningAdmin, setIsAssigningAdmin] = useState(false);
  const dispatch = useDispatch();

  const { users, loading: usersLoading } = useSelector((state) => state.user);
  const { clubs, loading: clubsLoading } = useSelector((state) => state.clubs);
  const members = users.filter(
    (user) => user.role === 'member' && user.clubs.filter((club) => club.pivot.role === 'member'),
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchClubs());
  }, [dispatch]);

  const handleAssignAdmin = async () => {
    if (selectedMember && selectedClub) {
      setIsAssigningAdmin(true);
      await dispatch(makeAdmin({ userId: selectedMember.id, clubId: selectedClub.id }));
      dispatch(fetchAllUsers());
      dispatch(fetchClubs());
      setSelectedMember(null);
      setSelectedClub(null);
      setIsAssigningAdmin(false);
    } else {
      alert('Please select both a member and a club.');
    }
  };

  const filteredMembers = users.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      member.role === 'member' &&
      member.clubs &&
      member.clubs.some((club) => club.pivot.role === 'member'),
  );

  const availableClubs = clubs.filter((club) => !club.adminId);

  const loading = usersLoading || clubsLoading || isAssigningAdmin;

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <Header
        title="User Management"
        subtitle="Manage club members and assign club administrators."
        icon={faUserShield}
      />

      {/* Assign Admin Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Assign Admin to Club</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 items-end">
          <div>
            <label htmlFor="member-select" className="block text-sm font-medium text-gray-700 mb-2">
              Selected Member
            </label>
            <div className="w-full bg-gray-200 border border-gray-300 rounded-lg p-2 flex items-center">
              {selectedMember ? (
                <>
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <span className="font-semibold text-gray-800">{selectedMember.name}</span>
                </>
              ) : (
                <span className="text-gray-500">No member selected</span>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="club-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Club (without Admin)
            </label>
            <select
              id="club-select"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg cursor-pointer bg-white"
              onChange={(e) =>
                setSelectedClub(clubs.find((club) => club.id === e.target.value))
              }
              value={selectedClub?.id || ''}
              disabled={!selectedMember || loading}
            >
              <option value="">-- Select a Club --</option>
              {selectedMember &&
                selectedMember.clubs
                  .filter((club) => !club.adminId)
                  .map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.name}
                    </option>
                  ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAssignAdmin}
            disabled={!selectedMember || !selectedClub || loading || isAssigningAdmin}
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-md text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isAssigningAdmin ? 'Assigning...' : 'Assign as Admin'}
          </button>
        </div>
      </div>

      {/* Members List */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Select a Member</h2>
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search members..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading users...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer border-2 ${selectedMember?.id === member.id ? 'border-blue-500 shadow-xl' : 'border-transparent'}`}
                onClick={() => setSelectedMember(member)}
              >
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <img
                      className="w-16 h-16 rounded-full object-cover mr-4"
                      src={member.avatar}
                      alt={member.name}
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p className="flex items-center">
                      <FontAwesomeIcon icon={faUsers} className="mr-2 text-gray-400" />
                      {member.clubs && member.clubs.length > 0
                        ? member.clubs.map((club) => `${club.name} (${club.pivot.role})`).join(', ')
                        : 'No clubs'}
                    </p>
                    <p className="flex items-center">
                      <FontAwesomeIcon icon={faUserShield} className="mr-2 text-gray-400" />
                      {member.role}
                    </p>
                  </div>
                  {selectedMember?.id === member.id && (
                    <div className="flex items-center justify-center mt-4 text-blue-500 font-semibold">
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                      <span>Selected</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
