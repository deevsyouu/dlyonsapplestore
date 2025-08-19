import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    visible && (
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 1000,
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          padding: '10px 15px',
          fontSize: '18px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          cursor: 'pointer'
        }}
        title="Scroll to Top"
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;
