import AppLayout from "../../../Admin Components/AppLayout";
import { useState, useEffect } from "react";
import { Tabs, Table, Button, Tag, Space } from "antd";
import { Link } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";
import { DeleteOutlined } from "@ant-design/icons";
import { FaChevronLeft } from "react-icons/fa";

const columns = [
  {
    title: "Protocol",
    dataIndex: "protocol",
    key: "protocol",
  },
  {
    title: "DVR",
    dataIndex: "dvr",
    key: "dvr",
    sorter: (a, b) => a.dvr.localeCompare(b.dvr),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Transmitted",
    dataIndex: "transmitted",
    key: "transmitted",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Token",
    dataIndex: "token",
    key: "token",
  },
  {
    title: "User id",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "User agent",
    dataIndex: "userAgent",
    key: "userAgent",
    responsive: ["lg"], // Custom prop for CSS media query
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Button
        icon={<DeleteOutlined />}
        danger
        size="small"
        onClick={() => console.log("Delete clicked for:", record.key)}
      />
    ),
  },
];

const data = [
  {
    key: "1",
    protocol: "hls",
    dvr: "DVR Value",
    address: "15.235.193.163",
    country: "US",
    transmitted: "6.5 GB",
    duration: "2d 7h",
    token: "token123",
    userId: "user456",
    userAgent: "Mozilla 5.0",
  },
  {
    key: "2",
    protocol: "dash",
    dvr: "Another DVR",
    address: "192.168.1.1",
    country: "CA",
    transmitted: "2.1 GB",
    duration: "1h 30m",
    token: "token456",
    userId: "user789",
    userAgent: "Chrome 90",
  },
  {
    key: "3",
    protocol: "hls",
    dvr: "DVR Value",
    address: "10.0.0.5",
    country: "UK",
    transmitted: "10.8 GB",
    duration: "5d",
    token: "token789",
    userId: "user123",
    userAgent: "Safari 14",
  },
];

function PlaySessions() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example: 768px is considered small
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Conditionally set the columns based on screen size
  const updatedColumns = columns.map((col) => {
    if (col.responsive && col.responsive.includes("lg")) {
      return {
        ...col,
        className: isMobile ? "hide-on-sm" : "", // Add a class name for CSS targeting
      };
    }
    return col;
  });

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
    <>
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
            defaultActiveKey="8"
            className="mb-0"
            size={isMobile ? "small" : "middle"}
            items={items}
          />
        </div>
        <style>
          {`
                .ant-table-content {
                    overflow-x: auto;
                }
                @media (max-width: 768px) {
                  .hide-on-sm {
                    display: none;
                  }
                }
                `}
        </style>

        <div className="p-4 h-[calc(100vh-150px)] overflow-y-auto bg-white">
          <Table
            columns={updatedColumns}
            dataSource={data}
            pagination={false}
            rowKey="key"
            scroll={{ x: "max-content" }}
          />

          <div className="flex justify-end gap-2 mt-3">
            <Button danger>Delete Stream</Button>
            <button className="shadow-md cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1 rounded-md">
              Save
            </button>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export default PlaySessions;
