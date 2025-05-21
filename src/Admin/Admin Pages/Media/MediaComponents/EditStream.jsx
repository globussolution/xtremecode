import { useState } from "react";
import { Tabs, Button, Input, Select, Switch, Space, Card } from "antd";
import { Link } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";
import AppLayout from "../../../Admin Components/AppLayout";
import { FaChevronLeft } from "react-icons/fa";
import { Line } from "react-chartjs-2";
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

const EditStream = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [name, setName] = useState("HBO_Max");
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description");
  const [template, setTemplate] = useState("");
  const [inputMediaInfo] = useState({
    video: "v1 h264 320x240 (200kbps)",
    audio: "a1 aac stereo eng (128kbps)",
  });
  const [outputMediaInfo] = useState({
    video: "v1 h264 320x240 (72kbps)",
    audio: "a1 aac stereo eng (128kbps)",
  });
  const [htmlCode] = useState(
    '<iframe style="width:640px; height:480px;" allowfullscreen src=""></iframe>'
  );
  const [staticToggle, setStaticToggle] = useState(true);
  const [onDemandToggle, setOnDemandToggle] = useState(false);
  const [sdToggle, setSdToggle] = useState(true);
  const [bitrate] = useState("174kbit/s");
  const [duration] = useState("3d 7h");

  const templateOptions = [
    { label: "Not selected", value: "" },
    { label: "Template 1", value: "template1" },
    { label: "Template 2", value: "template2" },
  ];

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useState(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const items = [
    {
      key: "1",
      label: <Link to="/media/overview">Overview</Link>,
    },
    {
      key: "2",
      label: <Link to="/media/input">Input</Link>,
    },
    {
      key: "3",
      label: <Link to="/media/transcoder">Transcoder</Link>,
    },
    {
      key: "4",
      label: <Link to="/media/dvr">DVR</Link>,
    },
    {
      key: "5",
      label: <Link to="/media/output">Output</Link>,
    },
    {
      key: "6",
      label: <Link to="/media/epg">EPG</Link>,
    },
    {
      key: "7",
      label: <Link to="/media/auth">Auth</Link>,
    },
    {
      key: "8",
      label: <Link to="/media/playsessions">Play sessions</Link>,
    },
  ];

  // chart Data
  const dataChart = {
    labels: ["20:23.05", "20:23.10", "20:23.15", "20:23.20", "20:23.25"],
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

  const optionsChart = {
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
        max: 1900000,
        ticks: {
          stepSize: 1000000,
          callback: (value) => `${(value / 1000000).toFixed(1)}MB`,
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
        },
      },
      x: {
        type: "category",
        ticks: {
          callback: (val, index) => dataChart.labels[index],
        },
      },
    },
  };

  return (
    <AppLayout>
      <div className="min-h-screen">
        <div className="mb-5 mt-8 lg:px-0 px-3">
          <Link
            className="flex items-center gap-2 font-semibold text-blue-700"
            to="/"
          >
            <FaChevronLeft className="text-sm" /> Back to media
          </Link>
        </div>

        {/* Tabs */}
        <div
          className={`scrollHide w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
            isMobile ? "px-2" : "px-4"
          }`}
        >
          <Tabs
            defaultActiveKey="1"
            className="mb-0"
            size={isMobile ? "small" : "middle"}
            items={items}
          />
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-6 lg:p-4 mt-5 h-[calc(100vh-200px)] overflow-y-auto">
          {/* Top Row with Name, Title, Description, Template */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <Select
              value={template}
              onChange={setTemplate}
              options={templateOptions}
              placeholder="Template"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Space>
                    <button className="cursor-pointer transition-all bg-[#08009b] border border-[#08009b] text-white hover:text-[#08009b] hover:bg-white font-semibold px-5 py-1 rounded-md">
                      Disable
                    </button>
                    <button className="cursor-pointer transition-all bg-[#ff0095] border border-[#ff0095] text-white hover:text-[#ff0095] hover:bg-white font-semibold px-5 py-1 rounded-md">
                      Stop
                    </button>
                  </Space>
                  <Space>
                    <Switch
                      checked={staticToggle}
                      onChange={setStaticToggle}
                      size="small"
                    />{" "}
                    Static
                    <Switch
                      checked={onDemandToggle}
                      onChange={setOnDemandToggle}
                      size="small"
                    />{" "}
                    On Demand
                  </Space>
                </div>
                <div className="relative w-full h-64 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                  <PlayCircleOutlined className="text-4xl text-gray-500 z-10" />
                </div>
                <div className="mt-4 flex gap-2">
                  <Button>HLS</Button>
                  <Button>MSE</Button>
                  <Button>DVR</Button>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Embed HTML player on your website
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={htmlCode}
                      onChange={(e) => {}} // Prevent editing for now
                      className="w-full"
                    />
                    <Button
                      onClick={() => navigator.clipboard.writeText(htmlCode)}
                    >
                      Copy HTML
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div>
              <Card className="mb-6">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-semibold px-3 mb-2 border border-green-500 bg-green-100 rounded-full">
                    Online
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <Space>
                      <Switch
                        checked={sdToggle}
                        onChange={setSdToggle}
                        size="small"
                      />{" "}
                      SD
                      <span>{bitrate}</span>
                    </Space>
                    <span>{duration}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Input media info</p>
                  <p className="text-gray-600">{inputMediaInfo.video}</p>
                  <p className="text-gray-600">{inputMediaInfo.audio}</p>
                </div>
                <div>
                  <p className="font-medium">Output media info</p>
                  <p className="text-gray-600">{outputMediaInfo.video}</p>
                  <p className="text-gray-600">{outputMediaInfo.audio}</p>
                </div>
              </Card>

              {/* Chart */}
              <Card>
                <div className="lg:w-[450px] h-64 w-[330px] border border-gray-400 p-3">
                  <Line data={dataChart} options={optionsChart} />
                </div>
              </Card>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="w-full bg-white p-4 flex justify-end gap-4">
            <Button danger>Delete Stream</Button>
            <button className="shadow-md cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1 rounded-md">
              Save
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EditStream;
