import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faUsers } from '@fortawesome/free-solid-svg-icons';

const teamMembers = [
  { name: "Youssef RAMI", role: "Front-End Developer", image: "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" },
  { name: "Moad SADIDI", role: "Back-end Developer", image: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" },
];

const About = () => {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-12 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg mt-4">
        We are a passionate team dedicated to improving student life by connecting students with clubs and activities that match their interests.
        </p>
      </div>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Our Mission Section */}
          <div className="bg-gray-50 rounded-lg shadow-inner p-8 my-12">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faBullseye} className="text-indigo-600 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to foster a vibrant, inclusive, and engaging campus community by connecting students with clubs and organizations that align with their interests and passions. We believe that extracurricular activities are a vital part of the university experience, and we are dedicated to providing a seamless platform that makes it easy for students to discover, join, and participate in clubs. By empowering club leaders with modern management tools, we aim to enhance communication, streamline operations, and create a more connected and dynamic student life.
            </p>
          </div>

          {/* Meet the Team Section */}
          <div className="mx-auto mt-20 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex items-center mb-8">
                <FontAwesomeIcon icon={faUsers} className="text-indigo-600 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">Meet the Team</h2>
            </div>
            <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-2">
              {teamMembers.map((person) => (
                <li key={person.name} className="flex flex-col items-center text-center">
                  <img className="h-24 w-24 rounded-full object-cover" src={person.image} alt="" />
                  <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm leading-6 text-gray-600">{person.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
