'use client';
import { useState } from "react";

const WalletHistory = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const history = [
    { id: 1, subOrderId: "SO001", amount: "100", type: "Credit", dateTime: "2025-01-04 10:00 AM" },
    { id: 2, subOrderId: "SO002", amount: "200", type: "Debit", dateTime: "2025-01-03 02:30 PM" },
    { id: 3, subOrderId: "SO003", amount: "150", type: "Credit", dateTime: "2025-01-02 01:15 PM" },
    { id: 4, subOrderId: "SO004", amount: "250", type: "Debit", dateTime: "2025-01-01 05:45 PM" },
    // Add more data as needed
  ];

  const filteredHistory = history.filter(
    (entry) =>
      entry.subOrderId.toLowerCase().includes(search.toLowerCase()) ||
      entry.type.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastEntry = currentPage * itemsPerPage;
  const indexOfFirstEntry = indexOfLastEntry - itemsPerPage;
  const currentHistory = filteredHistory.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <h2>Wallet History</h2>
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
            <th style={{ padding: "10px", textAlign: "left" }}>SL NO</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Sub Order ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Amount</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Type</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Date Time</th>
          </tr>
        </thead>
        <tbody>
          {currentHistory.map((entry) => (
            <tr key={entry.id}>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{entry.id}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{entry.subOrderId}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{entry.amount}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{entry.type}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{entry.dateTime}</td>
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

export default WalletHistory;
