import { Outlet } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6FCDF] via-[#859F3D]/20 to-[#F6FCDF] dark:from-[#1A1A19] dark:via-[#31511E] dark:to-[#1A1A19] transition-colors duration-300">
      <ThemeToggle />
      <Header />
      <Outlet />
    </div>
  );
}