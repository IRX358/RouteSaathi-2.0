import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, MapPin, Brain, MessageSquare, LogOut, Bus } from 'lucide-react';

function CoordinatorLayout({ children, title, subtitle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/coordinator', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/coordinator/routes', icon: MapPin, label: 'Track Bus Routes' },
    { path: '/coordinator/ai', icon: Brain, label: 'AI Recommendations' },
    { path: '/coordinator/communication', icon: MessageSquare, label: 'Communication' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="app-header">
        <div className="logo">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1>RouteSaathi</h1>
            <p>BMTC Fleet Management</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="font-semibold text-sm">{user?.name || 'Coordinator'}</p>
            <p className="text-xs text-blue-200">Control Center</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="sidebar hidden md:block overflow-y-auto">
          <nav className="py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          
          <div className="mt-auto p-6 text-xs text-white/50">
            <p>© 2025 BMTC</p>
            <p>RouteSaathi v2.0</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F3F4F6]">
          <div className="page-content">
            {title && (
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                  {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
              </div>
            )}
            <div className="animate-fadeIn">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CoordinatorLayout;
