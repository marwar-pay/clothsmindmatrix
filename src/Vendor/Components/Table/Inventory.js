'use client';
import { useState } from "react";

const InventoryTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const products = [
    { id: 1, name: "Product 1", sku: "SKU001", stock: 50, sold: 30 },
    { id: 2, name: "Product 2", sku: "SKU002", stock: 40, sold: 25 },
    { id: 3, name: "Product 3", sku: "SKU003", stock: 60, sold: 45 },
    { id: 4, name: "Product 4", sku: "SKU004", stock: 20, sold: 10 },
    { id: 5, name: "Product 5", sku: "SKU005", stock: 30, sold: 15 },
    { id: 6, name: "Product 6", sku: "SKU006", stock: 70, sold: 50 },
    { id: 7, name: "Product 7", sku: "SKU007", stock: 80, sold: 60 },
    { id: 8, name: "Product 8", sku: "SKU008", stock: 90, sold: 70 },
    { id: 9, name: "Product 9", sku: "SKU009", stock: 40, sold: 35 },
    { id: 10, name: "Product 10", sku: "SKU010", stock: 60, sold: 45 },
    { id: 11, name: "Product 11", sku: "SKU011", stock: 60, sold: 40 },
    { id: 12, name: "Product 12", sku: "SKU012", stock: 60, sold: 50 },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: "20px",  }}>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
        <input
          type="text"
          placeholder="Search..."
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
          // backgroundColor: "#fff",
        }}
      >
        <thead style={{  }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>SKU</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Stock</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Sold</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{product.id}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{product.name}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{product.sku}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{product.stock}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{product.sold}</td>
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
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
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
    </div>
  );
};

export default InventoryTable;
