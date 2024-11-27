import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import {
  SignInPage,
  SignUpPage,
  HomePage,
  DashboardPage,
  NotFoundPage,
  ProfilePage,
} from '@/pages';
import { Role } from '@/common/enums';
import { Footer, Header } from '@/components';

export const AppRoutes: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PublicRoute redirectTo="/" />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole={Role.ADMIN} />}>
          <Route path="/admin">
            <Route index element={<DashboardPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
