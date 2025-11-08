import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullseye,
  faUsers,
  faLightbulb,
  faHeart,
  faRocket,
  faGraduationCap,
  faHandshake,
  faTrophy
} from '@fortawesome/free-solid-svg-icons';

const teamMembers = [
  {
    name: "Youssef RAMI",
    role: "Front-End Developer",
    image: "/img/youssef.png",
    description: "Crafting beautiful and intuitive user interfaces"
  },
  {
    name: "Moad SADIDI",
    role: "Back-end Developer",
    image: "/img/rayan.png",
    description: "Building robust and scalable backend systems"
  },
];

const values = [
  {
    icon: faHeart,
    title: "Community First",
    description: "We believe in building strong, supportive communities where every student can find their place.",
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    icon: faLightbulb,
    title: "Innovation",
    description: "We constantly innovate to provide the best tools and experiences for club management.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    icon: faHandshake,
    title: "Collaboration",
    description: "We foster collaboration between students, clubs, and organizations to create meaningful connections.",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: faTrophy,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from code quality to user experience.",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <FontAwesomeIcon icon={faGraduationCap} className="text-5xl" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-purple-100">
            We are a passionate team dedicated to improving student life by connecting students with clubs and activities that match their interests.
          </p>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Our Mission Section */}
          <div className="relative bg-gradient-to-br from-gray-50 to-indigo-50 rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 my-16">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-200 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8">
                <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg">
                  <FontAwesomeIcon icon={faBullseye} className="text-4xl" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto text-center">
                Our mission is to foster a <span className="font-semibold text-indigo-600">vibrant, inclusive, and engaging</span> campus community by connecting students with clubs and organizations that align with their interests and passions. We believe that extracurricular activities are a vital part of the university experience, and we are dedicated to providing a seamless platform that makes it easy for students to discover, join, and participate in clubs. By empowering club leaders with modern management tools, we aim to enhance communication, streamline operations, and create a more connected and dynamic student life.
              </p>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="my-20">
            <div className="text-center mb-12">
              <div className="inline-block p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4">
                <FontAwesomeIcon icon={faRocket} className="text-4xl text-indigo-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-gray-100 hover:border-indigo-200"
                >
                  <div className={`inline-block p-4 ${value.bgColor} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <FontAwesomeIcon icon={value.icon} className={`text-3xl ${value.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Meet the Team Section */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <div className="inline-block p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-4xl text-indigo-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                The talented individuals behind this platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {teamMembers.map((person, index) => (
                <div
                  key={person.name}
                  className="group relative bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-center border-2 border-gray-100 hover:border-indigo-200"
                >
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-10 rounded-bl-full"></div>

                  <div className="relative">
                    <div className="relative inline-block mb-6">
                      <img
                        className="h-32 w-32 rounded-full object-cover ring-4 ring-white shadow-lg group-hover:ring-indigo-200 transition-all duration-300"
                        src={person.image}
                        alt={person.name}
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{person.name}</h3>
                    <p className="text-indigo-600 font-semibold mb-3">{person.role}</p>
                    <p className="text-gray-600 text-sm">{person.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-24 text-center">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                  Join our community and discover amazing clubs and events today!
                </p>
                <button
                  onClick={() => window.location.href = '/clubs'}
                  className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Explore Clubs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
