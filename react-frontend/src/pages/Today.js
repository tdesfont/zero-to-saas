import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import Task from '../components/Task';

import { flaskBackendUrl } from '../constants/BackendUrl';
import EventForm from '../components/EventForm';
import EventsChart from '../components/EventsChart';
import Task2 from '../components/Task2';

const Today = () => {

  const [data, setData] = useState(null);

  const [eventsData, setEventsData] = useState(null);
  const [tasksData, setTasksData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideContent, setHideContent] = useState(false);
  const [displayEventCreationForm, setDisplayEventCreationForm] = useState(false);

  useEffect(() => {
    
    const fetchData = async () => {
      try {

        // Get events
        const responseEvents = await axios.get(flaskBackendUrl + '/api/events', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setEventsData(responseEvents.data);

        // Get tasks
        const responseTasks = await axios.get(flaskBackendUrl + '/api/tasks', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setTasksData(responseTasks.data);

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

  const todaysEvents = eventsData.filter((event) => { return new Date(event.starttimestamp).getDate() === new Date().getDate() });
  const todaysTasks = tasksData.filter((event) => { return new Date(event.due_date).getDate() === new Date().getDate() });

  return (
    <div>
      <div>
        <h3>Events:</h3>
        {todaysEvents&&
          todaysEvents.sort((a, b) => new Date(a.starttimestamp) - new Date(b.starttimestamp)).map((event, index) => <Task key={index} task={event} hideContent={hideContent}></Task>)
        }
      </div>
      <div>
        <h3>Tasks:</h3>
        {todaysTasks&&
          todaysTasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)).map((task, index) => <Task2 key={index} task={task}></Task2>)
        }
      </div>
    </div>
  );
};

export default Today;
