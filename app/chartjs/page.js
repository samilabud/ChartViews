import Link from "next/link";
import BackTo from "../components/back-to-component";
import GoTo from "../components/go-to-component";

const ChartJS = () => {
  return (
    <>
      <div className="flex place-items-center h-52">
        <h1 className="text-3xl">ChartJS Charts</h1>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <BackTo
          title="ChartJS Charts"
          description="List of libraries used to create the charts."
          path="/"
        />
        <GoTo
          title="Basic Area"
          description="See basic area chart example."
          path="/chartjs/basic-area/"
        />
        <GoTo
          title="Basic Line"
          description="See basic line chart example."
          path="/chartjs/basic-area/"
        />
      </div>
    </>
  );
};

export default ChartJS;
