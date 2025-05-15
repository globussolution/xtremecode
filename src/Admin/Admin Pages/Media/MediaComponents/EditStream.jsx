import { useState } from "react";
import { Tabs, Button, Input, Select, Switch, Space, Card } from "antd";
import { Link } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";
import AppLayout from "../../../Admin Components/AppLayout";

const { TabPane } = Tabs;
const { Option } = Select;

const EditStream = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [name, setName] = useState("HBO_Max");
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description");
  const [template, setTemplate] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [inputMediaInfo] = useState({
    video: "v1 h264 320x240 (200kbps)",
    audio: "a1 aac stereo eng (128kbps)",
  });
  const [outputMediaInfo] = useState({
    video: "v1 h264 320x240 (72kbps)",
    audio: "a1 aac stereo eng (128kbps)",
  });
  const [htmlCode] = useState(
    '<iframe style="width:640px; height:480px;" allowfullscreen src="http://193.239.193.161/hls/HBO_Max/embed.html"></iframe>'
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


  return (
    <AppLayout>
      <div className="min-h-screen">
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
        <div className="p-4 md:p-6 lg:p-4 mt-5 h-[calc(100vh-150px)] overflow-y-auto">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2">
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
                  <img
                    src="http://193.239.193.161/hls/HBO_Max/preview.jpg"
                    alt="Video Preview"
                    className="absolute inset-0 object-cover w-full h-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.png"; // Use a local placeholder image
                    }}
                  />
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
                <h3 className="font-semibold mb-2">Online</h3>
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

              <Card>
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
                <div className="h-48 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-700">
                    Graph Placeholder (In/Out/Clients)
                  </span>
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
