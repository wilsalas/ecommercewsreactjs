import { REGEX } from '@/common/enums';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z
    .string()
    .min(8)
    .regex(
      REGEX.PASSWORD,
      'Password must be longer than or equal to 8 characters'
    ),
  image: z.string().optional(),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export const useSignUp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpForm>({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      image: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  const handleImageChange = (image: string | null): void => {
    setValue('image', image ?? '');
  };

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    console.log('Sign up with:', data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    handleImageChange,
  };
};
