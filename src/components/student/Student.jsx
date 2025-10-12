import { useState } from 'react';
import Sidebar from '../common/Layout/Sidebar';
import StdDashboard from './StdDashboard';
import EventsRegistration from './EventsRegistration';
import StdProfile from './StdProfile';

export default function Student() {
  const [activeContent, setActiveContent] = useState('Dashboard');

  const handleLinkClick = (link) => {
    setActiveContent(link);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onLinkClick={handleLinkClick} activeContent={activeContent} />
      <div className="flex-1 p-6">
        {/* Conditional rendering based on activeContent */}
        {activeContent === 'Dashboard' && (
          <StdDashboard onLinkClick={handleLinkClick} activeContent={activeContent} />
        )}
        {activeContent === 'Events Registration' && <EventsRegistration />}
        {activeContent === 'Profile' && <StdProfile />}
        {activeContent === 'Logout' && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Logging out...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
