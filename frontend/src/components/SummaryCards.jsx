import Card from "./Card";

export default function SummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <div className="text-sm text-zinc-400 mb-2">Total Income</div>
        <div className="text-3xl font-bold text-green-400">₹{summary?.income ?? 0}</div>
      </Card>
      <Card>
        <div className="text-sm text-zinc-400 mb-2">Total Expense</div>
        <div className="text-3xl font-bold text-red-400">₹{summary?.expense ?? 0}</div>
      </Card>
      <Card>
        <div className="text-sm text-zinc-400 mb-2">Balance</div>
        <div className="text-3xl font-bold text-white">₹{summary?.balance ?? 0}</div>
      </Card>
    </div>
  );
}
