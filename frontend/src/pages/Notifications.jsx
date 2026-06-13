import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import { useSearch } from "../components/SearchContext";

function Notifications() {
  const { searchValue } = useSearch();
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({ employeeId: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/notifications");
        setNotifications(response.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createNotification = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      await api.post("/notifications", {
        employeeId: Number(form.employeeId),
        message: form.message,
      });
      const response = await api.get("/notifications");
      setNotifications(response.data || []);
      setForm({ employeeId: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Could not send notification. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const filteredNotifications = useMemo(() => {
    if (!searchValue.trim()) return notifications;
    const term = searchValue.toLowerCase();
    return notifications.filter((item) => {
      const idText = item.employeeId?.toString() || "";
      const messageText = item.message || "";
      return [idText, messageText]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term));
    });
  }, [notifications, searchValue]);

  const unreadCount = notifications.filter((item) => !/read/i.test(item.status)).length;
  
  const displayedNotifications = filteredNotifications;

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Notification center</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Alerts and updates</h1>
          </div>
          <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">🔔</span>
            {unreadCount} unread
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_400px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          {displayedNotifications.length === 0 ? (
            <EmptyState
              title="No notifications yet"
              description="Create announcements and alerts for the workforce from here."
            />
          ) : (
            <div className="space-y-4">
              {displayedNotifications.map((notification) => (
                <div key={notification.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-950">Employee ID {notification.employeeId}</p>
                      <p className="mt-1 text-sm text-slate-500">{notification.createdAt || "Just now"}</p>
                    </div>
                    <StatusBadge status={notification.status || "Unread"} />
                  </div>
                  <p className="mt-4 text-slate-700">{notification.message || "No message content."}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Create notice</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Send a new notification</h2>
          <form className="mt-6 space-y-4" onSubmit={createNotification}>
            <label className="block text-sm font-medium text-slate-700">
              Employee ID
              <input
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                placeholder="123"
                type="number"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Write your notification message here"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </label>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? "Sending..." : "Send notification"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Notifications;
