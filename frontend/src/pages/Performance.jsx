import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { useSearch } from "../components/SearchContext";

function Performance() {
  const { searchValue } = useSearch();
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ employeeId: "", reviewPeriod: "", rating: "", feedback: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get("/performance");
        setReviews(response.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.post("/performance", {
        employeeId: Number(form.employeeId),
        reviewPeriod: form.reviewPeriod,
        rating: Number(form.rating),
        feedback: form.feedback,
      });
      setForm({ employeeId: "", reviewPeriod: "", rating: "", feedback: "" });
      const response = await api.get("/performance");
      setReviews(response.data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to submit review. Please check the data and try again.");
    } finally {
      setSaving(false);
    }
  };

  const filteredReviews = useMemo(() => {
    if (!searchValue.trim()) return reviews;
    const term = searchValue.toLowerCase();
    return reviews.filter((review) => {
      const employeeId = review.employeeId?.toString() || "";
      const reviewer = review.reviewer || "";
      const feedback = review.feedback || "";
      const period = review.reviewPeriod || "";
      return [employeeId, reviewer, feedback, period]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term));
    });
  }, [reviews, searchValue]);

  const stats = useMemo(() => {
    const count = reviews.length;
    const average = count ? (reviews.reduce((sum, item) => sum + (Number(item.rating) || 0), 0) / count).toFixed(1) : 0;
    return { count, average };
  }, [reviews]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Reviews</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950">{stats.count}</p>
          <p className="mt-2 text-sm text-slate-500">Total performance reviews</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Average rating</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950">{stats.average}/5</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Trend</p>
          <p className="mt-4 text-4xl font-semibold text-emerald-600">+8%</p>
          <p className="mt-2 text-sm text-slate-500">Performance improvement month over month</p>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Performance reviews</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Team performance insights</h1>
          </div>
          <p className="text-sm text-slate-500">Total reviews: {stats.count}</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_400px]">
          <div>
            {filteredReviews.length === 0 ? (
              <EmptyState
                title="No reviews available"
                description="Performance feedback will appear automatically once reviews are submitted."
              />
            ) : (
              <div className="overflow-hidden rounded-[1.75rem] border border-slate-200">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-950 text-white">
                    <tr>
                      <th className="px-6 py-4 font-medium">Employee</th>
                      <th className="px-6 py-4 font-medium">Period</th>
                      <th className="px-6 py-4 font-medium">Rating</th>
                      <th className="px-6 py-4 font-medium">Feedback</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredReviews.map((review) => (
                      <tr key={review.id} className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="px-6 py-4 text-slate-700">{review.employeeId || "N/A"}</td>
                        <td className="px-6 py-4 text-slate-700">{review.reviewPeriod || "—"}</td>
                        <td className="px-6 py-4 text-slate-700">{review.rating}/5</td>
                        <td className="px-6 py-4 text-slate-700">{review.feedback || "No feedback"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-950">Submit a new review</h2>
            <form className="mt-6 space-y-4" onSubmit={submitReview}>
              <label className="block text-sm font-medium text-slate-700">
                Employee ID
                <input
                  name="employeeId"
                  value={form.employeeId}
                  onChange={handleChange}
                  placeholder="123"
                  type="number"
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Review period
                <input
                  name="reviewPeriod"
                  value={form.reviewPeriod}
                  onChange={handleChange}
                  placeholder="Q2 2026"
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Rating
                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                >
                  <option value="">Select rating</option>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Feedback
                <textarea
                  name="feedback"
                  value={form.feedback}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Share performance highlights or improvement notes"
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </label>
              {error && <p className="text-sm text-rose-600">{error}</p>}
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Submitting..." : "Submit review"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Performance;
