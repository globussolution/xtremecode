import { Tabs, Button, Input, Switch, Tooltip } from "antd"; 
import { Link } from "react-router-dom";
import { useState } from "react";
import AppLayout from "../../../Admin Components/AppLayout";
import {
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function AuthBackends() {
  const [isMobile, setIsMobile] = useState(false); 

  const items = [
    {
      key: "1",
      label: <Link to="/config">Settings</Link>,
    },
    {
      key: "2",
      label: <Link to="/config/configeditor">Config editor</Link>,
    },
    {
      key: "3",
      label: <Link to="/config/dvr">DVR</Link>,
    },
    {
      key: "4",
      label: <Link to="/config/auth">Auth</Link>,
    },
    {
      key: "5",
      label: <Link to="/config/authbackends">Auth backends</Link>,
    },
    {
      key: "6",
      label: <Link to="/config/events">Events</Link>,
    },
  ];

  const SectionCard = ({ title, children }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        {title}
        <Tooltip title="Information about this section">
          <InfoCircleOutlined className="ml-2 text-gray-400" />
        </Tooltip>
      </h3>
      {children}
    </div>
  );

  const InputWithAdd = ({ placeholder }) => (
    <div className="flex items-center gap-2 mb-2">
      <Input placeholder={placeholder} className="flex-grow" />
      <Button type="default" className="text-blue-700 border-blue-700">
        Add
      </Button>
    </div>
  );

  return (
    <>
      <AppLayout>
        {/* Mobile Title */}
        <div className="md:hidden px-4 py-2 mb-5 mt-3">
          <h1 className="text-2xl font-semibold">Auth backends</h1>
        </div>
        
        {/* Tabs */}
        <div
          className={`scrollHide lg:px-0 px-4 w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
            isMobile ? "px-2" : ""
          }`}
        >
          <Tabs
            defaultActiveKey="5"
            className="mb-0"
            size={isMobile ? "small" : "middle"}
            items={items}
          />
        </div>

        <div className="py-4 lg:px-1 px-4 h-[calc(100vh-140px)] overflow-y-auto">
          {/* Add Auth Backend Button */}
          <div className="mb-6">
            <button
              className="shadow-md mb-5 cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md"
            >
              <PlusOutlined className="mr-2" />
              Add Auth Backend
            </button>
          </div>

          {/* New Auth Backend Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 w-1/2">
                <span className="font-semibold">Name</span>
                <Input
                  value="NewAuthBackend1"
                  className="flex-grow max-w-sm"
                />
                <Tooltip title="Information about the name">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
              <div className="flex items-center gap-4">
                <Switch defaultChecked />
                <span>Allow if all backends failed</span>
                <Tooltip title="Information about this option">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tokens Section */}
              <SectionCard title="Tokens">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Allow</span>
                  <Tooltip title="Information about allowed tokens">
                    <InfoCircleOutlined className="text-gray-400" />
                  </Tooltip>
                </div>
                <InputWithAdd placeholder="Add token" />

                <div className="flex items-center justify-between mb-2 mt-4">
                  <span className="font-medium">Deny</span>
                  <Tooltip title="Information about denied tokens">
                    <InfoCircleOutlined className="text-gray-400" />
                  </Tooltip>
                </div>
                <InputWithAdd placeholder="Add token" />
              </SectionCard>

              {/* IPs Section */}
              <SectionCard title="IPs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Allow</span>
                  <Tooltip title="Information about allowed IPs">
                    <InfoCircleOutlined className="text-gray-400" />
                  </Tooltip>
                </div>
                <InputWithAdd placeholder="Add IP" />

                <div className="flex items-center justify-between mb-2 mt-4">
                  <span className="font-medium">Deny</span>
                  <Tooltip title="Information about denied IPs">
                    <InfoCircleOutlined className="text-gray-400" />
                  </Tooltip>
                </div>
                <InputWithAdd placeholder="Add IP" />
              </SectionCard>

              {/* Countries Section */}
              <SectionCard title="Countries">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Allow</span>
                  <Tooltip title="Information about allowed countries">
                    <InfoCircleOutlined className="text-gray-400" />
                  </Tooltip>
                </div>
                <InputWithAdd placeholder="Add country code" />

                <div className="flex items-center justify-between mb-2 mt-4">
                  <span className="font-medium">Deny</span>
                  <Tooltip title="Information about denied countries">
                    <InfoCircleOutlined className="text-gray-400" />
                  </Tooltip>
                </div>
                <InputWithAdd placeholder="Add country code" />
              </SectionCard>

              {/* User Agents Section */}
              <SectionCard title="User Agents">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Allow</span>
                  <Tooltip title="Information about allowed user agents">
                    <InfoCircleOutlined className="text-gray-400" />
                  </Tooltip>
                </div>
                <InputWithAdd placeholder="Add user agent" />

                <div className="flex items-center justify-between mb-2 mt-4">
                  <span className="font-medium">Deny</span>
                  <Tooltip title="Information about denied user agents">
                    <InfoCircleOutlined className="text-gray-400" />
                  </Tooltip>
                </div>
                <InputWithAdd placeholder="Add user agent" />
              </SectionCard>

              {/* HTTP Backends Section */}
              <SectionCard title="HTTP backends">
                <div className="flex items-center mb-2">
                  <Input placeholder="New URL" className="flex-grow" />
                  <Tooltip title="Information about HTTP backend URL">
                    <InfoCircleOutlined className="ml-2 text-gray-400" />
                  </Tooltip>
                  <Button type="text" icon={<PlusOutlined className="text-blue-700" />} />
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export default AuthBackends;