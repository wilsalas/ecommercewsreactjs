import { Spinner } from './Spinner';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  iconPosition = 'left',
  className,
  loading,
  ...props
}): JSX.Element => {
  if (loading) return <Spinner style={{ ...props.style }} />;
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 w-full py-2 bg-green-400 hover:bg-green-500 text-white transition ${className}`}
    >
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
};
