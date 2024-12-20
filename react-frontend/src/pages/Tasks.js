import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import Task2 from '../components/Task2';

import { flaskBackendUrl } from '../constants/BackendUrl';
import TaskChart from '../components/TasksChart';
import PriorityPieChart from '../components/PriorityPieChart';

const Tasks = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideContent, setHideContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(flaskBackendUrl + '/api/tasks', {
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
      {/* <a href="https://dribbble.com/tags/project-management">Dribble - Project management</a> */}
      <div>
        <TaskChart data={data}/>
      </div>
      <div>
        {
          data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)).map((task, index) => <Task2 key={index} task={task}></Task2>)
        }
      </div>

    </div>
  );
};

export default Tasks;
