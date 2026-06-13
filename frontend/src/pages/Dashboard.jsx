import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const quickActions = [
  { label: "Employees", path: "/employees", icon: "👥" },
  { label: "Attendance", path: "/attendance", icon: "🕒" },
  { label: "Leaves", path: "/leaves", icon: "🌴" },
  { label: "Performance", path: "/performance", icon: "⭐" },
  { label: "Insights", path: "/insights", icon: "🤖" },
  { label: "Notifications", path: "/notifications", icon: "🔔" },
];

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const response = await api.get("/dashboard/stats");
      setStats(response.data || {});
    };

    fetchStats();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">NexusHR</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Workforce overview</h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor employee growth, payroll cycles, reviews, and leave trends from one central hub.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center justify-center rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
          >
            Logout
          </button>
          <Link
            to="/employees"
            className="inline-flex items-center justify-center rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500"
          >
            View Employees
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600">👥</span>
            <span className="rounded-3xl bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Total employees</span>
          </div>
          <p className="mt-6 text-4xl font-semibold text-slate-950">{stats.totalEmployees ?? 0}</p>
          <p className="mt-3 text-sm text-slate-500">Active employees in your organization</p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-100 text-amber-600">🌴</span>
            <span className="rounded-3xl bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Total leaves</span>
          </div>
          <p className="mt-6 text-4xl font-semibold text-slate-950">{stats.totalLeaves ?? 0}</p>
          <p className="mt-3 text-sm text-slate-500">Leave requests tracked</p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600">💰</span>
            <span className="rounded-3xl bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Total payrolls</span>
          </div>
          <p className="mt-6 text-4xl font-semibold text-slate-950">{stats.totalPayrolls ?? 0}</p>
          <p className="mt-3 text-sm text-slate-500">Payroll records completed</p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-100 text-sky-600">⭐</span>
            <span className="rounded-3xl bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Total reviews</span>
          </div>
          <p className="mt-6 text-4xl font-semibold text-slate-950">{stats.totalPerformanceReviews ?? 0}</p>
          <p className="mt-3 text-sm text-slate-500">Performance reviews completed</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {quickActions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className="flex items-center gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-950/95 p-5 text-white shadow-soft transition hover:-translate-y-1 hover:bg-slate-900"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-2xl">{action.icon}</span>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Quick action</p>
              <p className="mt-1 text-base font-semibold">{action.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
