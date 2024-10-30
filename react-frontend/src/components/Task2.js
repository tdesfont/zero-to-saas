import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const flaskBackendUrl = "http://192.168.1.81:5000";

const Task2 = (task) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const deleteTask = async (task) => {
    try {
      const response = await axios.post(flaskBackendUrl + '/api/delete_task', task, {
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

  const taskContent = task.task;
  return (
    <div style={{borderRadius: '6px', margin: '4px', padding: '5px', border: '1px solid'}} onClick={() => setIsExpanded(!isExpanded)}>
          <span style={{backgroundColor: '#80d4ff', borderRadius: '2%', margin: '2px', padding: '2px'}}>{taskContent.due_date}</span>
          <span style={{fontWeight: 'bold'}}>➡️ {taskContent.title}</span>
          <div>
          ⏲️ {moment(taskContent.due_date).fromNow()}
          </div>
          {
            (isExpanded) && 
            <span>
              <span onClick={() => deleteTask(task)} style={{border: '1px solid red', margin: '2px', padding: '2px', borderRadius: '10%'}}>🗑️</span>
              <div>
                <span> {taskContent.description} </span>
                ➡️ {taskContent.tag}
                ➡️ {taskContent.thread_id}
                ➡️ {taskContent.priority}
              </div>
              <code style={{backgroundColor: 'pink'}}>code /Users/tbd/Documents/threads/2024-10-10-winter-2024-job-search; </code>
            </span>
          } 
     </div>
  );
};

export default Task2;
