
import { useState } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [page, setPage] = useState(() => (token ? "dashboard" : "home"));

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    setPage("home");
  }

  if (!token) {
    if (page === "login") {
      return (
        <LoginPage
          onLogin={(newToken) => {
            setToken(newToken);
            setPage("dashboard");
          }}
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

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-zinc-900 border-b border-zinc-800 mb-8">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex gap-8">
            <button className={page === "dashboard" ? "text-white font-medium" : "text-zinc-400 hover:text-white transition"} onClick={() => setPage("dashboard")}>Dashboard</button>
            <button className={page === "transactions" ? "text-white font-medium" : "text-zinc-400 hover:text-white transition"} onClick={() => setPage("transactions")}>Transactions</button>
          </div>
          <button className="text-zinc-400 hover:text-white transition text-sm" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      {page === "dashboard" && <DashboardPage />}
      {page === "transactions" && <TransactionsPage />}
    </div>
  );
}

export default App;
