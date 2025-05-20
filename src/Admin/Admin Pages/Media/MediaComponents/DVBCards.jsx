import { useState } from "react";
import AppLayout from "../../../Admin Components/AppLayout";
import { Table, Card, Typography, Tabs } from "antd";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";

const { Title } = Typography;

function DVBCards() {
  const [isMobile, setIsMobile] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
  ];

  const data = [];

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
      {/* Mobile Title */}
      <div className="md:hidden px-4 py-2 mb-5 mt-3">
        <h1 className="text-xl font-semibold">DVB cards</h1>
      </div>

      {/* Tabs */}
      <div
        className={`scrollHide w-full overflow-x-auto lg:px-0 px-2 flex items-center gap-2 border-b border-gray-200 ${
          isMobile ? "px-2" : ""
        }`}
      >
        <Link to="/media/create">
          <button
            className={`cursor-pointer text-xl font-bold px-3 py-1 mr-5 text-white bg-[#08027d] rounded-md ${
              isMobile ? "mt-1" : ""
            }`}
          >
            <IoAddCircleOutline />
          </button>
        </Link>
        <Tabs
          defaultActiveKey="6"
          className="mb-0"
          size={isMobile ? "small" : "middle"}
          items={items}
        />
      </div>

      <Card
        title={
          <div className="flex justify-between items-center">
            <Title level={5} style={{ margin: 0 }}>
              Installed boards
            </Title>
          </div>
        }
        variant={false}
        style={{ marginBottom: 24 }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          locale={{ emptyText: "No DVB cards found" }}
          className="bg-gray-100"
          rowClassName="bg-gray-100"
          headerRow={{ style: { backgroundColor: "#f0f2f5" } }}
        />
      </Card>
    </AppLayout>
  );
}

export default DVBCards;
