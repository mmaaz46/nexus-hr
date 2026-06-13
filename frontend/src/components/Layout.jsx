import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { SearchProvider, useSearch } from "./SearchContext";

const titleMap = {
  dashboard: "Dashboard",
  employees: "Employees",
  attendance: "Attendance",
  leaves: "Leaves",
  performance: "Performance",
  insights: "AI Insights",
  notifications: "Notifications",
  add: "Add",
  edit: "Edit",
};

const subtitleMap = {
  dashboard: "Overview of workforce status and trends.",
  employees: "Manage employee records and team assignments.",
  attendance: "Track attendance activity and presence details.",
  leaves: "Review leave requests and approval status.",
  performance: "Monitor performance reviews and ratings.",
  insights: "Explore workforce intelligence and metrics.",
  notifications: "Create alerts and announcements for the team.",
  add: "Create a new employee record.",
  edit: "Update employee details and profile data.",
};

function LayoutContent({ onLogout, location }) {
  const { searchValue, setSearchValue } = useSearch();

  const crumbs = location.pathname.split("/").filter(Boolean);
  const visibleCrumbs = crumbs.filter((segment) => !/^\d+$/.test(segment));
  const currentSegment = visibleCrumbs.length ? visibleCrumbs[visibleCrumbs.length - 1] : crumbs[0] || "dashboard";
  const title = titleMap[currentSegment] || "Dashboard";
  const subtitle = subtitleMap[currentSegment] || "Manage your HR workflows in one place.";

  const breadcrumb = visibleCrumbs.map((segment, index) => {
    const label = titleMap[segment] || segment;
    const path = `/${visibleCrumbs.slice(0, index + 1).join("/")}`;
    const active = index === visibleCrumbs.length - 1;
    return { label, path, active };
  });

  useEffect(() => {
    setSearchValue("");
  }, [location.pathname, setSearchValue]);

  return (
    <>
      <Header
        title={title}
        subtitle={subtitle}
        breadcrumb={breadcrumb}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onLogout={onLogout}
      />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </>
  );
}

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <SearchProvider>
      <div className="min-h-screen flex bg-slate-100 text-slate-900">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((open) => !open)} />
        <div className="flex-1 flex flex-col">
          <LayoutContent onLogout={logout} location={location} />
        </div>
      </div>
    </SearchProvider>
  );
}

export default Layout;
