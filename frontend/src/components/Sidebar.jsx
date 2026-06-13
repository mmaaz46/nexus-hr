import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: "📊" },
  { name: "Employees", path: "/employees", icon: "👥" },
  { name: "Attendance", path: "/attendance", icon: "🕒" },
  { name: "Leaves", path: "/leaves", icon: "🌴" },
  { name: "Performance", path: "/performance", icon: "⭐" },
  { name: "Insights", path: "/insights", icon: "🤖" },
  { name: "Notifications", path: "/notifications", icon: "🔔" },
];

function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`flex flex-col h-screen bg-slate-950 text-slate-100 transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-2xl">N</span>
          {!collapsed && (
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">NexusHR</p>
              <p className="text-base font-semibold">Enterprise</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition hover:bg-slate-700"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-slate-800 ${
                isActive ? "bg-slate-800 text-white shadow-lg" : "text-slate-300"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-4 pb-5">
        <div className="rounded-3xl bg-slate-900 p-4 text-sm text-slate-300 shadow-lg">
          <p className="font-semibold text-slate-100">Enterprise HR</p>
          {!collapsed && <p className="mt-2 text-slate-400">Smart HR workflows for large teams.</p>}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
