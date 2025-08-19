import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const InstallmentPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <div style={{ padding: "20px" }}>
        <Navbar />
        <h2>Product not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  // Example: 3-month and 6-month installment options
  const threeMonthInstallment = Math.ceil(product.price / 3);
  const sixMonthInstallment = Math.ceil(product.price / 6);

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h1>{product.name} - Installment Plan</h1>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "300px", borderRadius: "8px", marginTop: "10px" }}
      />
      <p>Price: KES {product.price.toLocaleString()}</p>

      <h3>Payment Options:</h3>
      <ul>
        <li>3 Months: KES {threeMonthInstallment.toLocaleString()} per month</li>
        <li>6 Months: KES {sixMonthInstallment.toLocaleString()} per month</li>
      </ul>

      <button
        style={{
          background: "green",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          marginTop: "10px"
        }}
        onClick={() =>
            navigate("/makepayment", {
              state: {
                product: {
                  product_name: product.name,
                  product_cost: product.price,
                  product_photo: product.image
                },
                rating: product.rating || 0
              }
            })
          }
      >
        Proceed to Pay
      </button>
    </div>
  );
};

export default InstallmentPlan;
