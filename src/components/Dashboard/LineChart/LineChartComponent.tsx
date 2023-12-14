import React from "react";
import { Line } from "react-chartjs-2";
// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";

const LineChartComponent = () => {
  // ** Chart Options
  const options: any = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "#6e6b7b" },
        grid: {
          borderColor: "rgba(200, 200, 200, 0.2)",
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
      y: {
        min: 0,
        max: 400,
        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: "#6e6b7b",
        },
        grid: {
          borderColor: "rgba(200, 200, 200, 0.2)",
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        align: "start",
        position: "top",
        labels: {
          boxWidth: 10,
          marginBottom: 25,
          color: "#6e6b7b",
          usePointStyle: true,
        },
      },
    },
  };

  // ** Chart Data
  const data = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
    datasets: [
      {
        data: [
          80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360,
          375,
        ],
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: "Europe",
        pointHoverRadius: 5,
        pointStyle: "circle",
        pointHoverBorderWidth: 5,
        borderColor: "#ff4961",
        pointBorderColor: "transparent",
        backgroundColor: "#ff4961",
        pointHoverBackgroundColor: "#ff4961",
      },
      {
        data: [
          80, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200,
          280,
        ],
        fill: false,
        tension: 0.5,
        label: "Asia",
        pointRadius: 1,
        pointHoverRadius: 5,
        pointStyle: "circle",
        pointHoverBorderWidth: 5,
        borderColor: "#666ee8",
        pointBorderColor: "transparent",
        backgroundColor: "#666ee8",
        pointHoverBackgroundColor: "#666ee8",
      },
      {
        data: [
          80, 99, 82, 90, 115, 115, 74, 75, 130, 155, 125, 90, 140, 130, 180,
        ],
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: "Africa",
        pointHoverRadius: 5,
        pointStyle: "circle",
        pointHoverBorderWidth: 5,
        borderColor: "#ffbd1f",
        backgroundColor: "#ffbd1f",
        pointBorderColor: "#ffbd1f",
        pointHoverBackgroundColor: "#ffbd1f",
      },
    ],
  };

  //** To add spacing between legends and chart
  const plugins: any = [
    {
      beforeInit(chart: any) {
        chart.legend.afterFit = function () {
          this.height += 20;
        };
      },
    },
  ];

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <div>
          <CardTitle className="mb-75" tag="h4">
            Statistics
          </CardTitle>
          <CardSubtitle>Commercial networks and enterprises</CardSubtitle>
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ height: "450px" }}>
          <Line data={data} options={options} height={390} plugins={plugins} />
        </div>
      </CardBody>
    </Card>
  );
};

export default LineChartComponent;
