import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data?.token || response.data;
      localStorage.setItem("token", token);
      setMessage({ text: "Login successful. Redirecting...", type: "success" });
      navigate("/dashboard");
    } catch (error) {
      setMessage({ text: "Invalid email or password. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-slate-950 to-slate-800 opacity-90"></div>
        <div className="absolute -bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-[0_35px_120px_-30px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <div className="mb-8 flex flex-col gap-4 text-center">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-500/10 text-3xl shadow-md shadow-indigo-500/20">
              N
            </div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">NexusHR</p>
            <h1 className="text-4xl font-semibold text-white">Welcome back to your HR dashboard</h1>
            <p className="mx-auto max-w-xl text-sm leading-6 text-slate-400">
              Sign in to access employee insights, payroll workflows, attendance tracking, and performance management.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-4 shadow-sm">
                <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="email">
                  Email address
                </label>
                <div className="flex items-center gap-3 rounded-3xl bg-slate-900 px-4 py-3 text-slate-100 shadow-inner shadow-slate-950/20">
                  <span className="text-xl text-indigo-400">📧</span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-4 shadow-sm">
                <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="password">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-3xl bg-slate-900 px-4 py-3 text-slate-100 shadow-inner shadow-slate-950/20">
                  <span className="text-xl text-indigo-400">🔒</span>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>
            </div>

            {message.text && (
              <div
                className={`rounded-3xl px-4 py-3 text-sm font-medium ${
                  message.type === "success"
                    ? "bg-emerald-500/10 text-emerald-200 ring-1 ring-emerald-500/20"
                    : "bg-rose-500/10 text-rose-200 ring-1 ring-rose-500/20"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 via-slate-900 to-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in to NexusHR"}
            </button>
          </form>

          <div className="mt-8 rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-400 shadow-sm">
            <p className="font-medium text-slate-200">Enterprise-ready HRMS</p>
            <p className="mt-2 leading-6">
              Secure access to attendance, payroll, performance, and workforce insights from a single control panel.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
