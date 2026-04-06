export default function ErrorAlert({ message }) {
  if (!message) return null;
  return <div className="bg-red-950 border border-red-900 text-red-200 px-4 py-3 rounded-md mb-4 text-sm">{message}</div>;
}
