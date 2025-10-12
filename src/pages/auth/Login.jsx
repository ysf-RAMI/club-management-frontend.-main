import { useEffect, useState } from 'react';

const Login = () => {
  const [activeTab, setActiveTab] = useState();
  const url = window.location.href;
  useEffect(() => {
    url.includes('register') ? setActiveTab('register') : setActiveTab('login');
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-12 bg-gradient-to-br from-white to-indigo-50">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-10 p-8 max-w-7xl mx-auto">
        {/* Left Section: Join Our Community */}
        <div className="text-center lg:text-left mb-10 lg:mb-0 max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Join Our <span className="text-indigo-600">Community</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Connect with like-minded students, join exciting clubs, and participate in amazing
            events that shape your university experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-2">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h-10a4 4 0 01-4-4V8a4 4 0 014-4h10a4 4 0 014 4v8a4 4 0 01-4 4z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Join Clubs</h3>
              <p className="text-sm text-gray-500 text-center">
                Discover and join clubs that match your interests
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-2">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Attend Events</h3>
              <p className="text-sm text-gray-500 text-center">
                Participate in workshops, seminars, and activities
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-2">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Build Network</h3>
              <p className="text-sm text-gray-500 text-center">
                Connect with peers and build lasting relationships
              </p>
            </div>
          </div>
          <div className="flex justify-center space-x-8 mt-8">
            <div>
              <p className="text-3xl font-bold text-indigo-600">50+</p>
              <p className="text-gray-500">Active Clubs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">200+</p>
              <p className="text-gray-500">Events Monthly</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">1500+</p>
              <p className="text-gray-500">Active Members</p>
            </div>
          </div>
        </div>

        {/* Right Section: Login/Register Form */}
        <div className="bg-white p-8 rounded-md shadow-md w-96">
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 text-sm font-medium flex items-center ${activeTab === 'login' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              onClick={() => setActiveTab('login')}
            >
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium flex items-center ${activeTab === 'register' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              onClick={() => setActiveTab('register')}
            >
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Register
            </button>
          </div>
          {activeTab === 'login' ? (
            <>
              <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back!</h2>
              <p className="text-center text-gray-500 text-sm mb-6">
                Sign in to access your account
              </p>
              <form>
                <div className="mb-4 relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 sr-only"
                  >
                    Email
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 pl-10 block w-full border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 sr-only"
                  >
                    Password
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 pl-10 block w-full border border-gray-300 rounded-md"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mb-4">
                  <button
                    type="submit"
                    className="w-full p-2 bg-[#6366f1] text-white rounded-md hover:bg-[#4f54c9] flex items-center justify-center"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign In
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
              <form>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 sr-only"
                    >
                      First Name
                    </label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="mt-1 p-2 pl-10 block w-full border border-gray-300 rounded-md"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 sr-only"
                    >
                      Last Name
                    </label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="mt-1 p-2 pl-10 block w-full border border-gray-300 rounded-md"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4 relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 sr-only"
                  >
                    Email Address
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 pl-10 block w-full border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label
                    htmlFor="studentId"
                    className="block text-sm font-medium text-gray-700 sr-only"
                  >
                    Student ID
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    className="mt-1 p-2 pl-10 block w-full border border-gray-300 rounded-md"
                    placeholder="Enter your student ID"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 sr-only"
                  >
                    Password
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 pl-10 block w-full border border-gray-300 rounded-md"
                    placeholder="Create password"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 sr-only"
                  >
                    Confirm Password
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="mt-1 p-2 pl-10 block w-full border border-gray-300 rounded-md"
                    placeholder="Confirm password"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 sr-only">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  >
                    <option>Student</option>
                    <option>Faculty</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div className="mb-4 flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-500">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-500">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                <div className="mb-4">
                  <button
                    type="submit"
                    className="w-full p-2 bg-[#6366f1] text-white rounded-md hover:bg-[#4f54c9]"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </>
          )}
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-3">
              <button className="w-1/2 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <img className="h-5 w-5 mr-2" src="/img/google.svg" alt="Google" />
                Google
              </button>
              <button className="w-1/2 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <img className="h-5 w-5 mr-2" src="/img/microsoft.svg" alt="Microsoft" />
                Microsoft
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose ClubManager Section */}
      <div className="w-full max-w-7xl mt-10 px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Why Choose ClubManager?
        </h2>
        <div className="flex flex-col lg:flex-row justify-around items-center space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="flex flex-col items-center max-w-xs">
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <svg
                className="h-10 w-10 text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Easy Management</h3>
            <p className="text-sm text-gray-500">
              Streamlined tools for club administrators to manage members, events, and
              communications effortlessly.
            </p>
          </div>
          <div className="flex flex-col items-center max-w-xs">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <svg
                className="h-10 w-10 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Mobile Friendly</h3>
            <p className="text-sm text-gray-500">
              Access everything on the go with our responsive design that works perfectly on all
              devices.
            </p>
          </div>
          <div className="flex flex-col items-center max-w-xs">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <svg
                className="h-10 w-10 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.003 12.003 0 002.92 12c0 3.072 1.874 5.798 4.515 7.553A12.003 12.003 0 0012 21c3.072 0 5.798-1.874 7.553-4.515A12.003 12.003 0 0021.08 12c0-3.072-1.874-5.798-4.515-7.553z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Secure & Private</h3>
            <p className="text-sm text-gray-500">
              Your data is protected with enterprise-grade security and privacy controls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
