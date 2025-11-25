import { useState } from 'react';
import Sidebar from '../common/Layout/Sidebar';
import AdminDashboard from './AdminDashboard';
import ManageClubs from './ManageClubs';
import ManageEvents from './ManageEvents';
import UserManagement from './UserManagement';
import Profile from '../common/Profile';
import Loader from '../common/UI/Loader';

export default function Admin() {
  const [activeContent, setActiveContent] = useState('Dashboard'); // Default content

  const handleLinkClick = (link) => {
    setActiveContent(link);
  };

  const adminUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+1 (555) 765-4321",
    department: "Administration",
    bio: "Administrator with a focus on efficient university management and seamless student and faculty experiences.",
    role: "Admin",
    profilePicture: "/img/Club2.png"
  }

  return (
    <div className="flex flex-1 bg-gray-50">
      <Sidebar onLinkClick={handleLinkClick} activeContent={activeContent} />
      <div className="flex-1 p-4">
        {/* Conditional rendering based on activeContent */}
        {activeContent === 'Dashboard' && <AdminDashboard onQuickActionClick={handleLinkClick} />}
        {activeContent === 'Manage Clubs' && <ManageClubs />}
        {activeContent === 'Manage Events' && <ManageEvents />}
        {activeContent === 'Manage Users' && <UserManagement />}
        {activeContent === 'Profile' && <Profile user={adminUser} />}
        {activeContent === 'Logout' && <div>
          <Loader />
          Logout ...
        </div>}
      </div>
    </div>
  );
}
