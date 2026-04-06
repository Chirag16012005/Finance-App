import Card from "./Card";

export default function FilterBar({ filters, onChange }) {
  function update(patch) {
    onChange({ ...filters, page: 1, ...patch });
  }

  return (
    <Card className="mb-6">
      <div className="font-semibold text-white mb-4\">Filters</div>
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Type</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 bg-blue-50"
            value={filters.type || ""}
            onChange={(e) => update({ type: e.target.value })}
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Category</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={filters.category || ""}
            onChange={(e) => update({ category: e.target.value })}
            placeholder="e.g. food"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Start Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={filters.startDate || ""}
            onChange={(e) => update({ startDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">End Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={filters.endDate || ""}
            onChange={(e) => update({ endDate: e.target.value })}
          />
        </div>
      </form>
    </Card>
  );
}
