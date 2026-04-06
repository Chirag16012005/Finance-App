import { useState } from "react";
import ErrorAlert from "./ErrorAlert";

export default function AuthForm({ onLogin, loading, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 w-full max-w-sm mx-auto mt-24">
      <h2 className="text-xl font-semibold mb-4 text-center">Sign In</h2>
      <ErrorAlert message={error} />
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Email</label>
        <input type="email" className="w-full border px-3 py-2 rounded" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
      </div>
      <div className="mb-6">
        <label className="block mb-1 text-gray-700">Password</label>
        <input type="password" className="w-full border px-3 py-2 rounded" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="w-full py-2 bg-gray-900 text-white rounded hover:bg-gray-800" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
