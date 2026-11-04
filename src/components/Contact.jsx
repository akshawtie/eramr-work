import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import './Contact.css';

const INQUIRY_TYPES = [
  'Product Inquiry',
  'Custom Order',
  'Bulk / Trade Inquiry',
  'Showroom Visit',
  'Collaboration',
  'Other',
];

// Netlify function endpoint — works as-is when deployed to Netlify.
// If your frontend is on GitHub Pages and function on a separate Netlify site,
// replace with the full URL: 'https://YOUR-SITE.netlify.app/.netlify/functions/whatsapp-notify'
const WHATSAPP_API_ENDPOINT = '/.netlify/functions/whatsapp-notify';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const fieldErrors = validate();
    if (fieldErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus the first errored field
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.getElementById(`contact-${firstErrorField}`);
      if (el) el.focus();
      return;
    }

    setStatus('sending');

    try {
      // Send to your backend / WhatsApp Cloud API endpoint
      const response = await fetch(WHATSAPP_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          inquiryType: formData.inquiryType,
          message: formData.message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Failed to send');
      setStatus('success');
    } catch {
      // Fallback: open WhatsApp click-to-chat with prefilled message
      const text = encodeURIComponent(
        `*New Inquiry from Website*\n\n` +
        `*Name:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Phone:* ${formData.phone}\n` +
        `*Type:* ${formData.inquiryType}\n` +
        `*Message:* ${formData.message}`
      );
      window.open(`https://wa.me/YOUR_NUMBER_HERE?text=${text}`, '_blank');
      setStatus('success');
    }
  };

  return (
    <div className="contact-page">
      {/* Left Image Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="contact-image-panel"
      >
        <img
          src="/contact-hero.jpg"
          alt="Handcrafted metalwork in workshop"
          loading="eager"
        />
        <div className="contact-image-overlay" />
      </motion.div>

      {/* Right Form Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="contact-form-panel"
      >
        <div className="contact-form-wrapper">
          {status === 'success' ? (
            <div className="contact-success">
              <CheckCircle className="contact-success-icon" />
              <h3>Thank you</h3>
              <p>
                We've received your inquiry and will respond within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <div className="contact-form-header">
                <h1>Contact Us</h1>
                <p>
                  For trade inquiries, custom orders, or product questions.
                </p>
              </div>

              {/* Error Summary */}
              {Object.keys(errors).length > 0 && (
                <div
                  role="alert"
                  tabIndex={-1}
                  className="contact-error-summary"
                  aria-labelledby="error-summary-title"
                >
                  <p id="error-summary-title" className="contact-error-summary-title">
                    Please fix the following:
                  </p>
                  <ul className="contact-error-summary-list">
                    {Object.entries(errors).map(([field, msg]) => (
                      <li key={field}>
                        <a href={`#contact-${field}`}>{msg}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="contact-form-row">
                  <div className="contact-field-group">
                    <label htmlFor="contact-name" className="contact-label">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      aria-invalid={!!errors.name}
                      className={`contact-input ${errors.name ? 'contact-input-error' : ''}`}
                    />
                    {errors.name && (
                      <p id="name-error" className="contact-error-text" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="contact-field-group">
                    <label htmlFor="contact-email" className="contact-label">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      aria-invalid={!!errors.email}
                      className={`contact-input ${errors.email ? 'contact-input-error' : ''}`}
                    />
                    {errors.email && (
                      <p id="email-error" className="contact-error-text" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-field-group">
                    <label htmlFor="contact-phone" className="contact-label">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      aria-invalid={!!errors.phone}
                      className={`contact-input ${errors.phone ? 'contact-input-error' : ''}`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="contact-error-text" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="contact-field-group">
                    <label htmlFor="contact-inquiryType" className="contact-label">
                      Inquiry Type
                    </label>
                    <select
                      id="contact-inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-describedby={errors.inquiryType ? 'inquiryType-error' : undefined}
                      aria-invalid={!!errors.inquiryType}
                      className={`contact-select ${errors.inquiryType ? 'contact-input-error' : ''}`}
                    >
                      <option value="" disabled>Select…</option>
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.inquiryType && (
                      <p id="inquiryType-error" className="contact-error-text" role="alert">
                        {errors.inquiryType}
                      </p>
                    )}
                  </div>
                </div>

                <div className="contact-field-group">
                  <label htmlFor="contact-message" className="contact-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Product details, dimensions, quantities, or any specific requirements."
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={!!errors.message}
                    className={`contact-textarea ${errors.message ? 'contact-input-error' : ''}`}
                  />
                  {errors.message && (
                    <p id="message-error" className="contact-error-text" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="contact-submit-btn"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="contact-spinner" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* Contact Info Bar */}
          <div className="contact-info-bar">
            <div className="contact-info-item">
              <h4>Visit</h4>
              <p>Your showroom address here</p>
            </div>
            <div className="contact-info-item">
              <h4>Call</h4>
              <p>+91 XXXXX XXXXX</p>
            </div>
            <div className="contact-info-item">
              <h4>Email</h4>
              <p>hello@arrgroups.com</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
