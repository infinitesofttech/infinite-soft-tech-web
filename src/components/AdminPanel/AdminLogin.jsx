import React, { useState } from "react";
import { apiService } from "../../services/apiService";
import { Lock, ShieldAlert, ArrowRight, ArrowLeft, KeyRound } from "lucide-react";

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiService.loginAdmin({ password });
      if (res.success) {
        onLoginSuccess();
      }
    } catch (err) {
      setError(err.message || "Invalid password. Default demo password is 'admin123'");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] flex flex-col justify-center items-center p-4 relative mesh-bg">
      {/* Back to site */}
      <button
        onClick={onBackToSite}
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg bg-white/5 border border-white/10"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Public Website</span>
      </button>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1.5px] shadow-glow-cyan mx-auto mb-4">
            <div className="w-full h-full bg-[#070B14] rounded-[14px] flex items-center justify-center">
              <Lock className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Infinite Soft Tech
          </h2>
          <p className="text-xs text-cyan-400 font-mono mt-1">
            Admin Lead Management Cockpit
          </p>
        </div>

        {/* Card */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Administrator Password / PIN
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter administrator password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:shadow-glow-cyan text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Access Admin Cockpit"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <span className="text-[11px] text-slate-500 block">
              Default Demo Password: <code className="text-cyan-400 bg-white/5 px-2 py-0.5 rounded">admin123</code>
            </span>
          </div>
        </div>

        {/* Security Notice */}
        <p className="text-center text-[11px] text-slate-600 mt-6">
          Protected by Netlify Serverless API & Session Token Verification.
        </p>
      </div>
    </div>
  );
}
