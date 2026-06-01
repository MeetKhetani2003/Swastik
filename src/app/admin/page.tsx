export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1F1F1F]">System Overview</h1>
      <p className="mt-2 text-[#5E5E5E]">Welcome to the Swastik Engineering control panel.</p>
      
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C9A14A]/10">
          <h3 className="text-sm font-semibold text-[#5E5E5E] uppercase tracking-wider">Total Inquiries</h3>
          <p className="mt-4 text-4xl font-bold text-[#1F1F1F]">Manage</p>
          <a href="/admin/inquiries" className="mt-4 inline-block text-sm font-medium text-[#C9A14A] hover:underline">View all →</a>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C9A14A]/10">
          <h3 className="text-sm font-semibold text-[#5E5E5E] uppercase tracking-wider">Gallery Assets</h3>
          <p className="mt-4 text-4xl font-bold text-[#1F1F1F]">Manage</p>
          <a href="/admin/gallery" className="mt-4 inline-block text-sm font-medium text-[#C9A14A] hover:underline">View all →</a>
        </div>
      </div>
    </div>
  );
}
