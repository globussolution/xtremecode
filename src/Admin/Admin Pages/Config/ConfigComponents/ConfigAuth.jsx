import { Tabs, Radio, Input, Select, Checkbox, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import AppLayout from "../../../Admin Components/AppLayout";
import { InfoCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

function ConfigAuth() {
  const [isMobile, setIsMobile] = useState(false);
  const [authType, setAuthType] = useState("none");
  const [countryAccessLimit, setCountryAccessLimit] = useState("disabled");

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

  const handleAuthTypeChange = (e) => {
    setAuthType(e.target.value);
  };

  const handleCountryAccessLimitChange = (e) => {
    setCountryAccessLimit(e.target.value);
  };

  return (
    <>
      <AppLayout>
        {/* Mobile Title */}
        <div className="md:hidden px-4 py-2 mb-5 mt-3">
          <h1 className="text-2xl font-semibold">Auth</h1>
        </div>

        {/* Tabs */}
        <div
          className={`scrollHide lg:px-0 px-4 w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
            isMobile ? "px-2" : ""
          }`}
        >
          <Tabs
            defaultActiveKey="4"
            className="mb-0"
            size={isMobile ? "small" : "middle"}
            items={items}
          />
        </div>

        <div className="p-4 lg:p-6 bg-white shadow rounded-lg mt-6">
          <div className="flex items-center mb-4">
            <label className="mr-4 text-base font-medium">Authentication type</label>
            <Radio.Group onChange={handleAuthTypeChange} value={authType}>
              <Radio value="none">none</Radio>
              <Radio value="custom">custom</Radio>
              <Radio value="stalker">stalker</Radio>
              <Radio value="securelink">securelink</Radio>
            </Radio.Group>
            <Tooltip title="Select the authentication method to use.">
              <InfoCircleOutlined className="ml-2 text-gray-400" />
            </Tooltip>
          </div>

          {authType === "custom" && (
            <div className="mb-4">
              <Input
                id="auth-backend-url"
                placeholder="Auth backend url"
                className="w-full placeholder:font-semibold max-w-md"
              />
              <Tooltip title="URL of the custom authentication backend.">
                <InfoCircleOutlined className="ml-2 text-gray-400" />
              </Tooltip>
            </div>
          )}

          {authType === "stalker" && (
            <div className="mb-4">
              <Input
                id="stalker-hostname-port"
                placeholder="Stalker hostname:port"
                className="w-full placeholder:font-semibold max-w-md"
              />
              <Tooltip title="Hostname and port of the Stalker authentication server.">
                <InfoCircleOutlined className="ml-2 text-gray-400" />
              </Tooltip>
            </div>
          )}

          {authType === "securelink" && (
            <div className="mb-4">
              <Input
                id="securelink-auth-key"
                placeholder="Securelink auth key"
                className="w-full placeholder:font-semibold max-w-md"
              />
              <Tooltip title="Authentication key for Securelink.">
                <InfoCircleOutlined className="ml-2 text-gray-400" />
              </Tooltip>
            </div>
          )}

          {/* This section is always visible */}
          <div className="mb-4">
            <label htmlFor="select-session-keys" className="block text-sm font-medium text-gray-700 mb-1">
              Select session keys
            </label>
            <Select
              mode="multiple"
              allowClear
              className="w-full max-w-md"
              placeholder="Please select"
              id="select-session-keys"
            >
              <Option value="ip">ip</Option>
              <Option value="name">name</Option>
              <Option value="proto">proto</Option>
              <Option value="token">token</Option>
            </Select>
            <Tooltip title="Select which session keys to use for authentication.">
              <InfoCircleOutlined className="ml-2 text-gray-400" />
            </Tooltip>
          </div>

          {/* Conditionally hide Soft limitation checkbox */}
          {authType !== "none" && (
            <div className="flex items-center mb-4">
              <Checkbox>Soft limitation</Checkbox>
              <Tooltip title="Enable soft limitation for sessions.">
                <InfoCircleOutlined className="ml-2 text-gray-400" />
              </Tooltip>
            </div>
          )}

          <div className="mb-4">
            <Input
              id="allowed-domains"
              placeholder="Allowed domains: Limit on which domains embed.html may be played."
              className="w-full placeholder:font-semibold max-w-md"
            />
            <Tooltip title="Specify domains where embed.html is allowed to be played.">
              <InfoCircleOutlined className="ml-2 text-gray-400" />
            </Tooltip>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4 mt-6">
              Limit access by country two-letter codes (for example: US, RU)
            </label>
            <Radio.Group onChange={handleCountryAccessLimitChange} value={countryAccessLimit}>
              <Radio value="disabled">disabled</Radio>
              <Radio value="whitelist">whitelist</Radio>
              <Radio value="blacklist">blacklist</Radio>
            </Radio.Group>
            {countryAccessLimit !== "disabled" && (
              <Input
                placeholder=""
                className="w-full max-w-md mt-2"
              />
            )}
            <Tooltip title="Limit access based on country codes.">
              <InfoCircleOutlined className="ml-2 text-gray-400" />
            </Tooltip>
          </div>

          <button
            className="shadow-md font-semibold mb-5 cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1.5 rounded-md"
          >
            Save
          </button>
        </div>
      </AppLayout>
    </>
  );
}

export default ConfigAuth;