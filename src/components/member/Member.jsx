import { useState } from 'react';
import Sidebar from '../common/Layout/Sidebar';
import MemberDashboard from './MemberDashboard';
import MemberClubs from './MemberClubs';
import Events from './Events';
import ClubFiles from './ClubFiles';
import MemberProfile from './MemberProfile';

export default function Member() {
  const [activeContent, setActiveContent] = useState('Dashboard'); // Default content

  const handleLinkClick = (link) => {
    setActiveContent(link);
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar onLinkClick={handleLinkClick} activeContent={activeContent} />
      <div className="flex-1 p-4">
        {/* Conditional rendering based on activeContent */}
        {activeContent === 'Dashboard' && (
          <MemberDashboard onLinkClick={handleLinkClick} activeContent={activeContent} />
        )}
        {activeContent === 'My Clubs' && <MemberClubs onLinkClick={handleLinkClick} activeContent={activeContent} />}
        {activeContent === 'Events' && <Events />}
        {activeContent === 'Club Files' && <ClubFiles />}
        {activeContent === 'Profile' && <MemberProfile />}
        {activeContent === 'Logout' && <div>Logging out...</div>}
      </div>
    </div>
  );
}
