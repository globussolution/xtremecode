// import React, { useState } from "react";
// import { Layout, Menu, theme, Tabs, Input, Button, Table, Tag, Space, Select } from "antd";
// import { FaPlay } from "react-icons/fa";
// import { BsFillBarChartFill } from "react-icons/bs";
// import { IoSettingsSharp } from "react-icons/io5";
// import { SiBlockchaindotcom } from "react-icons/si";
// import { RiTv2Fill } from "react-icons/ri";
// import { PiSecurityCameraFill } from "react-icons/pi";
// import { FaHeadset } from "react-icons/fa";
// import { BiLogOut } from "react-icons/bi";
// import {
//   SearchOutlined,
//   FilterOutlined,
//   ReloadOutlined,
//   AppstoreOutlined,
//   BarsOutlined,
//   DownOutlined,
//   InfoCircleOutlined,
// } from "@ant-design/icons";
// import fullLogo from "../assets/images/fulllogo.png";
// import smallLogo from "../assets/images/smalllogo.png";

// const { Header, Content, Sider } = Layout;
// const { TabPane } = Tabs;

// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }

// const items = [
//   getItem("Media", "1", <FaPlay />),
//   getItem("Pulse", "2", <BsFillBarChartFill />),
//   getItem("Config", "3", <IoSettingsSharp />),
//   getItem("Cluster", "4", <SiBlockchaindotcom />),
//   getItem("IPTV", "5", <RiTv2Fill />),
//   getItem("IP Cameras", "6", <PiSecurityCameraFill />),
//   getItem("Support", "7", <FaHeadset />),
//   getItem("Logout", "8", <BiLogOut />),
// ];

// // Custom icons for the table
// function LeftOutlined() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polyline points="15 18 9 12 15 6"></polyline>
//     </svg>
//   );
// }

// function RightOutlined() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polyline points="9 18 15 12 9 6"></polyline>
//     </svg>
//   );
// }

// function PlayCircleOutlined() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="10"></circle>
//       <polygon points="10 8 16 12 10 16 10 8"></polygon>
//     </svg>
//   );
// }

// function Admin() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [viewMode, setViewMode] = useState("table");
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   // Stream data for the table
//   const streamData = [
//     {
//       key: "1",
//       stream: "HBO_Max",
//       status: "Online",
//       input: "fake://fake",
//       transcode: "Transcoder disabled",
//       dvr: "Archive disabled",
//       output: {
//         clients: 1,
//         summary: "running",
//         running: 0,
//       },
//       uptime: "15d 5h",
//       bitrate: "178kbit/s",
//     },
//     {
//       key: "2",
//       stream: "HBO_Max",
//       status: "Online",
//       input: "fake://fake",
//       transcode: "Transcoder disabled",
//       dvr: "Archive disabled",
//       output: {
//         clients: 1,
//         summary: "running",
//         running: 0,
//       },
//       uptime: "15d 5h",
//       bitrate: "178kbit/s",
//     },
//   ];

//   // Table columns configuration
//   const columns = [
//     {
//       title: () => (
//         <div className="flex items-center">
//           <input type="checkbox" className="mr-2" />
//           <span>Stream</span>
//         </div>
//       ),
//       dataIndex: "stream",
//       key: "stream",
//       render: (text, record) => (
//         <div>
//           <div className="flex items-center">
//             <input type="checkbox" className="mr-2" />
//             <span className="text-blue-600 font-medium">{text}</span>
//           </div>
//           <div className="text-xs text-gray-500">Always started (Static)</div>
//           <Tag color="green" className="mt-1">
//             Online
//           </Tag>
//         </div>
//       ),
//     },
//     {
//       title: "Input",
//       dataIndex: "input",
//       key: "input",
//       render: (text, record) => (
//         <div>
//           <div className="flex items-center">
//             <span>{text}</span>
//             <InfoCircleOutlined className="ml-2 text-blue-500" />
//           </div>
//           <div className="mt-1">
//             <div className="flex items-center">
//               <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
//               <span>Uptime: {record.uptime}</span>
//             </div>
//             <div>Bitrate: {record.bitrate}</div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Transcode",
//       dataIndex: "transcode",
//       key: "transcode",
//     },
//     {
//       title: "DVR",
//       dataIndex: "dvr",
//       key: "dvr",
//     },
//     {
//       title: "Output",
//       dataIndex: "output",
//       key: "output",
//       render: (output) => (
//         <div>
//           <div>Clients watching: {output.clients}</div>
//           <div>
//             Push summary: {output.summary} {output.running}
//           </div>
//           <Button type="link" className="p-0 text-blue-600">
//             More
//           </Button>
//         </div>
//       ),
//     },
//     {
//       title: "",
//       key: "action",
//       render: () => (
//         <Space size="middle">
//           <Button icon={<ReloadOutlined />} shape="circle" />
//           <Button icon={<PlayCircleOutlined />} shape="circle" />
//           <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center p-1">
//             <div className="w-4 h-4 rounded-full bg-blue-600 ml-auto"></div>
//           </div>
//         </Space>
//       ),
//     },
//   ];

