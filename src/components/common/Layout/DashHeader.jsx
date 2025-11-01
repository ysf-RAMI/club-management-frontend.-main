import { useContext } from 'react';
import { AuthConext } from '../../../contexts/AuthContext';

export default function DashHeader() {
  const { user, Logout } = useContext(AuthConext);

  return (
    <header className="bg-white border-b-2 border-gray-100 flex justify-between items-center max-w-7xl mx-auto">
      <nav aria-label="Global" className=" flex max-w-7xl items-center p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <p className="text-black font-bold">ClubManagement</p>
          </a>
        </div>
      </nav>
      <nav className="flex gap-4">
        <div className="flex">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <img src="/img/Club1.png" alt="" className="w-18 h-10 rounded-full" />
          </div>
        </div>
        <div className="flex items-center hover:text-blue-500 cursor-pointer">
          {user?.name?.toUpperCase()}
        </div>
      </nav>
    </header>
  );
}
