import { useEffect, useState } from 'react';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const url = window.location.pathname;
    if (
      url.includes('/admin') ||
      url.includes('/member') ||
      url.includes('/AdMember') ||
      url.includes('/student')
    ) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [window.location.pathname]);

  return (
    <>
      {showFooter && (
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
              {/* Logo Section */}
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold">ClubManager</h2>
                </div>
                <p className="mt-2 text-gray-400 text-sm">
                  Empowering student communities through innovative club management solutions.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-purple-500">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-purple-500">
                      Clubs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-purple-500">
                      Events
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-purple-500">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-purple-500">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Follow Us */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-3">
                  {/* Facebook */}
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  {/* Twitter */}
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
              © 2024 ClubManager. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
