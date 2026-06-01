"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = () => {
    setLoading(true);
    fetch("/api/inquiries")
      .then(res => res.json())
      .then(data => {
        if (data.success) setInquiries(data.inquiries);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchInquiries();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1F1F1F]">Inquiries</h1>
      <p className="mt-2 text-[#5E5E5E]">View messages and requirements submitted via the Contact page.</p>
      
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-[#C9A14A]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#5E5E5E]">
            <thead className="bg-[#FAF8F3] text-xs uppercase font-semibold text-[#1F1F1F]">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Name / Company</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Requirements</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A14A]/10">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center">Loading...</td></tr>
              ) : inquiries.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center">No inquiries found.</td></tr>
              ) : inquiries.map((inq) => (
                <tr key={inq._id} className="hover:bg-[#FAF8F3]/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(inq.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#1F1F1F]">{inq.name}</div>
                    <div className="text-xs">{inq.company}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{inq.email}</div>
                    <div>{inq.phone}</div>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate" title={inq.requirements}>
                    {inq.requirements || "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(inq._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
