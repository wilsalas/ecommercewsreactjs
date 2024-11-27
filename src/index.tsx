import 'animate.css';
import './index.css';
import { createRoot } from 'react-dom/client';
import { AppRoutes } from './routes';
import appConfig from '../app.config.json';

const appSelector = document.getElementById(appConfig.appSelector);
const root = createRoot(appSelector as HTMLElement);
root.render(<AppRoutes />);
