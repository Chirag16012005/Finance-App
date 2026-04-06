import Card from "./Card";

export default function CategoryBreakdown({ data }) {
  return (
    <Card>
      <h3 className="font-semibold text-white mb-4">Category Breakdown</h3>
      <div className="divide-y divide-zinc-800">
        {data.length === 0 && <div className="text-zinc-500 py-8 text-center text-sm">No data available</div>}
        {data.map((cat) => (
          <div key={cat._id} className="py-4 flex items-center justify-between">
            <div className="text-sm font-medium capitalize text-white">{cat._id}</div>
            <div className="text-sm text-blue-400 font-medium">₹{cat.total}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
