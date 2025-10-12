import { useState } from 'react';
import Sidebar from '../common/Layout/Sidebar';
import AdMemberDashboard from './AdMemberDashboard';
import ClubManagement from './ClubManagment';
import EventManagement from './EventManagement';
import ClubFilesManagment from './ClubFilesManagment';
import AdMemberProfile from './AdMemberProfile';

export default function AdMember() {
  const [activeContent, setActiveContent] = useState('Dashboard'); // Default content

  const handleLinkClick = (link) => {
    setActiveContent(link);
  };

  return (
    <div className="flex">
      <Sidebar onLinkClick={handleLinkClick} activeContent={activeContent} />
      <div className="flex-1 p-4">
        {/* Conditional rendering based on activeContent */}
        {activeContent === 'Dashboard' && <AdMemberDashboard/>}
        {activeContent === 'Club Management' && <ClubManagement/>}
        {activeContent === 'Event Management' && <EventManagement/>}
        {activeContent === 'Club Files' && <ClubFilesManagment/>}
        {activeContent === 'Profile' && <AdMemberProfile/>}
        {activeContent === 'Logout' && <div>Logging out...</div>}
      </div>
    </div>
  );
}
