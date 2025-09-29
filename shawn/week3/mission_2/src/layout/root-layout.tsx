// src/layout/root-layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
