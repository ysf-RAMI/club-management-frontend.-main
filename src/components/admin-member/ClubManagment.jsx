
import { useState } from 'react';
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
  faUserMinus
} from '@fortawesome/free-solid-svg-icons';

export default function ClubManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Sample club data (single club for admin)
  const clubData = {
    id: 1,
    name: "Photography Club",
    description: "A club for photography enthusiasts to share techniques and organize photo walks.",
    members: 127,
    events: 8,
    status: "Active",
    category: "Arts",
    image: "/img/Club1.png",
    createdDate: "2023-01-15",
    admin: "Sarah Johnson"
  }

  // Sample members data
  const members = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@university.edu",
      department: "Computer Science",
      joinDate: "2023-02-15",
      status: "Active",
      role: "Member",
      eventsAttended: 5,
      lastActive: "2024-01-15"
    },
    {
      id: 2,
      name: "Emily Davis",
      email: "emily.davis@university.edu",
      department: "Arts",
      joinDate: "2023-03-10",
      status: "Active",
      role: "Member",
      eventsAttended: 8,
      lastActive: "2024-01-14"
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@university.edu",
      department: "Engineering",
      joinDate: "2023-04-05",
      status: "Pending",
      role: "Member",
      eventsAttended: 0,
      lastActive: "2024-01-13"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      email: "sarah.johnson@university.edu",
      department: "Computer Science",
      joinDate: "2023-01-15",
      status: "Active",
      role: "Admin",
      eventsAttended: 12,
      lastActive: "2024-01-16"
    },
    {
      id: 5,
      name: "Alex Green",
      email: "alex.green@university.edu",
      department: "Business",
      joinDate: "2023-05-20",
      status: "Inactive",
      role: "Member",
      eventsAttended: 2,
      lastActive: "2023-12-10"
    }
  ];

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === '' || member.status === filterStatus)
  );

  const handleApproveMember = (memberId) => {
    console.log('Approving member:', memberId);
    // Here you would call API to approve member
  };

  const handleRejectMember = (memberId) => {
    console.log('Rejecting member:', memberId);
    // Here you would call API to reject member
  };

  const handleRemoveMember = (memberId) => {
    if (window.confirm('Are you sure you want to remove this member from the club?')) {
      console.log('Removing member:', memberId);
      // Here you would call API to remove member
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Club Management</h1>
              <p className="text-purple-100 text-lg">Manage members and oversee {clubData.name} activities</p>
            </div>
            <FontAwesomeIcon icon={faUsers} className="text-white text-6xl opacity-30" />
          </div>
        </div>
      </header>

      {/* Club Overview */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex items-center space-x-6">
          <img src={clubData.image} alt={clubData.name} className="w-20 h-20 rounded-lg object-cover" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{clubData.name}</h2>
            <p className="text-gray-600 mb-3">{clubData.description}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span>Admin: <span className="font-medium text-gray-700">{clubData.admin}</span></span>
              <span>•</span>
              <span>{clubData.members} members</span>
              <span>•</span>
              <span>{clubData.events} events</span>
              <span>•</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                {clubData.status}
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
            
            <button 
              onClick={() => setShowMemberModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Add Member
            </button>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Club Members ({filteredMembers.length})</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MEMBER
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DEPARTMENT
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  JOIN DATE
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EVENTS ATTENDED
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map(member => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-medium text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {member.name}
                          {member.role === 'Admin' && (
                            <FontAwesomeIcon icon={faCrown} className="ml-2 text-purple-500 text-xs" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.eventsAttended}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {member.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleApproveMember(member.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <FontAwesomeIcon icon={faUserCheck} />
                          </button>
                          <button 
                            onClick={() => handleRejectMember(member.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FontAwesomeIcon icon={faUserTimes} />
                          </button>
                        </>
                      )}
                      {member.status === 'Active' && member.role !== 'Admin' && (
                        <button 
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FontAwesomeIcon icon={faUserMinus} />
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-900">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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

      {/* Add Member Modal */}
      {showMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Member</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Member Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter member name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="">Select department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Arts">Arts</option>
                  <option value="Science">Science</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}