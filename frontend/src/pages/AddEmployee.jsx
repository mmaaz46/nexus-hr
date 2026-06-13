import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", department: "", salary: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.post("/employees", {
        name: form.name,
        email: form.email,
        department: form.department,
        salary: Number(form.salary),
      });
      navigate("/employees");
    } catch (err) {
      console.error(err);
      setError("Unable to save employee. Please verify the data and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Employee onboarding</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Add a new team member</h1>
            <p className="mt-2 text-sm text-slate-500">Create an employee record and add them to the NexusHR roster.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Full name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email address</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@company.com"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Department</span>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Human Resources"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Salary</span>
            <input
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              placeholder="50000"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </label>

          {error && (
            <div className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200">
              {error}
            </div>
          )}

          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving employee..." : "Save employee"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddEmployee;
