import React from "react";
import { Bar, Pie } from "react-chartjs-2";
export default props => {
  return (
    <div className="chart">
      {props.chartType === "Bar" && (
        <Bar
          data={props.chartData}
          options={{
            title: {
              display: true,
              text: props.title,
              fontSize: 25
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    min: 0
                  }
                }
              ]
            }
          }}
        />
      )}
      {props.chartType === "Pie" && (
        <Pie
          data={props.chartData}
          options={{
            title: {
              display: true,
              text: props.title,
              fontSize: 25
            }
          }}
        />
      )}
    </div>
  );
};
