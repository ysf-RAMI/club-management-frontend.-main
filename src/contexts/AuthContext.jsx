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

  const Register = async (name, email, password) => {

    console.log('Recieved this is credantials name : ' + name + ' email ' + email + ' passowrd : ' + password)
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(name, email, password),
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

  const checkRoleChange = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const userId = user?.id;
      if (!accessToken || !userId) return;

      // Fetch latest user data from database with clubs
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) return;

      const userData = await response.json();
      const dbRole = userData.role; // Base role from database
      const currentRole = localStorage.getItem('role'); // Current role in localStorage

      // Determine effective role based on base role and club memberships
      let effectiveRole = dbRole;

      // Only check club roles if user is currently a member in database
      if (dbRole === 'member' && userData.clubs && userData.clubs.length > 0) {
        // Check if user is admin-member in any club
        const hasAdminMemberRole = userData.clubs.some(
          (club) => club.pivot && club.pivot.role === 'admin-member'
        );

        // If they are admin-member in at least one club, prioritize that role
        if (hasAdminMemberRole) {
          effectiveRole = 'admin-member';
        }
      }

      // Always check if roles are different (handles base role changes like member -> student)
      if (effectiveRole !== currentRole) {
        console.log(`Role changed from ${currentRole} to ${effectiveRole}`);

        // Update all user data
        setUser(userData);
        setRole(effectiveRole);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', effectiveRole);

        // Show notification
        toast.info(`Your role has been updated to ${effectiveRole}. Redirecting...`);

        // Redirect based on effective role
        setTimeout(() => {
          switch (effectiveRole) {
            case 'admin':
              window.location.href = '/admin';
              break;
            case 'admin-member':
              window.location.href = '/adminMember';
              break;
            case 'member':
              window.location.href = '/member';
              break;
            case 'student':
              window.location.href = '/student';
              break;
            default:
              window.location.href = '/';
          }
        }, 1500);
      }
    } catch (error) {
      console.error('Error checking role change:', error);
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

    // Set up intervals for token expiration check and role change check
    let tokenInterval;
    let roleInterval;

    if (newIsAuthenticated) {
      // Check token expiration every hour
      tokenInterval = setInterval(checkTokenExpiration, 60 * 60 * 1000);

      // Check for role changes every 5 minutes
      roleInterval = setInterval(checkRoleChange, 5 * 60 * 1000);

      // Also check role immediately when component mounts
      checkRoleChange();
    }

    return () => {
      if (tokenInterval) {
        clearInterval(tokenInterval);
      }
      if (roleInterval) {
        clearInterval(roleInterval);
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

      // Store token temporarily
      setToken(access_token);
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('expires_in', expires_in);

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

      // If user is a member, fetch detailed club info to determine effective role
      let effectiveRole = role;

      if (role === 'member' && userData.id) {
        try {
          const detailedUserResponse = await fetch(`${API_BASE_URL}/api/users/${userData.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${access_token}`,
            },
          });

          if (detailedUserResponse.ok) {
            const detailedUserData = await detailedUserResponse.json();

            // Check if user has admin-member role in any club
            if (detailedUserData.clubs && detailedUserData.clubs.length > 0) {
              const hasAdminMemberRole = detailedUserData.clubs.some(
                club => club.pivot?.role === 'admin-member'
              );

              if (hasAdminMemberRole) {
                effectiveRole = 'admin-member';
              }
            }

            // Use detailed user data with clubs
            setUser(detailedUserData);
            localStorage.setItem('user', JSON.stringify(detailedUserData));
          } else {
            // Fallback to basic user data
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } catch (err) {
          console.error('Error fetching detailed user data:', err);
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } else {
        // For non-member roles, use basic user data
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }

      // Store the effective role
      setRole(effectiveRole);
      localStorage.setItem('role', effectiveRole);

      toast.success('Login successful!');
      return { ...data, role: effectiveRole };
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
        checkRoleChange,
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
