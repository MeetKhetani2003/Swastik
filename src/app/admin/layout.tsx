import Link from 'next/link';
import { LayoutDashboard, MessageSquare, Image as ImageIcon } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#FAF8F3]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1F1F1F] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold tracking-widest text-[#C9A14A]">SWASTIK</h2>
          <p className="text-[10px] text-white/50 tracking-widest uppercase mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition text-sm font-medium">
            <LayoutDashboard className="h-5 w-5 text-[#C9A14A]" /> Dashboard
          </Link>
          <Link href="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition text-sm font-medium">
            <MessageSquare className="h-5 w-5 text-[#C9A14A]" /> Inquiries
          </Link>
          <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition text-sm font-medium">
            <ImageIcon className="h-5 w-5 text-[#C9A14A]" /> Gallery Manager
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10 text-xs text-white/30 text-center">
          Secure Session Active
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
