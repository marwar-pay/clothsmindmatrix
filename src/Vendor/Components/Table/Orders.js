'use client';
import { useState } from "react";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const orders = [
    { id: 1, date: "2025-01-01", status: "Completed", amount: "$100.00" },
    { id: 2, date: "2025-01-02", status: "Pending", amount: "$50.00" },
    { id: 3, date: "2025-01-03", status: "Cancelled", amount: "$75.00" },
    { id: 4, date: "2025-01-04", status: "Completed", amount: "$200.00" },
    { id: 5, date: "2025-01-05", status: "Completed", amount: "$300.00" },
    // Add more data as needed
  ];

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(search) ||
      order.date.includes(search) ||
      order.status.toLowerCase().includes(search.toLowerCase()) ||
      order.amount.includes(search)
  );

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: "20px", }}>
      <h2>Orders</h2>
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
        //   backgroundColor: "#fff",
        }}
      >
        <thead style={{ backgroundColor: "#f1f1f1" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "left" }}>Order</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Date</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Amount</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.id}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.date}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.status}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.amount}</td>
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
                  View
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
                  Cancel
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

export default Orders;
