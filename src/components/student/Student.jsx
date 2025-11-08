import { useState } from 'react';
import Sidebar from '../common/Layout/Sidebar';
import { useNavigation } from '../common/Layout/UserLayout';
import StdDashboard from './StdDashboard';
import EventsRegistration from './EventsRegistration';
import Profile from '../common/Profile';

export default function Student() {
  const { activeContent, setActiveContent } = useNavigation();
  const [hasClubs, setHasClubs] = useState(false); // Assume student has no clubs initially

  const handleLinkClick = (link) => {
    setActiveContent(link);
  };

  const studentUser = {
    firstName: "Alex",
    lastName: "Ray",
    email: "alex.ray@university.edu",
    phone: "+1 (555) 555-5555",
    department: "Science",
    bio: "A curious student exploring the world of science and technology. Eager to join clubs and participate in exciting events.",
    role: "Student",
    profilePicture: "/img/Club3.png"
  }

  return (
    <div className="flex flex-1 bg-gray-50">
      <Sidebar onLinkClick={handleLinkClick} activeContent={activeContent} />
      <div className="flex-1 p-4">
        {/* Conditional rendering based on activeContent */}
        {activeContent === 'Dashboard' && (
          <StdDashboard onLinkClick={handleLinkClick} activeContent={activeContent} />
        )}
        {activeContent === 'Events Registration' && <EventsRegistration />}
        {activeContent === 'Profile' && <Profile user={studentUser} activeSection="profile" />}
        {activeContent === 'Settings' && <Profile user={studentUser} activeSection="security" />}
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
