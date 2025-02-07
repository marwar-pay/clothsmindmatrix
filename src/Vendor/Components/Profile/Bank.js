'use client';
import { useState } from 'react';

export default function Bank() {
  const [formData, setFormData] = useState({
    accountHolder: '',
    accountNumber: '',
    bankName: '',
    branch: '',
    email: '',
    phoneNumber: '',
    address: '',
    accountType: 'savings', // Default account type
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bank-page">
      <h1 className="heading">Bank Account Settings</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <label htmlFor="accountHolder">Account Holder</label>
          <input
            type="text"
            id="accountHolder"
            name="accountHolder"
            value={formData.accountHolder}
            onChange={handleInputChange}
            placeholder="Enter Account Holder's Name"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            placeholder="Enter Account Number"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="bankName">Bank Name</label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            placeholder="Enter Bank Name"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="branch">Branch</label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            placeholder="Enter Branch Name"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Email Address"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter Phone Number"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter Address"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="accountType">Account Type</label>
          <select
            id="accountType"
            name="accountType"
            value={formData.accountType}
            onChange={handleInputChange}
            className="select-field"
          >
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
            <option value="business">Business</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Save Settings</button>
      </form>

      <style jsx>{`
        .bank-page {
          padding: 30px;
          max-width: 800px;
          margin: 0 auto;
          font-family: 'Arial', sans-serif;
        }

        .heading {
          font-size: 36px;
          text-align: center;
          margin-bottom: 20px;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }

        .input-field, .select-field {
          padding: 10px;
          font-size: 14px;
          border-radius: 5px;
          border: 1px solid #ccc;
          outline: none;
          width: 100%;
        }

        .select-field {
          font-size: 14px;
        }

        .submit-btn {
          padding: 12px;
          font-size: 16px;
          font-weight: bold;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .submit-btn:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
}
