import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import Task from '../components/Task';

import { flaskBackendUrl } from '../constants/BackendUrl';
import EventForm from '../components/EventForm';
import EventsChart from '../components/EventsChart';

const Events = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideContent, setHideContent] = useState(false);
  const [displayEventCreationForm, setDisplayEventCreationForm] = useState(false);

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
    <div>

      <hr style={{ width: '100%' }} />

      <span style={{ display: 'flex', flexDirection: 'row', padding: '1px', flex: 1 }}>
        <span className='header-tab-title' onClick={() => setDisplayEventCreationForm(!displayEventCreationForm)} style={{color: 'red'}}>New</span>
        <span className='header-tab-title'><a href="https://calendar.google.com/calendar/u/0/r">Go to Google Calendar</a></span>
      </span>

      <hr style={{ width: '100%' }} />

      {
        displayEventCreationForm &&
        <div>
          <EventForm></EventForm>
          <hr style={{ width: '100%' }} />
        </div>
      }

      <EventsChart data={data}></EventsChart>


      <div>
        {
          data.sort((a, b) => new Date(a.starttimestamp) - new Date(b.starttimestamp)).map((event, index) => <Task key={index} task={event} hideContent={hideContent}></Task>)
        }
      </div>
    </div>
  );
};

export default Events;
