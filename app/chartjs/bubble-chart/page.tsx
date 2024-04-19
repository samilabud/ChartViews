"use client";
import React from "react";
import BackTo from "../../components/back-to-component";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const options = {
  responsive: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const data = {
  datasets: [
    {
      label: "Red dataset",
      data: Array.from({ length: 50 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
        r: faker.datatype.number({ min: 5, max: 20 }),
      })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Blue dataset",
      data: Array.from({ length: 50 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
        r: faker.datatype.number({ min: 5, max: 20 }),
      })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const BubbleChart = () => (
  <>
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full">
      <h1 className="text-3xl">Bubble Chart</h1>
    </div>
    <Bubble data={data} width={700} height={400} options={options} />
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      <BackTo
        title="ChartJS Charts"
        description=" List of ChartJS Charts"
        path="/chartjs/"
      />
    </div>
  </>
);

export default BubbleChart;
