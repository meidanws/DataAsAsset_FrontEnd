import React from 'react';
import {Bar} from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(55, 99, 132, 0.2)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    },{
    label: 'Meidan',
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(0,0,0,1)',
    borderWidth: 2,
    data: [41, 50, 65, 77, 75]
  }
  ]
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average sales per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}