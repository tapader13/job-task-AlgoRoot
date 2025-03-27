import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Login } from './auth/Login';
import { SignUp } from './auth/SignUp';

export default function Home() {
  const [activeTab, setActiveTab] = useState('login');
  const router = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      router('/dashboard');
    }
  }, [router]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 '>
      <div className='w-full max-w-md space-y-6'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Welcome</h1>
          <p className='text-gray-500 text-gray-400'>
            Sign in to your account or create a new one
          </p>
        </div>

        {/* Custom Tabs */}
        <div className='w-full'>
          <div className='flex w-full rounded-md border'>
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 rounded-l-md py-2 text-center ${
                activeTab === 'login'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 rounded-r-md py-2 text-center ${
                activeTab === 'signup'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className='mt-4'>
            {activeTab === 'login' ? <Login /> : <SignUp />}
          </div>
        </div>
      </div>
    </div>
  );
}
