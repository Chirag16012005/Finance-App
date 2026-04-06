export default function Pagination({ page, setPage, hasMore }) {
  return (
    <div className="flex gap-2 justify-center my-6">
      <button className="px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-md hover:bg-zinc-700 transition disabled:opacity-30" onClick={() => setPage(page - 1)} disabled={page <= 1}>
        ← Prev
      </button>
      <span className="px-4 py-2 text-zinc-400 text-sm">Page {page}</span>
      <button className="px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-md hover:bg-zinc-700 transition disabled:opacity-30" onClick={() => setPage(page + 1)} disabled={!hasMore}>
        Next →
      </button>
    </div>
  );
}
