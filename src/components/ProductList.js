import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";

const API_URL = process.env.REACT_APP_API_URL;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        const storedProducts =
          JSON.parse(sessionStorage.getItem("products")) || {};
        const updatedProducts = response.data.map((product) => ({
          ...product,
          ...storedProducts[product.id],
        }));
        setProducts(updatedProducts);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductUpdate = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);

    const storedProducts = JSON.parse(sessionStorage.getItem("products")) || {};
    storedProducts[updatedProduct.id] = updatedProduct;
    sessionStorage.setItem("products", JSON.stringify(storedProducts));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center mb-10">
        <p className="bg-slate-300 px-4 py-2 rounded-full">
          <span className="font-medium">Note:</span> Click on PRICE / STOCK
          field's to edit its content
        </p>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Product Name</th>
            <th className="py-3 px-6 text-left">Variants</th>
            <th className="py-3 px-6 text-center">Price</th>
            <th className="py-3 px-6 text-center">Stock</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onUpdate={handleProductUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
