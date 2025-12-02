import { PropsWithChildren } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icons } from './Icons';
import { useContent } from '../context/ContentContext';

const AdminLayout = ({ children }: PropsWithChildren) => {
  const { logout } = useContent();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: Icons.LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Icons.BookOpen, label: 'Business Journal', path: '/admin/journal' },
    { icon: Icons.FileText, label: 'News / Blog', path: '/admin/blog' },
    { icon: Icons.FolderOpen, label: 'Projects', path: '/admin/projects' },
    { icon: Icons.Layers, label: 'Services', path: '/admin/services' },
    { icon: Icons.Users, label: 'Testimonials', path: '/admin/testimonials' },
    { icon: Icons.Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-luxury-black text-gray-300 flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-700">
           <span className="text-xl font-serif font-bold text-gold-500">HanifGold CMS</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                location.pathname === item.path 
                  ? 'bg-gold-600 text-white shadow-md' 
                  : 'hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-gray-800 rounded-md transition-all"
          >
            <Icons.LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;