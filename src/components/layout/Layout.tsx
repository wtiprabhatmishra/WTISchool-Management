import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const pageNames: Record<string, string> = {
  '/': 'Dashboard',
  '/students': 'Student Management',
  '/teachers': 'Teacher Management',
  '/classes': 'Class Management',
  '/attendance': 'Attendance Tracking',
  '/grades': 'Grade Management',
  '/fees': 'Fee Management',
  '/reports': 'Reports & Analytics',
  '/settings': 'Settings',
};

const Layout: React.FC = () => {
  const location = useLocation();
  const currentPageName = pageNames[location.pathname] || 'WTISchool';

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={currentPageName} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;