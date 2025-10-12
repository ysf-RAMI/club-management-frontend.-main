import { useState } from 'react';
import Sidebar from '../common/Layout/Sidebar';
import AdminDashboard from './AdminDashboard';
import ManageClubs from './ManageClubs';
import ManageEvents from './ManageEvents';
import UserManagement from './UserManagement';
import AdminProfile from './AdminProfile';

export default function Admin() {
  const [activeContent, setActiveContent] = useState('Dashboard'); // Default content

  const handleLinkClick = (link) => {
    setActiveContent(link);
  };

  return (
    <div className="flex">
      <Sidebar onLinkClick={handleLinkClick} activeContent={activeContent} />
      <div className="flex-1 bg-gray-100 p-3">
        {/* Conditional rendering based on activeContent */}
        {activeContent === 'Dashboard' && <AdminDashboard onQuickActionClick={handleLinkClick} />}
        {activeContent === 'Manage Clubs' && <ManageClubs />}
        {activeContent === 'Manage Events' && <ManageEvents />}
        {activeContent === 'Manage Users' && <UserManagement />}
        {activeContent === 'Profile' && <AdminProfile />}
        {activeContent === 'Logout' && <div>Logging out...</div>}
      </div>
    </div>
  );
}
