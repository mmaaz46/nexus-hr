import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { useSearch } from "../components/SearchContext";

function Employees() {
  const { searchValue } = useSearch();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      setEmployees(response.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    const confirmed = window.confirm("Delete this employee? This action cannot be undone.");
    if (!confirmed) return;

    try {
      await api.delete(`/employees/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    if (!searchValue.trim()) return employees;
    const term = searchValue.toLowerCase();
    return employees.filter((emp) => {
      return [emp.name, emp.email, emp.department, emp.role, emp.position]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term));
    });
  }, [employees, searchValue]);

  const formatSalary = (value) => {
    if (value == null || value === "") return "—";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Employee directory</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Team management</h1>
          <p className="mt-2 text-sm text-slate-500">Manage employee records, edit profiles, and keep the team roster up to date.</p>
        </div>

        <Link
          to="/employees/add"
          className="inline-flex items-center justify-center rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500"
        >
          + Add Employee
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Search records</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Find employees quickly</h2>
            </div>
            <div className="max-w-sm flex-1">
              <p className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                Use the global search in the top header to filter by name, email, or department.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Total employees</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{employees.length}</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Filtered results</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{filteredEmployees.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Team snapshot</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Roster summary</h2>
            </div>
            <span className="rounded-3xl bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">{filteredEmployees.length} records</span>
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Use the employee table below to edit or remove a profile safely from the HR system.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Salary</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-16 text-center text-slate-500">
                  <EmptyState
                    title="No employees found"
                    description="Add new team members or update the search criteria to locate employee profiles."
                  />
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4 align-top text-slate-800">
                    <div className="font-semibold text-slate-950">{emp.name || "—"}</div>
                    <div className="mt-1 text-sm text-slate-500">{emp.role || emp.position || "Employee"}</div>
                  </td>
                  <td className="px-6 py-4 align-top text-slate-700">{emp.email || "—"}</td>
                  <td className="px-6 py-4 align-top text-slate-700">{emp.department || "—"}</td>
                  <td className="px-6 py-4 align-top text-slate-700">{formatSalary(emp.salary)}</td>
                  <td className="px-6 py-4 align-top text-slate-700">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/employees/edit/${emp.id}`}
                        className="rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteEmployee(emp.id)}
                        className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Employees;
