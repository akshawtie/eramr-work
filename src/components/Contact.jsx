import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle, Loader } from 'lucide-react';
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
        transition={{ duration: 0.8 }}
        className="contact-image-panel"
      >
        <img
          src="/contact-hero.jpg"
          alt="Elegant artisanal living room with handcrafted furniture"
          loading="eager"
        />
        <div className="contact-image-overlay" />
        <div className="contact-image-text">
          <h2>Let's Create<br />Something Beautiful</h2>
          <p>Every great space begins with a conversation.</p>
        </div>
      </motion.div>

      {/* Right Form Panel */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="contact-form-panel"
      >
        <div className="contact-form-wrapper">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="contact-success"
            >
              <div className="contact-success-icon">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3>Inquiry Sent Successfully</h3>
              <p>
                Thank you for reaching out. Our team will review your inquiry
                and get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="contact-form-header">
                <h1>Get in Touch</h1>
                <p>
                  Have a question about our collections or need a bespoke piece?
                  Fill out the form and our team will connect with you shortly.
                </p>
              </div>

              {/* Error Summary */}
              {Object.keys(errors).length > 0 && (
                <div
                  role="alert"
                  tabIndex={-1}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                  aria-labelledby="error-summary-title"
                >
                  <p id="error-summary-title" className="text-sm font-medium text-red-800">
                    Please fix the following:
                  </p>
                  <ul className="mt-1 text-xs text-red-600 list-disc list-inside">
                    {Object.entries(errors).map(([field, msg]) => (
                      <li key={field}>
                        <a
                          href={`#contact-${field}`}
                          className="underline hover:text-red-800"
                        >
                          {msg}
                        </a>
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
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
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
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
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
                      Phone Number
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
                      <option value="" disabled>Select type…</option>
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
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your vision — the piece you're looking for, dimensions, materials, or any specific requirements…"
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
              <div className="contact-info-icon">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="contact-info-text">
                <h4>Visit Us</h4>
                <p>Your showroom address here</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Phone className="w-4 h-4" />
              </div>
              <div className="contact-info-text">
                <h4>Call Us</h4>
                <p>+91 XXXXX XXXXX</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Mail className="w-4 h-4" />
              </div>
              <div className="contact-info-text">
                <h4>Email</h4>
                <p>hello@arrgroups.com</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
