import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faUserPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { Register: register, isAuthenticated, role } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'member') {
        navigate('/member');
      } else if (role === 'student') {
        navigate('/student');
      } else if (role === 'admin-member') {
        navigate('/adminMember');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register({
        "name": name,
        "email": email,
        "password": password
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-200 to-white p-4 py-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </div>

      <div className="relative bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        {/* Logo/Icon */}
        <div className="flex justify-center ">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
            <FontAwesomeIcon icon={faUserPlus} className="text-white text-2xl" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
          Create Account
        </h2>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Join us and start your journey today
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faUser} className="text-gray-400 text-sm" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="block w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 text-sm"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 text-sm" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="block w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-gray-400 text-sm" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                className="block w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 text-sm"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-sm" />
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="passwordConfirmation"
              className="block text-xs font-semibold text-gray-700 mb-1.5"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faCheckCircle} className="text-gray-400 text-sm" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="passwordConfirmation"
                name="passwordConfirmation"
                required
                className="block w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 text-sm"
                placeholder="Confirm your password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="text-sm" />
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-700 to-purple-600 hover:from-indigo-700 hover:via-purple-800 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;