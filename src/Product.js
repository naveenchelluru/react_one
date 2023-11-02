// Product.js
import React from "react";

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
    </div>
  );
};

export default Product;
