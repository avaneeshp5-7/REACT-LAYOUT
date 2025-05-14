
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { users } from '@/data/mockData';

export function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(users[0]);

  // Check if user is logged in
  useEffect(() => {
    // For now, we'll just simulate an authenticated user
    // This would be replaced with actual auth logic later
    const isAuthenticated = localStorage.getItem('nhcrm-authenticated') === 'true';
    
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex flex-col flex-1 ml-64">
        <Header 
          username={user.name} 
          role={user.role} 
          avatar={user.avatar} 
        />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
