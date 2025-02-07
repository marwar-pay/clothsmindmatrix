// In pages/add-product.js or components/AddProduct.js
'use client';
import React, { useState } from "react";
import axios from "axios";
import { apiPost } from "@/api/apiMethods";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [actualPrice, setActualprice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      productName,
      images,
      price,
      actualPrice,
      category,
      description,
    };

    try {
      const response = await apiPost(
        "api/product10/createproduct10", 
        productData
      );
      console.log("Product added successfully:", response.data);
      setSuccessMessage("Product added successfully!");

      // Reset form
      setProductName("");
      setImages([]);
      setPrice("");
      setActualprice("");
      setCategory("");
      setDescription("");

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white py-10">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">
        Add New Product
      </h1>

      {successMessage && (
        <div className="max-w-2xl mx-auto mb-6 p-4 text-center text-green-700 bg-green-100 border border-green-300 rounded-md">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label htmlFor="productName" className="block text-lg font-semibold text-pink-600">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full p-3 mt-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-lg font-semibold text-pink-600">
            Image URLs (comma separated)
          </label>
          <input
            type="text"
            id="images"
            value={images.join(", ")}
            onChange={(e) => setImages(e.target.value.split(",").map((url) => url.trim()))}
            required
            className="w-full p-3 mt-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="price" className="block text-lg font-semibold text-pink-600">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-3 mt-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="actualPrice" className="block text-lg font-semibold text-pink-600">
              Discounted Price
            </label>
            <input
              type="number"
              id="actualPrice"
              value={actualPrice}
              onChange={(e) => setActualprice(e.target.value)}
              required
              className="w-full p-3 mt-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-lg font-semibold text-pink-600">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-3 mt-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-semibold text-pink-600">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full p-3 mt-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        <div className="text-center">
          <button
            type="submit" style={{backgroundColor:'#001529'}}
            className="bg-gray-500 text-white  py-3 px-6 rounded-md shadow-md hover:bg-pink-700 focus:outline-none"
          >
            ADD PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
