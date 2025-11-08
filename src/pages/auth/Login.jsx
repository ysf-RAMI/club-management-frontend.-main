import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { Login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      switch (role) {
        case 'student':
          navigate('/student');
          break;
        case 'member':
          navigate('/member');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
    }
  }, [isAuthenticated, role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      console.log('Attempting login with:', email);
      await Login(email, password); // Use the login function from AuthConext
      // After successful login, the useEffect will handle navigation
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-200 to-white p-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      </div>

      <div className="relative bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-3 rounded-xl shadow-lg">
            <FontAwesomeIcon icon={faRightToBracket} className="text-white text-2xl" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-1">
          Welcome Back!
        </h2>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Sign in to continue to your account
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-xs font-medium text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
                className="block w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                className="block w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

          

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faRightToBracket} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
