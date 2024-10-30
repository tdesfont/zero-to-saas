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
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/timetracking">Timetracking</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><Link to="/routinesubtasks">RoutinesSubTasks</Link></li>
            <li><Link to="/recurringtask">Recurring Tasks</Link></li>
            <li><Link to="/today">Today</Link></li>
            <li><Link to="/threads">Threads</Link></li>
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