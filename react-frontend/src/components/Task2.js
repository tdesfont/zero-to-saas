import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import { flaskBackendUrl } from '../constants/BackendUrl';

const PriorityWidget = (priority) => {
  let label = "Low Priority";
  let backgroundColor = "#61ff8b";
  if (priority == 2) {
    label = "Medium Priority";
    backgroundColor = "#c891ff";
  } else if (priority == 3) {
    label = "High Priority";
    backgroundColor = "#ff85d0";
  }
  return (
    <span style={{backgroundColor: backgroundColor, borderRadius: '5px', padding: '3px', fontSize: 13 }}>
      {label}
    </span>
  )
}

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
  console.log("Task content", taskContent);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '6px', margin: '2px', padding: '5px', border: '1px solid' }} onClick={() => setIsExpanded(!isExpanded)}>

      <span style={{ flex: 1, display: 'flex', flexDirection: 'row', margin: '1px' }}>

        <span style={{ flex: 0.2, flexDirection: 'column', display: 'flex' }}>
          <input
            type="checkbox"
            checked={taskContent.completed}
          />
        </span>

        <span style={{ flex: 1, flexDirection: 'column', display: 'flex' }}>
          <span style={{ flex: 1, fontSize: 14, color: 'grey' }}>
            Due date
          </span>
          <span style={{ flex: 1 }}>
            {taskContent.due_date.slice(0, 11)}
          </span>
        </span>

        <span style={{ flex: 1, flexDirection: 'column', display: 'flex' }}>
          <span style={{ flex: 1, fontSize: 14, color: 'grey' }}>
            Priority
          </span>
          <span style={{ flex: 1 }}>
              <PriorityWidget priority={taskContent.priority}></PriorityWidget>
          </span>
        </span>

        <span style={{ flex: 3, flexDirection: 'column', display: 'flex' }}>
          <span style={{ flex: 1, fontSize: 14, color: 'grey' }}>
            Title
          </span>
          <span style={{ flex: 1 }}>
            {taskContent.title}
          </span>
        </span>

        <span style={{ flex: 1, flexDirection: 'column', display: 'flex' }}>
          <span style={{ flex: 1, fontSize: 14, color: 'grey' }}>
            Thread id:
          </span>
          <span style={{ flex: 1 }}>
            {taskContent.thread_id.slice(10,)}
          </span>
        </span>

        <span style={{ flex: 1, flexDirection: 'column' }}>
          <button>Edit</button>
        </span>

      </span>

      {
        (isExpanded) &&
        <span style={{ flex: 1, display: 'flex', flexDirection: 'row', margin: '5px' }}>
          <div>
            <span onClick={() => deleteTask(task)} style={{ border: '1px solid red', margin: '2px', padding: '2px', borderRadius: '10%' }}>🗑️</span>
            <span> {taskContent.description} </span>
          </div>
        </span>
      }
    </div>
  );
};

export default Task2;
