import React from 'react';

const Task = (task) => {
  return (
    <div style={{backgroundColor: 'yellow', margin: '5px'}}>
        {JSON.stringify(task.task)} 
    </div>
  );
};

export default Task;
