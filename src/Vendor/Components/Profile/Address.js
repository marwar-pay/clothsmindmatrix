'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Address = () => {
  const [formData, setFormData] = useState({
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    googleMap: '',
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
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            className="form-select"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="India">India</option>
            <option value="Canada">Canada</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <select
            className="form-select"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            <option value="California">California</option>
            <option value="New York">New York</option>
            <option value="Texas">Texas</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <select
            className="form-select"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="New York City">New York City</option>
            <option value="Houston">Houston</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="zipCode" className="form-label">
            Zip Code
          </label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Enter Zip Code"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="googleMap" className="form-label">
            Google Map Location
          </label>
          <textarea
            className="form-control"
            id="googleMap"
            name="googleMap"
            value={formData.googleMap}
            onChange={handleChange}
            placeholder="Enter Google Map Embed Code"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {formData.googleMap && (
        <div className="mt-4">
          <h4>Google Map Preview:</h4>
          <div dangerouslySetInnerHTML={{ __html: formData.googleMap }} />
        </div>
      )}
    </div>
  );
};

export default Address;
