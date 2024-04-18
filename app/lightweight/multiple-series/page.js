"use client";
import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

let randomFactor = 25 + Math.random() * 25;
const samplePoint = (i) =>
  i *
    (0.5 +
      Math.sin(i / 10) * 0.2 +
      Math.sin(i / 20) * 0.4 +
      Math.sin(i / randomFactor) * 0.8 +
      Math.sin(i / 500) * 0.5) +
  200;

function generateLineData(numberOfPoints = 500) {
  randomFactor = 25 + Math.random() * 25;
  const res = [];
  const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
  for (let i = 0; i < numberOfPoints; ++i) {
    const time = date.getTime() / 1000;
    const value = samplePoint(i);
    res.push({
      time,
      value,
    });

    date.setUTCDate(date.getUTCDate() + 1);
  }

  return res;
}

const chartData = {
  colors: {
    backgroundColor: "white",
    lineColor: "#2962FF",
    textColor: "black",
  },
};
const Series = () => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const {
      colors: { backgroundColor = "white", textColor = "black" },
    } = chartData;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: 700,
      height: 400,
    });

    const lineSeriesOne = chart.addLineSeries({ color: "#2962FF" });
    const lineSeriesTwo = chart.addLineSeries({ color: "rgb(225, 87, 90)" });
    const lineSeriesThree = chart.addLineSeries({ color: "rgb(242, 142, 44)" });

    const lineSeriesOneData = generateLineData();
    const lineSeriesTwoData = generateLineData();
    const lineSeriesThreeData = generateLineData();

    lineSeriesOne.setData(lineSeriesOneData);
    lineSeriesTwo.setData(lineSeriesTwoData);
    lineSeriesThree.setData(lineSeriesThreeData);

    //Auto fitting all the content
    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full">
        <h1 className="text-3xl">Multiple Series</h1>
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

export default Series;
