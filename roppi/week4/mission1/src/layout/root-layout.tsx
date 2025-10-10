// src/layout/root-layout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';

const RootLayout = () => {
  const location = useLocation();

  // 현재 경로가 /movies/:category/:movieId 패턴에 맞는지 검사
  const hideNavbar = /^\/movies\/[^/]+\/[^/]+$/.test(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {/* MovieDetailPage가 아닐 때만 Navbar 표시 */}
      {!hideNavbar && <Navbar />}      
      <main className='flex-1'>
      <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;