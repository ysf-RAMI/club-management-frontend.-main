import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { isAuthenticated, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(role))) {
        navigate('/login');
      }
    }
  }, [isAuthenticated, role, allowedRoles, navigate, loading]);

  if (loading) {
    return <div>Loading authentication...</div>; // Or a spinner/loading component
  }

  return isAuthenticated && (!allowedRoles || allowedRoles.includes(role)) ? children : null;
};

export default ProtectedRoutes;
