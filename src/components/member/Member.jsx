import { useState } from 'react';
import Sidebar from '../common/Layout/Sidebar';
import MemberDashboard from './MemberDashboard';
import MemberClubs from './MemberClubs';
import Events from './Events';
import ClubFiles from './ClubFiles';
import Profile from '../common/Profile';

export default function Member() {
  const [activeContent, setActiveContent] = useState('Dashboard'); // Default content

  const handleLinkClick = (link) => {
    setActiveContent(link);
  };

  const memberUser = {
    firstName: "Sarah",
    lastName: "Johnson", 
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    bio: "Experienced member with a passion for student engagement and club activities. Dedicated to creating meaningful experiences for all students.",
    role: "Member",
    profilePicture: "/img/Club1.png"
  }

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
        {activeContent === 'Profile' && <Profile user={memberUser} />}
        {activeContent === 'Logout' && <div>Logging out...</div>}
      </div>
    </div>
  );
}
