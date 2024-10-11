import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import Task from '../components/Task';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://192.168.43.62:5000/events', {
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
            <h2>Dashboard</h2>
            <p>This is the Dashboard page.</p>
            <h2>Fetched Data</h2>
            <div>
                {
                    data.map((event, index) => <Task key={index} task={event}></Task>)
                }
            </div>
        </div>
    );
};

export default Dashboard;
