import React, { useState} from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

import { flaskBackendUrl } from '../constants/BackendUrl';

const TimeOut = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        query: ''
    });
    const [data, setData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        fetchData();
    };


    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(flaskBackendUrl + '/api/timeout-chat', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
        setLoading(false);
    };


    if (loading) {
        return <div><LoadingSpinner></LoadingSpinner></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div style={{'width': '100%'}}>
            <form onSubmit={handleSubmit} style={{'width': '100%'}}>
                <div style={{'width': '100%'}}>
                    <h3>Ask timeout:</h3>
                    <div>
                    <input
                        type="text"
                        name="query"
                        value={formData.query}
                        onChange={handleChange}
                        style={{'width': '800px', 'height': '100px'}}
                    />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
            <div>
                <div>
                    <h3>Answer:</h3>
                    {
                        data &&
                        data.answer
                    }
                </div>
                <div>
                    <h3>Sources:</h3>
                    {
                        data &&
                        <ul>
                            {data.sources.map((url, index) => (
                                <li key={index}>
                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                        {url}
                                    </a>
                                </li>
                            ))}
                        </ul>   
                    }
                </div>
            </div>
        </div>
    );
};

export default TimeOut;
