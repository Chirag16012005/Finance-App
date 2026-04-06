export default function Input({ label, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-zinc-400 mb-2">{label}</label>
      <input
        className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-zinc-500 transition"
        {...props}
      />
    </div>
  );
}
