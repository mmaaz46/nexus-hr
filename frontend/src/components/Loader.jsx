function Loader() {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-slate-500 shadow-sm">
      <div className="inline-flex animate-spin items-center justify-center rounded-full border-4 border-slate-300 border-t-indigo-600 p-4" />
      <span className="ml-4 text-sm font-medium">Loading data…</span>
    </div>
  );
}

export default Loader;
