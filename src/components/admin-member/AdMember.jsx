import { useState } from 'react';
import { useNavigation } from '../common/Layout/UserLayout';
import Sidebar from '../common/Layout/Sidebar';
import AdMemberDashboard from './AdMemberDashboard';
import ClubManagement from './ClubManagment';
import EventManagement from './EventManagement';
import Profile from '../common/Profile';
import EventsRegistration from '../student/EventsRegistration';
import MemberClubs from '../member/MemberClubs';

export default function AdMember() {
  const { activeContent, setActiveContent } = useNavigation();

  const handleLinkClick = (link) => {
    setActiveContent(link);
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'Dashboard':
        return <AdMemberDashboard onLinkClick={handleLinkClick} />;
      case 'Club Management':
        return <ClubManagement />;
      case 'Events Registration':
        return <EventsRegistration onLinkClick={handleLinkClick} />;
      case 'My Club':
        return <MemberClubs />;
      case 'Event Management':
        return <EventManagement />;
      case 'Profile':
      case 'profile':
        return <Profile activeSection="profile" />;
      case 'Settings':
      case 'settings':
        return <Profile activeSection="security" />;
      case 'Logout':
        return <div>Logging out...</div>;
      default:
        return <AdMemberDashboard onLinkClick={handleLinkClick} />;
    }
  };

  return (
    <div className="flex flex-1 bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-50/30">
      <Sidebar onLinkClick={handleLinkClick} activeContent={activeContent} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

