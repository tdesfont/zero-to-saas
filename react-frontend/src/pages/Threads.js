import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import Task from '../components/Task';

import { flaskBackendUrl } from '../constants/BackendUrl';

const Threads = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideContent, setHideContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(flaskBackendUrl + '/api/threads', {
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
          data.map((thread, index) => <div key={index}>{JSON.stringify(thread)}</div>)
        }
      </div>
    </div>
  );
};

export default Threads;