//   const paginationOptions = ["100", "200", "500"];

//   return (
//     <Layout style={{ minHeight: "100vh", backgroundColor: 'white' }}>
//       <Sider
//       style={{backgroundColor: "#05045E"}}
//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//       >
//         <div className="pt-4 pb-3 px-5">
//           <img
//             className={`transition-all duration-300 ${collapsed ? "w-[40px]" : "w-[140px]"}`}
//             src={
//               collapsed
//                 ? smallLogo
//                 : fullLogo 
//             }
//             alt="Logo"
//           />
//         </div>
//         <Menu
//           className="border-t border-gray-500 font-semibold"
//           style={{ paddingTop: "15%", marginTop: "3%", backgroundColor: "#05045E" }}
//           theme="dark"
//           defaultSelectedKeys={["1"]}
//           mode="inline"
//           items={items}
//         />
//       </Sider>
//       <Layout style={{ margin: "0 20px" }}>
//         <Content style={{ paddingTop: "15px", marginBottom: "0%", backgroundColor: 'white' }}>
//           <div
//             style={{
//               padding: 0,
//               minHeight: 360,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             {/* Streams Content */}
//             <div className="flex justify-between items-center mb-6">
//               <h1 className="text-2xl font-semibold">Streams</h1>
//               <div className="flex space-x-3 border border-gray-300 rounded-full">
//                 <div className="px-3 font-medium py-1 border-gray-400">23.09</div>
//                 <div className="px-3 font-medium py-1 border-l border-gray-300">STREAMS: <span className="text-blue-700">1 / 1</span></div>
//                 <div className="px-3 font-medium py-1 border-l border-gray-300">FILES: <span className="text-blue-700">0</span></div>
//                 <div className="px-3 font-medium py-1 border-l border-gray-300">CLIENTS: <span className="text-blue-700">1</span></div>
//                 <div className="px-3 font-medium py-1 border-l border-gray-300">IN: <span className="text-blue-700">0.267 MBPS</span></div>
//                 <div className="px-3 font-medium py-1 border-l border-gray-300">OUT: <span className="text-blue-700">0.278 MBPS</span></div>
//                 <div className="px-3 font-medium py-1 border-l border-gray-300">UP: <span className="text-blue-700">15D 05:48:01</span></div>
//               </div>
//             </div>

//             {/* Tabs */}
//             <Tabs defaultActiveKey="1" className="mb-6">
//               <TabPane tab="Streams" key="1" />
//               <TabPane tab="Templates" key="2" />
//               <TabPane tab="Multiplexers" key="3" />
//               <TabPane tab="Sources" key="4" />
//               <TabPane tab="VODs" key="5" />
//               <TabPane tab="DVB cards" key="6" />
//             </Tabs>

//             {/* Search options */}
//             <div className="flex justify-between mb-4">
//               <div className="relative w-full max-w-lg">
//                 <SearchOutlined className="absolute left-3 top-3 text-gray-400" />
//                 <Input placeholder="Text filter" className="pl-10 h-10 rounded-md" />
//               </div>
//               <div className="flex space-x-2">
//                 <Button
//                   icon={<BarsOutlined />}
//                   className={viewMode === "table" ? "bg-blue-50" : ""}
//                   onClick={() => setViewMode("table")}
//                 />
//                 <Button
//                   icon={<AppstoreOutlined />}
//                   className={viewMode === "grid" ? "bg-blue-50" : ""}
//                   onClick={() => setViewMode("grid")}
//                 />
//                 <Select defaultValue="Sort By:" className="w-40" suffixIcon={<DownOutlined />}>
//                   <Select.Option value="name">Name</Select.Option>
//                   <Select.Option value="date">Date</Select.Option>
//                   <Select.Option value="status">Status</Select.Option>
//                 </Select>
//                 <Button icon={<FilterOutlined />}>Filter</Button>
//               </div>
//             </div>

