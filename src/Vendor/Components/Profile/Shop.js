'use client';
import { useState } from 'react';

export default function Shop() {
  const [formData, setFormData] = useState({
    location: '',
    number: '',
    email: '',
    facebookLink: '',
    website: '',
    mainColor: '',
    secondaryColor: '',
    headingColor: '',
    paragraphColor: '',
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
    <div className="shop-page">
     
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Set Location From Map"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="number">Number</label>
          <input
            type="number"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            placeholder="Enter Number"
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
            placeholder="Enter Email"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="facebookLink">Facebook Link</label>
          <input
            type="url"
            id="facebookLink"
            name="facebookLink"
            value={formData.facebookLink}
            onChange={handleInputChange}
            placeholder="Enter Facebook Link"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="Enter Website URL"
            className="input-field"
          />
        </div>

        <h3 className="color-heading">Store Color Settings</h3>

        <div className="input-group">
          <label htmlFor="mainColor">Main Color</label>
          <input
            type="color"
            id="mainColor"
            name="mainColor"
            value={formData.mainColor}
            onChange={handleInputChange}
            className="color-picker"
          />
        </div>

        <div className="input-group">
          <label htmlFor="secondaryColor">Secondary Color</label>
          <input
            type="color"
            id="secondaryColor"
            name="secondaryColor"
            value={formData.secondaryColor}
            onChange={handleInputChange}
            className="color-picker"
          />
        </div>

        <div className="input-group">
          <label htmlFor="headingColor">Heading Color</label>
          <input
            type="color"
            id="headingColor"
            name="headingColor"
            value={formData.headingColor}
            onChange={handleInputChange}
            className="color-picker"
          />
        </div>

        <div className="input-group">
          <label htmlFor="paragraphColor">Paragraph Color</label>
          <input
            type="color"
            id="paragraphColor"
            name="paragraphColor"
            value={formData.paragraphColor}
            onChange={handleInputChange}
            className="color-picker"
          />
        </div>

        <button type="submit" className="submit-btn">Save Settings</button>
      </form>

      <style jsx>{`
        .shop-page {
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

        .input-field, .color-picker {
          padding: 10px;
          font-size: 14px;
          border-radius: 5px;
          border: 1px solid #ccc;
          outline: none;
          width: 100%;
        }

        .color-picker {
          width: 50px;
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

        .color-heading {
          font-size: 18px;
          font-weight: bold;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
