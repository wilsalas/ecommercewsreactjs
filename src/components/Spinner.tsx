import { memo } from 'react';
import { FaSpinner } from 'react-icons/fa';

type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  text?: string;
};

export const Spinner: React.FC<SpinnerProps> = memo(
  ({ className, text = 'Processing...', ...props }): JSX.Element => {
    return (
      <div
        {...props}
        className={`flex items-center justify-center gap-2 w-full py-2 bg-green-400 text-white transition ${className}`}
      >
        <FaSpinner className="animate-spin" size={20} />
        {text}
      </div>
    );
  }
);
