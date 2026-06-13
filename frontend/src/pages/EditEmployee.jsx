import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", department: "", salary: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/employees/${id}`);
        setForm({
          name: response.data.name || "",
          email: response.data.email || "",
          department: response.data.department || "",
          salary: response.data.salary || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load employee details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.put(`/employees/${id}`, {
        name: form.name,
        email: form.email,
        department: form.department,
        salary: Number(form.salary),
      });
      navigate("/employees");
    } catch (err) {
      console.error(err);
      setError("Update failed. Please check the values and try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Employee profile</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Edit team member</h1>
            <p className="mt-2 text-sm text-slate-500">Update the employee details and save changes to the directory.</p>
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
            <div className="lg:col-span-2 rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200">
              {error}
            </div>
          )}

          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Updating employee..." : "Update employee"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditEmployee;
