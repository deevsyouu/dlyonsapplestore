import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const LipaPolePole = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Iphone 13 Pro", price: 50000, image: "/applestore images/13promax.jpeg" },
    { id: 2, name: "Iphone 14 Pro", price: 65000, image: "/applestore images/14promax.jpeg" },
    { id: 3, name: "MacBook", price: 45000, image: "/applestore images/macbook1.jpeg" }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h1 className="text-success">Lipa Pole Pole Products</h1>
      <p>Pay for these products in easy installments.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {products.map(product => (
          <div key={product.id} style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            width: "200px",
            textAlign: "center"
          }}>
            <img src={product.image} alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h5>{product.name}</h5>
            <p>KES {product.price.toLocaleString()}</p>
            <button
              style={{
                background: "green",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px"
              }}
              onClick={() => navigate("/installment-plan", { state: { product } })}
            >
              View Installment Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LipaPolePole;
