import React, { useState } from 'react';
import axios from 'axios';

import { flaskBackendUrl } from '../constants/BackendUrl';

const Task = (task) => {
  const [isExpanded, setIsExpanded] = useState(false);


  const deleteEvent = async (event) => {
    try {
      const response = await axios.post(flaskBackendUrl + '/api/delete_event', event, {
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

  // TODO: Remove below
  const taskContent = task.task;
  console.log("Task content", taskContent);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '6px', margin: '2px', padding: '5px', border: '1px solid' }} onClick={() => setIsExpanded(!isExpanded)}>

      <span style={{ flex: 1, display: 'flex', flexDirection: 'row', margin: '1px' }}>

        <span style={{ flex: 1, flexDirection: 'column' }}>
          {taskContent.starttimestamp.slice(0, 12)}
        </span>
        <span style={{ flex: 1, flexDirection: 'column' }}>
          {new Date(taskContent.starttimestamp).getHours()}:{new Date(taskContent.starttimestamp).getMinutes()} - {new Date(taskContent.endtimestamp).getHours()}:{new Date(taskContent.endtimestamp).getMinutes()}
        </span>
        <span style={{ flex: 5, flexDirection: 'column' }}>
          {taskContent.title}
        </span>
        {/* <span style={{ flex: 2, flexDirection: 'column' }}>
          <button>Edit</button>
          <button>Continue</button>
          <button>Re-schedule</button>
        </span> */}
      
      </span>

      {
        (isExpanded) &&
        <span style={{ flex: 1, display: 'flex', flexDirection: 'row', margin: '5px'}}>
           <div>
            <span onClick={() => deleteEvent(task)} style={{ border: '1px solid red', margin: '2px', padding: '2px', borderRadius: '10%' }}>🗑️</span>
            <span> {taskContent.description} </span>
          </div>
        </span>
      }
    </div>
  );
};

export default Task;
