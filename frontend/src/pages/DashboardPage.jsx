import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import SummaryCards from "../components/SummaryCards";
import RecentTransactions from "../components/RecentTransactions";
import CategoryBreakdown from "../components/CategoryBreakdown";

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/summary"),
      api.get("/summary/recent"),
      api.get("/summary/category")
    ])
      .then(([sumRes, recRes, catRes]) => {
        setSummary(sumRes.data);
        setRecent(recRes.data);
        setCategories(catRes.data);
      })
      .catch((e) => setError(e.response?.data?.message || e.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-6">
      {error && <ErrorAlert message={error} />}
      <SummaryCards summary={summary} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions txs={recent} />
        <CategoryBreakdown data={categories} />
      </div>
    </div>
  );
}
