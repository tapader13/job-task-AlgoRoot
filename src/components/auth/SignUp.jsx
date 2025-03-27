import { useState } from 'react';
import { useNavigate } from 'react-router';

export function SignUp() {
  const router = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSignupError('');

    // Validate form data
    const newErrors = {};

    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((user) => user.email === email);

      if (userExists) {
        setSignupError('User with this email already exists');
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
      };

      // Save user to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Store user session
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        })
      );
      setTimeout(() => {
        setIsLoading(false); // Stop loading before navigating
        router('/dashboard'); // Navigate after 3 seconds
      }, 3000);
    } catch (error) {
      setSignupError('An unexpected error occurred');
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {signupError && (
        <div className='rounded-md bg-red-50 p-3 text-sm text-red-500'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <svg
                className='h-5 w-5 text-red-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div className='ml-3'>
              <p>{signupError}</p>
            </div>
          </div>
        </div>
      )}

      <div className='space-y-2'>
        <label htmlFor='name' className='block text-sm font-medium'>
          Name
        </label>
        <input
          id='name'
          placeholder='John Doe'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
        {errors.name && <p className='text-sm text-red-500'>{errors.name}</p>}
      </div>

      <div className='space-y-2'>
        <label htmlFor='email' className='block text-sm font-medium'>
          Email
        </label>
        <input
          id='email'
          type='email'
          placeholder='name@example.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
        {errors.email && <p className='text-sm text-red-500'>{errors.email}</p>}
      </div>

      <div className='space-y-2'>
        <label htmlFor='password' className='block text-sm font-medium'>
          Password
        </label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
        {errors.password && (
          <p className='text-sm text-red-500'>{errors.password}</p>
        )}
      </div>

      <div className='space-y-2'>
        <label htmlFor='confirm-password' className='block text-sm font-medium'>
          Confirm Password
        </label>
        <input
          id='confirm-password'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
        {errors.confirmPassword && (
          <p className='text-sm text-red-500'>{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type='submit'
        disabled={isLoading}
        className='w-full cursor-pointer rounded-md bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
}
