"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GoldButton } from "@/components/ui/GoldButton";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/");
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccess(
          "Account created! Check your email to verify, then sign in."
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Logo & headline */}
      <div className="text-center space-y-1">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gold-600 shadow-lg">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gold-900">GoldVault SG</h1>
        <p className="text-sm text-gold-600">
          {mode === "login" ? "Welcome back 👋" : "Start saving in gold today"}
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex rounded-xl bg-gold-100 p-1">
        <button
          onClick={() => { setMode("login"); setError(null); }}
          className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
            mode === "login"
              ? "bg-white text-gold-800 shadow-sm"
              : "text-gold-600 hover:text-gold-800"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => { setMode("signup"); setError(null); }}
          className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
            mode === "signup"
              ? "bg-white text-gold-800 shadow-sm"
              : "text-gold-600 hover:text-gold-800"
          }`}
        >
          Create Account
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gold-700">
            Email address
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-gold-200 bg-white px-3 py-3 focus-within:border-gold-400 focus-within:ring-2 focus-within:ring-gold-100 transition-all">
            <Mail size={16} className="shrink-0 text-gold-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="flex-1 bg-transparent text-sm text-gold-900 placeholder-gold-300 outline-none"
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gold-700">Password</label>
          <div className="flex items-center gap-2 rounded-xl border border-gold-200 bg-white px-3 py-3 focus-within:border-gold-400 focus-within:ring-2 focus-within:ring-gold-100 transition-all">
            <Lock size={16} className="shrink-0 text-gold-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Min. 6 characters"
              className="flex-1 bg-transparent text-sm text-gold-900 placeholder-gold-300 outline-none"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gold-400 hover:text-gold-600 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 px-3 py-2.5">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {success && (
          <div className="rounded-xl bg-green-50 border border-green-100 px-3 py-2.5">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <GoldButton
          type="submit"
          fullWidth
          size="lg"
          loading={loading}
          className="mt-2"
        >
          {mode === "login" ? "Sign In →" : "Create Account →"}
        </GoldButton>
      </form>

      <p className="text-center text-xs text-gold-400">
        Your data is protected with bank-grade encryption
      </p>
    </div>
  );
}
