import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { RiUserAddLine } from 'react-icons/ri';
import { Button, Container, Input } from '@/components';
import { FaRegUserCircle } from 'react-icons/fa';
import { useSignUp } from './useSignUp';

export const SignUpPage: React.FC = (): JSX.Element => {
  const { register, handleSubmit, onSubmit, errors, handleImageChange } =
    useSignUp();

  return (
    <Container>
      <div className="bg-gray-800 p-8 shadow-lg w-full max-w-lg animate__animated animate__fadeIn">
        <h1 className="text-2xl text-white font-bold text-center mb-5 flex items-center justify-center space-x-2">
          <RiUserAddLine size={24} />
          <span>Sign Up</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            required
            id="name"
            label="Name"
            placeholder="Enter your name"
            icon={<FaRegUserCircle size={20} />}
            register={register('name')}
            error={errors.name}
          />
          <Input
            id="lastName"
            label="Last Name"
            icon={<FaRegUserCircle size={20} />}
            placeholder="Enter your last name"
            register={register('lastName')}
            error={errors.lastName}
          />
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
          <Input
            id="image"
            label="Profile Image"
            type="file"
            isImage
            onImageChange={handleImageChange}
            error={errors.image}
          />
          <Button
            style={{ marginTop: 30 }}
            icon={<RiUserAddLine size={20} />}
            type="submit"
          >
            Sign Up
          </Button>
        </form>
        <p className="text-center text-sm text-white mt-4">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-blue-300 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </Container>
  );
};
