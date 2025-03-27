import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from './DashBoardLayout';
import { DataTable } from './DataTable';

export default function DashboardPage() {
  const router = useNavigate();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/');
    }
  }, [router]);

  if (!isClient) {
    return null; // Prevent hydration errors
  }

  return (
    <DashboardLayout>
      <div className='flex flex-col gap-4 p-4 md:p-8'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Details</h1>
          <p className='text-gray-500 dark:text-gray-400'>
            View and manage your data
          </p>
        </div>
        <DataTable />
      </div>
    </DashboardLayout>
  );
}
