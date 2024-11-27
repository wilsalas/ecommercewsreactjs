import { memo } from 'react';

export const Footer: React.FC = memo((): JSX.Element => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 text-center">
      <p>
        &copy; {new Date().getFullYear()} EcommerceWsReactjs. All rights
        reserved.
      </p>
    </footer>
  );
});
