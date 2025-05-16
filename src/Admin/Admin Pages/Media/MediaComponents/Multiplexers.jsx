import { useState } from "react";
import AppLayout from "../../../Admin Components/AppLayout";
import { Card, Input, Typography, Row, Col, Form } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";

const { Title, Text } = Typography;
const { Search } = Input;

function Multiplexers() {
  const [isMobile, setIsMobile] = useState(false);
  
  const items = [
  {
    key: '1',
    label: <Link to="/">Streams</Link>,
  },
  {
    key: '2',
    label: <Link to="/media/templates">Templates</Link>,
  },
  {
    key: '3',
    label: <Link to="/media/multiplexers">Multiplexers</Link>,
  },
  {
    key: '4',
    label: <Link to="/media/sources">Sources</Link>,
  },
  {
    key: '5',
    label: <Link to="/media/vods">VODs</Link>,
  },
  {
    key: '6',
    label: <Link to="/media/dvbcards">DVB cards</Link>,
  },
];


  return (
    <AppLayout>
      {/* Mobile Title */}
      <div className="md:hidden px-4 py-2">
        <h1 className="text-xl font-semibold">Multiplexers</h1>
      </div>

      {/* Tabs */}
       <div
          className={`scrollHide lg:px-0 px-2 w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
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
            defaultActiveKey="3"
            className="mb-0"
            size={isMobile ? "small" : "middle"}
            items={items}
          />
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 lg:px-0 px-4">
       
        <div>
          <Card
            title={
              <div className="flex justify-between items-center">
                <Title level={5} style={{ margin: 0 }}>
                  Streams
                </Title>
              </div>
            }
            variant="default"
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <Search
              placeholder="Enter a stream name"
              style={{ marginBottom: 16 }}
            />

            <div className="flex justify-between items-center py-2 px-3 border border-gray-300 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <Text strong>HBO_Max</Text>
                <InfoCircleOutlined className="ml-2 text-blue-600" />
              </div>
              <p className="text-green-600">Online</p>
            </div>

            <div className="flex justify-between items-center py-2 px-3 mt-3 border border-gray-300 bg-gray-50 rounded-md">
              <Text strong>Testing</Text>
              <p className="text-yellow-600">No sources defined</p>
            </div>
          </Card>
        </div>

        <div>
          <Card
            style={{ backgroundColor: "#f9f9f9", border: "none", padding: "16px" }}
            title={
              <div className="flex justify-between items-center">
                <Title level={5} style={{ margin: 0 }}>
                  Multiplexers
                </Title>
              </div>
            }
          >
            <div className="text-blue-700 p-2 flex items-center mb-4 bg-[#d5f2ff] rounded-md">
              <InfoCircleOutlined className="mr-2" />
              <p className="text-black font-semibold">
                Add your first multiplexer
              </p>
            </div>

            <Form layout="vertical">
              <Form.Item
                label={
                  <div className="flex items-center">Multiplexer name</div>
                }
              >
                <div className="flex items-center">
                  <Input />
                  <InfoCircleOutlined className="ml-2 text-blue-600" />
                </div>
              </Form.Item>

              <Form.Item
                label={<div className="flex items-center">Bitrate</div>}
              >
                <div className="flex items-center">
                  <Input suffix="K" />
                  <InfoCircleOutlined className="ml-2 text-blue-600" />
                </div>
              </Form.Item>

              <button className="cursor-pointer transition-all border border-[#050060] bg-[#050060] text-white hover:bg-white hover:text-[#050060] p-1.5 font-semibold rounded-md w-full">
                Create
              </button>
            </Form>
          </Card>
        </div>

      </div>
    </AppLayout>
  );
}

export default Multiplexers;
