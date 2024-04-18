"use client";
import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];

const toolTipWidth = 96;
const toolTipHeight = 90;
const toolTipMargin = 10;

const chartData = {
  series: initialData,
  colors: {
    backgroundColor: "white",
    lineColor: "#2962FF",
    textColor: "black",
    areaTopColor: "#2962FF",
    areaBottomColor: "rgba(41, 98, 255, 0.28)",
  },
};
const BasicAreaTooltip = () => {
  const chartContainerRef = useRef();
  const toolTipContainer = useRef();

  useEffect(() => {
    const {
      series,
      colors: {
        backgroundColor = "white",
        lineColor = "#2962FF",
        textColor = "black",
        areaTopColor = "#2962FF",
        areaBottomColor = "rgba(41, 98, 255, 0.28)",
      },
    } = chartData;
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: 400,
      height: 300,
    });
    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(series);
    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.current.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef.current.clientHeight
      ) {
        toolTipContainer.current.style.display = "none";
      } else {
        // time will be in the same format that we supplied to setData.
        // thus it will be YYYY-MM-DD
        const dateStr = param.time;
        toolTipContainer.current.style.display = "block";
        const data = param.seriesData.get(newSeries);
        const price = data.value !== undefined ? data.value : data.close;
        toolTipContainer.current.innerHTML = `<div style="color: ${"#2962FF"}">Upwork</div><div style="font-size: 24px; margin: 4px 0px; color: ${"black"}">
              ${Math.round(100 * price) / 100}
              </div><div style="color: ${"black"}">
              ${dateStr}
              </div>`;

        const coordinate = newSeries.priceToCoordinate(price);
        let shiftedCoordinate = param.point.x - 50;
        if (coordinate === null) {
          return;
        }
        shiftedCoordinate = Math.max(
          0,
          Math.min(
            chartContainerRef.current.clientWidth - toolTipWidth,
            shiftedCoordinate
          )
        );
        const coordinateY =
          coordinate - toolTipHeight - toolTipMargin > 0
            ? coordinate - toolTipHeight - toolTipMargin
            : Math.max(
                0,
                Math.min(
                  chartContainerRef.current.clientHeight -
                    toolTipHeight -
                    toolTipMargin,
                  coordinate + toolTipMargin
                )
              );
        toolTipContainer.current.style.left = shiftedCoordinate + "px";
        toolTipContainer.current.style.top = coordinateY + "px";
      }
    });
    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full">
        <h1 className="text-3xl">Area Chart With Tooltip</h1>
      </div>
      <div>
        <div ref={chartContainerRef} style={{ position: "relative" }}>
          <div
            ref={toolTipContainer}
            style={{
              borderColor: "#2962FF",
              color: "black",
              background: "white",
              width: "96px",
              height: "90px",
              position: "absolute",
              zIndex: 1000,
              display: "none",
              padding: "8px",
              boxSizing: "border-box",
              fontSize: "12px",
              textAlign: "left",
              top: "12px",
              left: "12px",
              pointerEvents: "none",
              border: "1px solid",
              borderRadius: "2px",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          ></div>
        </div>
      </div>
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

export default BasicAreaTooltip;
