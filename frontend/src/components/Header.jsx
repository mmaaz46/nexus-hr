import { Link } from "react-router-dom";

function Header({ title, subtitle, breadcrumb = [], searchValue, onSearchChange, onLogout }) {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl px-4 py-4 shadow-sm sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-md">
              <span className="text-lg font-semibold">N</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">NexusHR</p>
              <h1 className="truncate text-2xl font-semibold text-slate-950">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
            </div>
          </div>

          <nav className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link
              to="/dashboard"
              className="rounded-full px-3 py-1 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Home
            </Link>
            {breadcrumb.map((item, index) => (
              <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                <span className="text-slate-300">•</span>
                {item.active ? (
                  <span className="font-semibold text-slate-700">{item.label}</span>
                ) : (
                  <Link
                    to={item.path}
                    className="rounded-full px-3 py-1 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 min-w-[220px]">
            <input
              type="search"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const term = e.target.value.trim();
                  console.debug("Header: Enter pressed, submitting search:", term);
                  onSearchChange(term);
                }
              }}
              placeholder="Search NexusHR..."
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
            <button
              type="button"
              aria-label="Run search"
              onClick={() => {
                const term = (searchValue || "").trim();
                console.debug("Header: search button clicked, submitting:", term);
                onSearchChange(term);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              🔍
            </button>
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

export default Header;
