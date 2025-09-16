import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '', showPassword: false })
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Form validation
  const errors = useMemo(() => {
    const e = {}
    if (!form.email.trim()) e.email = 'Email required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.password) e.password = 'Password required'
    return e
  }, [form])

  const isValid = Object.keys(errors).length === 0

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
  }

  function togglePassword() {
    setForm(f => ({ ...f, showPassword: !f.showPassword }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ email: true, password: true })
    if (!isValid) return
    setSubmitting(true)
    setError(null)
    setSuccess(false)
    try {
      // ✅ now pointing to backend on port 3000
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for cookies
        body: JSON.stringify({ email: form.email, password: form.password })
      })
      if (!res.ok) throw new Error("Login failed")
      setSuccess(true)
    } catch (err) {
      setError(err.message || "Login failed")
    } finally {
      setSubmitting(false)
    }
  }

  function handleGoogleLogin() {
    // ✅ backend Google OAuth route on port 3000
    window.location.href = "http://localhost:3000/api/oauth/google"
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <header className="login-heading">
          <h1>Welcome back</h1>
          <p>Sign in to continue to your dashboard.</p>
        </header>
        <form className="login-card" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <div className="input-shell">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.email && errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="input-shell">
              <input
                id="password"
                name="password"
                type={form.showPassword ? 'text' : 'password'}
                placeholder="••••••"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button type="button" className="password-toggle" onClick={togglePassword}>
                {form.showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {touched.password && errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}
          </div>

          <div className="actions">
            <button type="submit" className="submit-btn" disabled={!isValid || submitting}>
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>

            {/* 🔹 Google Login Button */}
            <button type="button" className="google-btn" onClick={handleGoogleLogin}>
              <img src="/google-icon.svg" alt="Google" style={{ width: "18px", marginRight: "8px" }} />
              Sign in with Google
            </button>

            <div className="alt-link">
              Don't have an account? <Link to="/register">Create one</Link>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>Login successful!</div>}
          </div>
        </form>
      </div>
    </div>
  )
}
