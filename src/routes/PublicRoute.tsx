import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface PublicRouteProps {
  redirectTo?: string;
}

const useAppSelector = () => {
  return {
    user: { role: 'admin', email: 'test@example.com' },
    isAuthenticated: false,
  };
};

const PublicRoute: React.FC<PublicRouteProps> = ({ redirectTo = '/' }) => {
  const { isAuthenticated } = useAppSelector();
  const location = useLocation();
  const redirectFrom = location.state?.from?.pathname || redirectTo;
  return isAuthenticated ? <Navigate to={redirectFrom} /> : <Outlet />;
};

export default PublicRoute;
