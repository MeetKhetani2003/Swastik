"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Image as ImageIcon, Layers, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/admin/login');
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
    { href: '/admin/categories', label: 'Categories', icon: Layers },
    { href: '/admin/gallery', label: 'Gallery Manager', icon: ImageIcon },
  ];

  // If we are on the login page, don't show the sidebar!
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#FAF8F3]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1F1F1F] text-white flex flex-col justify-between border-r border-[#C9A14A]/10">
        <div>
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold tracking-widest text-[#C9A14A]">SWASTIK</h2>
            <p className="text-[10px] text-white/50 tracking-widest uppercase mt-1">Admin Panel</p>
          </div>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${
                    isActive
                      ? 'bg-[#C9A14A] text-white shadow-md'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-[#C9A14A]'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-white/10 space-y-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-red-500/10 hover:text-red-400 transition text-sm font-medium text-left cursor-pointer"
          >
            <LogOut className="h-5 w-5 text-red-400" /> Sign Out
          </button>
          <div className="text-[10px] text-white/30 text-center tracking-wider">
            Secure Session Active
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
