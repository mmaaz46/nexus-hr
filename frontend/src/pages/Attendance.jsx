import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await api.get("/attendance");
        setAttendance(response.data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load attendance records.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const summary = useMemo(() => {
    const present = attendance.filter((item) => /present/i.test(item.status)).length;
    const absent = attendance.filter((item) => /absent/i.test(item.status)).length;
    const onLeave = attendance.filter((item) => /leave|on leave/i.test(item.status)).length;
    return { present, absent, onLeave, total: attendance.length };
  }, [attendance]);

  const grouped = useMemo(() => {
    return attendance.reduce((acc, item) => {
      const key = item.employeeName || item.employeeEmail || `ID ${item.employeeId}`;
      acc[key] = acc[key] || { present: 0, absent: 0, leave: 0, count: 0 };
      acc[key].count += 1;
      if (/present/i.test(item.status)) acc[key].present += 1;
      if (/absent/i.test(item.status)) acc[key].absent += 1;
      if (/leave|on leave/i.test(item.status)) acc[key].leave += 1;
      return acc;
    }, {});
  }, [attendance]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="space-y-8">
      {error && (
        <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Daily attendance</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950">{summary.present}</p>
          <p className="mt-2 text-sm text-slate-500">Present today</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Absences</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950">{summary.absent}</p>
          <p className="mt-2 text-sm text-slate-500">Absent</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">On leave</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950">{summary.onLeave}</p>
          <p className="mt-2 text-sm text-slate-500">Leave requests</p>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Attendance overview</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Attendance tracker</h1>
          </div>
          <p className="text-sm text-slate-500">Total records: {summary.total}</p>
        </div>

        {attendance.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="No attendance records"
              description="There are no attendance entries available yet."
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-5">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-950">Employee attendance summary</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {Object.entries(grouped).map(([employee, stats]) => (
                  <div key={employee} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-slate-900">{employee}</p>
                    <p className="mt-2 text-sm text-slate-500">Records: {stats.count}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-700">
                      <span className="rounded-2xl bg-emerald-100 px-3 py-1">Present {stats.present}</span>
                      <span className="rounded-2xl bg-rose-100 px-3 py-1">Absent {stats.absent}</span>
                      <span className="rounded-2xl bg-amber-100 px-3 py-1">Leave {stats.leave}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-6 py-4 font-medium">Employee</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {attendance.map((record) => (
                    <tr key={`${record.id}-${record.date}`} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-700">{record.employeeName || record.employeeEmail || `ID ${record.employeeId}`}</td>
                      <td className="px-6 py-4 text-slate-700">{record.date || record.recordDate || "—"}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={record.status || "Unknown"} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Attendance;
