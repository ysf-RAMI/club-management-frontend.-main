import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthConext } from '../../contexts/AuthContext';

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useContext(AuthConext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(role))) {
      navigate('/login');
    }
  }, [isAuthenticated, role, allowedRoles, navigate]);

  return isAuthenticated && (!allowedRoles || allowedRoles.includes(role)) ? children : null;
};

export default ProtectedRoutes;
