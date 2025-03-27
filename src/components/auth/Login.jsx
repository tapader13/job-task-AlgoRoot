import { useState } from 'react';
import { useNavigate } from 'react-router';

export function LoginForm() {
  const router = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoginError('');

    // Validate form data
    const newErrors = {};

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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);

      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u) => u.email === email);

      if (!user || user.password !== password) {
        setLoginError('Invalid email or password');
        return;
      }

      // Store user session
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      );

      // Redirect to dashboard
      router('/dashboard');
    } catch (error) {
      setLoginError('An unexpected error occurred');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {loginError && (
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
              <p>{loginError}</p>
            </div>
          </div>
        </div>
      )}

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
        <div className='flex items-center justify-between'>
          <label htmlFor='password' className='block text-sm font-medium'>
            Password
          </label>
        </div>
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

      <button
        type='submit'
        disabled={isLoading}
        className='w-full rounded-md bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
