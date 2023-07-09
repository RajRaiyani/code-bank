import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend

);


const Try = () => {
  function PieChart() {
    const data = {
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['transparent', 'transparent', 'transparent'],
          backgroundColor: ['#7CC529', '#FFB444', '#E47171'],
          borderColor: ['#7CC529', '#FFB444', '#E47171'],
        },
      ],
    };
    const options = {
      plugins: {
        tooltip: {
          callbacks: {
            title: (tooltipItems, data) => {
              const dataIndex = tooltipItems[0].dataIndex;
              const titles = ['Easy', 'Medium', 'Hard'];
              return titles[dataIndex];
            },
          },
        },
      },
    };

    return( 
    <>
   <div style={{ height: '200px', width: '200px' }}>
    <Pie data={data} options={options}/>
    </div>
    </>);
  }


  return (<PieChart></PieChart>);

};

export default Try;
