import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

export default function Signup() {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const navigate = useNavigate()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      alert('Passwords do not match!')
      return
    }
    localStorage.setItem('ts_user', email)
    navigate('/dashboard')
  }

  return (
    <div className="page">
      <div className="form-container">
        <h1>Create Account</h1>
        <p>Join ToyStore and start shopping!</p>
        <form onSubmit={handleSignup}>
          <div>
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" value={fullname} onChange={e => setFullname(e.target.value)} required />
          </div>
          <div>
            <label>Email Address</label>
            <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Phone Number</label>
            <input type="tel" placeholder="+92 300 0000000" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" value={confirm} onChange={e => setConfirm(e.target.value)} required />
          </div>
          <div>
            <button type="submit">Create Account</button>
          </div>
          <p>Already have an account? <NavLink to="/login" className="link-button">Sign In</NavLink></p>
        </form>
      </div>
    </div>
  )
}
