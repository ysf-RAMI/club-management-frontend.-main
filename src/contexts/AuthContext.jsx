import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config/api';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('access_token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.access_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('expires_in', data.expires_in);
        return true;
      } else {
        Logout();
        return false;
      }
    } catch (error) {
      Logout();
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
        const refreshed = await refreshToken();
        if (!refreshed) {
          Logout();
        }
      }
    }
  };

  useEffect(() => {
    const newIsAuthenticated = !!token;
    setIsAuthenticated(newIsAuthenticated);
    setLoading(false);

    // Set up interval for token expiration check only if authenticated
    let interval;
    if (newIsAuthenticated) {
      interval = setInterval(checkTokenExpiration, 60 * 60 * 1000); // Check every hour
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [token]); // Dependency on token

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

      // Fetch user details using the access token
      const userResponse = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });

      const userData = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error(userData.message || 'Failed to fetch user details');
      }

      // Store user details
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Login successful!');
      return data;
    } catch (error) {
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
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Logout successful!');
    } catch (error) {
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // Ensure all token related items are removed
      localStorage.removeItem('role');
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_in');
      setUser(null);
      setToken(null);
      setRole(null);
    }
  };

  const Register = async ({ name, email, password }) => {
    try {
      setLoading(true);
      // Use exact specified API endpoint
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Match requested body structure: {name, email, password}
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response
        .json()
        .catch(() => ({ message: 'Server error, please try again later.' }));

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success('Registration successful! Please log in.');
      setLoading(false);
      return data;
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
      setLoading(false);
      throw error;
    }
  };

  const Refresh = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      throw error;
    }
  };

  return (
    <AuthContext.Provider
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
        userId: user?.id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
