'use client';
import { useState } from "react";

const ShippingMethods = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const shippingMethods = [
    { id: 1, title: "Standard Shipping", zone: "US", status: "Active", cost: "₹5.00" },
    { id: 2, title: "Express Shipping", zone: "US", status: "Inactive", cost: "₹15.00" },
    { id: 3, title: "International Shipping", zone: "Europe", status: "Active", cost: "₹25.00" },
    { id: 4, title: "Overnight Shipping", zone: "US", status: "Active", cost: "₹50.00" },
    { id: 5, title: "Free Shipping", zone: "US", status: "Active", cost: "₹0.00" },
    // Add more data as needed
  ];

  const filteredShippingMethods = shippingMethods.filter(
    (method) =>
      method.title.toLowerCase().includes(search.toLowerCase()) ||
      method.zone.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastMethod = currentPage * itemsPerPage;
  const indexOfFirstMethod = indexOfLastMethod - itemsPerPage;
  const currentMethods = filteredShippingMethods.slice(indexOfFirstMethod, indexOfLastMethod);

  const totalPages = Math.ceil(filteredShippingMethods.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <h2>Shipping Methods</h2>
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
          backgroundColor: "#fff",
        }}
      >
        <thead style={{ backgroundColor: "#f1f1f1" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Title</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Zone</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Cost</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentMethods.map((method) => (
            <tr key={method.id}>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{method.id}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{method.title}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{method.zone}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{method.status}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{method.cost}</td>
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

export default ShippingMethods;
