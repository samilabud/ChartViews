"use client";
import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

const initialData = [
  { time: "2019-04-11", value: 80.01 },
  { time: "2019-04-12", value: 96.63 },
  { time: "2019-04-13", value: 76.64 },
  { time: "2019-04-14", value: 81.89 },
  { time: "2019-04-15", value: 74.43 },
  { time: "2019-04-16", value: 80.01 },
  { time: "2019-04-17", value: 96.63 },
  { time: "2019-04-18", value: 76.64 },
  { time: "2019-04-19", value: 81.89 },
  { time: "2019-04-20", value: 74.43 },
];
const chartData = {
  data: initialData,
  colors: {
    backgroundColor: "white",
    lineColor: "#2962FF",
    textColor: "black",
  },
};
const BasicArea = () => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const {
      data,
      colors: {
        backgroundColor = "white",
        lineColor = "#2962FF",
        textColor = "black",
      },
    } = chartData;

    // Get the current users primary locale
    const currentLocale = window.navigator.languages[0];
    // Create a number format using Intl.NumberFormat
    const myPriceFormatter = Intl.NumberFormat(currentLocale, {
      style: "currency",
      currency: "USD", // Currency for data points
    }).format;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: 400,
      height: 300,
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
      localization: {
        priceFormatter: myPriceFormatter,
      },
    });

    const newSeries = chart.addLineSeries({
      lineColor,
    });
    newSeries.setData(data);
    //Auto fitting all the content
    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full">
        <h1 className="text-3xl">Basic Line Chart</h1>
      </div>
      <div ref={chartContainerRef} />
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link
          href="/lightweight/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            <span className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
              &lt;-
            </span>
            Lightweight Charts{" "}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            List of Lightweight Charts
          </p>
        </Link>
      </div>
    </>
  );
};

export default BasicArea;
