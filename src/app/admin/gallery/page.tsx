"use client";
import { useEffect, useState } from "react";
import { UploadCloud, Trash2 } from "lucide-react";

export default function GalleryManager() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [categoriesList, setCategoriesList] = useState<any[]>([]);

  const fetchCategories = () => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.categories.length > 0) {
          setCategoriesList(data.categories);
          setCategory(data.categories[0].name);
        }
      });
  };

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
    fetchCategories();
    fetchPhotos();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    if (name) formData.append("name", name);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setFile(null);
        setName("");
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
          <label className="w-full md:w-48">
            <span className="block text-xs font-semibold text-[#5E5E5E] mb-2 uppercase tracking-wide">Photo Name</span>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Optional name..."
              className="w-full rounded-xl border border-[#C9A14A]/15 bg-[#FAF8F3] px-4 py-3 outline-none text-sm"
            />
          </label>
          <label className="w-full md:w-64">
            <span className="block text-xs font-semibold text-[#5E5E5E] mb-2 uppercase tracking-wide">Category</span>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-[#C9A14A]/15 bg-[#FAF8F3] px-4 py-3 outline-none"
            >
              {categoriesList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
              {categoriesList.length === 0 && <option value="">No categories available</option>}
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
              <div key={photo._id} className="group relative bg-white rounded-2xl overflow-hidden border border-[#C9A14A]/10 shadow-sm flex flex-col">
                <img src={`/api/image/${photo.gridFsId}`} alt={photo.name || "Gallery item"} className="w-full h-48 object-cover" />
                <div className="p-4 flex-1 flex flex-col justify-between bg-white border-t border-[#C9A14A]/10 gap-2">
                  <div className="flex justify-between items-start gap-2">
                    {editingId === photo._id ? (
                      <input 
                        type="text"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="w-full text-sm border-b border-[#C9A14A] outline-none"
                        autoFocus
                      />
                    ) : (
                      <span className="text-sm font-medium text-[#1F1F1F] leading-tight">{photo.name || "Untitled"}</span>
                    )}
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[#C9A14A] bg-[#C9A14A]/10 px-2 py-1 rounded whitespace-nowrap">{photo.category}</span>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    {editingId === photo._id ? (
                      <>
                        <button 
                          onClick={async () => {
                            try {
                              const res = await fetch(`/api/photos/${photo._id}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ name: editName })
                              });
                              if (res.ok) {
                                setEditingId(null);
                                fetchPhotos();
                              }
                            } catch(e) { console.error(e) }
                          }}
                          className="text-xs font-semibold text-green-600 hover:text-green-700"
                        >Save</button>
                        <button onClick={() => setEditingId(null)} className="text-xs font-semibold text-gray-500 hover:text-gray-700">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => { setEditingId(photo._id); setEditName(photo.name || ""); }}
                          className="text-xs font-semibold text-[#5E5E5E] hover:text-[#1F1F1F]"
                        >Edit</button>
                        <button 
                          onClick={() => handleDelete(photo._id)}
                          className="text-xs font-semibold text-red-500 hover:text-red-700"
                        >Delete</button>
                      </>
                    )}
                  </div>
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
