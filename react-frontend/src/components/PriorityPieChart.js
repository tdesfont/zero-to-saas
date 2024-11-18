import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const aggregateDataByPriority = (data) => {
    const aggregated = {};
  
    data.forEach((item) => {
      const { priority } = item;
      if (!aggregated[priority]) {
        aggregated[priority] = 0;
      }
      aggregated[priority]++;
    });
  
    return Object.keys(aggregated).map((priority) => ({
      name: `Priority ${priority}`,
      value: aggregated[priority],
    }));
  };
  

const PriorityPieChart = ({ data }) => {
  const aggregatedData = aggregateDataByPriority(data);

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={aggregatedData}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {aggregatedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default PriorityPieChart;
