"use client";
import React from "react";
import BackTo from "../../components/back-to-component";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Line Area Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
const BasicArea = () => (
  <>
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full">
      <h1 className="text-3xl">Basic Area Chart</h1>
    </div>
    <Line options={options} data={data} width={700} height={400} />
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      <BackTo
        title="ChartJS Charts"
        description=" List of ChartJS Charts"
        path="/chartjs/"
      />
    </div>
  </>
);

export default BasicArea;
