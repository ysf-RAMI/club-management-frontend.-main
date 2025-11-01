import { createContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { toast } from 'react-toastify';

const AuthConext = createContext();

const AuthConextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthenticationStatus = () => {
    const storedAccessToken = localStorage.getItem('access_token');
    storedAccessToken ? setIsAuthenticated(true) : setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.access_token);
        console.log('Login API response data:', data);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('expires_in', data.expires_in);
        return true;
      } else {
        console.error('Failed to refresh token:', data);
        logout();
        return false;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      return false;
    }
  };

  const checkTokenExpiration = async () => {
    const expiresIn = localStorage.getItem('expires_in');
    const accessToken = localStorage.getItem('access_token');

    if (expiresIn && accessToken) {
      const expirationTime = parseInt(expiresIn) * 1000; // Convert to milliseconds
      const currentTime = Date.now();

      if (currentTime >= expirationTime) {
        console.log('Access token expired, attempting to refresh...');
        const refreshed = await refreshToken();
        if (!refreshed) {
          console.log('Failed to refresh token, logging out.');
          logout();
        }
      }
    }
  };

  useEffect(() => {
    checkAuthenticationStatus();
    const interval = setInterval(checkTokenExpiration, 60 * 1000); // Check every minute
    return () => clearInterval(interval);
  }, [token]);

  const Login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login API response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const { access_token, role, expires_in } = data;

      // Store token and role
      setToken(access_token);
      setRole(role);
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('expires_in', expires_in);
      localStorage.setItem('role', role);
      console.log('Expires In from API response (Login):', expires_in);
      console.log('Expires In from Local Storage (Login):', localStorage.getItem('expires_in'));

      // Fetch user details using the access token
      const userResponse = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });
      console.log('User details API response:', userResponse);

      const userData = await userResponse.json();
      console.log('User details data:', userData);

      if (!userResponse.ok) {
        throw new Error(userData.message || 'Failed to fetch user details');
      }

      // Store user details
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuthenticated(true);
      toast.success('Login successful!');
      return data;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please try again.');
      throw error;
    }
  };

  const Logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Logout successful!');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_in');
      setUser(null);
      setToken(null);
      setRole(null);
      setIsAuthenticated(false);
    }
  };

  const Register = async (userData) => {
    try {
      console.log('Registering user with data:', userData);
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Registration API response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const { access_token, role } = data;

      // Store token and role
      setToken(access_token);
      setRole(role);
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', role);

      // Fetch user details using the access token
      const userResponse = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });
      console.log('User details API response (Register):', userResponse);

      const userData = await userResponse.json();
      console.log('User details data (Register):', userData);

      if (!userResponse.ok) {
        throw new Error(userData.message || 'Failed to fetch user details after registration');
      }

      // Store user details
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuthenticated(true);
      toast.success('Registration successful!');
      return data;
    } catch (error) {
      console.error('Registration error in AuthContext:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
      throw error;
    }
  };

  const Refresh = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Token refresh failed');
      }

      setToken(data.token);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  };

  return (
    <AuthConext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        role,
        setRole,
        Login,
        Logout,
        Register,
        Refresh,
        isAuthenticated,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthConext.Provider>
  );
};

export { AuthConext, AuthConextProvider };

export default AuthConextProvider;
