import { useState } from "react";

export default function TransactionForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({ amount: "", type: "expense", category: "", date: "", note: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSubmit(form);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-xl shadow-lg p-6 w-full max-w-sm relative border border-zinc-800">
        <button type="button" className="absolute top-4 right-4 text-zinc-400 hover:text-white transition text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-semibold text-white mb-4">Add Transaction</h2>
        {error && <div className="bg-red-950 border border-red-900 text-red-200 px-3 py-2 rounded-md mb-3 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-2">Amount</label>
          <input name="amount" type="number" min="0" step="0.01" required className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={form.amount} onChange={handleChange} placeholder="0.00" />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-2">Type</label>
          <select name="type" className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={form.type} onChange={handleChange}>
            <option value="income" className="bg-zinc-950">Income</option>
            <option value="expense" className="bg-zinc-950">Expense</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-2">Category</label>
          <input name="category" required className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={form.category} onChange={handleChange} placeholder="e.g. food" />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-2">Date</label>
          <input name="date" type="date" className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={form.date} onChange={handleChange} />
        </div>
        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-2">Note (Optional)</label>
          <input name="note" className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={form.note} onChange={handleChange} placeholder="Add a note..." />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition font-medium" disabled={loading}>
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}
