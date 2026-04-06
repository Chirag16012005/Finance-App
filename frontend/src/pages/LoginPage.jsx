import { useState } from "react";
import api from "../services/api";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";

export default function LoginPage({ onLogin, onNavigateToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPasswordHint, setShowPasswordHint] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      onLogin(data.token);
    } catch (e) {
      setError(e.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>
        <ErrorAlert message={error} />
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            autoFocus
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={() => setShowPasswordHint(true)}
            onBlur={() => setShowPasswordHint(false)}
            placeholder="Enter your password"
          />
          {showPasswordHint && (
            <div className="text-xs text-zinc-500 p-2 bg-zinc-800 rounded border border-zinc-700">
              <p className="font-medium text-zinc-400 mb-1">Password Requirements:</p>
              <ul className="space-y-1">
                <li>✓ At least 8 characters</li>
                <li>✓ 1 uppercase letter (A-Z)</li>
                <li>✓ 1 lowercase letter (a-z)</li>
                <li>✓ 1 number (0-9)</li>
                <li>✓ 1 special character (!@#$%^&*)</li>
              </ul>
            </div>
          )}
          <Button type="submit" disabled={loading} fullWidth>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <p className="text-center text-zinc-400 text-sm mt-6">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-blue-400 hover:text-blue-300 transition font-medium"
            onClick={onNavigateToRegister}
          >
            Sign up
          </button>
        </p>
      </Card>
    </div>
  );
}
