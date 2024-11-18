import React, { useState } from 'react';
import axios from 'axios';

import { flaskBackendUrl } from '../constants/BackendUrl';

const getRandomId = () => { 
    /* Generate a random resource id for the event as the id is a primary key and should be unique.
    */
    const id = "event.id." + Math.random().toString(16).slice(2);
    return id;
}

const EventForm = () => {
    const [formData, setFormData] = useState({
        description: '',
        endTimestamp: '',
        eventId: getRandomId(),
        startTimestamp: '',
        status: '',
        title: ''
    });

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
        createEvent();
        // You can add your form submission logic here
    };

    const createEvent = async () => {
        try {
          const response = await axios.post(flaskBackendUrl + '/api/create_event', formData, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
        } catch (error) {
          console.log(error);
        } finally {
          console.log("Done");
        }
      };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        style={{margin: '3px'}}
                    />
                </div>
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={{margin: '3px'}}
                />
            </div>
            <div>
                <label>Start Timestamp:</label>
                <input
                    type="datetime-local"
                    name="startTimestamp"
                    value={formData.startTimestamp}
                    onChange={handleChange}
                    style={{margin: '3px'}}
                />
            </div>
            <div>
                <label>End Timestamp:</label>
                <input
                    type="datetime-local"
                    name="endTimestamp"
                    value={formData.endTimestamp}
                    onChange={handleChange}
                    style={{margin: '3px'}}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default EventForm;
