// src/layout/root-layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className='flex-1'>
      <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;