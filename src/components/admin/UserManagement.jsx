import { useState } from 'react';

export default function UserManagement() {
  const dummyMembers = [
    {
      id: '1',
      name: 'Alice Smith',
      email: 'alice@example.com',
      clubId: '101',
      clubName: 'Robotics Club',
      role: 'member',
    },
    {
      id: '2',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      clubId: '102',
      clubName: 'Debate Society',
      role: 'member',
    },
    {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      clubId: '101',
      clubName: 'Robotics Club',
      role: 'member',
    },
    {
      id: '4',
      name: 'Diana Prince',
      email: 'diana@example.com',
      clubId: '103',
      clubName: 'Photography Club',
      role: 'member',
    },
    {
      id: '5',
      name: 'Eve Adams',
      email: 'eve@example.com',
      clubId: null,
      clubName: 'No Club',
      role: 'member',
    },
    {
      id: '6',
      name: 'Frank White',
      email: 'frank@example.com',
      clubId: '102',
      clubName: 'Debate Society',
      role: 'admin',
    },
  ];

  const dummyClubs = [
    { id: '101', name: 'Robotics Club', adminId: null },
    { id: '102', name: 'Debate Society', adminId: '6' },
    { id: '103', name: 'Photography Club', adminId: null },
    { id: '104', name: 'Chess Club', adminId: null },
  ];

  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);

  const handleAssignAdmin = () => {
    if (selectedMember && selectedClub) {
      const updatedClubs = dummyClubs.map((club) =>
        club.id === selectedClub.id ? { ...club, adminId: selectedMember.id } : club,
      );
      console.log('Updated Clubs:', updatedClubs);
      alert(`${selectedMember.name} assigned as admin to ${selectedClub.name}`);
      setSelectedMember(null);
      setSelectedClub(null);
    } else {
      alert('Please select both a member and a club.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
      <p className="text-gray-600 mb-8">Manage club members and assign club administrators.</p>

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto flex">
        {/* Left Column (Navigation/Profile Summary - Placeholder for now) */}
        <div className="w-1/4 pr-6 border-r border-gray-200">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Admin User</h3>
            <p className="text-sm text-gray-500">Administrator</p>
            <span className="mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Active
            </span>
          </div>
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-md"
              aria-current="page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-3 text-indigo-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              User Management
            </a>
            {/* Other navigation items can go here */}
          </nav>
        </div>

        {/* Right Column (Main Content) */}
        <div className="w-3/4 pl-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Members & Admins</h2>
          <p className="text-gray-600 mb-6">
            View members, assign club administrators, and manage roles.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Members List</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Select
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Club
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dummyMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="selectMember"
                          checked={selectedMember?.id === member.id}
                          onChange={() => setSelectedMember(member)}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.clubName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Assign Admin to Club</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="member-select" className="block text-sm font-medium text-gray-700">
                  Selected Member:
                </label>
                <input
                  type="text"
                  id="member-select"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedMember ? selectedMember.name : ''}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="club-select" className="block text-sm font-medium text-gray-700">
                  Select Club (without Admin):
                </label>
                <select
                  id="club-select"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  onChange={(e) =>
                    setSelectedClub(dummyClubs.find((club) => club.id === e.target.value))
                  }
                  value={selectedClub?.id || ''}
                >
                  <option value="">-- Select a Club --</option>
                  {dummyClubs
                    .filter((club) => club.adminId === null)
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
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Assign Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
