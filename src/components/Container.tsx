import { memo } from 'react';

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {};

export const Container: React.FC<ContainerProps> = memo(
  ({ children, className, ...props }): JSX.Element => {
    return (
      <div
        {...props}
        className={`min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex justify-center items-center bg-opacity-60 backdrop-blur-lg ${className}`}
      >
        {children}
      </div>
    );
  }
);
