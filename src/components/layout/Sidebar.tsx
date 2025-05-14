
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Users,
  MessageSquare,
  Phone,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

type NavItem = {
  title: string;
  icon: React.ElementType;
  path: string;
};

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: BarChart,
    path: '/dashboard',
  },
  {
    title: 'Customers',
    icon: Users,
    path: '/customers',
  },
  {
    title: 'Complaints',
    icon: MessageSquare,
    path: '/complaints',
  },
  {
    title: 'IVR System',
    icon: Phone,
    path: '/ivr',
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/settings',
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('nhcrm-authenticated');
    localStorage.removeItem('nhcrm-user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className={cn(
      "h-screen fixed top-0 left-0 z-40 bg-primary text-white transition-all duration-300 border-r border-primary-dark shadow-lg",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-center h-16 border-b border-primary-dark bg-primary-dark">
        {!collapsed ? (
          <div className="text-xl font-semibold">SBM Bank</div>
        ) : (
          <div className="text-xl font-semibold">TC</div>
        )}
      </div>

      <div className="py-4">
        <div className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

            return collapsed ? (
              <Tooltip key={item.title} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link to={item.path}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-10 h-10 p-0 justify-center",
                        isActive && "bg-white/10 text-white"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link key={item.title} to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-white/10 text-white"
                  )}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-5 w-full px-3">
        {collapsed ? (
          <div className="flex flex-col space-y-2">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-10 h-10 p-0 justify-center"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Logout
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-10 h-10 p-0 justify-center"
                  onClick={() => setCollapsed(false)}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Expand
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <div className="flex justify-between">
            <Button
              variant="ghost"
              className="justify-start hover:bg-white/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
            <Button
              variant="ghost"
              className="w-10 h-10 p-0"
              onClick={() => setCollapsed(true)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
