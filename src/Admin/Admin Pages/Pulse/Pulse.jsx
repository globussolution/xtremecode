import { Line } from "react-chartjs-2";
import AppLayout from "../../Admin Components/AppLayout";
import { IoCameraSharp } from "react-icons/io5";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
  CategoryScale
);

function Pulse() {
  const dataT1 = {
    labels: [
      "2025-05-19 16:00",
      "2025-05-19 17:00",
      "2025-05-19 18:00",
      "2025-05-19 19:00",
      "2025-05-19 20:00",
    ],
    datasets: [
      {
        label: "In",
        data: [10000, 20000, 15000, 76118, 30000],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
      {
        label: "Out",
        data: [2000, 4000, 3500, 5524, 4500],
        borderColor: "green",
        backgroundColor: "transparent",
        pointBorderColor: "green",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
      {
        label: "Clients",
        data: [1, 1, 1, 1, 1],
        borderColor: "blue",
        yAxisID: "y1",
        pointBorderColor: "blue",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };

  const optionsT1 = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            if (context.dataset.label === "Clients") {
              return `🟦 Clients: ${context.raw}`;
            }
            return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
          },
        },
      },
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    scales: {
      y: {
        type: "linear",
        position: "left",
        min: 0,
        max: 900000, // 0.9Mb = 900,000 bits
        ticks: {
          stepSize: 300000, // 0.3Mb = 300,000 bits
          callback: (value) => `${(value / 1000000).toFixed(1)}Mb`,
        },
      },
      y1: {
        type: "linear",
        position: "right",
        min: 0,
        max: 1,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          stepSize: 0.5,
          callback: (value) => `${value}`,
        },
      },
      x: {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "yyyy-MM-dd HH:mm:ss",
          displayFormats: {
            hour: "HH:mm",
          },
        },
      },
    },
  };

  const dataT2 = {
    labels: [
      "2025-05-19 20:08:15",
      "2025-05-19 20:08:30",
      "2025-05-19 20:08:45",
      "2025-05-19 20:09",
    ],
    datasets: [
      {
        label: "In",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 1900000 },
          { x: "2025-05-19 20:08:45", y: 1000000 },
          { x: "2025-05-19 20:09", y: 3800000 },
        ],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
      {
        label: "Out",
        data: [
          { x: "2025-05-19 20:08:15", y: 1000000 },
          { x: "2025-05-19 20:08:30", y: 2800000 },
          { x: "2025-05-19 20:08:45", y: 1500000 },
          { x: "2025-05-19 20:09", y: 3100000 },
        ],
        borderColor: "green",
        backgroundColor: "transparent",
        pointBorderColor: "green",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
      {
        label: "Clients",
        yAxisID: "y1",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 0.5 },
          { x: "2025-05-19 20:08:45", y: 1 },
          { x: "2025-05-19 20:09", y: 0.5 },
        ],
        borderColor: "blue",
        backgroundColor: "transparent",
        pointBorderColor: "blue",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };

  const optionsT2 = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second",
          tooltipFormat: "HH:mm:ss",
          displayFormats: {
            second: "HH:mm:ss",
          },
        },
        ticks: {
          autoSkip: false,
          source: "labels",
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        type: "linear",
        position: "left",
        min: 0,
        max: 3800000,
        ticks: {
          stepSize: 1900000,
          callback: (value) => `${(value / 1000000).toFixed(1)}Mb`,
        },
      },
      y1: {
        type: "linear",
        position: "right",
        min: 0,
        max: 1,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          stepSize: 0.5,
          callback: (value) => value,
        },
      },
    },
  };

  return (
    <>
      <AppLayout>
        <div className="lg:px-0 px-5 h-[calc(120vh-200px)] overflow-y-auto">
          {/* Input and Button */}
          <div className="mt-16">
            <input
              className="Input w-full border-b-2 py-2 border-gray-400 placeholder:font-semibold focus:placeholder:text-[#021d7d] hover:border-[#08027d] focus:border-[#08027d] focus:outline-none"
              type="text"
              placeholder="Custom pulse query"
            />
            <button className="mt-5 flex items-center gap-2 bg-[#08027d] text-white hover:bg-blue-800 transition-all px-3 py-1.5 font-semibold cursor-pointer rounded-sm">
              Save as pulse image <IoCameraSharp className="text-xl" />
            </button>
          </div>

          {/* Traffic Charts */}
          <div>
            {/* Heading */}
            <div className="mt-14">
              <h1 className="text-3xl font-bold text-[#08027d]">Traffic</h1>
            </div>
            {/* Charts Div */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  System traffic for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[400px] border border-gray-400 p-3">
                  <Line data={dataT1} options={optionsT1} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  System traffic for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[400px] border border-gray-400 p-3">
                  <Line data={dataT2} options={optionsT2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export default Pulse;
