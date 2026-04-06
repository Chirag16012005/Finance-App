
import { useState, useEffect, useCallback } from "react";
import api from "./services/api";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import Loader from "./components/Loader";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(() => (token ? "dashboard" : "home"));
  const [loading, setLoading] = useState(!!token); // Show loader if token exists on mount

  // Validate token on app mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Verify token is still valid by fetching current user
        const { data } = await api.get("/auth/me");
        setUser(data); // Store user data from response
        setLoading(false);
      } catch (err) {
        console.error("Token validation failed:", err);
        // Token is invalid, clear it
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setPage("home");
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const handleLogin = useCallback((newToken, userData = null) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
    setPage("dashboard");
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setPage("home");
  }, []);

  // Show loading state while validating token
  if (loading && token) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Unauthenticated routes
  if (!token) {
    if (page === "login") {
      return (
        <LoginPage
          onLogin={handleLogin}
          onNavigateToRegister={() => setPage("register")}
        />
      );
    }
    if (page === "register") {
      return (
        <RegisterPage
          onSuccess={() => setPage("login")}
          onNavigateToLogin={() => setPage("login")}
        />
      );
    }
    return <HomePage onSignIn={() => setPage("login")} onSignUp={() => setPage("register")} />;
  }

  // Authenticated routes
  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-zinc-900 border-b border-zinc-800 mb-8">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex gap-8 items-center">
            <h1 className="text-lg font-semibold text-white">Finance Dashboard</h1>
            <div className="flex gap-6">
              <button 
                className={`transition font-medium ${page === "dashboard" ? "text-white" : "text-zinc-400 hover:text-white"}`} 
                onClick={() => setPage("dashboard")}
              >
                Dashboard
              </button>
              <button 
                className={`transition font-medium ${page === "transactions" ? "text-white" : "text-zinc-400 hover:text-white"}`} 
                onClick={() => setPage("transactions")}
              >
                Transactions
              </button>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {user && (
              <div className="text-right">
                <p className="text-sm text-white font-medium">{user.name || "User"}</p>
                <p className="text-xs text-zinc-500 capitalize">{user.role || "viewer"}</p>
              </div>
            )}
            <button 
              className="text-zinc-400 hover:text-white transition text-sm px-3 py-1 border border-zinc-700 rounded-md hover:border-zinc-500" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main>
        {page === "dashboard" && <DashboardPage />}
        {page === "transactions" && <TransactionsPage />}
        {!["dashboard", "transactions"].includes(page) && (
          <div className="text-center py-20 text-zinc-400">
            <p>Page not found</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
