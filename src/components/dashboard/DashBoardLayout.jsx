import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

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
