
// src/layout/root-layout.tsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Header />
      <main className='flex-1'>
      <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;