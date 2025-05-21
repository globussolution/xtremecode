import { Tabs, Input, Select, Checkbox, TimePicker, Form } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AppLayout from "../../../Admin Components/AppLayout";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

function ConfigDVR() {
  const [isMobile, setIsMobile] = useState(false);
  const [dvrPath, setDvrPath] = useState("");
  const [dvrPathError, setDvrPathError] = useState("");
  const [form] = Form.useForm();

  // State for dynamic Schedule Ranges
  const [scheduleRanges, setScheduleRanges] = useState([]);

  // State for dynamic Disks
  const [disks, setDisks] = useState([]);

  // isMobile state ko update karne ke liye useEffect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px ko mobile breakpoint mana hai
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check for mobile size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handlePathChange = (e) => {
    const value = e.target.value;
    setDvrPath(value);
    if (value.length < 1) {
      setDvrPathError(
        "DVR root is required and should have 1 character at least."
      );
    } else {
      setDvrPathError("");
    }
  };

  // Add a new schedule range to the state
  const addScheduleRange = () => {
    setScheduleRanges([
      ...scheduleRanges,
      { startTime: null, endTime: null }, // moment() se default time bhi de sakte hain
    ]);
  };

  // Remove a schedule range from the state
  const removeScheduleRange = (index) => {
    const newRanges = [...scheduleRanges];
    newRanges.splice(index, 1);
    setScheduleRanges(newRanges);
    // Form field ko bhi reset karna hoga agar values form state mein hain
    form.setFieldsValue({
      schedule: newRanges.map((range) => ({
        startTime: range.startTime,
        endTime: range.endTime,
      })),
    });
  };

  // Handle changes in TimePicker for a specific schedule range
  const handleScheduleTimeChange = (time, timeString, index, type) => {
    const newRanges = [...scheduleRanges];
    newRanges[index][type] = time; // `time` is a moment object
    setScheduleRanges(newRanges);
    // Ant Design Form ko update karein
    form.setFieldsValue({
      schedule: {
        [index]: {
          [type]: time,
        },
      },
    });
  };

  // Add a new disk to the state
  const addDisk = () => {
    setDisks([
      ...disks,
      { path: "undefined/", name: "", mode: "not-selected" }, // Default values
    ]);
  };

  // Remove a disk from the state
  const removeDisk = (index) => {
    const newDisks = [...disks];
    newDisks.splice(index, 1);
    setDisks(newDisks);
    // Form field ko bhi reset karna hoga agar values form state mein hain
    form.setFieldsValue({
      disks: newDisks.map((disk) => ({
        path: disk.path,
        name: disk.name,
        mode: disk.mode,
      })),
    });
  };

  // Handle changes in disk inputs (path, name, mode)
  const handleDiskInputChange = (e, index, field) => {
    const newDisks = [...disks];
    newDisks[index][field] = e.target.value;
    setDisks(newDisks);
    // Ant Design Form ko update karein
    form.setFieldsValue({
      disks: {
        [index]: {
          [field]: e.target.value,
        },
      },
    });
  };

  const handleDiskSelectChange = (value, index, field) => {
    const newDisks = [...disks];
    newDisks[index][field] = value;
    setDisks(newDisks);
    // Ant Design Form ko update karein
    form.setFieldsValue({
      disks: {
        [index]: {
          [field]: value,
        },
      },
    });
  };

  // Form submit handler
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // Yahan aap apna data backend ko bhej sakte hain
  };

  return (
    <>
      <AppLayout>
        {/* Mobile Title - Keep as is, it's good */}
        <div className="md:hidden px-4 py-2 mb-5 mt-3">
          <h1 className="text-2xl font-semibold">DVR</h1>
        </div>

        {/* Tabs */}
        <div
          className={`scrollHide lg:px-0 px-4 w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
            isMobile ? "px-2" : ""
          }`}
        >
          <Tabs
            defaultActiveKey="3"
            className="mb-0"
            size={isMobile ? "small" : "middle"}
            items={items}
          />
        </div>

        {/* Main Content Area */}
        <div className="py-5 lg:px-0 px-4 h-[calc(100vh-140px)] overflow-y-auto">
          {/* Header for Add DVR Button */}
          <div className="mb-6 flex justify-between items-center">
            <button className="shadow-md mb-2 cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md">
              Add DVR
            </button>
          </div>

          <Form
            form={form}
            layout="vertical"
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            onFinish={onFinish}
          >
            {/* NewDvr1 section */}
            <div className="lg:col-span-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                NewDvr1 at
              </h2>
            </div>

            {/* Storage Section */}
            <div className="bg-white border border-gray-300 p-4 rounded-md">
              <h3 className="text-md font-semibold mb-4 flex items-center justify-between">
                Storage
                <InfoCircleOutlined className="text-gray-400 cursor-pointer" />
              </h3>
              <Form.Item label="Name" name="storageName" initialValue="NewDvr1">
                <Input />
              </Form.Item>

              <Form.Item
                label="Path"
                name="dvrPath"
                validateStatus={dvrPathError ? "error" : ""}
                help={dvrPathError}
                required
                rules={[
                  {
                    required: true,
                    message:
                      "DVR root is required and should have 1 character at least.",
                    min: 1,
                  },
                ]}
              >
                <Input
                  value={dvrPath}
                  onChange={handlePathChange}
                  className={dvrPathError ? "border-red-500" : ""}
                />
              </Form.Item>

              <div className="mb-4">
                <Checkbox>RAID 0</Checkbox>
                <InfoCircleOutlined className="text-gray-400 ml-2 cursor-pointer" />
              </div>

              <Form.Item label="Disks to write" name="disksToWrite">
                <Input />
              </Form.Item>

              <Form.Item label="Copy chunks to this location" name="copyChunks">
                <Input
                  suffix={<InfoCircleOutlined className="text-gray-400" />}
                />
              </Form.Item>
            </div>

            {/* Additional Section */}
            <div className="bg-white border border-gray-300 p-4 rounded-md">
              <h3 className="text-md font-semibold mb-4 flex items-center justify-between">
                Additional
                <InfoCircleOutlined className="text-gray-400 cursor-pointer" />
              </h3>
              <Form.Item
                label="Cached metadata subdirectory"
                name="cachedMetadata"
              >
                <Input
                  suffix={<InfoCircleOutlined className="text-gray-400" />}
                />
              </Form.Item>

              <div className="mb-4 flex items-center space-x-2">
                <Checkbox defaultChecked>Dvr replicate</Checkbox>
                <Form.Item name="replicationPort" noStyle>
                  <Input placeholder="Replication port" className="w-2/3" />
                </Form.Item>
                <InfoCircleOutlined className="text-gray-400 cursor-pointer" />
              </div>

              <div className="mb-4 flex items-center space-x-2">
                <Checkbox defaultChecked>Indexing for streams</Checkbox>
                <InfoCircleOutlined className="text-gray-400 cursor-pointer" />
              </div>
            </div>

            {/* Limits Section */}
            <div className="bg-white border border-gray-300 p-4  rounded-md">
              <h3 className="text-md font-semibold mb-4 flex items-center justify-between">
                Limits
                <InfoCircleOutlined className="text-gray-400 cursor-pointer" />
              </h3>
              <Form.Item
                label="Maximum disk consumption"
                name="maxDiskConsumption"
              >
                <Input suffix="%" />
              </Form.Item>

              <Form.Item
                label="Maximum disk consumption"
                name="maxDiskConsumption2"
                extra={
                  <div className="text-xs text-gray-500 mt-1">
                    Available size formats: 32Gb, 4Tb...
                  </div>
                }
              >
                <Input
                  suffix={<InfoCircleOutlined className="text-gray-400" />}
                />
              </Form.Item>

              <Form.Item
                label="Archive depth"
                name="archiveDepth"
                extra={
                  <div className="text-xs text-gray-500 mt-1">
                    Available time formats: 3600s, 900m, 9h, 7d, 5w
                  </div>
                }
              >
                <Input
                  suffix={<InfoCircleOutlined className="text-gray-400" />}
                />
              </Form.Item>
            </div>

            {/* Schedule Section */}
            <div className="bg-white border border-gray-300 p-4 rounded-md lg:col-span-2">
              <h3 className="text-md font-semibold mb-4 flex items-center justify-between">
                Schedule
                <InfoCircleOutlined className="text-gray-400 cursor-pointer" />
              </h3>
              <button
                className="shadow-md mb-5 cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md"
                onClick={addScheduleRange}
              >
                <PlusOutlined /> Add Schedule Range
              </button>

              {scheduleRanges.map((range, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <span className="text-gray-500">--- -- --</span>
                  <Form.Item
                    name={["schedule", index, "startTime"]}
                    noStyle
                    // initialValue={range.startTime} // Agar aap moment se initialize kar rahe hain, to moment() lagana hoga
                  >
                    <TimePicker
                      format="HH:mm"
                      placeholder="Start Time"
                      className="w-24"
                      onChange={(time, timeString) =>
                        handleScheduleTimeChange(
                          time,
                          timeString,
                          index,
                          "startTime"
                        )
                      }
                      value={range.startTime} // Controlled component ke liye
                    />
                  </Form.Item>
                  <span className="text-gray-500">--- -- --</span>
                  <Form.Item
                    name={["schedule", index, "endTime"]}
                    noStyle
                    // initialValue={range.endTime} // Agar aap moment se initialize kar rahe hain, to moment() lagana hoga
                  >
                    <TimePicker
                      format="HH:mm"
                      placeholder="End Time"
                      className="w-24"
                      onChange={(time, timeString) =>
                        handleScheduleTimeChange(
                          time,
                          timeString,
                          index,
                          "endTime"
                        )
                      }
                      value={range.endTime} // Controlled component ke liye
                    />
                  </Form.Item>
                  <span className="text-gray-500">11:59 pm</span>{" "}
                  {/* Consider making this dynamic if needed */}
                  <DeleteOutlined
                    className="text-red-500 cursor-pointer ml-auto"
                    onClick={() => removeScheduleRange(index)}
                  />
                </div>
              ))}
            </div>

            {/* Disks Section */}
            <div className="bg-white border border-gray-300 p-4 rounded-md lg:col-span-1">
              <h3 className="text-md font-semibold mb-4 flex items-center justify-between">
                Disks
                <InfoCircleOutlined className="text-gray-400 cursor-pointer" />
              </h3>
              <button
                className="shadow-md mb-5 cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md"
                onClick={addDisk}
              >
                <PlusOutlined /> Add Disk
              </button>

              {disks.map((disk, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Form.Item
                    name={["disks", index, "path"]}
                    noStyle
                    // initialValue={disk.path} // Ant Design Form ko manage karne dein
                  >
                    <Input
                      placeholder="Disk path"
                      className="w-1/3"
                      onChange={(e) => handleDiskInputChange(e, index, "path")}
                      value={disk.path} // Controlled component ke liye
                    />
                  </Form.Item>
                  <Form.Item
                    name={["disks", index, "name"]}
                    noStyle
                    // initialValue={disk.name} // Ant Design Form ko manage karne dein
                  >
                    <Input
                      placeholder="Disk name"
                      className="flex-1"
                      onChange={(e) => handleDiskInputChange(e, index, "name")}
                      value={disk.name} // Controlled component ke liye
                    />
                  </Form.Item>
                  <Form.Item
                    name={["disks", index, "mode"]}
                    noStyle
                    // initialValue={disk.mode} // Ant Design Form ko manage karne dein
                  >
                    <Select
                      className="w-auto"
                      onChange={(value) =>
                        handleDiskSelectChange(value, index, "mode")
                      }
                      value={disk.mode} // Controlled component ke liye
                    >
                      <Option value="not-selected">- Not selected -</Option>
                      <Option value="read-only">Read Only</Option>
                      <Option value="read-write">Read Write</Option>
                    </Select>
                  </Form.Item>
                  <DeleteOutlined
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeDisk(index)}
                  />
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-3 text-left">
              <button
                type="submit"
                className="shadow-md mb-5 cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md"
              >
                Save DVR Settings
              </button>
            </div>
          </Form>
        </div>
      </AppLayout>
    </>
  );
}

export default ConfigDVR;
