import Card from "./Card";

export default function RecentTransactions({ txs }) {
  return (
    <Card>
      <h3 className="font-semibold text-white mb-4">Recent Transactions</h3>
      <div className="divide-y divide-zinc-800">
        {txs.length === 0 && <div className="text-zinc-500 py-8 text-center text-sm">No transactions found</div>}
        {txs.map((tx) => (
          <div key={tx._id} className="py-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white capitalize">{tx.category}</div>
              <div className="text-xs text-zinc-500 capitalize mt-1">{tx.type}</div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-medium ${tx.type === "income" ? "text-green-400" : "text-red-400"}`}>₹{tx.amount}</div>
              <div className="text-xs text-zinc-500 mt-1">{new Date(tx.date).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
