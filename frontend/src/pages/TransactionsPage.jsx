import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import Card from "../components/Card";
import Button from "../components/Button";
import TransactionsTable from "../components/TransactionsTable";
import FilterBar from "../components/FilterBar";
import TransactionForm from "../components/TransactionForm";
import Pagination from "../components/Pagination";

export default function TransactionsPage() {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ page: 1, type: "", category: "", startDate: "", endDate: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    api
      .get("/transactions", {
        params: {
          page: filters.page,
          type: filters.type || undefined,
          category: filters.category || undefined,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        },
      })
      .then((res) => setTxs(res.data))
      .catch((e) => setError(e.response?.data?.message || e.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, [filters.page, filters.type, filters.category, filters.startDate, filters.endDate]);

  async function handleAdd(tx) {
    setError("");
    try {
      const payload = {
        amount: Number(tx.amount),
        type: tx.type,
        category: tx.category,
        note: tx.note || undefined,
        ...(tx.date ? { date: tx.date } : {}),
      };

      setLoading(true);
      await api.post("/transactions", payload);
      setShowForm(false);
      setFilters((f) => ({ ...f, page: 1 }));
    } catch (e) {
      const msg = e.response?.data?.message || e.message || "Failed to add transaction";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }

  function updateFilters(next) {
    setLoading(true);
    setError("");
    setFilters(next);
  }

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white\">Transactions</h2>
          <div className="text-sm text-zinc-400 mt-1\">Filter, review, and add your transactions</div>
        </div>
        <Button fullWidth={false} onClick={() => setShowForm(true)}>
          + Add Transaction
        </Button>
      </div>

      <FilterBar
        filters={filters}
        onChange={(next) => updateFilters(next)}
      />

      {error && <ErrorAlert message={error} />}

      <Card className="p-0 overflow-hidden">
        {loading ? <Loader /> : <TransactionsTable txs={txs} />}
      </Card>

      <Pagination
        page={filters.page || 1}
        setPage={(p) => updateFilters({ ...filters, page: p })}
        hasMore={txs.length === 10}
      />
      {showForm && <TransactionForm onClose={() => setShowForm(false)} onSubmit={handleAdd} />}
    </div>
  );
}
