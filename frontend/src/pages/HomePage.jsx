import Card from "../components/Card";
import Button from "../components/Button";

export default function HomePage({ onSignIn, onSignUp }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2">Finance Dashboard</h1>
        <p className="text-sm text-zinc-400 mb-8">
          Track income, expenses, and manage transactions with a professional dashboard.
        </p>
        <div className="space-y-3">
          <Button type="button" onClick={onSignIn} fullWidth>
            Sign In →
          </Button>
          <Button type="button" onClick={onSignUp} fullWidth variant="secondary">
            Create Account
          </Button>
        </div>
      </Card>
    </div>
  );
}
