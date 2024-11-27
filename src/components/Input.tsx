import { useRef, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: React.ReactNode;
  error?: FieldError;
  isImage?: boolean;
  register?: UseFormRegisterReturn;
  onImageChange?: (base64: string | null) => void;
};

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  error,
  register,
  className,
  isImage = false,
  onImageChange,
  ...props
}): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      handleRemoveImage();
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed!');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      if (onImageChange) onImageChange(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (onImageChange) onImageChange(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium text-white">
          {label}
          {props.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="flex items-center gap-4">
        <div className="relative w-full">
          {icon && (
            <span
              className={`absolute inset-y-0 left-3 flex items-center
            ${error ? 'text-red-500' : 'text-gray-500'}
          `}
            >
              {icon}
            </span>
          )}
          {!isImage && (
            <input
              {...props}
              {...register}
              type={
                props.type === 'password' && showPassword ? 'text' : props.type
              }
              className={`w-full px-4 py-2 border focus:ring-0 focus:outline-none transition placeholder-gray-500 text-gray-800
              ${icon && 'pl-10'}
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${className}`}
            />
          )}
          {props.type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? (
                <FaRegEyeSlash size={20} />
              ) : (
                <FaRegEye size={20} />
              )}
            </button>
          )}
          {isImage && (
            <input
              {...props}
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full px-4 py-2 border focus:ring-0 focus:outline-none transition bg-white
                ${error ? 'border-red-500' : 'border-gray-300'}
                ${className}`}
            />
          )}
        </div>
        {imagePreview && (
          <div className="relative flex items-center gap-2 text-white">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-12 w-12 object-cover border"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full hover:bg-red-600 transition"
            >
              <AiOutlineCloseCircle size={20} />
            </button>
          </div>
        )}
      </div>
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
};
