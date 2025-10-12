import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're here to help. Reach out to us with any questions or feedback.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg shadow-inner p-8">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-600 text-2xl mr-4" />
              <h3 className="text-xl font-semibold text-gray-800">Our Office</h3>
            </div>
            <p className="text-gray-700">123 University Ave, Campus Town, 12345</p>
          </div>

          <div className="bg-gray-50 rounded-lg shadow-inner p-8">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faPhone} className="text-indigo-600 text-2xl mr-4" />
              <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
            </div>
            <p className="text-gray-700">(123) 456-7890</p>
          </div>

          <div className="bg-gray-50 rounded-lg shadow-inner p-8">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faPaperPlane} className="text-indigo-600 text-2xl mr-4" />
              <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
            </div>
            <p className="text-gray-700">contact@clubmanagement.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-20">
          <form action="#" method="POST" className="mx-auto max-w-xl">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">First name</label>
                <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">Last name</label>
                <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">Message</label>
                <textarea name="message" id="message" rows="4" className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
            </div>
            <div className="mt-10">
              <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
