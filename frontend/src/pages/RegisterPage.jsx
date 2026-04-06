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
  const [errors, setErrors] = useState([]);
  const [showPasswordHint, setShowPasswordHint] = useState(false);

  const passwordRequirements = [
    { regex: /.{8,}/, label: "At least 8 characters" },
    { regex: /[A-Z]/, label: "At least 1 uppercase letter" },
    { regex: /[a-z]/, label: "At least 1 lowercase letter" },
    { regex: /[0-9]/, label: "At least 1 number" },
    { regex: /[!@#$%^&*()\-+={}'":|,.<>?]/, label: "At least 1 special character" }
  ];

  const passwordChecks = passwordRequirements.map(req => ({
    ...req,
    met: req.regex.test(form.password)
  }));

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setErrors([]);
    try {
      await api.post("/auth/register", form);
      onSuccess();
    } catch (e) {
      setError(e.response?.data?.message || "Registration failed");
      setErrors(e.response?.data?.errors || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-8">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>
        {error && (
          <div className="mb-4">
            <ErrorAlert message={error} />
            {errors.length > 0 && (
              <div className="bg-red-950 border border-red-900 rounded-md p-3 mt-2">
                <p className="text-red-200 text-xs font-medium mb-2">Password Requirements:</p>
                <ul className="space-y-1">
                  {errors.map((err, idx) => (
                    <li key={idx} className="text-red-300 text-xs flex items-start">
                      <span className="mr-2">•</span>
                      <span>{err}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
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
          <div>
            <Input
              label="Password"
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              onFocus={() => setShowPasswordHint(true)}
            />
            {form.password && showPasswordHint && (
              <div className="mt-3 p-3 bg-zinc-800 rounded-md border border-zinc-700">
                <p className="text-xs text-zinc-400 mb-2 font-medium">Password Requirements:</p>
                <div className="space-y-1">
                  {passwordChecks.map((check, idx) => (
                    <div key={idx} className="flex items-center text-xs">
                      <span className={`mr-2 ${check.met ? "text-green-400" : "text-zinc-500"}`}>
                        {check.met ? "✓" : "○"}
                      </span>
                      <span className={check.met ? "text-green-400" : "text-zinc-400"}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
          <Button type="submit" disabled={loading || !passwordChecks.every(c => c.met)} fullWidth>
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
