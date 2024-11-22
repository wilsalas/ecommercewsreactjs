import { createRoot } from 'react-dom/client';
import appConfig from '../app.config.json';
import App from './App';

const root = createRoot(
  document.getElementById(appConfig.appSelector) as HTMLElement
);
root.render(<App />);
