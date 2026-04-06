import { useState } from "react";
import api from "../services/api";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorAlert from "../components/ErrorAlert";

export default function RegisterPage({ onSuccess, onNavigateToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", form);
      onSuccess();
    } catch (e) {
      setError(e.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>
        <ErrorAlert message={error} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="name"
            autoFocus
            required
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Role</label>
            <select
              name="role"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={form.role}
              onChange={handleChange}
            >
              <option value="viewer" className="bg-zinc-950">Viewer</option>
              <option value="analyst" className="bg-zinc-950">Analyst</option>
              <option value="admin" className="bg-zinc-950">Admin</option>
            </select>
          </div>
          <Button type="submit" disabled={loading} fullWidth>
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>
        <p className="text-center text-zinc-400 text-sm mt-6">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-400 hover:text-blue-300 transition font-medium"
            onClick={onNavigateToLogin}
          >
            Sign in
          </button>
        </p>
      </Card>
    </div>
  );
}
