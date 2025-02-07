"use client";
import { useState } from "react";
import axios from "axios";
import { apiPatch } from "@/api/apiMethods";

export default function BecomeSeller() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    gstInNumber: "",
    company: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPatch("api/vendor-request", formData);
      console.log("Success:", response.data);
      alert("Seller Request Sent successfully!");
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      console.error("Error updating seller info:", error);
      alert("Failed to update seller information.");
    }
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        style={{
          padding: "8px 16px",
          cursor: "pointer",
          borderBottom: "1px solid #f0f0f0",
          color: "#000",
        }}
      >
        Become a Seller
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <h2>Become a Seller</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <label>GST Number:</label>
                <input
                  type="text"
                  name="gstInNumber"
                  value={formData.gstInNumber}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "8px",border:"1px solid" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Company Name:</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "8px",border:"1px solid"}}
                />
              </div>
              <button type="submit" style={{ padding: "10px 20px", background: "blue", color: "#fff", border: "none", cursor: "pointer" }}>
                Submit
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ padding: "10px 20px", marginLeft: "10px", background: "red", color: "#fff", border: "none", cursor: "pointer" }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
