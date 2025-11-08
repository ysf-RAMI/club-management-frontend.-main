import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faComments,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: faMapMarkerAlt,
      title: "Visit Us",
      content: "ibn Zohr University, Agadir, Morocco",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: faPhone,
      title: "Call Us",
      content: "+212 619703358",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: faEnvelope,
      title: "Email Us",
      content: "yousseframi012@gmail.com",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <FontAwesomeIcon icon={faComments} className="text-5xl" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-purple-100">
            Have questions or feedback? We'd love to hear from you. Reach out and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center border-2 border-gray-100 hover:border-indigo-200"
            >
              <div className={`inline-block p-5 ${info.bgColor} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <FontAwesomeIcon icon={info.icon} className={`text-3xl ${info.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
              <p className="text-gray-600">{info.content}</p>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Fill out the form and our team will get back to you within 24 hours. We're here to help with any questions about clubs, events, or the platform.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faCheck} className="text-indigo-600" />
                What to Expect
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                  <span>Quick response time (usually within 24 hours)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                  <span>Friendly and knowledgeable support team</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                  <span>Helpful solutions to your questions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                  <span>Follow-up assistance if needed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-gray-900 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-2 border-gray-200 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Youssef"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-gray-900 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-2 border-gray-200 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Rami"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-2 border-gray-200 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200"
                  placeholder="youssef.rami@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-2 border-gray-200 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-center text-base font-bold text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Additional CTA Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 rounded-3xl shadow-2xl p-12 text-white text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Prefer to Explore First?</h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Check out our clubs and upcoming events to see what we're all about!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/clubs'}
                  className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Browse Clubs
                </button>
                <button
                  onClick={() => window.location.href = '/events'}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  View Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
