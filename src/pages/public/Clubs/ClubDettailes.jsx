import React from 'react';
import { useParams } from 'react-router-dom';
import {
  FaUsers,
  FaAward,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaGlobe,
  FaTwitter,
} from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const clubData = {
  id: 'robotics-club',
  name: 'Robotics Club',
  image: '/img/Hero.jpg',
  tags: ['Technology', 'Active'],
  description:
    "The Robotics Club is a dynamic community of students passionate about robotics, automation, and cutting-edge technology. We provide hands-on experience with robot design, programming, and competitive robotics. Our members work on exciting projects ranging from autonomous vehicles to industrial automation systems. Whether you're a beginner interested in learning the basics or an experienced programmer looking to push the boundaries of what's possible, our club offers opportunities for everyone. We participate in national robotics competitions and collaborate with industry professionals.",
  members: 46,
  awards: 12,
  founded: 2019,
  meetingFrequency: 'Weekly',
  requirements: [
    'Basic programming knowledge (any language)',
    'Interest in robotics and automation',
    'Commitment to attend weekly meetings',
    'Willingness to work in teams',
  ],
  officers: [
    {
      name: 'Alex Johnson',
      role: 'President',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Sarah Chen',
      role: 'Vice President',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Mike Rodriguez',
      role: 'Technical Lead',
      avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    },
  ],
  meeting: {
    day: 'Every Wednesday',
    time: '7:00 PM - 9:00 PM',
    location: 'Engineering Building, Room 203',
  },
  contact: {
    email: 'robotics@university.edu',
    website: 'RoboticsClub1234',
    twitter: '@uni_robotics',
  },
  events: [
    {
      id: 1,
      title: 'Robot Building Workshop',
      description:
        'Hands-on workshop for building your first autonomous robot using Arduino and sensors.',
      date: 'Nov 18, 2024',
      time: '6:00 PM - 8:00 PM',
      location: 'Engineering Lab 1',
    },
    {
      id: 2,
      title: 'Regional Robotics Competition',
      description:
        'Compete against other universities in the annual robotics challenge championship.',
      date: 'Dec 2, 2024',
      time: '9:00 AM - 5:00 PM',
      location: 'Convention Center',
    },
    {
      id: 3,
      title: 'AI & Machine Learning Seminar',
      description:
        'Guest speaker from Tesla will discuss the future of AI in robotics and autonomous systems.',
      date: 'Dec 15, 2024',
      time: '7:00 PM - 9:00 PM',
      location: 'Main Auditorium',
    },
  ],
  similarClubs: [
    {
      id: 'programming-club',
      name: 'Programming Club',
      image: '/img/Club1.png',
      category: 'Technology',
      status: 'Active',
      description: 'Learn coding, participate in hackathons, and build amazing software projects.',
      members: 50,
      events: 4,
    },
    {
      id: 'engineering-society',
      name: 'Engineering Society',
      image: '/img/Club2.png',
      category: 'Engineering',
      status: 'Active',
      description: 'Design and build innovative engineering solutions for real-world problems.',
      members: 75,
      events: 6,
    },
    {
      id: 'vr-ar-club',
      name: 'VR/AR Club',
      image: '/img/Club3.png',
      category: 'Technology',
      status: 'Moderate',
      description:
        'Explore virtual and augmented reality technologies and create immersive experiences.',
      members: 30,
      events: 3,
    },
  ],
};

export default function ClubDettailes() {
  const { id } = useParams();
  // In a real application, you would fetch club data based on the ID
  const club = clubData; // Using dummy data for now

  if (!club) {
    return <div>Club not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <p className=" bg-white text-indigo-600 text-lg p-4 border-b border-gray-300 shadow-md">
        <div className="max-w-7xl mx-auto">
          <span className="font-bold text-blue-600">Home</span> &gt;{' '}
          <span className="font-bold text-blue-600">Clubs</span> &gt;{' '}
          <span className="font-bold text-black">{club.name}</span>
        </div>
      </p>
      <div className="max-w-7xl mx-auto">
        <div
          className="relative h-96 bg-cover bg-center max-w-7xl mx-auto"
          style={{ backgroundImage: `url(${club.image})` }}
        >
          <div className="absolute inset-0 flex justify-between items-end p-8">
            <div className="flex flex-col items-start justify-end h-full">
              <div className="flex space-x-2 mb-2">
                {club.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-5xl font-bold">{club.name}</h1>
              <p className="text-xl mt-2">{club.tagline}</p>
              <div className="mt-4 flex items-center space-x-4">
                <span className="flex items-center text-lg">
                  <FaUsers className="mr-2" /> {club.members} Members
                </span>
                <span className="flex items-center text-lg">
                  <FaCalendarAlt className="mr-2" /> Founded {club.founded}
                </span>
              </div>
              <p className="mt-4 text-lg max-w-2xl">{club.description.slice(0, 100)}...</p>
            </div>
            <div>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
                Join Club
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About the Club */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">About the Club</h2>
              <p className="text-gray-700 mb-6">{club.description}</p>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-purple-600" />
                  <span>{club.members} Members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaAward className="text-purple-600" />
                  <span>{club.awards} Awards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-purple-600" />
                  <span>Founded {club.founded}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-purple-600" />
                  <span>{club.meetingFrequency} Meeting Frequency</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Requirements to Join</h3>
              <ul className="space-y-2 text-gray-700">
                {club.requirements.map((req, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <IoMdCheckmarkCircleOutline className="text-green-500" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {club.events.map((event) => (
                  <div
                    key={event.id}
                    className="flex justify-between items-center p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-gray-600 text-sm">{event.description}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        <FaCalendarAlt className="inline mr-1" /> {event.date} |{' '}
                        <FaClock className="inline mr-1" /> {event.time} |{' '}
                        <FaMapMarkerAlt className="inline mr-1" /> {event.location}
                      </p>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                      Register
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Club Officers */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Club Officers</h2>
              <div className="space-y-4">
                {club.officers.map((officer, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={officer.avatar}
                      alt={officer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{officer.name}</p>
                      <p className="text-sm text-gray-600">{officer.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meeting Schedule */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Meeting Schedule</h2>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-purple-600" />
                  <span>{club.meeting.day}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <FaClock className="text-purple-600" />
                  <span>{club.meeting.time}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-purple-600" />
                  <span>{club.meeting.location}</span>
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center space-x-2">
                  <FaEnvelope className="text-purple-600" />
                  <span>{club.contact.email}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <FaGlobe className="text-purple-600" />
                  <span>{club.contact.website}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <FaTwitter className="text-purple-600" />
                  <span>{club.contact.twitter}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Clubs */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-6">Similar Clubs You Might Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {club.similarClubs.map((similarClub) => (
              <div key={similarClub.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={similarClub.image}
                  alt={similarClub.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {similarClub.category}
                    </span>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${similarClub.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {similarClub.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{similarClub.name}</h3>
                  <p className="text-gray-700 text-sm mb-4">{similarClub.description}</p>
                  <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
                    <span>{similarClub.members} members</span>
                    <span>{similarClub.events} events</span>
                  </div>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
