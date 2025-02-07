'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { apiDelete, apiGet, apiPost, apiPut } from "@/api/apiMethods"; 
import { Modal } from "antd";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
  const [editMode, setEditMode] = useState(false); // State for toggling edit mode
  const [productForm, setProductForm] = useState({
    productName: '',
    category: '',
    price: '',
    actualPrice: '',
    description: '',
    size: '',
    images: []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiGet("/api/product10/getproducts10"); // API route
        console.log(response.data); // Log the response to ensure data is being fetched
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err.message || "No Products Available");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.price.toString().includes(search)
  );

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleView = (product) => {
    setSelectedProduct(product); // Set the selected product for viewing/editing
  };

  const handleDelete = async (productId) => {
    try {
      await apiDelete(`api/product10/delete10/${productId}`);
      setProducts(products.filter((product) => product._id !== productId)); // Remove product from list
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (product) => {
    setSelectedProduct(product); // Set selected product when modal is shown
    setEditMode(false); // Set to view mode initially
    setProductForm(product); // Set the form with the selected product's details
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setEditMode(false); // Reset to view mode after closing modal
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditMode(false); // Reset to view mode when cancelled
  };



const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPut(
        // `https://ajay.yunicare.in/api/product9/products9/${id}`,
        `api/product10/products10/${selectedProduct._id}`, productForm,
      
      );
      setProducts(products.map(product =>
                product._id === selectedProduct._id ? { ...product, ...productForm } : product
              ));
      if (response.status === 200) {
        alert("Product updated successfully!");
        setIsModalOpen(false);
      
      } else {
        alert("Failed to update the product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product List</h2>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead style={{ backgroundColor: "#f1f1f1" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "left" }}>Sno</th>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Product Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Category</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Price</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Actual Price</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  padding: "10px",
                  textAlign: "center",
                  color: "#888",
                }}
              >
                Loading products...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  padding: "10px",
                  textAlign: "center",
                  color: "red",
                }}
              >
                {error}
              </td>
            </tr>
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <tr key={product._id}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{index + 1}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{product._id}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{product.productName}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{product.category}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{product.price}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{product.actualPrice}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  <button
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => showModal(product)}
                  >
                    View
                  </button>
                  
                  <button
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#FF9800", // Different color for edit
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      showModal(product); // Show modal and toggle edit mode
                      setEditMode(true); // Set edit mode
                    }}
                  >
                    Edit
                  </button>

                  <button
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                style={{
                  padding: "10px",
                  textAlign: "center",
                  color: "#888",
                }}
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "6px 12px",
            marginRight: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#ddd",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: "6px 12px",
            marginLeft: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#ddd",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>

      <Modal
  title={editMode ? "Edit Product" : "Product Details"}
  open={isModalOpen}
  onOk={editMode ? handleEdit : handleOk}
  onCancel={handleCancel}
>
  {selectedProduct && (
    <div style={{ marginTop: "20px" }}>
      {editMode ? (
        <div>
          <input
            type="text"
            name="productName"
            value={productForm.productName}
            onChange={handleInputChange}
            placeholder="Product Name"
            style={{
              marginBottom: "10px",
              width: "100%",
              border: "1px solid #ccc", // Border for input
              padding: "8px",
            }}
          />
          <input
            type="text"
            name="category"
            value={productForm.category}
            onChange={handleInputChange}
            placeholder="Category"
            style={{
              marginBottom: "10px",
              width: "100%",
              border: "1px solid #ccc", // Border for input
              padding: "8px",
            }}
          />
          <input
            type="number"
            name="price"
            value={productForm.price}
            onChange={handleInputChange}
            placeholder="Price"
            style={{
              marginBottom: "10px",
              width: "100%",
              border: "1px solid #ccc", // Border for input
              padding: "8px",
            }}
          />
          <input
            type="number"
            name="actualPrice"
            value={productForm.actualPrice}
            onChange={handleInputChange}
            placeholder="Actual Price"
            style={{
              marginBottom: "10px",
              width: "100%",
              border: "1px solid #ccc", // Border for input
              padding: "8px",
            }}
          />
          <textarea
            name="description"
            value={productForm.description}
            onChange={handleInputChange}
            placeholder="Description"
            style={{
              marginBottom: "10px",
              width: "100%",
              border: "1px solid #ccc", // Border for textarea
              padding: "8px",
            }}
          />
          <input
            type="text"
            name="size"
            value={productForm.size}
            onChange={handleInputChange}
            placeholder="Size"
            style={{
              marginBottom: "10px",
              width: "100%",
              border: "1px solid #ccc", // Border for input
              padding: "8px",
            }}
          />
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          {/* Left side for product image */}
          <div style={{ marginRight: "20px" }}>
            <img
              src={selectedProduct.images[0]}
              alt={selectedProduct.productName}
              style={{ width: "200px", height: "auto" }}
            />
          </div>
          {/* Right side for product details */}
          <div>
            <h3>{selectedProduct.productName}</h3>
            <p>Category: {selectedProduct.category}</p>
            <p>Price: ₹ {selectedProduct.price}</p>
            <p>Actual Price: ₹ {selectedProduct.actualPrice}</p>
            <p>Size: {selectedProduct.size}</p>
            <p>{selectedProduct.description}</p>
          </div>
        </div>
      )}
    </div>
  )}
</Modal>

    </div>
  );
};

export default ProductList;
