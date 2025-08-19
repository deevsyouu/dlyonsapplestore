import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const MakePayment = () => {
  const location = useLocation();
  const { product, rating } = location.state || {};

  const [method, setMethod] = useState('mpesa');
  const [phone, setPhone] = useState('');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });
  const [message, setMessage] = useState('');

  const img_url = 'https://deevsyouu.pythonanywhere.com/static/images/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Processing your payment...');

    try {
      const data = new FormData();
      data.append('amount', product.product_cost);

      if (method === 'mpesa') {
        let cleanedPhone = phone.trim();
        if (/^07\d{8}$/.test(cleanedPhone)) {
          cleanedPhone = '254' + cleanedPhone.slice(1);
        }
        if (!/^2547\d{8}$/.test(cleanedPhone)) {
          setMessage('Invalid phone number. Use format 07xxxxxxxx or 2547xxxxxxxx.');
          return;
        }

        data.append('phone', cleanedPhone);

        const response = await axios.post(
          'https://deevsyouu.pythonanywhere.com/api/mpesa_payment',
          data
        );
        setMessage(response.data.message);
      } else {
        data.append('card_number', card.number);
        data.append('expiry', card.expiry);
        data.append('cvv', card.cvv);

        const response = await axios.post(
          'https://deevsyouu.pythonanywhere.com/api/card_payment',
          data
        );
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.message || 'Payment failed.');
    }
  };

  const renderStars = (ratingValue) => {
    const safeRating = Number(ratingValue);
    if (isNaN(safeRating) || safeRating <= 0) {
      return <span className="text-muted">Not rated</span>;
    }

    return (
      <>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < safeRating ? '#f4c542' : '#ccc', fontSize: '18px' }}>
            ★
          </span>
        ))}
      </>
    );
  };

  if (!product) {
    return <p className="text-center text-danger mt-5">No product selected for payment.</p>;
  }

  return (
    <div style={{ backgroundColor: '#e0e0e0', minHeight: '100vh', paddingTop: '20px' }}>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-3 text-success d-flex align-items-center gap-2">
          <img
            src="/mpesa.png"
            alt="M-PESA Logo"
            style={{ height: '40px', objectFit: 'contain' }}
          />
          Lipa na M-PESA / Credit Card
        </h2>

        <div className="card p-4 shadow-sm">
          <div className="row mb-4">
            <div className="col-md-5">
              <img
                src={img_url + product.product_photo}
                alt={product.name}
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: '250px', objectFit: 'contain' }}
              />
            </div>
            <div className="col-md-7">
              <p><strong>Name:</strong> {product.product_name}</p>
              <p><strong>Price:</strong> KES {product.product_cost}</p>
              <p><strong>Your Rating:</strong> {renderStars(rating)}</p>
            </div>
          </div>

          <div className="mb-3">
            <label><strong>Choose Payment Method:</strong></label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="mpesa"
                checked={method === 'mpesa'}
                onChange={() => setMethod('mpesa')}
              />
              <label className="form-check-label" htmlFor="mpesa">M-PESA</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="card"
                checked={method === 'card'}
                onChange={() => setMethod('card')}
              />
              <label className="form-check-label" htmlFor="card">Credit Card</label>
            </div>
          </div>

          {message && <div className="alert alert-info">{message}</div>}

          <form onSubmit={handleSubmit}>
            {method === 'mpesa' ? (
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Phone (e.g. 2547XXXXXXXX)"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            ) : (
              <>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="form-control"
                    value={card.number}
                    onChange={(e) => setCard({ ...card, number: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-2 d-flex gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="form-control"
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="form-control"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                    required
                  />
                </div>
              </>
            )}

            <button type="submit" className="btn btn-success w-100">
              Purchase Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
