import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ fullname: '', email: '', phone: '', password: '', confirm: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert('Passwords do not match!');
      return;
    }
    localStorage.setItem('ts_user', form.email);
    navigate('/dashboard');
  };

  return (
    <div className="page">
      <div className="form-container">
        <h1>Create Account</h1>
        <p>Join ToyStore and start shopping!</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name</label>
            <input type="text" name="fullname" placeholder="John Doe" value={form.fullname} onChange={handleChange} required />
          </div>
          <div>
            <label>Email Address</label>
            <input type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Phone Number</label>
            <input type="tel" name="phone" placeholder="+92 300 0000000" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" name="confirm" placeholder="••••••••" value={form.confirm} onChange={handleChange} required />
          </div>
          <div>
            <button type="submit" style={{ width: '100%' }}>Create Account</button>
          </div>
          <p style={{ marginTop: '12px' }}>
            Already have an account?{' '}
            <Link to="/login" className="link-button" style={{ padding: '6px 14px', fontSize: '0.9rem' }}>
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
