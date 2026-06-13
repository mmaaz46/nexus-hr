import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import { useSearch } from "../components/SearchContext";

function Leaves() {
  const { searchValue } = useSearch();
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ employeeId: "", leaveType: "", startDate: "", endDate: "", reason: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await api.get("/leaves");
        setLeaves(response.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const applyLeave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.post("/leaves", { ...form, employeeId: Number(form.employeeId) });
      setForm({ employeeId: "", leaveType: "", startDate: "", endDate: "", reason: "" });
      const response = await api.get("/leaves");
      setLeaves(response.data || []);
    } catch (err) {
      console.error(err);
      setError("Could not submit leave request. Please check the details.");
    } finally {
      setSaving(false);
    }
  };

  const approveLeave = async (id) => {
    try {
      await api.put(`/leaves/${id}/approve`);
      const response = await api.get("/leaves");
      setLeaves(response.data || []);
    } catch (err) {
      console.error(err);
      alert("Unable to approve leave.");
    }
  };

  const rejectLeave = async (id) => {
    try {
      await api.put(`/leaves/${id}/reject`);
      const response = await api.get("/leaves");
      setLeaves(response.data || []);
    } catch (err) {
      console.error(err);
      alert("Unable to reject leave.");
    }
  };
  const filteredLeaves = useMemo(() => {
    if (!searchValue.trim()) return leaves;
    const term = searchValue.toLowerCase();
    return leaves.filter((item) => {
      const employeeId = item.employeeId?.toString() || "";
      const leaveType = item.leaveType || "";
      const status = item.status || "";
      return [employeeId, leaveType, status]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term));
    });
  }, [leaves, searchValue]);

  if (loading) {
    return <Loader />;
  }

  const stats = {
    total: filteredLeaves.length,
    approved: filteredLeaves.filter((item) => /approved/i.test(item.status)).length,
    pending: filteredLeaves.filter((item) => /pending/i.test(item.status)).length,
    rejected: filteredLeaves.filter((item) => /rejected/i.test(item.status)).length,
  };

  return (
    <section className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Requests</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950">{stats.total}</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Approved</p>
          <p className="mt-4 text-4xl font-semibold text-emerald-600">{stats.approved}</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Pending</p>
          <p className="mt-4 text-4xl font-semibold text-amber-600">{stats.pending}</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Rejected</p>
          <p className="mt-4 text-4xl font-semibold text-rose-600">{stats.rejected}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Leave requests</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950">Team leave dashboard</h1>
            </div>
            <p className="text-sm text-slate-500">Manage approvals in one place</p>
          </div>

          {filteredLeaves.length === 0 ? (
            <EmptyState
              title="No leave requests yet"
              description="Leave requests will appear here when employees submit their applications."
            />
          ) : (
            <div className="space-y-5">
              {filteredLeaves.map((leave) => (
                <div key={leave.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-950">Employee ID {leave.employeeId}</p>
                      <p className="mt-1 text-sm text-slate-500">{leave.leaveType || "Leave"}</p>
                    </div>
                    <StatusBadge status={leave.status || "Pending"} />
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-slate-500">From</p>
                      <p className="mt-2 font-semibold text-slate-950">{leave.startDate || "—"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">To</p>
                      <p className="mt-2 font-semibold text-slate-950">{leave.endDate || "—"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Reason</p>
                      <p className="mt-2 font-semibold text-slate-950">{leave.reason || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => approveLeave(leave.id)}
                      className="rounded-3xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => rejectLeave(leave.id)}
                      className="rounded-3xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Request form</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Submit leave request</h2>
          <p className="mt-3 text-sm text-slate-500">Employees can request time off using the form below.</p>

          <form onSubmit={applyLeave} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Employee ID
              <input
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                placeholder="123"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Leave type
              <input
                name="leaveType"
                value={form.leaveType}
                onChange={handleChange}
                placeholder="Vacation"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Start date
                <input
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  type="date"
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                End date
                <input
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  type="date"
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </label>
            </div>
            <label className="block text-sm font-medium text-slate-700">
              Reason
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us why you need time off"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </label>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Applying..." : "Apply for leave"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Leaves;
