import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Password validation function
const isValidPassword = (password) => {
  const lengthRule = password.length >= 8;
  const upperRule = /[A-Z]/.test(password);
  const lowerRule = /[a-z]/.test(password);
  const digitRule = /\d/.test(password);
  const specialRule = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return lengthRule && upperRule && lowerRule && digitRule && specialRule;
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.");
      return;
    }

    setLoading('Creating your account...');

    try {
      const data = new FormData();
      data.append('email', email);
      data.append('name', name);
      data.append('password', password);

      const response = await axios.post(
        'https://deevsyouu.pythonanywhere.com/api/signup',
        data
      );

      setLoading('');

      if (response.data.success) {
        alert('Signup successful! Please login.');
        navigate('/signin');
      } else {
        setError(response.data.message || 'Signup failed.');
      }
    } catch (err) {
      setLoading('');
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow" style={{ maxWidth: '450px', width: '100%', borderRadius: '15px' }}>
          <h3 className="text-center mb-4" style={{ color: '#28a745' }}>Create Account</h3>

          {loading && <div className="alert alert-info">{loading}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={submit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn w-100" style={{ backgroundColor: '#28a745', color: 'white' }}>
              Create Account
            </button>
          </form>

          <div className="mt-3 text-center">
            <small>Already have an account? <Link to="/signin">Sign In</Link></small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
