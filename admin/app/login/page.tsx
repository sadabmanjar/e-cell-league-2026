"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { fetchClient } from "@/lib/api-client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetchClient<{ token: string; user: { role: string; name: string } }>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      )
      // Store auth token and redirect
      if (res.token) {
        localStorage.setItem("admin_token", res.token)
        localStorage.setItem("admin_user", JSON.stringify(res.user))
        window.location.href = "/dashboard"
      } else {
        throw new Error("No token received from server")
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="font-bold text-white text-2xl tracking-tight mb-2">
            E-Cell League<span className="text-primary">.Admin</span>
          </h1>
          <p className="text-sm text-text-secondary">Sign in to access the management portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Email Address</label>
            <Input
              type="email"
              placeholder="admin@ecell.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-950/40 border border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Sign In"}
          </Button>
        </form>

        <p className="text-xs text-text-secondary text-center mt-6">
          Access restricted to authorized administrators only.
        </p>
      </div>
    </div>
  )
}
