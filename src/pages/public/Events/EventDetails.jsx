export default function EventDetails() {
  return (
    <div className="min-h-screen bg-gray-100 max-w-7xl mx-auto">
      <p className=" bg-white text-indigo-600 text-lg p-4  border-b border-gray-100">
        <span className=" text-blue-600">Home</span> <span className="text-gray-600">&gt; </span>
        <span className="text-blue-600">Events</span>
        <span className="text-gray-600"> &gt; </span>
        <span className="text-gray-600">Event Details</span>
      </p>
      <div className="relative bg-white shadow-md">
        <img
          className="w-full h-96 object-cover"
          src="/img/Hero.jpg" // Replace with actual event image
          alt="Event Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <div className="flex space-x-2 mb-2">
            <span className="bg-violet-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Robotics Club
            </span>
            <span className="bg-gray-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Workshop
            </span>
          </div>
          <h1 className="text-4xl font-bold">Robot Building Workshop</h1>
          <p className="text-xl">Hands-on experience building your first autonomous robot</p>
        </div>
      </div>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Event Description</h2>
            <p className="mb-4">
              Join us for an exciting hands-on workshop where you'll learn to build your very first
              autonomous robot! This comprehensive session is perfect for beginners and intermediate
              learners who want to dive into the world of robotics.
            </p>
            <p className="mb-6">
              During this 3-hour intensive workshop, you'll work with industry-standard components
              including Arduino microcontrollers, ultrasonic sensors, servo motors, and various
              electronic components. Our experienced instructors will guide you through each step of
              the building process.
            </p>

            <h3 className="text-xl font-semibold mb-3">What You'll Learn:</h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>Arduino programming fundamentals</li>
              <li>Sensor integration and data processing</li>
              <li>Motor control and movement algorithms</li>
              <li>Circuit design and electronic connections</li>
              <li>Debugging and troubleshooting techniques</li>
              <li>Basic autonomous navigation principles</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">What's Included:</h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>Complete robot kit (Arduino, sensors, motors, chassis)</li>
              <li>All necessary tools and components</li>
              <li>Step-by-step instruction manual</li>
              <li>Light refreshments and snacks</li>
              <li>Certificate of completion</li>
              <li>Access to online resources and community</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Prerequisites:</h3>
            <p className="mb-6">
              No prior experience required! This workshop is designed for complete beginners. Basic
              computer literacy is helpful but not mandatory. We'll provide all the guidance you
              need.
            </p>

            <h3 className="text-xl font-semibold mb-3">What to Bring:</h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>Laptop with USB port (we'll help with software setup)</li>
              <li>Notebook and pen for taking notes</li>
              <li>Enthusiasm to learn and create!</li>
            </ul>
          </div>
          {/* Sidebar content will go here */}
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <p className="text-2xl font-bold text-violet-600 mb-2">FREE</p>
              <p className="text-sm text-gray-500">All materials included</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                {/* Calendar icon */}
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">November 15, 2024</p>
                  <p className="text-sm text-gray-500">Friday</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Clock icon */}
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">2:00 PM - 5:00 PM</p>
                  <p className="text-sm text-gray-500">3 hours duration</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Location icon */}
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">Engineering Lab 3</p>
                  <p className="text-sm text-gray-500">Building A, 2nd Floor</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Users icon */}
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM9 17a1 1 0 100-2h2a1 1 0 100 2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M11.02 1.02a4 4 0 014 4v1a1 1 0 11-2 0V5a2 2 0 00-2-2h-1a2 2 0 00-2 2v1a1 1 0 11-2 0V5a4 4 0 014-4h1zM4 13a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">25 / 30 Registered</p>
                  <p className="text-sm text-gray-500">5 spots remaining</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Graduation cap icon */}
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0L.292 6.757A1 1 0 000 7.667V16a2 2 0 002 2h16a2 2 0 002-2V7.667a1 1 0 00-.292-.91L10.394 2.08zM18 14.75V16H2v-1.25L10 9.75l8 5zM10 8a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">Beginner Level</p>
                  <p className="text-sm text-gray-500">No experience required</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-violet-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-violet-700 mb-4">
              {/* Plus icon */}
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Register Now</span>
            </button>

            <div className="flex space-x-4 mb-6">
              <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-300">
                {/* Heart icon */}
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Save</span>
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-300">
                {/* Share icon */}
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.683l-4.94 2.47a3 3 0 100 4.366l4.94 2.471A3 3 0 1015 12a3 3 0 00-3-3h-1.023l-4.94-2.471A3 3 0 005 12a3 3 0 003 3h1.023l4.94 2.471A3 3 0 1015 8z" />
                </svg>
                <span>Share</span>
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Event Organizer</h3>
              <div className="flex items-center space-x-3 mb-2">
                <img className="h-10 w-10 rounded-full" src="/img/Club1.png" alt="Club Logo" />{' '}
                {/* Replace with actual club logo */}
                <div>
                  <p className="text-sm font-medium text-gray-900">Robotics Club</p>
                  <p className="text-sm text-gray-500">150 members</p>
                </div>
              </div>
              <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300">
                View Club Profile
              </button>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Contact</h3>
              <div className="flex items-center space-x-3 mb-2">
                {/* Mail icon */}
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0018 4H2a2 2 0 00-.003 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p className="text-sm text-gray-900">robotics@university.edu</p>
              </div>
              <div className="flex items-center space-x-3">
                {/* Phone icon */}
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <p className="text-sm text-gray-900">(555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img
              className="w-full h-48 object-cover rounded-lg"
              src="/img/Club1.png"
              alt="Gallery Image 1"
            />
            <img
              className="w-full h-48 object-cover rounded-lg"
              src="/img/Club2.png"
              alt="Gallery Image 2"
            />
            <img
              className="w-full h-48 object-cover rounded-lg"
              src="/img/Club3.png"
              alt="Gallery Image 3"
            />
          </div>
        </div>

        {/* Instructor Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-4">Instructor</h2>
          <div className="flex items-center space-x-4">
            <img
              className="h-20 w-20 rounded-full object-cover"
              src="/img/Capture.PNG"
              alt="Instructor"
            />{' '}
            {/* Replace with actual instructor image */}
            <div>
              <p className="text-lg font-semibold">Dr. Sarah Chen</p>
              <p className="text-sm text-gray-600">Robotics Engineering Professor</p>
              <p className="text-sm text-gray-700 mt-2">
                Dr. Chen has over 10 years of experience in robotics research and education. She
                specializes in autonomous systems and has published numerous papers on robot
                navigation and AI integration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Events Section - outside the main grid but within the container */}
      <div className="container mx-auto p-8">
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-4">Related Events</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                className="h-16 w-16 object-cover rounded-lg"
                src="/img/Club1.png"
                alt="Related Event 1"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">Coding Hackathon 2024</p>
                <p className="text-xs text-gray-500">Nov 18, 2024</p>
                <p className="text-xs text-violet-600">Programming Club</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                className="h-16 w-16 object-cover rounded-lg"
                src="/img/Club2.png"
                alt="Related Event 2"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">AI & ML Seminar</p>
                <p className="text-xs text-gray-500">Dec 10, 2024</p>
                <p className="text-xs text-violet-600">Robotics Club</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
