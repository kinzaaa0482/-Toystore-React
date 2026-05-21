import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('ts_user', email);
    navigate('/dashboard');
  };

  return (
    <div className="page">
      <div className="form-container">
        <h1>Welcome Back!</h1>
        <p>Sign in to your ToyStore account</p>
        <form onSubmit={handleSubmit}>
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
            <button type="submit" style={{ width: '100%' }}>Sign In</button>
          </div>
          <p style={{ marginTop: '12px' }}>
            Don't have an account?{' '}
            <Link to="/signup" className="link-button" style={{ padding: '6px 14px', fontSize: '0.9rem' }}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
