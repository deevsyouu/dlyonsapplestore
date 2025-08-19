import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Getproduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [userRatings, setUserRatings] = useState({});
  const [activeProductId, setActiveProductId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [liveSearch, setLiveSearch] = useState('');
  const [sortOption, setSortOption] = useState('latest');
  

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q')?.toLowerCase() || '';

  

  const Fetchproduct = async () => {
    setLoading('Please wait, we are retrieving the product...');
    try {
      const response = await axios.get('https://deevsyouu.pythonanywhere.com/api/get_product_details');
      let data = response.data;

      if (searchQuery) {
        data = data.filter((item) =>
          item.product_name.toLowerCase().includes(searchQuery)
        );
      }

      setProduct(data);
      setLoading('');
    } catch (error) {
      setLoading('');
      setError(error.message);
    }
  };

  useEffect(() => {
    Fetchproduct();
  }, [searchQuery]);

  useEffect(() => {
    sortProducts(sortOption);
  }, [sortOption, product.length]);

  const sortProducts = (option) => {
    const sorted = [...product];
    if (option === 'price') {
      sorted.sort((a, b) => parseFloat(a.product_cost) - parseFloat(b.product_cost));
    } else if (option === 'latest') {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    setProduct(sorted);
  };

  const img_url = 'https://deevsyouu.pythonanywhere.com/static/images/';

  const handleRating = (productId, value) => {
    setUserRatings({ [productId]: value });
  };

  const renderStars = (productId) => {
    const rating = userRatings[productId] || 0;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={`${productId}-star-${i}`}
          onClick={(e) => {
            e.stopPropagation();
            handleRating(productId, i);
          }}
          style={{
            cursor: 'pointer',
            color: i <= rating ? '#f4c542' : '#ccc',
            fontSize: '18px'
          }}
        >
          ★
        </span>
      );
    }
    return <div>{stars}</div>;
  };

  return (
    <div className="row" style={{ backgroundColor: '#e0e0e0', minHeight: '100vh', margin: 0, padding: 0 }}>
      <Navbar />

      {/* Promo Banner */}
      <div className="alert alert-success text-center m-3 shadow-sm rounded">
        🏷️ <strong>Tax Holiday:</strong> Save more on select Apple products! Limited-time offer.
      </div>

      {/* Header */}
      <div className="App-header text-dark" style={{ backgroundColor: '#e0e0e0' }}>
        <h1><p>The best store for the Apple products you love. 🖤</p></h1>
      </div>

      {/* Info Bar */}
      <div style={{ backgroundColor: '#fff', padding: '12px 20px', textAlign: 'center', fontSize: '14px' }}>
        For time limitation, shop with us online or visit us in our store.{' '}
        <Link to="/learn-more" style={{ color: '#0071e3', textDecoration: 'none' }}>
  Learn more
</Link>

      </div>

      {/* Live Search Input */}
      <div className="container my-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search for Apple products..."
          value={liveSearch}
          onChange={(e) => setLiveSearch(e.target.value.toLowerCase())}
        />
      </div>

      {/* Sorting Options */}
      <div className="d-flex justify-content-end align-items-center px-4 py-2">
        <label className="me-2 fw-bold">Sort by:</label>
        <select
          className="form-select form-select-sm w-auto"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="price">Price (Low to High)</option>
        </select>
      </div>

      {loading && <p className="text-center">{loading}</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* Product Cards */}
      <div className="container">
        <div className="row">
          {product
            .filter(item =>
              item.product_name.toLowerCase().includes(liveSearch)
            )
            .slice(0, visibleCount)
            .map((item) => (
              <div key={item.id} className="col-md-4 col-sm-6 col-lg-3 mb-3" onClick={() => setActiveProductId(item.id)} style={{ cursor: 'pointer' }}>
                <div className="card shadow product-card h-100 position-relative"> 

                  {/* Discount Badge */}
                  <button
                    className="btn btn-outline-dark btn-sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2, borderRadius: '20px', padding: '2px 8px', fontSize: '12px' }}
                    onClick={(e) => { e.stopPropagation(); alert('10% OFF applied!'); }}
                  >
                    10% OFF
                  </button>

                  
                  {/* Product Image */}
                  <img
                    src={img_url + item.product_photo}
                    className="mt-4"
                    style={{ objectFit: 'contain', height: '160px', width: '100%' }}
                    alt={item.product_name}
                  />

                  {/* Product Info */}
                  <div className="card-body p-2">
                    <h6 className="mt-1">{item.product_name}</h6>
                    <p className="text-muted small mb-1">{item.product_description}</p>
                    <div className="mb-1">
                      <strong>Rating:</strong> {renderStars(item.id)}
                    </div>
                    <b className="text-dark small d-block mb-2">{item.product_cost}</b>
                    <br />
                    {activeProductId === item.id && (
                      <button
                        className="btn btn-dark btn-sm w-100"
                        onClick={() => navigate('/makepayment', {
                          state: {
                            product: item,
                            rating: userRatings[item.id] || 0
                          }
                        })}
                      >
                        Purchase Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Load More Button */}
        {visibleCount < product.length && (
          <div className="text-center my-4">
            <button className="btn btn-secondary" onClick={() => setVisibleCount(visibleCount + 4)}>
              Load More
            </button>
          </div>
        )}
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/254712345678"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: '20%',
          maxWidth: '200px',
          backgroundColor: '#25D366',
          color: 'white',
          padding: '10px',
          borderRadius: '30px',
          textDecoration: 'none',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        <img
          src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
          alt="WhatsApp"
          style={{ width: '24px', height: '24px' }}
        />
        WhatsApp Us
      </a>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#f1f1f1',
        color: 'black',
        textAlign: 'center',
        padding: '30px 20px',
        marginTop: '40px'
      }}>
        <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Dlyons AppleStore</h5>

        <div style={{ marginBottom: '15px' }}>
          <Link to="/about" style={{ color: 'black', margin: '0 15px', textDecoration: 'none' }}>About</Link> |
          <Link to="/privacy" style={{ color: 'black', margin: '0 15px', textDecoration: 'none' }}>Privacy Policy</Link>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ margin: '0 10px' }}>
            <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ margin: '0 10px' }}>
            <img src="https://cdn-icons-png.flaticon.com/24/733/733579.png" alt="Twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ margin: '0 10px' }}>
            <img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" alt="Instagram" />
          </a>
        </div>

        <p style={{ fontSize: '14px', marginBottom: '5px' }}>
          Contact: <a href="mailto:support@applestore.com" style={{ color: 'black', textDecoration: 'underline' }}>support@dlyonsapplestore.com</a>
        </p>

        <p style={{ fontSize: '13px' }}>© {new Date().getFullYear()} AppleStore by DeevsYouu. Nairobi, Kenya.</p>
      </footer>
    </div>
  );
};

export default Getproduct;
