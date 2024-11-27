import { useProfile } from './useProfile';

export const ProfilePage: React.FC = (): JSX.Element => {
  const {} = useProfile();
  return <h1>Profile</h1>;
};
