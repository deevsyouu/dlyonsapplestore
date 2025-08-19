import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading('Please wait as we log you in...');
    setError('');

    try {
      const data = new FormData();
      data.append('email', email);
      data.append('password', password);

      const response = await axios.post(
        "https://deevsyouu.pythonanywhere.com/api/signin",
        data
      );

      setLoading('');
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      } else {
        setError(response.data.message || 'Login failed.');
      }
    } catch (err) {
      setLoading('');
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
          <h3 className="text-center mb-4" style={{ color: '#28a745' }}>Sign In</h3>

          {loading && <div className="alert alert-info">{loading}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={submit}>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn w-100" style={{ backgroundColor: '#28a745', color: 'white' }} type="submit">
              Sign In
            </button>
          </form>

          <div className="mt-3 text-center">
            <small>Don't have an account? <Link to="/signup">Sign Up</Link></small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
