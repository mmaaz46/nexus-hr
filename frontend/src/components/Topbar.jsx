import { useMemo } from "react";

const titleMap = {
  dashboard: "Dashboard",
  employees: "Employees",
  attendance: "Attendance",
  leaves: "Leaves",
  performance: "Performance",
  insights: "AI Insights",
  notifications: "Notifications",
  add: "Create",
  edit: "Edit",
};

function Topbar({ collapsed, location, onLogout }) {
  const crumbs = useMemo(
    () => location.pathname.split("/").filter(Boolean),
    [location.pathname],
  );

  const currentTitle = crumbs.length
    ? titleMap[crumbs[crumbs.length - 1]] || titleMap[crumbs[0]] || "Dashboard"
    : "Dashboard";

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl px-4 py-4 shadow-sm sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-md">
              <span className="text-lg font-semibold">N</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">NexusHR</p>
              <h1 className="text-2xl font-semibold text-slate-950">{currentTitle}</h1>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>Home</span>
            {crumbs.map((segment, index) => (
              <span key={`${segment}-${index}`} className="inline-flex items-center gap-2">
                <span>•</span>
                <span>{titleMap[segment] || segment}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 min-w-[220px]">
            <input
              type="search"
              placeholder="Search NexusHR..."
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center justify-center rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
