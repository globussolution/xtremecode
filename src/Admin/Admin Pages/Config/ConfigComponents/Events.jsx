import { Tabs, Input, Select, Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import AppLayout from "../../../Admin Components/AppLayout";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Option } = Select;

function Events() {
  const [isMobile, setIsMobile] = useState(false);
  // Initialize with empty arrays so no groups are shown by default
  const [exceptGroups, setExceptGroups] = useState([]);
  const [onlyGroups, setOnlyGroups] = useState([]);

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

  const addGroup = (type) => {
    if (type === "except") {
      setExceptGroups([...exceptGroups, {}]);
    } else {
      setOnlyGroups([...onlyGroups, {}]);
    }
  };

  const deleteGroup = (type, index) => {
    if (type === "except") {
      const updatedGroups = [...exceptGroups];
      updatedGroups.splice(index, 1);
      setExceptGroups(updatedGroups);
    } else {
      const updatedGroups = [...onlyGroups];
      updatedGroups.splice(index, 1);
      setOnlyGroups(updatedGroups);
    }
  };

  return (
    <>
      <AppLayout>
        {/* Mobile Title */}
        <div className="md:hidden px-4 py-2 mb-5 mt-3">
          <h1 className="text-2xl font-semibold">Events</h1>
        </div>

        {/* Tabs */}
        <div
          className={`scrollHide lg:px-0 px-4 w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
            isMobile ? "px-2" : ""
          }`}
        >
          <Tabs
            defaultActiveKey="6"
            className="mb-0"
            size={isMobile ? "small" : "middle"}
            items={items}
          />
        </div>

        {/* Add Event Section */}
        <div className="py-4 lg:px-1 px-4 h-[calc(100vh-140px)] overflow-y-auto">
          <div className="bg-white rounded-lg">
          {/* Add Auth Backend Button */}
          <div className="mb-6">
            <button
              className="shadow-md mb-5 cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md"
            >
              <PlusOutlined className="mr-2" />
              Add Event
            </button>
          </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative">
              <div className="flex items-center gap-2">
                <label className="w-24 text-gray-700 font-medium">Name</label>
                <Input
                  value="newEvent1"
                  className="w-full md:w-auto flex-grow"
                />
                <Tooltip title="Info about Name">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-grow">
                  <Input className="w-full placeholder:font-semibold"  placeholder="Sink"/>
                  <span className="text-red-500 text-sm mt-1 block">
                    required
                  </span>
                </div>
                <Tooltip title="Info about Sink">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
              <div className="flex items-center gap-2">
                <label className="w-24 text-gray-700 font-medium">Level</label>
                <Select
                  defaultValue="Not selected"
                  className="w-full md:w-auto flex-grow"
                >
                  <Option value="Not selected">Not selected</Option>
                  <Option value="none">none</Option>
                  <Option value="debug">debug</Option>
                  <Option value="info">info</Option>
                  <Option value="notice">notice</Option>
                  <Option value="warning">warning</Option>
                  <Option value="error">error</Option>
                  <Option value="alert">alert</Option>
                  <Option value="critical">critical</Option>
                </Select>
                <Tooltip title="Info about Level">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
            </div>

            {/* Except and Only Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              {/* Except Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-medium">Except</h3>
                  <Button onClick={() => addGroup("except")}>Add Group</Button>
                </div>
                {exceptGroups.map((group, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-md mb-4 relative"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold">Group {index + 1}</span>
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => deleteGroup("except", index)}
                      />
                    </div>
                    <p className="text-red-500 text-sm mb-3">
                      You should add at least one filter.
                    </p>
                    <div className="flex gap-2 mb-3">
                      <Input placeholder="New key" />
                      <Input placeholder="New value" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Only Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-medium">Only</h3>
                  <Button onClick={() => addGroup("only")}>Add Group</Button>
                </div>
                {onlyGroups.map((group, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-md mb-4 relative"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold">Group {index + 1}</span>
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => deleteGroup("only", index)}
                      />
                    </div>
                    <p className="text-red-500 text-sm mb-3">
                      You should add at least one filter.
                    </p>
                    <div className="flex gap-2 mb-3">
                      <Input placeholder="New key" />
                      <Input placeholder="New value" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Input className="w-full placeholder:font-semibold md:w-auto flex-grow" placeholder="Max depth"/>
                <Tooltip title="Info about Max depth">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
              <div className="flex items-center gap-2">
                <Input className="w-full placeholder:font-semibold md:w-auto flex-grow" placeholder="Max size" />
                <Tooltip title="Info about Max size">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
              <div className="flex items-center gap-2">
                <Input className="w-full placeholder:font-semibold md:w-auto flex-grow" placeholder="Resend timeout" />
                <span className="text-gray-500">sec</span>
                <Tooltip title="Info about Resend timeout">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
              <div className="flex items-center gap-2">
                <Input className="w-full placeholder:font-semibold md:w-auto flex-grow" placeholder="Resend limit" />
                <Tooltip title="Info about Resend limit">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
            </div>

            {/* Extended Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-medium">Extended</h3>
                <Tooltip title="Info about Extended">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
              <div className="flex gap-2">
                <Input placeholder="New key" />
                <Input placeholder="New value" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button>Cancel</Button>
              <button className="shadow-md mb-5 cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export default Events;
