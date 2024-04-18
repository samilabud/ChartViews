"use client";
import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

let randomFactor = 25 + Math.random() * 25;
const samplePoint = (i) =>
  i *
    (0.5 +
      Math.sin(i / 1) * 0.2 +
      Math.sin(i / 2) * 0.4 +
      Math.sin(i / randomFactor) * 0.8 +
      Math.sin(i / 50) * 0.5) +
  200 +
  i * 2;

function generateData(
  numberOfCandles = 500,
  updatesPerCandle = 5,
  startAt = 100
) {
  const createCandle = (val, time) => ({
    time,
    open: val,
    high: val,
    low: val,
    close: val,
  });

  const updateCandle = (candle, val) => ({
    time: candle.time,
    close: val,
    open: candle.open,
    low: Math.min(candle.low, val),
    high: Math.max(candle.high, val),
  });

  randomFactor = 25 + Math.random() * 25;
  const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
  const numberOfPoints = numberOfCandles * updatesPerCandle;
  const initialData = [];
  const realtimeUpdates = [];
  let lastCandle;
  let previousValue = samplePoint(-1);
  for (let i = 0; i < numberOfPoints; ++i) {
    if (i % updatesPerCandle === 0) {
      date.setUTCDate(date.getUTCDate() + 1);
    }
    const time = date.getTime() / 1000;
    let value = samplePoint(i);
    const diff = (value - previousValue) * Math.random();
    value = previousValue + diff;
    previousValue = value;
    if (i % updatesPerCandle === 0) {
      const candle = createCandle(value, time);
      lastCandle = candle;
      if (i >= startAt) {
        realtimeUpdates.push(candle);
      }
    } else {
      const newCandle = updateCandle(lastCandle, value);
      lastCandle = newCandle;
      if (i >= startAt) {
        realtimeUpdates.push(newCandle);
      } else if ((i + 1) % updatesPerCandle === 0) {
        initialData.push(newCandle);
      }
    }
  }

  return {
    initialData,
    realtimeUpdates,
  };
}

const chartData = {
  colors: {
    backgroundColor: "white",
    lineColor: "#2962FF",
    textColor: "black",
  },
};

// simulate real-time data
function* getNextRealtimeUpdate(realtimeData) {
  for (const dataPoint of realtimeData) {
    yield dataPoint;
  }
  return null;
}
const CandleStickRealTime = () => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const {
      colors: { backgroundColor = "white", textColor = "black" },
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
    });

    const newSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    const realTimeData = generateData(2500, 20, 1000);
    newSeries.setData(realTimeData.initialData);
    //Auto fitting all the content
    chart.timeScale().fitContent();
    chart.timeScale().scrollToPosition(5);

    const streamingDataProvider = getNextRealtimeUpdate(
      realTimeData.realtimeUpdates
    );

    const intervalID = setInterval(() => {
      const update = streamingDataProvider.next();
      if (update.done) {
        clearInterval(intervalID);
        return;
      }
      newSeries.update(update.value);
    }, 100);

    return () => {
      clearInterval(intervalID);
      chart.remove();
    };
  }, []);

  return (
    <>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full">
        <h1 className="text-3xl">Candlestick Realtime Data</h1>
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

export default CandleStickRealTime;
