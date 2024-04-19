import Link from "next/link";
import BackTo from "../components/back-to-component";
import GoTo from "../components/go-to-component";

const LightWeight = () => {
  return (
    <>
      <div className="flex place-items-center h-52">
        <h1 className="text-3xl">Lightweight Charts</h1>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <BackTo
          title="Chart Libraries"
          description="List of libraries used to create the charts."
          path="/"
        />
        <GoTo
          title="Basic Area"
          description="See basic area chart example."
          path="/lightweight/basic-area/"
        />
        <GoTo
          title="Basic Line"
          description="See basic line chart example."
          path="/lightweight/basic-line/"
        />
        <GoTo
          title="Candlestick"
          description="See candlestick chart example."
          path="/lightweight/candlestick/"
        />
        <GoTo
          title="Multiple Series"
          description="See multiple series chart example."
          path="/lightweight/multiple-series/"
        />
        <GoTo
          title="Compare Series"
          description="See multiple series compare chart example."
          path="/lightweight/multiple-series-compare/"
        />
        <GoTo
          title="Area Tooltip"
          description="See area chart with Tooltip example."
          path="/lightweight/basic-area-tooltip/"
        />
        <GoTo
          title="Realtime Data"
          description="See candlestick chart with data in realtime example."
          path="/lightweight/candlestick-realtime/"
        />
      </div>
    </>
  );
};

export default LightWeight;
