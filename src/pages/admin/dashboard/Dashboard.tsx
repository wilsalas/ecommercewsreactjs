import { useDashboard } from './useDashboard';

export const DashboardPage: React.FC = (): JSX.Element => {
  const {} = useDashboard();
  return <h1>Dashboard</h1>;
};
