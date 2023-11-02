import React, { useState, useEffect } from "react";
import products from "./ProductData.js";
import "./ProductList.css";
import Product from "./Product";
import Pagination from "./Pagination";

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filter, setFilter] = useState({ category: "", price: "" });
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const productsPerPage = 5;

  const categories = [...new Set(products.map((product) => product.category))];

  const filterProducts = () => {
    let filtered = products; 
    
    if (filter.category) {
      filtered = filtered.filter((product) => product.category === filter.category);
    }
  
    if (filter.price) {
      const maxPrice = parseInt(filter.price);
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }
  
    setFilteredProducts(filtered);
  };
  

  const sortProducts = () => {
    const sorted = [...filteredProducts];

    if (sortOrder === "asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else {
      sorted.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sorted);
  };

  useEffect(() => {
    filterProducts();
    
  }, [filter, sortOrder]);

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setFilter({ ...filter, category: e.target.value });
  };

  const handlePriceChange = (e) => {
    setFilter({ ...filter, price: e.target.value });
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <div className="product-list">
        <label className="search">ShopEase</label>
      <div className="filter-container">
        <label>
          Category:
          <select value={filter.category} onChange={handleCategoryChange}>
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Price:
          <select value={filter.price} onChange={handlePriceChange}>
            <option value="">All</option>
            <option value="100">₹100 or less</option>
            <option value="200">₹200 or less</option>
            <option value="500">₹500 or less</option>
          </select>
        </label>
        <button onClick={handleSortToggle}>Toggle Sort Order</button>
      </div>
      <div className="product-grid">
       { paginatedProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
    </div>
  );}
        

export default ProductList;
