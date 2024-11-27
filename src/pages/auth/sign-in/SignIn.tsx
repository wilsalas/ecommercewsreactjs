import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock, AiOutlineLogin } from 'react-icons/ai';
import { useSignIn } from './useSignIn';
import { Button, Container, Input } from '@/components';

export const SignInPage: React.FC = (): JSX.Element => {
  const { register, handleSubmit, onSubmit, errors } = useSignIn();
  return (
    <Container>
      <div className="bg-gray-800 p-8 shadow-lg w-full max-w-md animate__animated animate__fadeIn">
        <h1 className="text-2xl text-white font-bold text-center mb-5 flex items-center justify-center space-x-2">
          <AiOutlineLogin size={24} />
          <span>Sign In</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            required
            id="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            icon={<AiOutlineMail size={20} />}
            register={register('email')}
            error={errors.email}
          />
          <Input
            required
            id="password"
            type="password"
            label="Password"
            autoComplete="off"
            placeholder="Enter your password"
            icon={<AiOutlineLock size={20} />}
            register={register('password')}
            error={errors.password}
          />
          <Button
            style={{ marginTop: 30 }}
            icon={<AiOutlineLogin size={20} />}
            type="submit"
          >
            Sign In
          </Button>
        </form>
        <p className="text-center text-sm text-white mt-5">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-blue-300 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </Container>
  );
};
