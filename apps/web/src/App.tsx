import { useState } from 'react'
import { login, register } from '@nextalk/sdk'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<{ type: 'info' | 'success' | 'error'; message: string } | null>(null)

  async function handleRegister() {
    setStatus({ type: 'info', message: 'Registering account…' })
    try {
      await register(email, password)
      setStatus({ type: 'success', message: 'Registered successfully. Please login.' })
    } catch (err) {
      setStatus({ type: 'error', message: String(err) })
    }
  }

  async function handleLogin() {
    setStatus({ type: 'info', message: 'Signing in…' })
    try {
      const res = await login(email, password)
      setToken(res.token)
      setStatus({ type: 'success', message: 'Login successful.' })
    } catch (err) {
      setStatus({ type: 'error', message: String(err) })
    }
  }

  return (
    <div className="app-shell">
      <div className="card auth-card">
        <div>
          <h1 className="brand-title">NexTalk</h1>
          <p className="brand-subtitle">A secure messaging platform starter with auth and real-time chat.</p>
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="input"
            type="password"
            placeholder="Enter a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {status && (
          <div className={`status status--${status.type}`} role="status">
            {status.message}
          </div>
        )}

        <div className="actions">
          <button className="button button-primary" onClick={handleRegister}>Register</button>
          <button className="button button-secondary" onClick={handleLogin}>Login</button>
        </div>

        {token && (
          <div className="token-block">
            <strong>Token</strong>
            <pre>{token}</pre>
          </div>
        )}

        <p className="footer-note">Demo UI — data is sent to localhost backend.</p>
      </div>
    </div>
  )
}
