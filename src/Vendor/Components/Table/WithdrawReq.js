'use client';
import { useState } from "react";

const WithdrawRequest = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const requests = [
    { id: 1, amount: "100", gatewayName: "PayPal", gatewayFields: "Field1, Field2", note: "Payment for services", image: "image1.jpg", status: "Pending" },
    { id: 2, amount: "200", gatewayName: "Stripe", gatewayFields: "Field1", note: "Refund for order", image: "image2.jpg", status: "Completed" },
    { id: 3, amount: "150", gatewayName: "PayPal", gatewayFields: "Field1, Field3", note: "Payment for products", image: "image3.jpg", status: "Pending" },
    { id: 4, amount: "250", gatewayName: "Bank Transfer", gatewayFields: "Field2", note: "Payment for invoice", image: "image4.jpg", status: "Completed" },
    // Add more data as needed
  ];

  const filteredRequests = requests.filter(
    (request) =>
      request.gatewayName.toLowerCase().includes(search.toLowerCase()) ||
      request.status.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
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
          <th style={{ padding: "10px", textAlign: "left" }}>Sno.</th>
          <th style={{ padding: "10px", textAlign: "left" }}>Amount</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Gateway Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Gateway Fields</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Note</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Image</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((request,index) => (
            <tr key={request.id}>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{index + 1}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{request.amount}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{request.gatewayName}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{request.gatewayFields}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{request.note}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                <img src={request.image} alt="Image" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{request.status}</td>
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

export default WithdrawRequest;
