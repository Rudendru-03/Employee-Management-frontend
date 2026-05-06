import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.mustChangePassword) {
        navigate("/change-password-required");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Gradient background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-40"></div>
      
      <div className="w-full max-w-md px-4 relative z-10 slide-up">
        <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-3xl shadow-2xl p-8 md:p-10 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/30 to-accent-secondary/30 rounded-2xl mb-4 ring-2 ring-primary/20 shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center shadow-glow-blue">
                <span className="text-2xl font-bold text-white">E</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-light text-base">Employee Management Portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 fade-in">
            {/* Email Input */}
            <div className="space-y-2.5">
              <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-primary pointer-events-none transition group-focus-within:text-primary-light" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition hover:border-border/80 text-foreground placeholder-muted backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2.5">
              <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-primary pointer-events-none transition group-focus-within:text-primary-light" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition hover:border-border/80 text-foreground placeholder-muted backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-danger/10 border border-danger/30 rounded-xl flex items-start gap-3 text-danger text-sm fade-in backdrop-blur-sm">
                <div className="w-5 h-5 rounded-full bg-danger/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">!</span>
                </div>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl transition duration-200 hover:shadow-glow-blue disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-7 text-base shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-light">Demo Credentials</span>
            </div>
          </div>

          {/* Demo Info */}
          <div className="mt-6 space-y-2 text-center">
            <p className="text-xs text-muted-light">Use these credentials to explore the app:</p>
            <div className="bg-background/50 rounded-xl p-3 border border-border/30 backdrop-blur-sm">
              <p className="font-mono text-xs text-foreground">
                <span className="text-primary">Email:</span> admin@example.com
              </p>
              <p className="font-mono text-xs text-foreground mt-1">
                <span className="text-primary">Password:</span> password
              </p>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-8 text-center text-xs text-muted-light">
          <p>Enterprise-grade employee management system</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
