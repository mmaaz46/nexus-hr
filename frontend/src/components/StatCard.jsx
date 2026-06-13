function StatCard({ title, value, change, icon, accent }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</p>
          <p className="mt-4 text-3xl font-semibold text-slate-950">{value}</p>
        </div>
        <div className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl ${accent}`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
      {change && (
        <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
          <span className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            {change}
          </span>
          <p>Compared to last month</p>
        </div>
      )}
    </div>
  );
}

export default StatCard;
