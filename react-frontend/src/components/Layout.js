// src/components/Layout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';
import HoverableButton from './HoverableButton';

const Layout = () => {
  return (
    <div className="layout">
      <div className="leftBar">
        <div className='header'>
          <h2>Plan.ai</h2>
          <input name="myInput" placeholder='🔎 Search'/>
          <h5>Account</h5>
          <HoverableButton></HoverableButton>
        </div>  
        <div className="menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;