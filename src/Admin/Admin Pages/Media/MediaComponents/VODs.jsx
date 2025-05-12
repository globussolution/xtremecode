import { useState } from "react"
import { Table, Button, Typography, Tabs } from "antd"
import AppLayout from "../../../Admin Components/AppLayout";
import { IoAddCircleOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import TabPane from "antd/es/tabs/TabPane";

const { Title } = Typography

function VODs() {
  const [isMobile, setIsMobile] = useState(false)

  const storageColumns = [
    {
      title: "Prefix",
      dataIndex: "prefix",
      key: "prefix",
    },
    {
      title: "Storages",
      dataIndex: "storage",
      key: "storage",
      align: "center",
    },
    {
      title: "",
      key: "action",
       align: "right",
      render: () => (
        <button
          className="cursor-pointer transition-all border border-[#08027d] bg-[#08027d] text-white hover:bg-white hover:text-[#08027d] font-semibold px-3 py-1.5 rounded-md"
        >
          Remove
        </button>
      ),
    },
  ]

  const storageData = [
    {
      key: "1",
      prefix: "vod",
      storage: "/home",
    },
    {
      key: "2",
      prefix: "vod2",
      storage: "/",
    },
  ]

  const filesColumns = [
    {
      title: "Subpath",
      dataIndex: "subpath",
      key: "subpath",
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
      key: "prefix",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Clients",
      dataIndex: "clients",
      key: "clients",
      sorter: true,
    },
  ]

  const filesData = []

  return (
    <AppLayout>
        {/* Mobile Title */}
        <div className="md:hidden px-4 py-2">
           <h1 className="text-xl font-semibold">VODs</h1>
        </div>

       {/* Tabs */}
        <div className={`scrollHide w-full overflow-x-auto lg:px-0 px-2 flex items-center gap-2 border-b border-gray-200 ${isMobile ? "px-2" : ""}`}>
            <Link to="/media/create">  
              <button
                className={`cursor-pointer text-xl font-bold px-3 py-1 mr-5 text-white bg-[#08027d] rounded-md ${isMobile ? "mt-1" : ""}`}
              >
                <IoAddCircleOutline />
              </button>
            </Link>
          <Tabs defaultActiveKey="5" className="mb-0" size={isMobile ? "small" : "middle"}>
            <TabPane tab={<Link to="/">Streams</Link>} key="1" />
            <TabPane tab={<Link to="/media/templates">Templates</Link>} key="2" />
            <TabPane tab={<Link to="/media/multiplexers">Multiplexers</Link>} key="3" />
            <TabPane tab={<Link to="/media/sources">Sources</Link>} key="4" />
            <TabPane tab={<Link to="/media/vods">VODs</Link>} key="5" />
            <TabPane tab={<Link to="/media/dvbcards">DVB cards</Link>} key="6" />
          </Tabs>
        </div>

      <div className="space-y-6 lg:px-0 px-4">
        <Table
          columns={storageColumns}
          dataSource={storageData}
          pagination={false}
          className="bg-gray-100 mt-5"
          rowClassName="bg-white"
        />

        <div>
          <Title level={5} style={{ margin: "24px 0 16px 0" }}>
            Open Files
          </Title>
          <Table
            columns={filesColumns}
            dataSource={filesData}
            pagination={false}
            className="bg-gray-100"
            rowClassName="bg-white"
          />
        </div>
      </div>
    </AppLayout>
  )
}

export default VODs;
