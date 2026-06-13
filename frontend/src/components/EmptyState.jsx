function EmptyState({ title, description }) {
  return (
    <div className="grid min-h-[260px] place-items-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
      <div>
        <p className="text-3xl">📭</p>
        <h2 className="mt-4 text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 max-w-md leading-7 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

export default EmptyState;
