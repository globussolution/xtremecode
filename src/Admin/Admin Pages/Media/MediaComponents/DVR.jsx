import AppLayout from "../../../Admin Components/AppLayout";
import { useState } from "react";
import {
  Tabs,
  Input,
  Button,
  Select,
  TimePicker,
  Row,
  Col,
  Tooltip,
} from "antd";
import { Link } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { FaChevronLeft } from "react-icons/fa";

dayjs.extend(utc);
dayjs.extend(timezone);

const { Option } = Select;

function DVR() {
  const [isMobile, setIsMobile] = useState(false);
  const [globalDvrConfig, setGlobalDvrConfig] = useState("");
  const [path, setPath] = useState("");
  const [archiveCachePath, setArchiveCachePath] = useState("");
  const [schedule, setSchedule] = useState([
    {
      startTime: dayjs()
        .tz("Asia/Karachi")
        .startOf("day")
        .add(15 * 60 + 42, "minute"),
      endTime: dayjs()
        .tz("Asia/Karachi")
        .startOf("day")
        .add(23 * 60 + 59, "minute"),
    },
    {
      startTime: null,
      endTime: dayjs()
        .tz("Asia/Karachi")
        .startOf("day")
        .add(23 * 60 + 59, "minute"),
    },
  ]);

  const handleAddScheduleRange = () => {
    setSchedule([
      ...schedule,
      {
        startTime: null,
        endTime: dayjs()
          .tz("Asia/Karachi")
          .startOf("day")
          .add(23 * 60 + 59, "minute"),
      },
    ]);
  };

  const handleScheduleChange = (index, type, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][type] = value;
    setSchedule(newSchedule);
  };

  const handleRemoveScheduleRange = (index) => {
    const newSchedule = [...schedule];
    newSchedule.splice(index, 1);
    setSchedule(newSchedule);
  };

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
          defaultActiveKey="4"
          className="mb-0"
          size={isMobile ? "small" : "middle"}
          items={items}
        />
      </div>

      <div className="p-4 h-[calc(100vh-150px)] overflow-y-auto bg-white">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
          <InfoCircleOutlined className="mr-2 text-blue-500" />
          The DVR player has been moved to the{" "}
          <Link to="/media/overview" className="text-blue-700 underline">
            Overview page
          </Link>
          .
          <Button type="link" size="small" className="float-right -mt-1">
            <DeleteOutlined />
          </Button>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="globalDvrConfig"
          >
            Global DVR config
          </label>
          <Select
            id="globalDvrConfig"
            value={globalDvrConfig}
            style={{ width: "100%" }}
            onChange={setGlobalDvrConfig}
            placeholder="Select global DVR config"
          >
            <Option value="">- Not selected -</Option>
            {/* Add your global DVR config options here */}
          </Select>
          <Link to="#" className="text-blue-500 text-sm mt-1 inline-block">
            Edit DVR configurations
          </Link>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="path"
          >
            Path
            <Tooltip title="Where the archive is stored">
              <InfoCircleOutlined className="ml-1 text-gray-500" />
            </Tooltip>
          </label>
          <Input
            id="path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="Enter path"
            suffix={<InfoCircleOutlined className="text-blue-500" />}
          />
          <p className="text-gray-500 text-xs mt-1">
            Where the archive is stored
          </p>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="archiveCachePath"
          >
            SSD disk cache
            <Tooltip title="Cache requested archive segments. Useful even if no local dvr defined, for proxied remote dvr.">
              <InfoCircleOutlined className="ml-1 text-gray-500" />
            </Tooltip>
          </label>
          <Input
            id="archiveCachePath"
            value={archiveCachePath}
            onChange={(e) => setArchiveCachePath(e.target.value)}
            placeholder="Enter archive cache path"
            suffix={<InfoCircleOutlined className="text-blue-500" />}
          />
          <p className="text-gray-500 text-xs mt-1">
            Cache requested archive segments. Useful even if no local dvr
            defined, for proxied remote dvr.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-gray-700 text-sm font-bold">
              Schedule
              <Tooltip title="Define schedule ranges for recording">
                <InfoCircleOutlined className="ml-1 text-gray-500" />
              </Tooltip>
            </label>
            <Button
              icon={<PlusOutlined />}
              size="small"
              onClick={handleAddScheduleRange}
            >
              Add Schedule Range
            </Button>
          </div>
          {schedule.map((range, index) => (
            <Row gutter={16} key={index} className="mb-2 items-center">
              <Col xs={24} sm={12} md={6}>
                <TimePicker
                  format="HH:mm a"
                  value={range.startTime}
                  onChange={(value) =>
                    handleScheduleChange(index, "startTime", value)
                  }
                  placeholder="Start Time"
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <TimePicker
                  format="HH:mm a"
                  value={range.endTime}
                  onChange={(value) =>
                    handleScheduleChange(index, "endTime", value)
                  }
                  placeholder="End Time"
                  style={{ width: "100%" }}
                />
              </Col>
              <Col>
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  size="small"
                  onClick={() => handleRemoveScheduleRange(index)}
                />
              </Col>
            </Row>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <Button danger>Delete Stream</Button>
          <button className="shadow-md cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1 rounded-md">
            Save
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

export default DVR;