//             {/* Table */}
//             <Table columns={columns} dataSource={streamData} pagination={false} className="border rounded-md" />

//             {/* lower pagination */}
//             <div className="flex justify-between items-center mt-4">
//               <div className="flex items-center">
//                 <span className="mr-2">Per page</span>
//                 <Select defaultValue="100" className="w-24">
//                   {paginationOptions.map((option) => (
//                     <Select.Option key={option} value={option}>
//                       {option}
//                     </Select.Option>
//                   ))}
//                 </Select>
//                 <span className="mx-4">1-1 of 1</span>
//                 <Button icon={<LeftOutlined />} disabled />
//                 <Button icon={<RightOutlined />} disabled />
//               </div>
//             </div>

//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }

// export default Admin;



import React, { useState } from "react";
import { Layout, Menu, theme, Tabs, Input, Button, Table, Tag, Space, Select, Dropdown, Radio, Popover, Drawer } from "antd";
import { FaPlay } from "react-icons/fa";
import { BsFillBarChartFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { SiBlockchaindotcom } from "react-icons/si";
import { RiTv2Fill } from "react-icons/ri";
import { PiSecurityCameraFill } from "react-icons/pi";
import { FaHeadset } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  AppstoreOutlined,
  DownOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import fullLogo from "../assets/images/fulllogo.png";
import smallLogo from "../assets/images/smalllogo.png";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// sidebar items
const items = [
  getItem("Media", "1", <FaPlay />),
  getItem("Pulse", "2", <BsFillBarChartFill />),
  getItem("Config", "3", <IoSettingsSharp />),
  getItem("Cluster", "4", <SiBlockchaindotcom />),
  getItem("IPTV", "5", <RiTv2Fill />),
  getItem("IP Cameras", "6", <PiSecurityCameraFill />),
  getItem("Support", "7", <FaHeadset />),
  getItem("Logout", "8", <BiLogOut />),
];

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

function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [compactView, setCompactView] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [statusFilters, setStatusFilters] = useState([]);
  const [featureFilters, setFeatureFilters] = useState([]);
  const [namedByFilters, setNamedByFilters] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
  const filteredData = streamData.filter(item => {
    // Status filter
    if (statusFilters.length > 0 && !statusFilters.includes(item.status)) {
      return false;
    }
    
    // Feature filter
    if (featureFilters.includes("With DVR") && item.dvr !== "enabled") {
      return false;
    }
    if (featureFilters.includes("With Transcoder") && item.transcode !== "enabled") {
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
      const aBitrate = parseInt(a.bitrate.replace(/[^\d]/g, '')) || 0;
      const bBitrate = parseInt(b.bitrate.replace(/[^\d]/g, '')) || 0;
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
    Online: streamData.filter(item => item.status === "Online").length,
    Waiting: streamData.filter(item => item.status === "Waiting").length,
    Disabled: streamData.filter(item => item.status === "Disabled").length,
    Error: streamData.filter(item => item.status === "Error").length,
  };

  // Feature counts for filters
  const featureCounts = {
    "With DVR": streamData.filter(item => item.dvr === "enabled").length,
    "With Transcoder": streamData.filter(item => item.transcode === "enabled").length,
  };

  // Named by counts for filters
  const namedByCounts = {
    Config: streamData.filter(item => item.namedBy === "Config").length,
    User: streamData.filter(item => item.namedBy === "User").length,
    Remote: streamData.filter(item => item.namedBy === "Remote").length,
  };

  // Sorting menu content
  const sortMenu = (
    <div className="p-4 w-64 bg-white">
      <div className="font-medium mb-2">Stream name</div>
      <Radio.Group 
        onChange={(e) => {
          setSortField("name");
          setSortOrder(e.target.value);
        }} 
        value={sortField === "name" ? sortOrder : undefined}
      >
        <div className="flex items-center mb-2 text-amber-200">
          <Radio value="asc" className="mr-2" />
          <span>sort A-Z</span>
        </div>
        <div className="flex items-center mb-4">
          <Radio value="desc" className="mr-2" />
          <span>sort Z-A</span>
        </div>
      </Radio.Group>

      <div className="font-medium mb-2 border-t pt-4">Input bitrate</div>
      <Radio.Group 
        onChange={(e) => {
          setSortField("bitrate");
          setSortOrder(e.target.value);
        }} 
        value={sortField === "bitrate" ? sortOrder : undefined}
      >
        <div className="flex items-center mb-2">
          <Radio value="asc" className="mr-2" />
          <span>sort asc</span>
        </div>
        <div className="flex items-center mb-4">
          <Radio value="desc" className="mr-2" />
          <span>sort desc</span>
        </div>
      </Radio.Group>

      <div className="font-medium mb-2 border-t pt-4">Number of clients</div>
      <Radio.Group 
        onChange={(e) => {
          setSortField("clients");
          setSortOrder(e.target.value);
        }} 
        value={sortField === "clients" ? sortOrder : undefined}
      >
        <div className="flex items-center mb-2">
          <Radio value="asc" className="mr-2" />
          <span>sort asc</span>
        </div>
        <div className="flex items-center">
          <Radio value="desc" className="mr-2" />
          <span>sort desc</span>
        </div>
      </Radio.Group>
    </div>
  );

  // Table columns configuration for normal view
  const normalColumns = [
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
        <div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-blue-600 font-medium">{text}</span>
          </div>
          <div className="text-xs text-gray-500">Always started (Static)</div>
          <Tag color={
            record.status === "Online" ? "green" : 
            record.status === "Waiting" ? "orange" : 
            record.status === "Error" ? "red" : "default"
          } className="mt-1">
            {record.status}
          </Tag>
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
    },
    {
      title: "Transcode",
      dataIndex: "transcode",
      key: "transcode",
    },
    {
      title: "DVR",
      dataIndex: "dvr",
      key: "dvr",
    },
    {
      title: "Output",
      dataIndex: "output",
      key: "output",
      render: (output) => (
        <div>
          <div>Clients watching: {output.clients}</div>
          <div>
            Push summary: {output.summary} {output.running}
          </div>
          <Button type="link" className="text-blue-600">
            More
          </Button>
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button icon={<ReloadOutlined />} shape="circle" />
          <Button icon={<PlayCircleOutlined />} shape="circle" />
          <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center p-1">
            <div className="w-4 h-4 rounded-full bg-blue-600 ml-auto"></div>
          </div>
        </Space>
      ),
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
          <input type="checkbox" className="mr-2" />
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
    },
    {
      title: "Transcode",
      dataIndex: "transcode",
      key: "transcode",
    },
    {
      title: "DVR",
      dataIndex: "dvr",
      key: "dvr",
    },
    {
      title: "Output",
      dataIndex: "output",
      key: "output",
      render: (output) => (
        <div className="flex items-center">
          <span className="mr-4">
            <span className="bg-gray-200 rounded-full px-2 py-1 text-xs">
              {output.clients}
            </span>
          </span>
          <span className="mr-4">{output.running}</span>
          <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center p-1">
            <div className="w-4 h-4 rounded-full bg-blue-600 ml-auto"></div>
          </div>
          <Button icon={<ReloadOutlined />} shape="circle" className="ml-2" />
          <Button icon={<PlayCircleOutlined />} shape="circle" className="ml-2" />
          <Button icon={<DownOutlined />} shape="circle" className="ml-2" />
        </div>
      ),
    },
  ];

  const paginationOptions = ["10", "25", "50", "100"];

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: 'white' }}>
      <Sider
        style={{backgroundColor: "#05045E"}}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="pt-4 pb-3 px-5">
          <img
            className={`transition-all duration-300 ${collapsed ? "w-[40px]" : "w-[140px]"}`}
            src={collapsed ? smallLogo : fullLogo}
            alt="Logo"
          />
        </div>
        <Menu
          className="border-t border-gray-500 font-semibold"
          style={{ paddingTop: "15%", marginTop: "3%", backgroundColor: "#05045E" }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout style={{ margin: "0 20px" }}>
        <Content style={{ paddingTop: "15px", marginBottom: "0%", backgroundColor: 'white' }}>
          <div
            style={{
              padding: 0,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            
            {/* Streams Content */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Streams</h1>
              <div className="flex space-x-3 border border-gray-300 rounded-full">
                <div className="px-3 font-medium py-1 border-gray-400">23.09</div>
                <div className="px-3 font-medium py-1 border-l border-gray-300">STREAMS: <span className="text-blue-700">1 / 1</span></div>
                <div className="px-3 font-medium py-1 border-l border-gray-300">FILES: <span className="text-blue-700">0</span></div>
                <div className="px-3 font-medium py-1 border-l border-gray-300">CLIENTS: <span className="text-blue-700">1</span></div>
                <div className="px-3 font-medium py-1 border-l border-gray-300">IN: <span className="text-blue-700">0.267 MBPS</span></div>
                <div className="px-3 font-medium py-1 border-l border-gray-300">OUT: <span className="text-blue-700">0.278 MBPS</span></div>
                <div className="px-3 font-medium py-1 border-l border-gray-300">UP: <span className="text-blue-700">15D 05:48:01</span></div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <Tabs defaultActiveKey="1" className="mb-0">
                <TabPane tab="Streams" key="1" />
                <TabPane tab="Templates" key="2" />
                <TabPane tab="Multiplexers" key="3" />
                <TabPane tab="Sources" key="4" />
                <TabPane tab="VODs" key="5" />
                <TabPane tab="DVB cards" key="6" />
              </Tabs>
            </div>

            {/* Search and other features options */}
            <div className="flex justify-between my-4">
              <div className="relative w-full max-w-lg">
                <SearchOutlined className="absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Text filter" className="pl-10 h-10 rounded-md" />
              </div>
              <div className="flex space-x-2">
                <Button
                  icon={<MenuOutlined />}
                  className={!compactView ? "bg-blue-50" : ""}
                  onClick={() => setCompactView(false)}
                />
                <Button
                  icon={<LiaCompressArrowsAltSolid />}
                  className={compactView ? "bg-blue-50" : ""}
                  onClick={() => setCompactView(true)}
                />
                <Button
                  icon={<AppstoreOutlined />}
                  className={viewMode === "grid" ? "bg-blue-50" : ""}
                  onClick={() => setViewMode("grid")}
                />
                <Dropdown overlay={sortMenu} trigger={["click"]} placement="bottomRight">
                  <Button className="flex items-center">
                    <span className="mr-1">Sort By:</span> <DownOutlined />
                  </Button>
                </Dropdown>
                <Button 
                  icon={<FilterOutlined />} 
                  onClick={() => setFilterDrawerVisible(true)}
                  className={
                    statusFilters.length > 0 || featureFilters.length > 0 || namedByFilters.length > 0 
                      ? "bg-blue-50" 
                      : ""
                  }
                >
                  Filter
                </Button>
              </div>
            </div>

            {/* Filter tags if filters are applied */}
            {(statusFilters.length > 0 || featureFilters.length > 0 || namedByFilters.length > 0) && (
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Active filters:</div>
                <div className="flex flex-wrap gap-2">
                  {statusFilters.map(filter => (
                    <Tag 
                      key={filter} 
                      closable 
                      onClose={() => setStatusFilters(statusFilters.filter(f => f !== filter))}
                      color={
                        filter === "Online" ? "green" : 
                        filter === "Waiting" ? "orange" : 
                        filter === "Error" ? "red" : "default"
                      }
                    >
                      Status: {filter}
                    </Tag>
                  ))}
                  {featureFilters.map(filter => (
                    <Tag 
                      key={filter} 
                      closable 
                      onClose={() => setFeatureFilters(featureFilters.filter(f => f !== filter))}
                    >
                      {filter}
                    </Tag>
                  ))}
                  {namedByFilters.map(filter => (
                    <Tag 
                      key={filter} 
                      closable 
                      onClose={() => setNamedByFilters(namedByFilters.filter(f => f !== filter))}
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
            <Table 
              columns={compactView ? compactColumns : normalColumns} 
              dataSource={sortedData} 
              pagination={false} 
              className="border border-gray-300 rounded-lg"
              size={compactView ? "small" : "middle"}
              rowClassName={compactView ? "py-1" : ""}
            />

            {/* Pagination bottom */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <span className="mr-2">Per page</span>
                <Select 
                  value={itemsPerPage} 
                  onChange={setItemsPerPage} 
                  className="w-24"
                >
                  {paginationOptions.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
                <span className="mx-4">1-{sortedData.length} of {sortedData.length}</span>
                <Button icon={<LeftOutlined />} disabled />
                <Button icon={<RightOutlined />} disabled />
              </div>
            </div>

            {/* Filter Drawer */}
            <Drawer
              title="Filter Options"
              placement="right"
              onClose={() => setFilterDrawerVisible(false)}
              open={filterDrawerVisible}
              width={320}
            >
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Filter by status:</h3>
                <div className="flex flex-col gap-2">
                  <div 
                    className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${statusFilters.includes("Online") ? "bg-blue-50" : ""}`}
                    onClick={() => {
                      if (statusFilters.includes("Online")) {
                        setStatusFilters(statusFilters.filter(f => f !== "Online"));
                      } else {
                        setStatusFilters([...statusFilters, "Online"]);
                      }
                    }}
                  >
                    <CheckCircleOutlined style={{ color: "#52c41a" }} className="mr-2" />
                    <span>Online ({statusCounts.Online})</span>
                  </div>
                  <div 
                    className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${statusFilters.includes("Waiting") ? "bg-blue-50" : ""}`}
                    onClick={() => {
                      if (statusFilters.includes("Waiting")) {
                        setStatusFilters(statusFilters.filter(f => f !== "Waiting"));
                      } else {
                        setStatusFilters([...statusFilters, "Waiting"]);
                      }
                    }}
                  >
                    <ClockCircleOutlined style={{ color: "#faad14" }} className="mr-2" />
                    <span>Waiting ({statusCounts.Waiting})</span>
                  </div>
                  <div 
                    className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${statusFilters.includes("Disabled") ? "bg-blue-50" : ""}`}
                    onClick={() => {
                      if (statusFilters.includes("Disabled")) {
                        setStatusFilters(statusFilters.filter(f => f !== "Disabled"));
                      } else {
                        setStatusFilters([...statusFilters, "Disabled"]);
                      }
                    }}
                  >
                    <CloseCircleOutlined style={{ color: "#d9d9d9" }} className="mr-2" />
                    <span>Disabled ({statusCounts.Disabled})</span>
                  </div>
                  <div 
                    className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${statusFilters.includes("Error") ? "bg-blue-50" : ""}`}
                    onClick={() => {
                      if (statusFilters.includes("Error")) {
                        setStatusFilters(statusFilters.filter(f => f !== "Error"));
                      } else {
                        setStatusFilters([...statusFilters, "Error"]);
                      }
                    }}
                  >
                    <ExclamationCircleOutlined style={{ color: "#f5222d" }} className="mr-2" />
                    <span>Error ({statusCounts.Error})</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Filter by feature:</h3>
                <div className="flex flex-col gap-2">
                  <div 
                    className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${featureFilters.includes("With DVR") ? "bg-blue-50" : ""}`}
                    onClick={() => {
                      if (featureFilters.includes("With DVR")) {
                        setFeatureFilters(featureFilters.filter(f => f !== "With DVR"));
                      } else {
                        setFeatureFilters([...featureFilters, "With DVR"]);
                      }
                    }}
                  >
                    <span>With DVR ({featureCounts["With DVR"]})</span>
                  </div>
                  <div 
                    className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${featureFilters.includes("With Transcoder") ? "bg-blue-50" : ""}`}
                    onClick={() => {
                      if (featureFilters.includes("With Transcoder")) {
                        setFeatureFilters(featureFilters.filter(f => f !== "With Transcoder"));
                      } else {
                        setFeatureFilters([...featureFilters, "With Transcoder"]);
                      }
                    }}
                  >
                    <span>With Transcoder ({featureCounts["With Transcoder"]})</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Named by:</h3>
                <div className="flex flex-col gap-2">
                  <div 
                    className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${namedByFilters.includes("Config") ? "bg-blue-50" : ""}`}
                    onClick={() => {
                      if (namedByFilters.includes("Config")) {
                        setNamedByFilters(namedByFilters.filter(f => f !== "Config"));
                      } else {
                        setNamedByFilters([...namedByFilters, "Config"]);
                      }
                    }}
                  >
                    <span>Config ({namedByCounts.Config})</span>
                  </div>
                  <div 
                    className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${namedByFilters.includes("User") ? "bg-blue-50" : ""}`}
                    onClick={() => {
                      if (namedByFilters.includes("User")) {
                        setNamedByFilters(namedByFilters.filter(f => f !== "User"));
                      } else {
                        setNamedByFilters([...namedByFilters, "User"]);
                      }
                    }}
                  >
                    <span>User ({namedByCounts.User})</span>
                  </div>
                  <div 
                    className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${namedByFilters.includes("Remote") ? "bg-blue-50" : ""}`}
                    onClick={() => {
                      if (namedByFilters.includes("Remote")) {
                        setNamedByFilters(namedByFilters.filter(f => f !== "Remote"));
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
  );
}

export default Admin;