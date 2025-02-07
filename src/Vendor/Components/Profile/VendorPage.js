'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Basic from './Basic';
import Address from './Address';
import Shop from './Shop';
import Bank from './Bank';

const VendorPage = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => handleTabClick('basic')}
          >
            Basic
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
            onClick={() => handleTabClick('address')}
          >
            Address
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'shop-info' ? 'active' : ''}`}
            onClick={() => handleTabClick('shop-info')}
          >
            Shop Info
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'bank-info' ? 'active' : ''}`}
            onClick={() => handleTabClick('bank-info')}
          >
            Bank Info
          </button>
        </li>
      </ul>

      <div className="tab-content mt-3">
        {activeTab === 'basic' && (
          <div className="tab-pane active">
            <h2>Basic Information</h2>
            <p>Enter basic details about the vendor here.</p>
            <Basic/>
          </div>
        )}
        {activeTab === 'address' && (
          <div className="tab-pane active">
            <h2>Address</h2>
            <p>Enter the vendor`s address details here.</p>
            <Address/>
          </div>
        )}
        {activeTab === 'shop-info' && (
          <div className="tab-pane active">
            <h2>Shop Info</h2>
            <p>Provide information about the vendor`s shop here.</p>
            <Shop/>
          </div>
        )}
        {activeTab === 'bank-info' && (
          <div className="tab-pane active">
            <h2>Bank Info</h2>
            <p>Enter the vendor`s banking details here.</p>
            <Bank/>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPage;
