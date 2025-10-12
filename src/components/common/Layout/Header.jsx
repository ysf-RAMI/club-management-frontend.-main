import { useEffect, useState } from 'react';
import DashHeader from './DashHeader';

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const url = window.location.pathname;
    if (
      url.includes('/admin') ||
      url.includes('/member') ||
      url.includes('/AdMember') ||
      url.includes('/student')
    ) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [window.location.pathname]);

  return (
    <>
      {showHeader ? (
        <header className="bg-white border-b-2 border-gray-100">
          <nav
            aria-label="Global"
            className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          >
            <div className="flex lg:flex-1">
              <a href="/" className="-m-1.5 p-1.5">
                <p className="text-black font-bold">ClubManagement</p>
              </a>
            </div>

            <div className="hidden lg:flex lg:gap-x-12 text-black">
              <a
                href="/"
                className={`text-sm/6 font-semibold hover:text-[#6366f1] ${window.location.pathname === '/' ? 'text-[#6366f1] underline' : ''}`}
              >
                Home
              </a>
              <a
                href="/clubs"
                className={`text-sm/6 font-semibold hover:text-[#6366f1] ${window.location.pathname.startsWith('/clubs') ? 'text-[#6366f1] underline' : ''}`}
              >
                Clubs
              </a>
              <a
                href="/events"
                className={`text-sm/6 font-semibold hover:text-[#6366f1] ${window.location.pathname.startsWith('/events') ? 'text-[#6366f1] underline' : ''}`}
              >
                Events
              </a>
              <a
                href="/about"
                className={`text-sm/6 font-semibold hover:text-[#6366f1] ${window.location.pathname.startsWith('/about') ? 'text-[#6366f1] underline' : ''}`}
              >
                About
              </a>
              <a
                href="/contact"
                className={`text-sm/6 font-semibold hover:text-[#6366f1] ${window.location.pathname === '/contact' ? 'text-[#6366f1] underline' : ''}`}
              >
                Contact
              </a>
            </div>

            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="/login" className="text-sm/6 font-semibold text-black px-4 py-2">
                Login
              </a>
              <button
                onClick={() => (window.location.href = '/register')}
                className="text-sm/6 font-semibold text-white bg-[#6366f1] px-4 py-2 rounded-md hover:bg-[#5a5dcc] active:bg-[#4a4dcc] cursor-pointer"
              >
                Register
              </button>
            </div>
          </nav>
        </header>
      ) : (
        <DashHeader />
      )}
    </>
  );
}
