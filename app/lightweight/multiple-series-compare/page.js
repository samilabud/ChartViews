"use client";
import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef, useState, useCallback } from "react";
import BackTo from "../../components/back-to-component";

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
const lineSeriesOneData = generateLineData();
const lineSeriesTwoData = generateLineData();
const lineSeriesThreeData = generateLineData();

const chartData = {
  colors: {
    backgroundColor: "white",
    lineColor: "#2962FF",
    textColor: "black",
  },
};
const SeriesCompare = () => {
  const [chart, setChart] = useState(null);
  const [lineSeriesOne, setLineSeriesOne] = useState(null);
  const [lineSeriesTwo, setLineSeriesTwo] = useState(null);
  const [lineSeriesThree, setLineSeriesThree] = useState(null);
  const initialized = useRef(false);

  const [seriesSelected, setSeriesSelected] = useState([
    { name: "first", active: false },
    { name: "second", active: false },
    { name: "third", active: false },
  ]);
  const chartContainerRef = useRef();

  const setChartInterval = useCallback(
    (serieName) => {
      if (chart && chart?.addLineSeries) {
        const newSeriesSelected = seriesSelected.map((val) => {
          if (val.name === serieName) {
            val.active = !val.active;
          }
          return val;
        });
        setSeriesSelected(newSeriesSelected);
        chart.timeScale().fitContent();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chart]
  );

  useEffect(() => {
    if (seriesSelected.length > 0 && lineSeriesOne) {
      const seriesChart = new Map([
        ["first", lineSeriesOne],
        ["second", lineSeriesTwo],
        ["third", lineSeriesThree],
      ]);
      const seriesData = new Map([
        ["first", lineSeriesOneData],
        ["second", lineSeriesTwoData],
        ["third", lineSeriesThreeData],
      ]);
      seriesSelected
        // .filter((val) => val.active)
        .forEach((val) => {
          const fnToAddSeries = seriesChart.get(val.name);
          const serieData = seriesData.get(val.name);
          if (val.active) {
            fnToAddSeries.setData(serieData);
          } else {
            fnToAddSeries.setData([]);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seriesSelected]);

  useEffect(() => {
    const {
      colors: { backgroundColor = "white", textColor = "black" },
    } = chartData;
    if (!initialized.current) {
      setChart(
        createChart(chartContainerRef.current, {
          layout: {
            background: { type: ColorType.Solid, color: backgroundColor },
            textColor,
          },
          width: 700,
          height: 400,
        })
      );
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (chart && chart?.addLineSeries) {
      setLineSeriesOne(chart.addLineSeries({ color: "#2962FF" }));
      setLineSeriesTwo(chart.addLineSeries({ color: "rgb(225, 87, 90)" }));
      setLineSeriesThree(chart.addLineSeries({ color: "rgb(242, 142, 44)" }));

      setChartInterval("first");

      return () => {
        chart.remove();
      };
    }
  }, [chart, setChartInterval]);

  return (
    <>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full">
        <h1 className="text-3xl">Multiple Series Compare</h1>
      </div>
      <div className="flex flex-col justify-between content-between">
        <div ref={chartContainerRef} />
        <div
          id="buttons"
          className="flex w-96 justify-between absolute z-10 mt-5"
        >
          <button
            className="serieButton"
            onClick={() => setChartInterval("first")}
          >
            First Series
          </button>
          <button
            className="serieButton"
            onClick={() => setChartInterval("second")}
          >
            Second Series
          </button>
          <button
            className="serieButton"
            onClick={() => setChartInterval("third")}
          >
            Third Series
          </button>
        </div>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <BackTo
          title="Lightweight Charts"
          description=" List of Lightweight Charts"
          path="/lightweight/"
        />
      </div>
    </>
  );
};

export default SeriesCompare;
