import React from 'react';
import Navbar from './Navbar'; 

const About = () => {
  return (
    <>
      <Navbar />

      <div className="container my-5 py-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-success">About Dlyons AppleStore</h2>
          <p className="text-muted">Your trusted source for genuine Apple products in Kenya.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <p>
              <strong>Dlyons AppleStore</strong> is passionate about delivering high-quality Apple products to tech lovers across Kenya. From the latest iPhones and iPads to MacBooks and Apple accessories, we strive to bring you the best — at competitive prices.
            </p>

            <p>
              Our mission is to create a seamless shopping experience that combines convenience, trust, and value. Whether you're shopping online or visiting our store in Nairobi, we’re committed to helping you find the right Apple product for your needs.
            </p>

            <p>
              As an independent Apple reseller, we source genuine devices and offer seasonal promotions like <strong>tax holidays</strong> and <strong>discount offers</strong> to help you save more. Plus, our friendly support team is always ready to assist you.
            </p>

            <p>
              Thank you for choosing Dlyons AppleStore. We look forward to serving you!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
