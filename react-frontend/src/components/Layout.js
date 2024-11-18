// src/components/Layout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f4f4f4'}}>
      <span style={{ display: 'flex', flexDirection: 'row', margin: '10px', padding: '1px'}}>
        <span style={{ flex: 9, fontSize: 20 }}>AI planner</span>
        <span style={{ flex: 1 }}><a href="https://github.com/tdesfont/zero-to-saas">Link to GitHub repo</a></span>
      </span>
      <div className="layout">
        <div className="leftBar">
          <div className='header'>
            <hr style={{ width: '70%' }} />
          </div>
          <div className="menu">
            <ul>
              <li><Link to="/today">☀️ Today</Link></li>
              <li><Link to="/events">🗓️ Events</Link></li>
              <li><Link to="/tasks">✔️ Tasks</Link></li>
              <li><Link to="/time-out">🔥 TimeOut</Link></li>
              {/* <li><Link to="/">🏠 Home</Link></li> */}
              {/* <li><Link to="/dashboard">🖼️ Dashboard</Link></li> */}
              {/* <li><Link to="/timetracking">⏰ Timetracking</Link></li> */}
              {/* <li><Link to="/threads">🧵 Threads</Link></li> */}
              {/* <li><Link to="/routinesubtasks">🧘 RoutinesSubTasks</Link></li> */}
              {/* <li><Link to="/recurringtask">🔄 Recurring Tasks</Link></li> */}
              {/* <li><Link to="/reminders">🔄 Reminders</Link></li>  */}
            </ul>
          </div>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>

  );
};

export default Layout;