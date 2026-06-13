function StatusBadge({ status }) {
  const normalized = String(status || "unknown").toLowerCase();
  const appearance =
    normalized === "approved"
      ? "bg-emerald-100 text-emerald-700"
      : normalized === "pending"
      ? "bg-amber-100 text-amber-700"
      : normalized === "rejected"
      ? "bg-rose-100 text-rose-700"
      : normalized === "present"
      ? "bg-emerald-100 text-emerald-700"
      : normalized === "absent"
      ? "bg-rose-100 text-rose-700"
      : normalized === "on leave"
      ? "bg-amber-100 text-amber-700"
      : "bg-slate-100 text-slate-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${appearance}`}>
      {String(status || "Unknown").replace(/\b\w/g, (char) => char.toUpperCase())}
    </span>
  );
}

export default StatusBadge;
