import Footer from '../../components/Footer/page'

export default function Contact() {
  const submitContact = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you! Your message has been sent. We'll reply shortly.")
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <>
      <div className="page">
        <h1>📬 Contact Us</h1>
        <p>We'd love to hear from you. Fill in the form below and we'll respond within 24 hours.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div className="form-container" style={{ flex: 1, minWidth: '300px', maxWidth: '480px' }}>
            <h2>Send a Message</h2>
            <form onSubmit={submitContact}>
              <div><label>Full Name</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email</label><input type="email" placeholder="you@email.com" required /></div>
              <div>
                <label>Subject</label>
                <div className="select-container">
                  <select>
                    <option>General Inquiry</option>
                    <option>Order Issue</option>
                    <option>Return/Refund</option>
                    <option>Bulk Order</option>
                  </select>
                </div>
              </div>
              <div><label>Message</label><textarea placeholder="Write your message here…" required /></div>
              <div><button type="submit">Send Message</button></div>
            </form>
          </div>

          <div style={{ flex: 1, minWidth: '260px', maxWidth: '360px' }}>
            <div className="card" style={{ padding: '24px', marginBottom: '16px', width: 'auto' }}>
              <div style={{ fontSize: '2rem' }}>📍</div>
              <h3>Address</h3>
              <p>Shop #5, Toy Market, GT Road, Gujranwala, Punjab, Pakistan</p>
            </div>
            <div className="card" style={{ padding: '24px', marginBottom: '16px', width: 'auto' }}>
              <div style={{ fontSize: '2rem' }}>📞</div>
              <h3>Phone</h3>
              <p>+92 300 1234567</p>
            </div>
            <div className="card" style={{ padding: '24px', width: 'auto' }}>
              <div style={{ fontSize: '2rem' }}>📧</div>
              <h3>Email</h3>
              <p>support@toystore.pk</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
