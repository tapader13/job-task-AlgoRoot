import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';

export function Navbar() {
  const router = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router('/');
  };

  const handleDeleteAccount = () => {
    // Get current user
    const userData = localStorage.getItem('user');
    if (!userData) return;

    const currentUser = JSON.parse(userData);

    // Remove user from users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.filter((u) => u.email !== currentUser.email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Remove user session
    localStorage.removeItem('user');

    // Redirect to login
    router('/');
  };

  return (
    <header className='sticky top-0 z-10 border-b bg-white shadow-sm'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to='/dashboard' className='flex items-center gap-2'>
          <span className='text-xl font-bold'>AlgoRoot</span>
        </Link>

        <div className='relative' ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
              <circle cx='12' cy='7' r='4'></circle>
            </svg>
            <span className='sr-only'>User menu</span>
          </button>

          {isMenuOpen && (
            <div className='absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5'>
              {user && (
                <div className='border-b px-4 py-2'>
                  <p className='font-medium'>{user.name}</p>
                  <p className='text-xs text-gray-500'>{user.email}</p>
                </div>
              )}

              <button
                onClick={handleLogout}
                className='flex w-full cursor-pointer items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='mr-2 h-4 w-4'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                  <polyline points='16 17 21 12 16 7'></polyline>
                  <line x1='21' y1='12' x2='9' y2='12'></line>
                </svg>
                <span>Logout</span>
              </button>

              <button
                onClick={() => setIsDeleteDialogOpen(true)}
                className='flex w-full cursor-pointer items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='mr-2 h-4 w-4'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polyline points='3 6 5 6 21 6'></polyline>
                  <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                  <line x1='10' y1='11' x2='10' y2='17'></line>
                  <line x1='14' y1='11' x2='14' y2='17'></line>
                </svg>
                <span>Delete Account</span>
              </button>
            </div>
          )}
        </div>

        {isDeleteDialogOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-full max-w-md rounded-lg bg-white p-6'>
              <h3 className='text-lg font-medium'>Are you absolutely sure?</h3>
              <p className='mt-2 text-sm text-gray-500'>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </p>
              <div className='mt-4 flex justify-end space-x-2'>
                <button
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className='rounded-md cursor-pointer border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDeleteAccount();
                    setIsDeleteDialogOpen(false);
                  }}
                  className='rounded-md cursor-pointer bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700'
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
