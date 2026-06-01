"use client";
import { useEffect, useState } from "react";
import { UploadCloud, Trash2 } from "lucide-react";

export default function GalleryManager() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("PEB and heavy");

  const categories = ["PEB and heavy", "Our Infra", "Process eq"];

  const fetchPhotos = () => {
    setLoading(true);
    fetch("/api/photos")
      .then(res => res.json())
      .then(data => {
        if (data.success) setPhotos(data.photos);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setFile(null);
        fetchPhotos();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    try {
      const res = await fetch(`/api/photos/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPhotos();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1F1F1F]">Gallery Manager</h1>
      <p className="mt-2 text-[#5E5E5E]">Upload and categorize photos for the Projects portfolio.</p>

      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-[#C9A14A]/10">
        <h2 className="text-xl font-medium text-[#1F1F1F] mb-6">Upload New Photo</h2>
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-end">
          <label className="flex-1">
            <span className="block text-xs font-semibold text-[#5E5E5E] mb-2 uppercase tracking-wide">Select Image</span>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-[#5E5E5E] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#FAF8F3] file:text-[#1F1F1F] hover:file:bg-[#C9A14A]/10"
            />
          </label>
          <label className="w-full md:w-64">
            <span className="block text-xs font-semibold text-[#5E5E5E] mb-2 uppercase tracking-wide">Category</span>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-[#C9A14A]/15 bg-[#FAF8F3] px-4 py-3 outline-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <button 
            disabled={!file || uploading} 
            className="h-[46px] px-6 rounded-xl bg-[#C9A14A] text-white font-semibold text-sm hover:bg-[#b08b3e] disabled:opacity-50 transition flex items-center gap-2"
          >
            <UploadCloud className="h-4 w-4" />
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-medium text-[#1F1F1F] mb-6">Current Portfolio Assets</h2>
        {loading ? (
          <p>Loading gallery...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {photos.map(photo => (
              <div key={photo._id} className="group relative bg-white rounded-2xl overflow-hidden border border-[#C9A14A]/10 shadow-sm">
                <img src={`/api/image/${photo.gridFsId}`} alt="Gallery item" className="w-full h-48 object-cover" />
                <div className="p-4 flex justify-between items-center bg-white border-t border-[#C9A14A]/10">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#5E5E5E]">{photo.category}</span>
                  <button 
                    onClick={() => handleDelete(photo._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {photos.length === 0 && <p className="col-span-full text-[#5E5E5E]">No photos in the database.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
