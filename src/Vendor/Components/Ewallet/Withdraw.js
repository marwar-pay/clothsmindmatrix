'use client';
import { useState } from "react";

const VendorWithdrawSettings = () => {
  const [selectedGateway, setSelectedGateway] = useState("");

  const gateways = [
    { id: 1, name: "PayPal" },
    { id: 2, name: "Stripe" },
    { id: 3, name: "Bank Transfer" },
    { id: 4, name: "Skrill" },
    { id: 5, name: "Payoneer" },
  ];

  const handleGatewayChange = (event) => {
    setSelectedGateway(event.target.value);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <h2>Vendor Withdraw Gateway Settings</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="gateway" style={{ fontSize: "16px", marginRight: "10px" }}>
          Select a Gateway:
        </label>
        <select
          id="gateway"
          value={selectedGateway}
          onChange={handleGatewayChange}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        >
          <option value="">-- Select Gateway --</option>
          {gateways.map((gateway) => (
            <option key={gateway.id} value={gateway.name}>
              {gateway.name}
            </option>
          ))}
        </select>
      </div>

      {selectedGateway && (
        <div>
          <p>You have selected: <strong>{selectedGateway}</strong></p>
        </div>
      )}

      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Save Settings
      </button>
    </div>
  );
};

export default VendorWithdrawSettings;
