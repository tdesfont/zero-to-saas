import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import Task from '../components/Task';
import './Dashboard.css';

import { flaskBackendUrl } from '../constants/BackendUrl';
import CalendarView from '../components/CalendarView';
import EventsChart from '../components/EventsChart';
console.log("flaskBackendUrl", flaskBackendUrl);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideContent, setHideContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(flaskBackendUrl + '/api/events', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div><LoadingSpinner></LoadingSpinner></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>

      <span style={{ display: 'flex', flexDirection: 'row', margin: '3px', padding: '1px', flex: 1}}>
        <span style={{ flex: 49, fontSize: 20 }}>Dashboard view for events</span>
      </span>

      <hr style={{ width: '100%' }} />

      <span style={{ display: 'flex', flexDirection: 'row', padding: '1px', flex: 1}}>
        <span className='header-tab-title'>Overview</span>
        <span className='header-tab-title'>List</span>
        <span className='header-tab-title'>Board</span>
        <span className='header-tab-title'>Calendar</span>
        <span className='header-tab-title'><a href="https://calendar.google.com/calendar/u/0/r">Go to Google Calendar</a></span>
      </span>

      <span style={{ display: 'flex', flexDirection: 'row', padding: '1px', flex: 1}}>
        <span className='header-tab-title'>Filter</span>
        <span className='header-tab-title'>Sort</span>
        <span className='header-tab-title'>New</span>
      </span>

      <hr style={{ width: '100%' }} />

      <EventsChart data={data}></EventsChart>

      <div>
        {
          data.sort((a, b) => new Date(a.starttimestamp) - new Date(b.starttimestamp)).map((event, index) => <Task key={index} task={event} hideContent={hideContent}></Task>)
        }
      </div>
    </div>
  );
};

export default Dashboard;
