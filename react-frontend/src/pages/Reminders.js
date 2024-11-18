import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

import { flaskBackendUrl } from '../constants/BackendUrl';
console.log("flaskBackendUrl", flaskBackendUrl);

const Reminders = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideContent, setHideContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(flaskBackendUrl + '/api/get_reminders', {
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
          data.map((task, index) => <div key={index}>{JSON.stringify(task)}</div>)
        }
      </div>
    </div>
  );
};

export default Reminders;
