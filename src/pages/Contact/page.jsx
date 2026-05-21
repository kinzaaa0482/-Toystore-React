import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent. We'll reply shortly.");
    setForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div className="page">
      <h1>📬 Contact Us</h1>
      <p>We'd love to hear from you. Fill in the form below and we'll respond within 24 hours.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start', justifyContent: 'center' }}>
        <div className="form-container" style={{ flex: '1', minWidth: '300px', maxWidth: '480px', margin: '0' }}>
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Full Name</label>
              <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label>Subject</label>
              <div className="select-container">
                <select name="subject" value={form.subject} onChange={handleChange}>
                  <option>General Inquiry</option>
                  <option>Order Issue</option>
                  <option>Return/Refund</option>
                  <option>Bulk Order</option>
                </select>
              </div>
            </div>
            <div>
              <label>Message</label>
              <textarea name="message" placeholder="Write your message here…" value={form.message} onChange={handleChange} required />
            </div>
            <div>
              <button type="submit" style={{ width: '100%' }}>Send Message</button>
            </div>
          </form>
        </div>

        <div style={{ flex: '1', minWidth: '260px', maxWidth: '360px' }}>
          {[
            { icon: '📍', title: 'Address', text: 'Shop #5, Toy Market, GT Road, Gujranwala, Punjab, Pakistan' },
            { icon: '📞', title: 'Phone', text: '+92 300 1234567' },
            { icon: '📧', title: 'Email', text: 'support@toystore.pk' },
          ].map(item => (
            <div key={item.title} className="card" style={{ padding: '24px', marginBottom: '16px', width: 'auto' }}>
              <div style={{ fontSize: '2rem' }}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
