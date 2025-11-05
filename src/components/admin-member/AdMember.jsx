import { useState } from 'react';
import Sidebar from '../common/Layout/Sidebar';
import AdMemberDashboard from './AdMemberDashboard';
import ClubManagement from './ClubManagment';
import EventManagement from './EventManagement';
import ClubFilesManagment from './ClubFilesManagment';
import Profile from '../common/Profile';
import EventsRegistration from '../student/EventsRegistration';
import MemberClubs from '../member/MemberClubs';

export default function AdMember() {
  const [activeContent, setActiveContent] = useState('Dashboard'); // Default content

  const handleLinkClick = (link) => {
    setActiveContent(link);
  };

  const adMemberUser = {
    firstName: 'Chris',
    lastName: 'Green',
    email: 'chris.green@university.edu',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    bio: 'A dedicated admin member, ensuring smooth operations for all club activities. Passionate about creating a vibrant and engaging campus community.',
    role: 'Admin Member',
    profilePicture: '/img/Club4.png',
  };

  return (
    <div className="flex">
      <Sidebar onLinkClick={handleLinkClick} activeContent={activeContent} />
      <div className="flex-1 p-4">
        {/* Conditional rendering based on activeContent */}
        {activeContent === 'Dashboard' && <AdMemberDashboard onLinkClick={handleLinkClick} />}
        {activeContent === 'Club Management' && <ClubManagement />}
        {activeContent === 'Events Registration' && (
          <EventsRegistration onLinkClick={handleLinkClick} />
        )}
        {activeContent === 'My Club' && <MemberClubs />}
        {activeContent === 'Event Management' && <EventManagement />}
        {activeContent === 'Club Files' && <ClubFilesManagment />}
        {activeContent === 'Profile' && <Profile user={adMemberUser} />}
        {activeContent === 'Logout' && <div>Logging out...</div>}
      </div>
    </div>
  );
}
