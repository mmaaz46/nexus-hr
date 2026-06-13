import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";

function Insights() {
  const [insights, setInsights] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await api.get("/insights");
        setInsights(response.data || {});
      } catch (err) {
        console.error(err);
        setError("Unable to load workforce insights.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const metrics = [
    {
      title: "Average Rating",
      value: `${insights.averageRating ?? 0}/5`,
      subtitle: "Performance sentiment",
      progress: Math.min((insights.averageRating ?? 0) * 20, 100),
      color: "bg-indigo-600",
    },
    {
      title: "Attrition Risk",
      value: `${insights.attritionRisk ?? 0}%`,
      subtitle: "Potential turnover",
      progress: Math.min(insights.attritionRisk ?? 0, 100),
      color: "bg-rose-500",
    },
    {
      title: "Workforce Health",
      value: `${insights.workforceHealthScore ?? 0}%`,
      subtitle: "Team wellbeing",
      progress: Math.min(insights.workforceHealthScore ?? 0, 100),
      color: "bg-emerald-500",
    },
    {
      title: "Recommendation Score",
      value: `${insights.recommendationScore ?? 0}%`,
      subtitle: "Action readiness",
      progress: Math.min(insights.recommendationScore ?? 0, 100),
      color: "bg-sky-500",
    },
  ];

  return (
    <section className="space-y-8">
      {error && (
        <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{metric.title}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">{metric.value}</p>
              <p className="mt-2 text-sm text-slate-500">{metric.subtitle}</p>
              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div className={`${metric.color} h-full rounded-full`} style={{ width: `${metric.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">AI insights</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Workforce intelligence report</h1>
          </div>
          <span className="rounded-3xl bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">Updated in real time</span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-5">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm text-slate-500">Staff retention</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">{insights.retentionScore ?? 78}%</p>
              <p className="mt-2 text-sm text-slate-600">The team is currently tracking ahead of last quarter in talent retention.</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm text-slate-500">AI recommendation</p>
              <p className="mt-3 text-lg font-semibold text-slate-950">{insights.recommendation || "Review teams with high attrition risk."}</p>
              <p className="mt-2 text-sm text-slate-600">NexusHR suggests targeted coaching and improved benefits alignment.</p>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <p className="text-sm text-slate-500">Workforce health score</p>
            <p className="mt-3 text-5xl font-semibold text-slate-950">{insights.workforceHealthScore ?? 82}%</p>
            <div className="mt-6 rounded-3xl bg-slate-200 p-4">
              <div className="h-4 overflow-hidden rounded-full bg-slate-300">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${Math.min(insights.workforceHealthScore ?? 82, 100)}%` }}
                />
              </div>
              <p className="mt-4 text-sm text-slate-600">This score reflects retention, engagement, and performance health across the workforce.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Insights;
