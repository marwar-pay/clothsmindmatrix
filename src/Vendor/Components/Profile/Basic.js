'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Basic = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bankCode: '',
    accountNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="container mt-4">
     
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Type Name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Type Email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="bankCode" className="form-label">
            Bank Code
          </label>
          <input
            type="text"
            className="form-control"
            id="bankCode"
            name="bankCode"
            value={formData.bankCode}
            onChange={handleChange}
            placeholder="Type Code"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="accountNumber" className="form-label">
            Account Number
          </label>
          <input
            type="text"
            className="form-control"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="Type Account Number"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Basic;
