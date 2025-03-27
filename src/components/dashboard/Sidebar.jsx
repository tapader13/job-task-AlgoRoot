import { Link } from 'react-router';

export function Sidebar() {
  const pathname = window.location.pathname;

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div className='hidden w-64 flex-shrink-0 border-r bg-white md:block'>
      <div className='flex h-full flex-col'>
        <div className='flex-1 overflow-auto py-2'>
          <nav className='grid items-start px-2 text-sm font-medium'>
            <Link
              to='/dashboard'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-500 ${
                isActive('/dashboard')
                  ? 'bg-blue-50 text-blue-500'
                  : 'text-gray-500'
              }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <rect x='3' y='3' width='7' height='7'></rect>
                <rect x='14' y='3' width='7' height='7'></rect>
                <rect x='14' y='14' width='7' height='7'></rect>
                <rect x='3' y='14' width='7' height='7'></rect>
              </svg>
              <span>Details</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
