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
      
      <div className="w-full max-w-md px-6 relative z-10 slide-up">
        <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-3xl shadow-2xl p-10 md:p-12 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/30 to-accent-secondary/30 rounded-2xl mb-6 ring-2 ring-primary/20 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center shadow-glow-blue">
                <span className="text-xl font-bold text-white">E</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Welcome Back</h1>
            <p className="text-muted-light text-sm">Employee Management Portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 fade-in">
            {/* Email Input */}
            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none transition group-focus-within:text-primary-light" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition hover:border-border/80 text-foreground placeholder-muted backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-3">
              <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none transition group-focus-within:text-primary-light" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition hover:border-border/80 text-foreground placeholder-muted backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 bg-danger/10 border border-danger/30 rounded-xl flex items-start gap-3 text-danger text-sm fade-in backdrop-blur-sm">
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
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl transition duration-200 hover:shadow-glow-blue disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8 text-base shadow-lg"
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
          <div className="mt-8 pt-8 relative border-t border-border/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-card px-3 text-xs font-semibold text-muted-light uppercase tracking-wider">Demo</span>
            </div>
          </div>

          {/* Demo Info */}
          <div className="mt-8 space-y-3 text-center">
            <p className="text-xs text-muted-light">Use these credentials to explore:</p>
            <div className="bg-background/30 rounded-xl p-4 border border-border/20 backdrop-blur-sm space-y-2">
              <div className="text-left">
                <p className="text-xs text-muted-light mb-1">Email</p>
                <p className="font-mono text-sm text-foreground">admin@example.com</p>
              </div>
              <div className="border-t border-border/20 pt-2">
                <p className="text-xs text-muted-light mb-1">Password</p>
                <p className="font-mono text-sm text-foreground">password</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-10 text-center text-xs text-muted">
          <p>Enterprise-grade employee management system</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
