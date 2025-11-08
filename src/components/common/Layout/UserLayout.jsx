import { createContext, useContext, useState } from 'react';
import DashHeader from './DashHeader';
import { Outlet } from 'react-router-dom';

// Create context to share navigation handler
export const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    return { setActiveContent: () => { } }; // Fallback
  }
  return context;
};

export default function UserLayout() {
  const [activeContent, setActiveContent] = useState('Dashboard');

  const handleLinkClick = (link) => {
    setActiveContent(link);
  };

  return (
    <NavigationContext.Provider value={{ activeContent, setActiveContent: handleLinkClick }}>
      <div className="flex flex-col min-h-screen">
        <DashHeader onLinkClick={handleLinkClick} />
        <div className="flex flex-1">
          <Outlet />
        </div>
      </div>
    </NavigationContext.Provider>
  );
}
