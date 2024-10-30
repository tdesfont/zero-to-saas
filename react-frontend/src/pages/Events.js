import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import Task from '../components/Task';


const flaskBackendUrl = "http://192.168.1.81:5000";

const Events = () => {
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
    <div>
      <span onClick={() => console.log('Button clicked')} style={{margin: '2px', padding: '2px'}}>⚙️</span>
      <span onClick={() => setHideContent(!hideContent)} style={{margin: '2px', padding: '2px'}}>🥸</span>
      <div>
        {
          data.sort((a, b) => new Date(a.starttimestamp) - new Date(b.starttimestamp)).map((event, index) => <Task key={index} task={event} hideContent={hideContent}></Task>)
        }
      </div>
    </div>
  );
};

export default Events;
