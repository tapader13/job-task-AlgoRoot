import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';

export function DashboardLayout({ children }) {
  return (
    <div className='flex h-screen flex-col'>
      <Navbar />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto bg-gray-50 '>{children}</main>
      </div>
    </div>
  );
}
