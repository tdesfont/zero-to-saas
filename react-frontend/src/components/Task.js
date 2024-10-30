import React, { useState } from 'react';
import axios from 'axios';

const flaskBackendUrl = "http://192.168.1.81:5000";

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
  return (
    <div style={{backgroundColor: 'white', borderRadius: '6px', margin: '2px', padding: '5px', border: '1px solid'}} onClick={() => setIsExpanded(!isExpanded)}>
          <span style={{backgroundColor: ' #80d4ff', borderRadius: '2%', margin: '2px', padding: '2px'}}>{taskContent.starttimestamp}</span>
          <span style={{backgroundColor: ' #ffbf80', borderRadius: '2%', margin: '2px', padding: '2px'}}>{taskContent.endtimestamp}</span>
          ➡️ {taskContent.title} - -         
          {
            (isExpanded) && 
            <span>
              <span onClick={() => deleteEvent(task)} style={{border: '1px solid red', margin: '2px', padding: '2px', borderRadius: '10%'}}>🗑️</span>
              <div>
                <span> {taskContent.description} </span>
              </div>
            </span>
          } 
     </div>
  );
};

export default Task;
