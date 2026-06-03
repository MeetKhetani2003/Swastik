"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, KeyRound, User, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push(from);
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-[#5E5E5E] uppercase tracking-wider mb-2">
          Username
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#5E5E5E]/60">
            <User className="h-4 w-4" />
          </span>
          <input
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-[#C9A14A]/15 bg-[#FAF8F3]/50 pl-10 pr-4 py-3.5 text-[#1F1F1F] outline-none transition focus:border-[#C9A14A] focus:bg-white"
            placeholder="Enter administrator username"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#5E5E5E] uppercase tracking-wider mb-2">
          Password
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#5E5E5E]/60">
            <KeyRound className="h-4 w-4" />
          </span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#C9A14A]/15 bg-[#FAF8F3]/50 pl-10 pr-4 py-3.5 text-[#1F1F1F] outline-none transition focus:border-[#C9A14A] focus:bg-white"
            placeholder="Enter secure password"
          />
        </div>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#C9A14A] to-[#E2C675] py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(201,161,74,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
      >
        {loading ? "Authenticating..." : "Access Dashboard"}
      </button>
    </form>
  );
}

export default function AdminLogin() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#FAF8F3] px-4 overflow-hidden">
      {/* Background ambient glowing elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[30rem] h-[30rem] rounded-full bg-[#E2C675]/15 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[25rem] h-[25rem] rounded-full bg-[#C9A14A]/10 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Brand / Logo */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-widest text-[#1F1F1F]">
            SWASTIK <span className="text-[#C9A14A]">ENGINEERING</span>
          </h2>
          <p className="mt-2 text-sm text-[#5E5E5E]">Secure Administrative Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#C9A14A]/25 p-8 shadow-[0_20px_50px_rgba(31,31,31,0.06)]">
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12 rounded-2xl bg-[#C9A14A]/10 flex items-center justify-center text-[#C9A14A] border border-[#C9A14A]/20">
              <Shield className="h-6 w-6" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-center text-[#1F1F1F] mb-6">
            Sign In to Console
          </h3>

          <Suspense fallback={<div className="text-center py-6 text-[#C9A14A]">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
