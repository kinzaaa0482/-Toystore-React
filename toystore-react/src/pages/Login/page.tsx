import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('ts_user', email)
    navigate('/dashboard')
  }

  return (
    <div className="page">
      <div className="form-container">
        <h1>Welcome Back!</h1>
        <p>Sign in to your ToyStore account</p>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Sign In</button>
          </div>
          <p>Don't have an account? <NavLink to="/signup" className="link-button">Register</NavLink></p>
        </form>
      </div>
    </div>
  )
}
