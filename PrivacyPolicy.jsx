import React from 'react';
import Navbar from './Navbar'; 

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="container my-5 py-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-success">Privacy Policy</h2>
          <p className="text-muted">Your privacy and data security matter to us.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-9">
            <h5 className="fw-semibold">1. Information We Collect</h5>
            <p>
              When you interact with our store, we may collect personal information like your name, email, phone number, and delivery address. This helps us process your orders and improve our services.
            </p>

            <h5 className="fw-semibold">2. How We Use Your Information</h5>
            <ul>
              <li>To process orders and deliver your purchases</li>
              <li>To improve our website and customer experience</li>
              <li>To send updates, offers, and promotional emails (only if you opt-in)</li>
            </ul>

            <h5 className="fw-semibold">3. Data Protection</h5>
            <p>
              We take your data security seriously. All personal information is stored securely and only accessible by authorized personnel. We never sell or share your information with third parties without your consent.
            </p>

            <h5 className="fw-semibold">4. Cookies</h5>
            <p>
              We use cookies to enhance your browsing experience and analyze website traffic. You can disable cookies in your browser settings if you prefer.
            </p>

            <h5 className="fw-semibold">5. Contact Us</h5>
            <p>
              For any privacy-related inquiries, feel free to contact us at{' '}
              <a href="mailto:support@dlyonsapplestore.com">support@dlyonsapplestore.com</a>.
            </p>

            <p className="text-muted small">
              Last updated: August 12, 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
