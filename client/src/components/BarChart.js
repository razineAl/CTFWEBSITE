import React from 'react';
import { BarChart, Bar, XAxis, YAxis,Cell, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import '../App.css';




const colors = ['#003f5c','#4a4e69','#bc5090','#ff6361','#7a5195'];

const BarCharts = ({ data }) => (
  <ResponsiveContainer width="50%" height={200}>
    <div id='mondiv'>j</div>
    <BarChart
      data={data}
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}
      barSize={10}
    >
      <XAxis dataKey="category" />
      
      <YAxis />
        <Bar
          dataKey="solved"
          radius={[2, 2, 0, 0]}  // Slightly rounded corners
          isAnimationActive={false}  // Disable hover animation // Use the color from data
        >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
        </Bar>
      </BarChart>
  </ResponsiveContainer>
);



export default BarCharts;