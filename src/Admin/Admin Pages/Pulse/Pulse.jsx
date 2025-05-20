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

const ProgressBar = ({ used, total, label, color = "bg-blue-800" }) => {
  const percentage = total === 0 ? 0 : Math.round((used / total) * 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {used.toFixed(1)}GB / {total.toFixed(1)}GB
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`${color} h-2.5 rounded-full`}
          style={{ width: `${percentage}%` }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

function Pulse() {
  // Traffic Data
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

  // Memory Data
  const dataMemory = {
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
          { x: "2025-05-19 20:08:30", y: 0.05 },
          { x: "2025-05-19 20:08:45", y: 1 },
          { x: "2025-05-19 20:09", y: 0.05 },
        ],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };
  const optionsMemory = {
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
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${(context.raw.y * 100).toFixed(
              0
            )}%`;
          },
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
        max: 1,
        ticks: {
          stepSize: 0.5,
          callback: (value) => {
            if (value === 0) return "0%";
            if (value === 0.5) return "50%";
            if (value === 1) return "100%";
            return "";
          },
        },
      },
    },
  };

  // CPU Data
  const dataCPU = {
    labels: [
      "2025-05-19 20:08:15",
      "2025-05-19 20:08:30",
      "2025-05-19 20:08:45",
      "2025-05-19 20:09",
    ],
    datasets: [
      {
        label: "CPU",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 0.05 },
          { x: "2025-05-19 20:08:45", y: 1 },
          { x: "2025-05-19 20:09", y: 0.05 },
        ],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };
  const optionsCPU = {
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
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${(context.raw.y * 100).toFixed(
              0
            )}%`;
          },
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
        max: 1,
        ticks: {
          stepSize: 0.5,
          callback: (value) => {
            if (value === 0) return "0%";
            if (value === 0.5) return "50%";
            if (value === 1) return "100%";
            return "";
          },
        },
      },
    },
  };

  // Scheduler Data
  const dataScheduler = {
    labels: [
      "2025-05-19 20:08:15",
      "2025-05-19 20:08:30",
      "2025-05-19 20:08:45",
      "2025-05-19 20:09",
    ],
    datasets: [
      {
        label: "Scheduler",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 0.05 },
          { x: "2025-05-19 20:08:45", y: 1 },
          { x: "2025-05-19 20:09", y: 0.05 },
        ],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
      {
        label: "Interpreter",
        data: [
          { x: "2025-05-19 20:08:15", y: 0.1 },
          { x: "2025-05-19 20:08:30", y: 0.3 },
          { x: "2025-05-19 20:08:45", y: 0.8 },
          { x: "2025-05-19 20:09", y: 0.2 },
        ],
        borderColor: "blue",
        backgroundColor: "transparent",
        pointBorderColor: "blue",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
      {
        label: "CPU",
        data: [
          { x: "2025-05-19 20:08:15", y: 0.2 },
          { x: "2025-05-19 20:08:30", y: 0.4 },
          { x: "2025-05-19 20:08:45", y: 0.6 },
          { x: "2025-05-19 20:09", y: 0.5 },
        ],
        borderColor: "green",
        backgroundColor: "transparent",
        pointBorderColor: "green",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
      {
        label: "Disk",
        data: [
          { x: "2025-05-19 20:08:15", y: 0.3 },
          { x: "2025-05-19 20:08:30", y: 0.6 },
          { x: "2025-05-19 20:08:45", y: 0.9 },
          { x: "2025-05-19 20:09", y: 1 },
        ],
        borderColor: "black",
        backgroundColor: "transparent",
        pointBorderColor: "black",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };
  const optionsScheduler = {
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
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${(context.raw.y * 100).toFixed(
              0
            )}%`;
          },
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
        max: 1,
        ticks: {
          stepSize: 0.5,
          callback: (value) => {
            if (value === 0) return "0%";
            if (value === 0.5) return "50%";
            if (value === 1) return "100%";
            return "";
          },
        },
      },
    },
  };

  // Erlang Data
  const dataErlang1 = {
    labels: [
      "2025-05-19 20:08:15",
      "2025-05-19 20:08:30",
      "2025-05-19 20:08:45",
      "2025-05-19 20:09",
    ],
    datasets: [
      {
        label: "Active tasks",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 2 },
          { x: "2025-05-19 20:08:45", y: 4 },
          { x: "2025-05-19 20:09", y: 6 },
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
  const optionsErlang1 = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
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
        max: 6,
        ticks: {
          stepSize: 3,
          callback: (value) => {
            if (value === 0 || value === 3 || value === 6) return value;
            return "";
          },
        },
      },
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
  };
  const dataErlang2 = {
    labels: [
      "2025-05-19 20:08:15",
      "2025-05-19 20:08:30",
      "2025-05-19 20:08:45",
      "2025-05-19 20:09",
    ],
    datasets: [
      {
        label: "Active tasks",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 6 },
          { x: "2025-05-19 20:08:45", y: 10 },
          { x: "2025-05-19 20:09", y: 15 },
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
  const optionsErlang2 = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
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
        max: 15,
        ticks: {
          stepSize: 5,
          callback: (value) => {
            if ([0, 5, 10, 15].includes(value)) return value;
            return "";
          },
        },
      },
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
  };

  // HDD Data
  const dataHDD1 = {
    labels: [
      "2025-05-19 20:08:15",
      "2025-05-19 20:08:30",
      "2025-05-19 20:08:45",
      "2025-05-19 20:09",
    ],
    datasets: [
      {
        label: "sda1",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 0.05 },
          { x: "2025-05-19 20:08:45", y: 1 },
          { x: "2025-05-19 20:09", y: 0.05 },
        ],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };
  const optionsHDD1 = {
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
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${(context.raw.y * 100).toFixed(
              0
            )}%`;
          },
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
        max: 1,
        ticks: {
          stepSize: 0.5,
          callback: (value) => {
            if (value === 0) return "0%";
            if (value === 0.5) return "50%";
            if (value === 1) return "100%";
            return "";
          },
        },
      },
    },
  };
  const dataHDD2 = {
    labels: [
      "2025-05-19 20:08:15",
      "2025-05-19 20:08:30",
      "2025-05-19 20:08:45",
      "2025-05-19 20:09",
    ],
    datasets: [
      {
        label: "sda15",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 0.05 },
          { x: "2025-05-19 20:08:45", y: 1 },
          { x: "2025-05-19 20:09", y: 0.05 },
        ],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };
  const optionsHDD2 = {
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
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${(context.raw.y * 100).toFixed(
              0
            )}%`;
          },
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
        max: 1,
        ticks: {
          stepSize: 0.5,
          callback: (value) => {
            if (value === 0) return "0%";
            if (value === 0.5) return "50%";
            if (value === 1) return "100%";
            return "";
          },
        },
      },
    },
  };
  const dataHDD3 = {
    labels: [
      "2025-05-19 20:08:15",
      "2025-05-19 20:08:30",
      "2025-05-19 20:08:45",
      "2025-05-19 20:09",
    ],
    datasets: [
      {
        label: "loop1",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 0.05 },
          { x: "2025-05-19 20:08:45", y: 1 },
          { x: "2025-05-19 20:09", y: 0.05 },
        ],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };
  const optionsHDD3 = {
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
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${(context.raw.y * 100).toFixed(
              0
            )}%`;
          },
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
        max: 1,
        ticks: {
          stepSize: 0.5,
          callback: (value) => {
            if (value === 0) return "0%";
            if (value === 0.5) return "50%";
            if (value === 1) return "100%";
            return "";
          },
        },
      },
    },
  };
  const dataHDD4 = {
    labels: [
      "2025-05-19 20:08:15",
      "2025-05-19 20:08:30",
      "2025-05-19 20:08:45",
      "2025-05-19 20:09",
    ],
    datasets: [
      {
        label: "loop3",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 0.05 },
          { x: "2025-05-19 20:08:45", y: 1 },
          { x: "2025-05-19 20:09", y: 0.05 },
        ],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };
  const optionsHDD4 = {
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
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${(context.raw.y * 100).toFixed(
              0
            )}%`;
          },
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
        max: 1,
        ticks: {
          stepSize: 0.5,
          callback: (value) => {
            if (value === 0) return "0%";
            if (value === 0.5) return "50%";
            if (value === 1) return "100%";
            return "";
          },
        },
      },
    },
  };
  const dataHDD5 = {
    labels: [
      "2025-05-19 20:08:15",
      "2025-05-19 20:08:30",
      "2025-05-19 20:08:45",
      "2025-05-19 20:09",
    ],
    datasets: [
      {
        label: "loop2",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 0.05 },
          { x: "2025-05-19 20:08:45", y: 1 },
          { x: "2025-05-19 20:09", y: 0.05 },
        ],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };
  const optionsHDD5 = {
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
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${(context.raw.y * 100).toFixed(
              0
            )}%`;
          },
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
        max: 1,
        ticks: {
          stepSize: 0.5,
          callback: (value) => {
            if (value === 0) return "0%";
            if (value === 0.5) return "50%";
            if (value === 1) return "100%";
            return "";
          },
        },
      },
    },
  };
  const dataHDD6 = {
    labels: [
      "2025-05-19 20:08:15",
      "2025-05-19 20:08:30",
      "2025-05-19 20:08:45",
      "2025-05-19 20:09",
    ],
    datasets: [
      {
        label: "loop4",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 0.05 },
          { x: "2025-05-19 20:08:45", y: 1 },
          { x: "2025-05-19 20:09", y: 0.05 },
        ],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };
  const optionsHDD6 = {
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
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${(context.raw.y * 100).toFixed(
              0
            )}%`;
          },
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
        max: 1,
        ticks: {
          stepSize: 0.5,
          callback: (value) => {
            if (value === 0) return "0%";
            if (value === 0.5) return "50%";
            if (value === 1) return "100%";
            return "";
          },
        },
      },
    },
  };
  const dataHDD7 = {
    labels: [
      "2025-05-19 20:08:15",
      "2025-05-19 20:08:30",
      "2025-05-19 20:08:45",
      "2025-05-19 20:09",
    ],
    datasets: [
      {
        label: "loop6",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 0.05 },
          { x: "2025-05-19 20:08:45", y: 1 },
          { x: "2025-05-19 20:09", y: 0.05 },
        ],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };
  const optionsHDD7 = {
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
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${(context.raw.y * 100).toFixed(
              0
            )}%`;
          },
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
        max: 1,
        ticks: {
          stepSize: 0.5,
          callback: (value) => {
            if (value === 0) return "0%";
            if (value === 0.5) return "50%";
            if (value === 1) return "100%";
            return "";
          },
        },
      },
    },
  };
  const dataHDD8 = {
    labels: [
      "2025-05-19 20:08:15",
      "2025-05-19 20:08:30",
      "2025-05-19 20:08:45",
      "2025-05-19 20:09",
    ],
    datasets: [
      {
        label: "loop5",
        data: [
          { x: "2025-05-19 20:08:15", y: 0 },
          { x: "2025-05-19 20:08:30", y: 0.05 },
          { x: "2025-05-19 20:08:45", y: 1 },
          { x: "2025-05-19 20:09", y: 0.05 },
        ],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };
  const optionsHDD8 = {
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
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${(context.raw.y * 100).toFixed(
              0
            )}%`;
          },
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
        max: 1,
        ticks: {
          stepSize: 0.5,
          callback: (value) => {
            if (value === 0) return "0%";
            if (value === 0.5) return "50%";
            if (value === 1) return "100%";
            return "";
          },
        },
      },
    },
  };

  // Bar Data
  const barData = [
    { label: "root", used: 9.3, total: 77.3 },
    { label: "boot_efi", used: 6.2, total: 104.0 },
    { label: "snap_core20_2501", used: 63.0, total: 63.0 },
    { label: "snap_snapd_23771", used: 44.0, total: 44.0 },
    { label: "snap_lxd_29619", used: 92.0, total: 92.0 },
    { label: "snap_lxd_32662", used: 92.0, total: 92.0 },
    { label: "snap_snapd_24505", used: 51.0, total: 51.0 },
    { label: "snap_core20_2571", used: 63.0, total: 63.0 },
  ];

  return (
    <>
      <AppLayout>
        <div className="lg:px-0 px-5 h-[calc(120vh-200px)] overflow-y-auto">
              {/* Mobile Title */}
              <div className="md:hidden mt-5">
                <h1 className="text-2xl font-semibold">Pulse</h1>
              </div>

          {/* Input and Button */}
          <div className="lg:mt-12 mt-8">
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
              <h1 className="text-2xl font-bold text-[#08027d]">Traffic</h1>
            </div>
            {/* Charts Div */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  System traffic for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataT1} options={optionsT1} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  System traffic for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataT2} options={optionsT2} />
                </div>
              </div>
            </div>
          </div>

          {/* Memory Charts */}
          <div>
            {/* Heading */}
            <div className="mt-14">
              <h1 className="text-2xl font-bold text-[#08027d]">
                Memory usage
              </h1>
            </div>
            {/* Charts Div */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  Total memory usage for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataMemory} options={optionsMemory} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  Total memory usage for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataMemory} options={optionsMemory} />
                </div>
              </div>
            </div>
          </div>

          {/* CPU Charts */}
          <div>
            {/* Heading */}
            <div className="mt-14">
              <h1 className="text-2xl font-bold text-[#08027d]">CPU usage</h1>
            </div>
            {/* Charts Div */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  CPU usage for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataCPU} options={optionsCPU} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  CPU usage for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataCPU} options={optionsCPU} />
                </div>
              </div>
            </div>
          </div>

          {/* Scheduler Charts */}
          <div>
            {/* Heading */}
            <div className="mt-14">
              <h1 className="text-2xl font-bold text-[#08027d]">
                Scheduler utilization
              </h1>
            </div>
            {/* Charts Div */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  Scheduler utilization for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataScheduler} options={optionsScheduler} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  Scheduler utilization for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataScheduler} options={optionsScheduler} />
                </div>
              </div>
            </div>
          </div>

          {/* Erlang Charts */}
          <div>
            {/* Heading */}
            <div className="mt-14">
              <h1 className="text-2xl font-bold text-[#08027d]">
                Erlang active tasks
              </h1>
            </div>
            {/* Charts Div */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  Scheduler utilization for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataErlang1} options={optionsErlang1} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  Scheduler utilization for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataErlang2} options={optionsErlang2} />
                </div>
              </div>
            </div>
          </div>

          {/* HDD Charts */}
          <div>
            {/* Heading */}
            <div className="mt-14">
              <h1 className="text-2xl font-bold text-[#08027d]">
                HDD I/O usage
              </h1>
            </div>
            {/* Charts Div 1 */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of sda1 for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD1} options={optionsHDD1} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of sda1 for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD1} options={optionsHDD1} />
                </div>
              </div>
            </div>
            {/* Charts Div 2 */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of sda15 for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD2} options={optionsHDD2} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of sda15 for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD2} options={optionsHDD2} />
                </div>
              </div>
            </div>
            {/* Charts Div 3 */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of loop1 for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD3} options={optionsHDD3} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of loop1 for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD3} options={optionsHDD3} />
                </div>
              </div>
            </div>
            {/* Charts Div 4 */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of loop3 for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD4} options={optionsHDD4} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of loop3 for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD4} options={optionsHDD4} />
                </div>
              </div>
            </div>
            {/* Charts Div 5 */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of loop2 for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD5} options={optionsHDD5} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of loop2 for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD5} options={optionsHDD5} />
                </div>
              </div>
            </div>
            {/* Charts Div 6 */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of loop4 for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD6} options={optionsHDD6} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of loop4 for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD6} options={optionsHDD6} />
                </div>
              </div>
            </div>
            {/* Charts Div 7 */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of loop6 for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD7} options={optionsHDD7} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of loop6 for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD7} options={optionsHDD7} />
                </div>
              </div>
            </div>
            {/* Charts Div 7 */}
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between items-center mt-5">
              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of loop5 for last hours
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD8} options={optionsHDD8} />
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold text-gray-500">
                  I/O usage of loop5 for last minute
                </p>
                <div className="lg:w-[500px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataHDD8} options={optionsHDD8} />
                </div>
              </div>
            </div>
          </div>

          {/* Bar */}
          <div className="w-full mt-10">
            <div className="w-full">
              <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
                Disk Usage
              </h1>
              {barData.map((item, index) => (
                <ProgressBar
                  key={index}
                  label={item.label}
                  used={item.used}
                  total={item.total}
                />
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export default Pulse;
