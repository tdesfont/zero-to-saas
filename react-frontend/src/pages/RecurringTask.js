import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import './RecurringTask.css';

const flaskBackendUrl = "http://192.168.1.81:5000";


const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dayDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    days.push(`${dayName}, ${dayDate}`);
  }
  return days;
};

const Task = (task) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const taskContent = task.task;
  const daysOfWeek = getLast7Days();
  console.log("Tasks", taskContent);
  return (
    <div style={{ backgroundColor: '#4d4e57', borderRadius: '6px', margin: '1px', padding: '3px', border: '1px solid' }} onClick={() => setIsExpanded(!isExpanded)}>
      <div>
        <span style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{taskContent.title}</span>
      </div>
      <div>
        <span style={{ fontSize: 14, fontWeight: 'bold', color: '#cf08c1' }}>Frequency: {taskContent.frequency}</span>
      </div>
      <div className="week-container">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-box">
            {day}
          </div>
        ))}
      </div>
      <div>
        <span style={{ fontSize: 15, color: 'red', borderRadius: '6px', border: '1px solid', backgroundColor: 'purple', padding: '1px', margin: '4px' }}>{taskContent.start_date}</span>
        <span style={{ fontSize: 15, fontWeight: 'bold', color: 'red', border: '1px solid', backgroundColor: 'purple', padding: '1px', margin: '4px' }}>{taskContent.priority}</span>
      </div>
      {
        (isExpanded) &&
        <span>
          <span style={{ border: '1px solid red', margin: '2px', padding: '2px', borderRadius: '10%' }}>🗑️</span>
          <div>
            <span> {taskContent.thread_id} </span>
          </div>
        </span>
      }
    </div>
  );
};


const RecurringTask = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideContent, setHideContent] = useState(false);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(flaskBackendUrl + '/api/get_recurringtask', {
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
      <h2>Recurring Tasks</h2>
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

export default RecurringTask;
