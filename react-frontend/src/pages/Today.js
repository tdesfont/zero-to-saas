import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const flaskBackendUrl = "http://192.168.1.81:5000";

const Task = (task) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const taskContent = task.task;
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div style={{ backgroundColor: '#4d4e57', borderRadius: '6px', margin: '1px', padding: '3px', border: '1px solid', display: 'flex', flexDirection: 'row', flexGrow: 1 }} onClick={() => setIsExpanded(!isExpanded)}>
        <div style={{ flex: 9}}>
          <span style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>{taskContent.title}</span>
          <span style={{ fontSize: 15, fontWeight: 'bold', color: 'red', border: '1px solid', backgroundColor: 'purple', padding: '1px', margin: '4px' }}>{taskContent.priority}</span>
        </div>
        <div style={{ flex: 1}}>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
        </div>
    </div>
  );
};


const Today = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideContent, setHideContent] = useState(false);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(flaskBackendUrl + '/api/today', {
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

  function handleFilterOnChange(e) {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h2>Today's tasks</h2>
      <input
        onChange={(e) => handleFilterOnChange(e)}
        placeholder='Search ...'
      />
      <span onClick={() => console.log('Button clicked')} style={{ margin: '2px', padding: '2px' }}>⚙️</span>
      <span onClick={() => setHideContent(!hideContent)} style={{ margin: '2px', padding: '2px' }}>🥸</span>
      <div>
        {
          data.filter(item => item.title.includes(filter)).map((task, index) => <Task key={index} task={task}></Task>)
        }
      </div>
    </div>
  );
};

export default Today;
