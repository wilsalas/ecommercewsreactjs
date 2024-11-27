import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  requiredRole?: string;
  redirectTo?: string;
}

const useAppSelector = () => {
  return {
    user: { role: 'admin', email: 'test@example.com' },
    isAuthenticated: false,
  };
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  redirectTo = '/sign-in',
}): JSX.Element => {
  const { user, isAuthenticated } = useAppSelector();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoute;
