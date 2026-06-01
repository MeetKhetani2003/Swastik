"use client";
import { useEffect, useState } from "react";
import { UploadCloud, Trash2, Edit2, X, Check } from "lucide-react";

export default function CategoriesManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const fetchCategories = () => {
    setLoading(true);
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        if (data.success) setCategories(data.categories);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) return;
    setUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setFile(null);
        setName("");
        fetchCategories();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? (Photos in this category will become uncategorized)")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCategories();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRename = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName })
      });
      if (res.ok) {
        setEditingId(null);
        fetchCategories();
      }
    } catch(e) { console.error(e) }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1F1F1F]">Categories / Deployments</h1>
      <p className="mt-2 text-[#5E5E5E]">Manage the deployment categories shown on the homepage and projects gallery.</p>

      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-[#C9A14A]/10">
        <h2 className="text-xl font-medium text-[#1F1F1F] mb-6">Create New Category</h2>
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-end">
          <label className="w-full md:w-64">
            <span className="block text-xs font-semibold text-[#5E5E5E] mb-2 uppercase tracking-wide">Category Name</span>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Heavy Equipment"
              className="w-full rounded-xl border border-[#C9A14A]/15 bg-[#FAF8F3] px-4 py-3 outline-none text-sm"
            />
          </label>
          <label className="flex-1">
            <span className="block text-xs font-semibold text-[#5E5E5E] mb-2 uppercase tracking-wide">Cover Image</span>
            <input 
              type="file" 
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-[#5E5E5E] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#FAF8F3] file:text-[#1F1F1F] hover:file:bg-[#C9A14A]/10"
            />
          </label>
          <button 
            disabled={!file || !name || uploading} 
            className="h-[46px] px-6 rounded-xl bg-[#C9A14A] text-white font-semibold text-sm hover:bg-[#b08b3e] disabled:opacity-50 transition flex items-center gap-2"
          >
            <UploadCloud className="h-4 w-4" />
            {uploading ? "Creating..." : "Create Category"}
          </button>
        </form>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-medium text-[#1F1F1F] mb-6">Current Categories</h2>
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {categories.map(cat => (
              <div key={cat._id} className="group relative bg-white rounded-2xl overflow-hidden border border-[#C9A14A]/10 shadow-sm flex flex-col">
                <img src={`/api/image/${cat.gridFsId}`} alt={cat.name} className="w-full h-48 object-cover" />
                <div className="absolute top-0 left-0 p-2">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">Cover Photo</span>
                </div>
                <div className="p-4 flex flex-col gap-3 bg-[#FAF8F3]/50">
                  {editingId === cat._id ? (
                    <div className="flex items-center gap-2">
                      <input 
                        type="text"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="flex-1 text-sm border border-[#C9A14A] rounded-lg px-3 py-2 outline-none"
                        autoFocus
                      />
                      <button onClick={() => handleRename(cat._id)} className="p-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100"><Check className="h-4 w-4" /></button>
                      <button onClick={() => setEditingId(null)} className="p-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200"><X className="h-4 w-4" /></button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-[#1F1F1F] text-lg">{cat.name}</h3>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => { setEditingId(cat._id); setEditName(cat.name); }}
                          className="p-2 text-[#5E5E5E] hover:bg-[#C9A14A]/10 hover:text-[#C9A14A] rounded-lg transition"
                          title="Rename"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {categories.length === 0 && <p className="col-span-full text-[#5E5E5E]">No categories found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
