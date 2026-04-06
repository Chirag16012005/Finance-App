export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 p-6 ${className}`}>
      {children}
    </div>
  );
}
