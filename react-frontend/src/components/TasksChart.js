import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const aggregateData = (data) => {
    const aggregated = {};
  
    data.forEach((item) => {
      const { due_date, priority } = item;
      if (!aggregated[due_date]) {
        aggregated[due_date] = { total: 0, priorities: {} };
      }
      if (!aggregated[due_date].priorities[priority]) {
        aggregated[due_date].priorities[priority] = 0;
      }
      aggregated[due_date].priorities[priority]++;
      aggregated[due_date].total++;
    });

    const cleanedData = Object.keys(aggregated).map((date) => ({
      date,
      ...aggregated[date].priorities,
      total: aggregated[date].total,
    }));
  
    return cleanedData;
  };
  

const TaskChart = ({ data }) => {

  const aggregatedData = aggregateData(data);
  console.log("Cleaned data", aggregatedData);

  return (
    <BarChart width={1000} height={300} data={aggregatedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="1" fill="#61ff8b" name="Low Priority" />
      <Bar dataKey="2" fill="#c891ff" name="Medium Priority" />
      <Bar dataKey="3" fill="#ff85d0" name="High Priority" />
      <Bar dataKey="total" fill="#ff7300" name="Total" />
    </BarChart>
  );
};

export default TaskChart;
