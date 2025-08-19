import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Example categories/products for dropdown
  const shopItems = [
    { name: "Iphones", path: "/shop/iphones" },
    { name: "Macbook", path: "/shop/macbook" },
    { name: "Smart Watches", path: "/shop/watches" },
    { name: "Airpods", path: "/shop/airpods" }
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <nav className="navbar navbar-light bg-light px-4 py-2 d-flex justify-content-between">
      <div className="d-flex align-items-center gap-4">
        <img src="/logo.png" alt="Logo" style={{ height: '80px' }} />

        {/* Home */}
        <Link to="/" className="text-dark text-decoration-none nav-link-hover">Home</Link>

        {/* Add Products */}
        <Link to="/addproduct" className="text-dark text-decoration-none nav-link-hover">Add Products</Link>

        {/* Lipa Pole Pole */}
        <Link to="/lipapolepole" className="text-dark text-decoration-none nav-link-hover">Lipa Pole Pole</Link>

        {/* Shop with hover dropdown */}
        <div className="dropdown-hover">
          <span className="text-dark text-decoration-none nav-link-hover">Shop ▾</span>
          <div className="dropdown-menu-custom">
            {shopItems.map((item, idx) => (
              <Link key={idx} to={item.path} className="dropdown-item-custom">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-4">
        {/* Dark mode toggle */}
        <button className="btn btn-outline-dark btn-sm" onClick={toggleDarkMode}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* Auth controls */}
        {user ? (
          <>
            <span className="fw-bold">{user.username}</span>
            <button className="btn btn-success btn-sm" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <button className="btn btn-outline-success btn-sm">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-outline-success btn-sm">Sign Up</button>
            </Link>
          </>
        )}
      </div>

      {/* Inline CSS for hover underline + dropdown */}
      <style>
        {`
          .nav-link-hover {
            position: relative;
            padding-bottom: 2px;
            cursor: pointer;
          }
          .nav-link-hover::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0%;
            height: 2px;
            background-color: red;
            transition: width 0.3s ease;
          }
          .nav-link-hover:hover::after {
            width: 100%;
          }

          /* Dropdown menu styling */
          .dropdown-hover {
            position: relative;
          }
          .dropdown-menu-custom {
            display: none;
            position: absolute;
            top: 30px;
            left: 0;
            background: white;
            border: 1px solid #ddd;
            min-width: 180px;
            z-index: 100;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          .dropdown-hover:hover .dropdown-menu-custom {
            display: block;
          }
          .dropdown-item-custom {
            display: block;
            padding: 10px 15px;
            color: black;
            text-decoration: none;
          }
          .dropdown-item-custom:hover {
            background: #f5f5f5;
            color: red;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
