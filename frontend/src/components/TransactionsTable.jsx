export default function TransactionsTable({ txs }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-zinc-800 text-zinc-400 text-sm">
            <th className="px-6 py-3 text-left font-medium">Amount</th>
            <th className="px-6 py-3 text-left font-medium">Type</th>
            <th className="px-6 py-3 text-left font-medium">Category</th>
            <th className="px-6 py-3 text-left font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {txs.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-zinc-500 py-10">No transactions found</td>
            </tr>
          )}
          {txs.map((tx) => (
            <tr key={tx._id} className="border-t border-zinc-800 hover:bg-zinc-900 transition">
              <td className="px-6 py-3 text-sm font-medium text-white">₹{tx.amount}</td>
              <td className="px-6 py-3 text-sm capitalize text-zinc-300">{tx.type}</td>
              <td className="px-6 py-3 text-sm capitalize text-zinc-300">{tx.category}</td>
              <td className="px-6 py-3 text-sm text-zinc-500">{new Date(tx.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
