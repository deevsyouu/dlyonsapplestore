import { useState,useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Addproduct = () => {
  const [product_name, setProductName] = useState('');
  const [product_description, setProductDescription] = useState('');
  const [product_cost, setProductCost] = useState('');
  const [product_photo, setProductPhoto] = useState('');

  const [loading, setLoading] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

// Check if user is authenticated on component mount
useEffect(() => {
const user = localStorage.getItem("user");
if (!user) {
const proceed = window.confirm("You must sign in to add products. Do you want to sign in now?");
if (proceed) {
navigate("/signin");
} else {
navigate("/"); // or stay on page / redirect elsewhere
}
}
}, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading('Uploading your product...');
    setMessage('');
    setError('');

    try {
      const data = new FormData();
      data.append('product_name', product_name);
      data.append('product_description', product_description);
      data.append('product_cost', product_cost);
      data.append('product_photo', product_photo);

      const response = await axios.post(
        "https://deevsyouu.pythonanywhere.com/api/add_product",
        data
      );

      setLoading('');
      setMessage('✅ Product added successfully!');
      setProductName('');
      setProductDescription('');
      setProductCost('');
      setProductPhoto('');
    } catch (err) {
      setLoading('');
      setError('❌ ' + (err.message || 'Something went wrong.'));
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
        <div className="col-md-7 col-lg-6 bg-white shadow rounded p-5">
          <div className="text-center mb-4">
            <img
              src="https://img.icons8.com/ios-filled/50/mac-os.png"
              alt="product"
              style={{ height: '40px', marginBottom: '10px' }}
            />
            <h3 className="fw-bold text-success">Add New Product</h3>
            <p className="text-muted small">Fill the form below to add your product to the store</p>
          </div>

          {/* Alert messages */}
          {loading && <div className="alert alert-warning py-2">{loading}</div>}
          {message && <div className="alert alert-success py-2">{message}</div>}
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Product Name</label>
              <input
                type="text"
                placeholder="e.g. iPhone 15 Pro"
                className="form-control"
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Description</label>
              <textarea
                className="form-control"
                value={product_description}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Briefly describe the product"
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Product Cost (KES)</label>
              <input
                type="number"
                placeholder="e.g. 120000"
                className="form-control"
                value={product_cost}
                onChange={(e) => setProductCost(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Product Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setProductPhoto(e.target.files[0])}
                required
              />
            </div>

            <button className="btn btn-success w-100" type="submit">
              <i className="bi bi-cloud-upload me-2"></i>Upload Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
