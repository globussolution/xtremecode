import { useState, useEffect } from "react";
import {
  Layout,
  theme,
  Tabs,
  Input,
  Button,
  Table,
  Tag,
  Space,
  Select,
  Dropdown,
  Radio,
  Drawer,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  AppstoreOutlined,
  DownOutlined,
  UpOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaChevronCircleUp } from "react-icons/fa";
import { FaChevronCircleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import AppLayout from "../../Admin Components/AppLayout";

const { Content } = Layout;
const { TabPane } = Tabs;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Custom icons for the table
function LeftOutlined() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
}

function RightOutlined() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}

function PlayCircleOutlined() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="10 8 16 12 10 16 10 8"></polygon>
    </svg>
  );
}

function Media() {
  //   const [collapsed, setCollapsed] = useState(false)
  //   const [viewMode, setViewMode] = useState("table")
  const [compactView, setCompactView] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [statusFilters, setStatusFilters] = useState([]);
  const [featureFilters, setFeatureFilters] = useState([]);
  const [namedByFilters, setNamedByFilters] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [sortDrawerVisible, setSortDrawerVisible] = useState(false);

  // Toggle row expansion
  const toggleRowExpansion = (key, e) => {
    e.stopPropagation();
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Handle row selection
  const handleRowClick = (record) => {
    if (selectedRowKeys.includes(record.key)) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys([record.key]);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Check if the screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Stream data for the table
  const streamData = [
    {
      key: "1",
      stream: "HBO_Max",
      status: "Online",
      input: "fake://fake",
      transcode: "disabled",
      dvr: "disabled",
      output: {
        clients: 1,
        summary: "running",
        running: 0,
      },
      uptime: "1h 13m",
      bitrate: "173kbit/s",
      namedBy: "Config",
    },
    {
      key: "2",
      stream: "Netflix",
      status: "Waiting",
      input: "rtmp://example.com/live",
      transcode: "enabled",
      dvr: "enabled",
      output: {
        clients: 0,
        summary: "waiting",
        running: 0,
      },
      uptime: "0h 0m",
      bitrate: "0kbit/s",
      namedBy: "User",
    },
    {
      key: "3",
      stream: "Disney+",
      status: "Error",
      input: "hls://example.com/stream.m3u8",
      transcode: "disabled",
      dvr: "disabled",
      output: {
        clients: 0,
        summary: "error",
        running: 0,
      },
      uptime: "0h 5m",
      bitrate: "0kbit/s",
      namedBy: "Remote",
    },
  ];

  // Filter the data based on selected filters
  const filteredData = streamData.filter((item) => {
    // Status filter
    if (statusFilters.length > 0 && !statusFilters.includes(item.status)) {
      return false;
    }

    // Feature filter
    if (featureFilters.includes("With DVR") && item.dvr !== "enabled") {
      return false;
    }
    if (
      featureFilters.includes("With Transcoder") &&
      item.transcode !== "enabled"
    ) {
      return false;
    }

    // Named by filter
    if (namedByFilters.length > 0 && !namedByFilters.includes(item.namedBy)) {
      return false;
    }

    return true;
  });

  // Sort the data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField === "name") {
      return sortOrder === "asc"
        ? a.stream.localeCompare(b.stream)
        : b.stream.localeCompare(a.stream);
    } else if (sortField === "bitrate") {
      const aBitrate = Number.parseInt(a.bitrate.replace(/[^\d]/g, "")) || 0;
      const bBitrate = Number.parseInt(b.bitrate.replace(/[^\d]/g, "")) || 0;
      return sortOrder === "asc" ? aBitrate - bBitrate : bBitrate - aBitrate;
    } else if (sortField === "clients") {
      return sortOrder === "asc"
        ? a.output.clients - b.output.clients
        : b.output.clients - a.output.clients;
    }
    return 0;
  });

  // Status count for filters
  const statusCounts = {
    Online: streamData.filter((item) => item.status === "Online").length,
    Waiting: streamData.filter((item) => item.status === "Waiting").length,
    Disabled: streamData.filter((item) => item.status === "Disabled").length,
    Error: streamData.filter((item) => item.status === "Error").length,
  };

  // Feature counts for filters
  const featureCounts = {
    "With DVR": streamData.filter((item) => item.dvr === "enabled").length,
    "With Transcoder": streamData.filter((item) => item.transcode === "enabled")
      .length,
  };

  // Named by counts for filters
  const namedByCounts = {
    Config: streamData.filter((item) => item.namedBy === "Config").length,
    User: streamData.filter((item) => item.namedBy === "User").length,
    Remote: streamData.filter((item) => item.namedBy === "Remote").length,
  };

  // Sorting menu content
  const sortMenu = (
    <div className="p-4 w-64 bg-white">
      <div className="font-medium mb-2">Stream name</div>
      <div>
        <div className="flex items-center mb-2">
          <Radio
            checked={sortField === "name" && sortOrder === "asc"}
            onChange={() => {
              setSortField("name");
              setSortOrder("asc");
            }}
            className="mr-2"
          />
          <span>sort A-Z</span>
        </div>
        <div className="flex items-center mb-4">
          <Radio
            checked={sortField === "name" && sortOrder === "desc"}
            onChange={() => {
              setSortField("name");
              setSortOrder("desc");
            }}
            className="mr-2"
          />
          <span>sort Z-A</span>
        </div>
      </div>

      <div className="border-t pt-4"></div>
      <div className="font-medium mb-2">Input bitrate</div>
      <div>
        <div className="flex items-center mb-2">
          <Radio
            checked={sortField === "bitrate" && sortOrder === "asc"}
            onChange={() => {
              setSortField("bitrate");
              setSortOrder("asc");
            }}
            className="mr-2"
          />
          <span>sort asc</span>
        </div>
        <div className="flex items-center mb-4">
          <Radio
            checked={sortField === "bitrate" && sortOrder === "desc"}
            onChange={() => {
              setSortField("bitrate");
              setSortOrder("desc");
            }}
            className="mr-2"
          />
          <span>sort desc</span>
        </div>
      </div>

      <div className="border-t pt-4"></div>
      <div className="font-medium mb-2">Number of clients</div>
      <div>
        <div className="flex items-center mb-2">
          <Radio
            checked={sortField === "clients" && sortOrder === "asc"}
            onChange={() => {
              setSortField("clients");
              setSortOrder("asc");
            }}
            className="mr-2"
          />
          <span>sort asc</span>
        </div>
        <div className="flex items-center mb-4">
          <Radio
            checked={sortField === "clients" && sortOrder === "desc"}
            onChange={() => {
              setSortField("clients");
              setSortOrder("desc");
            }}
            className="mr-2"
          />
          <span>sort desc</span>
        </div>
      </div>

      <Button
        type="primary"
        onClick={() => {
          setSortField("name");
          setSortOrder("asc");
        }}
        className="w-full"
        style={{ backgroundColor: "#ff0066", borderColor: "#ff0066" }}
      >
        Reset Sorting
      </Button>
    </div>
  );

  // Mobile columns for the table
  const mobileColumns = [
    {
      title: () => (
        <div className="flex items-center">
          <input type="checkbox" className="mr-3" />
          <span>Streams</span>
        </div>
      ),
      dataIndex: "stream",
      key: "stream",
      render: (text, record) => (
        <div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-3"
              checked={selectedRowKeys.includes(record.key)}
              onChange={(e) => e.stopPropagation()}
            />
            <div className="mr-2">
              {record.status === "Online" ? (
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              ) : record.status === "Waiting" ? (
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              )}
            </div>
            <span className="text-blue-600 font-medium">{text}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1 ml-7">
            Always started (Static)
          </div>
          <div className="text-xs text-gray-500 ml-7">{record.input}</div>
        </div>
      ),
    },
  ];

  // Table columns configuration for normal view
  const normalColumns = [
    {
      title: () => (
        <div className="flex items-center">
          <input type="checkbox" className="mr-5" />
          <span>Stream</span>
        </div>
      ),
      dataIndex: "stream",
      key: "stream",
      render: (text, record) => (
        <div
          className="flex gap-3"
          onClick={(e) => {
            /* Row click logic if needed */
          }}
        >
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedRowKeys.includes(record.key)}
            onChange={(e) => {
              e.stopPropagation(); // Prevent row click when checkbox is clicked
              // Handle checkbox change logic here
            }}
          />
          <div className="flex flex-col">
            <span className="text-blue-700 font-medium">{text}</span>
            <div className="text-xs text-gray-500">Always started (Static)</div>
            <Tag
              color={
                record.status === "Online"
                  ? "green"
                  : record.status === "Waiting"
                  ? "orange"
                  : record.status === "Error"
                  ? "red"
                  : "default"
              }
              style={{ marginTop: "5px" }}
            >
              {record.status}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Input",
      dataIndex: "input",
      key: "input",
      render: (text, record) => (
        <div>
          <div className="flex items-center">
            <span>{text}</span>
            <InfoCircleOutlined className="ml-2 text-blue-500" />
          </div>
          <div className="mt-1">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>Uptime: {record.uptime}</span>
            </div>
            <div>Bitrate: {record.bitrate}</div>
          </div>
        </div>
      ),
      responsive: ["md"],
    },
    {
      title: "Transcode",
      dataIndex: "transcode",
      key: "transcode",
      responsive: ["md"],
    },
    {
      title: "DVR",
      dataIndex: "dvr",
      key: "dvr",
      responsive: ["md"],
    },
    {
      title: "Output",
      dataIndex: "output",
      key: "output",
      render: (output, record) => (
        <div>
          <div>
            <p>Clients watching: {output.clients}</p>
          </div>
          <div>
            <p>
              Push summary: {output.summary} {output.running}
            </p>
          </div>

          {expandedRows[record.key] ? (
            <>
              <div className="mt-2">
                <div>
                  Thumbnails: <span style={{ color: "#ff0000" }}>Off</span>
                </div>
                <div>
                  Authorization: <span style={{ color: "#ff0000" }}>Off</span>
                </div>
                <div>
                  Content is DRM-free{" "}
                  <span className="text-blue-600">Turn on DRM</span>.
                </div>
              </div>
              <div
                className="text-blue-700 font-semibold mt-1 text-xs cursor-pointer flex gap-1 items-center"
                onClick={(e) => toggleRowExpansion(record.key, e)}
              >
                Hide{" "}
                <span>
                  <FaChevronCircleDown className="text-xs" />
                </span>
              </div>
            </>
          ) : (
            <div
              className="text-blue-700 font-semibold mt-1 text-xs cursor-pointer flex gap-1 items-center"
              onClick={(e) => toggleRowExpansion(record.key, e)}
            >
              More{" "}
              <span>
                <FaChevronCircleUp className="text-xs" />
              </span>
            </div>
          )}
        </div>
      ),
      responsive: ["md"],
    },
    {
      title: "",
      key: "action",
      render: (_, record) => {
        const toggleId = `toggle-${record.key}`; // Create a unique ID
        return (
          <Space size="middle">
            <Button icon={<ReloadOutlined />} shape="circle" />
            <Button icon={<PlayCircleOutlined />} shape="circle" />
            <div className="w-12 h-6 rounded-full flex items-center p-1 ml-2">
              <label
                htmlFor={toggleId} // Use the unique ID here
                className="flex items-center cursor-pointer"
              >
                <div className="relative">
                  <input id={toggleId} type="checkbox" className="sr-only" />{" "}
                  {/* Use the unique ID here */}
                  <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                  <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                </div>
              </label>
            </div>
          </Space>
        );
      },
      responsive: ["md"],
    },
  ];

  // Table columns configuration for compact view
  const compactColumns = [
    {
      title: () => (
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>Stream</span>
        </div>
      ),
      dataIndex: "stream",
      key: "stream",
      render: (text, record) => (
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedRowKeys.includes(record.key)}
            onChange={(e) => e.stopPropagation()}
          />
          <div className="mr-2">
            {record.status === "Online" ? (
              <CheckCircleOutlined style={{ color: "#52c41a" }} />
            ) : record.status === "Waiting" ? (
              <ClockCircleOutlined style={{ color: "#faad14" }} />
            ) : record.status === "Error" ? (
              <CloseCircleOutlined style={{ color: "#f5222d" }} />
            ) : (
              <ExclamationCircleOutlined style={{ color: "#d9d9d9" }} />
            )}
          </div>
          <span className="text-blue-600 font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: "Input",
      dataIndex: "input",
      key: "input",
      render: (text, record) => (
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span>{text}</span>
          <InfoCircleOutlined className="ml-2 text-blue-500" />
          <span className="ml-2 text-gray-500">{record.uptime}</span>
          <span className="ml-2 text-gray-500">{record.bitrate}</span>
        </div>
      ),
      responsive: ["md"],
    },
    {
      title: "Transcode",
      dataIndex: "transcode",
      key: "transcode",
      responsive: ["md"],
    },
    {
      title: "DVR",
      dataIndex: "dvr",
      key: "dvr",
      responsive: ["md"],
    },
    {
      title: "Output",
      dataIndex: "output",
      key: "output",
      render: (output, record) => {
        const toggleId = `compact-toggle-${record.key}`; // Unique ID for compact view
        return (
          <div>
            <div className="flex items-center">
              <span className="mr-4">
                <span className="bg-gray-200 rounded-full px-2 py-1 text-xs">
                  {output.clients}
                </span>
              </span>
              <span className="mr-4">{output.running}</span>
              <div className="w-12 h-6 rounded-full flex items-center p-1 ml-2">
                <label
                  htmlFor={toggleId} // Use the unique ID
                  className="flex items-center cursor-pointer"
                >
                  <div className="relative">
                    <input id={toggleId} type="checkbox" className="sr-only" />{" "}
                    {/* Use the unique ID */}
                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                  </div>
                </label>
              </div>
              <Button
                icon={<ReloadOutlined />}
                shape="circle"
                className="ml-2"
              />
              <Button
                icon={<PlayCircleOutlined />}
                shape="circle"
                className="ml-2"
              />
              <Button
                icon={
                  expandedRows[record.key] ? <UpOutlined /> : <DownOutlined />
                }
                shape="circle"
                className="ml-2"
                onClick={(e) => toggleRowExpansion(record.key, e)}
              />
            </div>

            {expandedRows[record.key] && (
              <div className="mt-2 pl-8">
                <div>
                  Thumbnails: <span style={{ color: "#ff0000" }}>Off</span>
                </div>
                <div>
                  Authorization: <span style={{ color: "#ff0000" }}>Off</span>
                </div>
                <div>
                  Content is DRM-free{" "}
                  <span className="text-blue-600">Turn on DRM</span>.
                </div>
              </div>
            )}
          </div>
        );
      },
      responsive: ["md"],
    },
  ];

  const paginationOptions = ["10", "25", "50", "100"];

  const items = [
    {
      key: "1",
      label: <Link to="/">Streams</Link>,
    },
    {
      key: "2",
      label: <Link to="/media/templates">Templates</Link>,
    },
    {
      key: "3",
      label: <Link to="/media/multiplexers">Multiplexers</Link>,
    },
    {
      key: "4",
      label: <Link to="/media/sources">Sources</Link>,
    },
    {
      key: "5",
      label: <Link to="/media/vods">VODs</Link>,
    },
    {
      key: "6",
      label: <Link to="/media/dvbcards">DVB cards</Link>,
    },
  ];

  return (
    <AppLayout>
      <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
        <Layout>
          <Content
            style={{ padding: isMobile ? "0" : "0", backgroundColor: "white" }}
          >
            <div
              style={{
                padding: 0,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {/* Mobile Title */}
              <div className="md:hidden px-4 py-2">
                <h1 className="text-xl font-semibold">Streams</h1>
              </div>

              {/* Tabs */}
              {/* <div className={`scrollHide w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${isMobile ? "px-2" : ""}`}>
              <Link to="/media/create">  
              <button
                className={`cursor-pointer text-xl font-bold px-3 py-1 mr-5 bg-[#08027d] hover:bg-blue-700 text-white rounded-md ${isMobile ? "mt-1" : ""}`}
              >
                <IoAddCircleOutline />
              </button>
              </Link>
              <Tabs defaultActiveKey="1" className="mb-0" size={isMobile ? "small" : "middle"}>
                <TabPane tab={<Link to="/">Streams</Link>} key="1" />
                <TabPane tab={<Link to="/media/templates">Templates</Link>} key="2" />
                <TabPane tab={<Link to="/media/multiplexers">Multiplexers</Link>} key="3" />
                <TabPane tab={<Link to="/media/sources">Sources</Link>} key="4" />
                <TabPane tab={<Link to="/media/vods">VODs</Link>} key="5" />
                <TabPane tab={<Link to="/media/dvbcards">DVB cards</Link>} key="6" />
              </Tabs>
            </div> */}
              <div
                className={`scrollHide w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
                  isMobile ? "px-2" : ""
                }`}
              >
                <Link to="/media/create">
                  <button
                    className={`cursor-pointer text-xl font-bold px-3 py-1 mr-5 bg-[#08027d] hover:bg-blue-700 text-white rounded-md ${
                      isMobile ? "mt-1" : ""
                    }`}
                  >
                    <IoAddCircleOutline />
                  </button>
                </Link>
                <Tabs
                  defaultActiveKey="1"
                  className="mb-0"
                  size={isMobile ? "small" : "middle"}
                  items={items}
                />
              </div>

              {/* Search and other features options */}
              <div
                className={`flex flex-col md:flex-row md:justify-between my-4 ${
                  isMobile ? "px-4" : ""
                }`}
              >
                <div className="relative w-full md:max-w-lg mb-3 md:mb-0">
                  <SearchOutlined className="absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Text filter"
                    className="pl-10 h-10 rounded-md"
                  />
                </div>
                <div className="flex space-x-2 mt-2 md:mt-0 overflow-x-auto pb-2 md:pb-0">
                  <Button
                    icon={<MenuOutlined />}
                    style={
                      !compactView
                        ? { backgroundColor: "#08027d", color: "white" }
                        : ""
                    }
                    onClick={() => setCompactView(false)}
                  />
                  <Button
                    icon={<LiaCompressArrowsAltSolid />}
                    style={
                      compactView
                        ? { backgroundColor: "#08027d", color: "white" }
                        : ""
                    }
                    onClick={() => setCompactView(true)}
                  />
                  <Button
                    icon={<AppstoreOutlined />}
                    // style={viewMode === "grid" ?{backgroundColor: "#08027d", color: "white"}: ""}
                    onClick={() => setViewMode("grid")}
                  />
                  {isMobile ? (
                    <Button
                      className="flex items-center whitespace-nowrap"
                      onClick={() => setSortDrawerVisible(true)}
                    >
                      <span className="mr-1">Sort By:</span> <DownOutlined />
                    </Button>
                  ) : (
                    <Dropdown
                      menu={sortMenu}
                      trigger={["click"]}
                      placement="bottomRight"
                    >
                      <Button className="flex items-center whitespace-nowrap">
                        <span className="mr-1">Sort By:</span> <DownOutlined />
                      </Button>
                    </Dropdown>
                  )}
                  <Button
                    icon={<FilterOutlined />}
                    onClick={() => setFilterDrawerVisible(true)}
                    className={
                      statusFilters.length > 0 ||
                      featureFilters.length > 0 ||
                      namedByFilters.length > 0
                        ? "bg-blue-50"
                        : ""
                    }
                  >
                    {!isMobile && "Filter"}
                  </Button>
                </div>
              </div>

              {/* Filter tags if filters are applied */}
              {(statusFilters.length > 0 ||
                featureFilters.length > 0 ||
                namedByFilters.length > 0) && (
                <div className={`mb-4 ${isMobile ? "px-4" : ""}`}>
                  <div className="text-sm font-medium mb-2">
                    Active filters:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {statusFilters.map((filter) => (
                      <Tag
                        key={filter}
                        closable
                        onClose={() =>
                          setStatusFilters(
                            statusFilters.filter((f) => f !== filter)
                          )
                        }
                        color={
                          filter === "Online"
                            ? "green"
                            : filter === "Waiting"
                            ? "orange"
                            : filter === "Error"
                            ? "red"
                            : "default"
                        }
                      >
                        Status: {filter}
                      </Tag>
                    ))}
                    {featureFilters.map((filter) => (
                      <Tag
                        key={filter}
                        closable
                        onClose={() =>
                          setFeatureFilters(
                            featureFilters.filter((f) => f !== filter)
                          )
                        }
                      >
                        {filter}
                      </Tag>
                    ))}
                    {namedByFilters.map((filter) => (
                      <Tag
                        key={filter}
                        closable
                        onClose={() =>
                          setNamedByFilters(
                            namedByFilters.filter((f) => f !== filter)
                          )
                        }
                      >
                        Named by: {filter}
                      </Tag>
                    ))}
                    <Button
                      type="link"
                      onClick={() => {
                        setStatusFilters([]);
                        setFeatureFilters([]);
                        setNamedByFilters([]);
                      }}
                    >
                      Clear all
                    </Button>
                  </div>
                </div>
              )}

              {/* Table */}
              <div
                className="table-container"
                style={{
                  flex: 1,
                  overflow: "auto",
                  height: "calc(100vh - 300px)",
                  maxHeight: "calc(100vh - 300px)",
                }}
              >
                <Table
                  columns={
                    isMobile
                      ? mobileColumns
                      : compactView
                      ? compactColumns
                      : normalColumns
                  }
                  dataSource={sortedData}
                  pagination={false}
                  className={`${
                    isMobile ? "" : "border border-gray-300 rounded-lg"
                  }`}
                  size={compactView || isMobile ? "small" : "middle"}
                  rowClassName={(record) =>
                    selectedRowKeys.includes(record.key) ? "bg-blue-50" : ""
                  }
                  onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                    style: { cursor: "pointer" },
                  })}
                />
              </div>

              {/* Selection Footer */}
              {selectedRowKeys.length > 0 && (
                <div className="bg-gray-100 p-4 flex justify-between items-center">
                  <div>
                    <span className="font-medium">Selected:</span>{" "}
                    {selectedRowKeys.length} stream
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setSelectedRowKeys([])}>
                      Cancel
                    </Button>
                    <Link to={`/media/${selectedRowKeys}`}>
                      <button className="px-3 py-1 cursor-pointer rounded-md transition-all border border-[#08027d] bg-[#08027d] text-white hover:bg-white hover:text-[#08027d]">
                        Edit Selected
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Pagination bottom */}
              <div
                className={`flex flex-col md:flex-row md:justify-between items-start md:items-center mt-6 ${
                  isMobile ? "px-4" : ""
                }`}
              >
                <div className="flex items-center mb-3 md:mb-0">
                  <span className="mr-2">Per page</span>
                  <Select
                    value={itemsPerPage}
                    onChange={setItemsPerPage}
                    className="w-24"
                    // dropdownMatchSelectWidth={false}
                    popupMatchSelectWidth={false}
                  >
                    {paginationOptions.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className="flex items-center">
                  <span className="mx-4">
                    1-{sortedData.length} of {sortedData.length}
                  </span>
                  <Button icon={<LeftOutlined />} disabled />
                  <Button icon={<RightOutlined />} disabled />
                </div>
              </div>

              {/* Sort Drawer */}
              <Drawer
                title="Sort Options"
                placement={isMobile ? "bottom" : "right"}
                onClose={() => setSortDrawerVisible(false)}
                open={sortDrawerVisible}
                width={isMobile ? "100%" : 320}
                height={isMobile ? 500 : "auto"}
              >
                <div className="p-4">
                  <div className="font-medium mb-2">Stream name</div>
                  <div>
                    <div className="flex items-center mb-2">
                      <Radio
                        checked={sortField === "name" && sortOrder === "asc"}
                        onChange={() => {
                          setSortField("name");
                          setSortOrder("asc");
                        }}
                        className="mr-2"
                      />
                      <span>sort A-Z</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <Radio
                        checked={sortField === "name" && sortOrder === "desc"}
                        onChange={() => {
                          setSortField("name");
                          setSortOrder("desc");
                        }}
                        className="mr-2"
                      />
                      <span>sort Z-A</span>
                    </div>
                  </div>

                  <div className="border-t pt-4"></div>
                  <div className="font-medium mb-2">Input bitrate</div>
                  <div>
                    <div className="flex items-center mb-2">
                      <Radio
                        checked={sortField === "bitrate" && sortOrder === "asc"}
                        onChange={() => {
                          setSortField("bitrate");
                          setSortOrder("asc");
                        }}
                        className="mr-2"
                      />
                      <span>sort asc</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <Radio
                        checked={
                          sortField === "bitrate" && sortOrder === "desc"
                        }
                        onChange={() => {
                          setSortField("bitrate");
                          setSortOrder("desc");
                        }}
                        className="mr-2"
                      />
                      <span>sort desc</span>
                    </div>
                  </div>

                  <div className="border-t pt-4"></div>
                  <div className="font-medium mb-2">Number of clients</div>
                  <div>
                    <div className="flex items-center mb-2">
                      <Radio
                        checked={sortField === "clients" && sortOrder === "asc"}
                        onChange={() => {
                          setSortField("clients");
                          setSortOrder("asc");
                        }}
                        className="mr-2"
                      />
                      <span>sort asc</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <Radio
                        checked={
                          sortField === "clients" && sortOrder === "desc"
                        }
                        onChange={() => {
                          setSortField("clients");
                          setSortOrder("desc");
                        }}
                        className="mr-2"
                      />
                      <span>sort desc</span>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={() => {
                        setSortField("name");
                        setSortOrder("asc");
                        setSortDrawerVisible(false);
                      }}
                      className="mr-2"
                    >
                      Reset
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setSortDrawerVisible(false)}
                      className="bg-blue-600"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </Drawer>

              {/* Filter Drawer */}
              <Drawer
                title="Filter Options"
                placement={isMobile ? "bottom" : "right"}
                onClose={() => setFilterDrawerVisible(false)}
                open={filterDrawerVisible}
                width={isMobile ? "100%" : 320}
                height={isMobile ? 500 : "auto"}
              >
                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3">
                    Filter by status:
                  </h3>
                  <div className="flex flex-col gap-2">
                    <div
                      className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                        statusFilters.includes("Online") ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        if (statusFilters.includes("Online")) {
                          setStatusFilters(
                            statusFilters.filter((f) => f !== "Online")
                          );
                        } else {
                          setStatusFilters([...statusFilters, "Online"]);
                        }
                      }}
                    >
                      <CheckCircleOutlined
                        style={{ color: "#52c41a" }}
                        className="mr-2"
                      />
                      <span>Online ({statusCounts.Online})</span>
                    </div>
                    <div
                      className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                        statusFilters.includes("Waiting") ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        if (statusFilters.includes("Waiting")) {
                          setStatusFilters(
                            statusFilters.filter((f) => f !== "Waiting")
                          );
                        } else {
                          setStatusFilters([...statusFilters, "Waiting"]);
                        }
                      }}
                    >
                      <ClockCircleOutlined
                        style={{ color: "#faad14" }}
                        className="mr-2"
                      />
                      <span>Waiting ({statusCounts.Waiting})</span>
                    </div>
                    <div
                      className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                        statusFilters.includes("Disabled") ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        if (statusFilters.includes("Disabled")) {
                          setStatusFilters(
                            statusFilters.filter((f) => f !== "Disabled")
                          );
                        } else {
                          setStatusFilters([...statusFilters, "Disabled"]);
                        }
                      }}
                    >
                      <CloseCircleOutlined
                        style={{ color: "#d9d9d9" }}
                        className="mr-2"
                      />
                      <span>Disabled ({statusCounts.Disabled})</span>
                    </div>
                    <div
                      className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                        statusFilters.includes("Error") ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        if (statusFilters.includes("Error")) {
                          setStatusFilters(
                            statusFilters.filter((f) => f !== "Error")
                          );
                        } else {
                          setStatusFilters([...statusFilters, "Error"]);
                        }
                      }}
                    >
                      <ExclamationCircleOutlined
                        style={{ color: "#f5222d" }}
                        className="mr-2"
                      />
                      <span>Error ({statusCounts.Error})</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3">
                    Filter by feature:
                  </h3>
                  <div className="flex flex-col gap-2">
                    <div
                      className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                        featureFilters.includes("With DVR") ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        if (featureFilters.includes("With DVR")) {
                          setFeatureFilters(
                            featureFilters.filter((f) => f !== "With DVR")
                          );
                        } else {
                          setFeatureFilters([...featureFilters, "With DVR"]);
                        }
                      }}
                    >
                      <span>With DVR ({featureCounts["With DVR"]})</span>
                    </div>
                    <div
                      className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                        featureFilters.includes("With Transcoder")
                          ? "bg-blue-50"
                          : ""
                      }`}
                      onClick={() => {
                        if (featureFilters.includes("With Transcoder")) {
                          setFeatureFilters(
                            featureFilters.filter(
                              (f) => f !== "With Transcoder"
                            )
                          );
                        } else {
                          setFeatureFilters([
                            ...featureFilters,
                            "With Transcoder",
                          ]);
                        }
                      }}
                    >
                      <span>
                        With Transcoder ({featureCounts["With Transcoder"]})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3">Named by:</h3>
                  <div className="flex flex-col gap-2">
                    <div
                      className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                        namedByFilters.includes("Config") ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        if (namedByFilters.includes("Config")) {
                          setNamedByFilters(
                            namedByFilters.filter((f) => f !== "Config")
                          );
                        } else {
                          setNamedByFilters([...namedByFilters, "Config"]);
                        }
                      }}
                    >
                      <span>Config ({namedByCounts.Config})</span>
                    </div>
                    <div
                      className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                        namedByFilters.includes("User") ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        if (namedByFilters.includes("User")) {
                          setNamedByFilters(
                            namedByFilters.filter((f) => f !== "User")
                          );
                        } else {
                          setNamedByFilters([...namedByFilters, "User"]);
                        }
                      }}
                    >
                      <span>User ({namedByCounts.User})</span>
                    </div>
                    <div
                      className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                        namedByFilters.includes("Remote") ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        if (namedByFilters.includes("Remote")) {
                          setNamedByFilters(
                            namedByFilters.filter((f) => f !== "Remote")
                          );
                        } else {
                          setNamedByFilters([...namedByFilters, "Remote"]);
                        }
                      }}
                    >
                      <span>Remote ({namedByCounts.Remote})</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button
                    onClick={() => {
                      setStatusFilters([]);
                      setFeatureFilters([]);
                      setNamedByFilters([]);
                    }}
                    className="mr-2"
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => setFilterDrawerVisible(false)}
                    className="bg-blue-600"
                  >
                    Apply
                  </Button>
                </div>
              </Drawer>
            </div>
          </Content>
        </Layout>
      </Layout>
    </AppLayout>
  );
}

export default Media;
