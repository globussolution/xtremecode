import {
  Tabs,
  Input,
  Switch,
  Button,
  Select,
  Radio,
  Checkbox,
  Upload,
} from "antd";
import AppLayout from "../../Admin Components/AppLayout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { IoMdDownload } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";

function Config() {
  const [isMobile, setIsMobile] = useState(false);

  // States for each listener type
  const [httpPorts, setHttpPorts] = useState([{ port: "80", address: "-", api: true }]);
  const [httpsPorts, setHttpsPorts] = useState([{ port: "", address: "", sslProtocols: "default", api: false }]);
  const [rtmpPorts, setRtmpPorts] = useState([{ port: "1935", address: "-", api: false }]);
  const [rtmpsPorts, setRtmpsPorts] = useState([{ port: "", address: "0.0.0.0", sslProtocols: "default", api: false }]);
  const [rtspPorts, setRtspPorts] = useState([{ port: "", address: "0.0.0.0", api: false }]);
  const [rtspSslPorts, setRtspSslPorts] = useState([{ port: "", address: "0.0.0.0", sslProtocols: "default", api: false }]);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
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

  const { Option } = Select;

  // uploadProps
  const uploadProps = {
    name: "file",
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", // REMOVED: No backend action
    // headers: { authorization: "authorization-text" }, // REMOVED: No headers needed for local
    beforeUpload: (file) => {
      // Prevent actual upload and return false
      console.log('Selected file for local processing:', file.name);
      // You can add logic here to read file content, display filename, etc.
      return false;
    },
    onChange(info) {
      // You can still use onChange for local state updates if needed
      if (info.file.status === 'done' || info.file.status === 'removed') {
        // Handle local file selection or removal, no actual "uploading" status
        console.log(`File selected: ${info.file.name}`);
      }
    },
    // Set showUploadList to true if you want to display selected file names
    showUploadList: true,
  };


  // Functions to handle adding/removing ports

  const addPort = (setter, defaultValues) => {
    setter(prevPorts => [...prevPorts, defaultValues]);
  };

  const removePort = (setter, index) => {
    setter(prevPorts => prevPorts.filter((_, i) => i !== index));
  };

  const handlePortChange = (setter, index, field, value) => {
    setter(prevPorts =>
      prevPorts.map((port, i) =>
        i === index ? { ...port, [field]: value } : port
      )
    );
  };

  return (
    <>
      <AppLayout>
        {/* Mobile Title */}
        <div className="md:hidden px-4 py-2 mb-5 mt-3">
          <h1 className="text-2xl font-semibold">Setting</h1>
        </div>

        {/* Tabs */}
        <div
          className={`scrollHide lg:px-0 px-4 w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
            isMobile ? "px-2" : ""
          }`}
        >
          <Tabs
            defaultActiveKey="1"
            className="mb-0"
            size={isMobile ? "small" : "middle"}
            items={items}
          />
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-140px)] overflow-y-auto pb-5">
          <div className="p-4 lg:p-0 mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Listeners */}
            <div className="md:col-span-2 bg-white p-4 rounded-md shadow-sm border border-gray-200 space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Listeners</h2>

              {/* HTTP Ports */}
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    HTTP Ports
                  </h3>
                  <PlusOutlined
                    className="text-blue-500 cursor-pointer text-lg"
                    onClick={() => addPort(setHttpPorts, { port: "", address: "", api: false })}
                  />
                </div>
                {httpPorts.map((portConfig, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 items-end">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Port
                      </label>
                      <Input
                        value={portConfig.port}
                        onChange={(e) => handlePortChange(setHttpPorts, index, "port", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Address
                      </label>
                      <Input
                        value={portConfig.address}
                        onChange={(e) => handlePortChange(setHttpPorts, index, "address", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">Api</span>
                      <Switch
                        checked={portConfig.api}
                        onChange={(checked) => handlePortChange(setHttpPorts, index, "api", checked)}
                      />
                      {/* Delete icon */}
                      <DeleteOutlined
                        className="text-red-500 cursor-pointer text-lg"
                        onClick={() => removePort(setHttpPorts, index)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* HTTPS Ports */}
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    HTTPS Ports
                  </h3>
                  <PlusOutlined
                    className="text-blue-500 cursor-pointer text-lg"
                    onClick={() => addPort(setHttpsPorts, { port: "", address: "", sslProtocols: "default", api: false })}
                  />
                </div>
                {httpsPorts.map((portConfig, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 items-end">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Port
                      </label>
                      <Input
                        value={portConfig.port}
                        onChange={(e) => handlePortChange(setHttpsPorts, index, "port", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Address
                      </label>
                      <Input
                        value={portConfig.address}
                        onChange={(e) => handlePortChange(setHttpsPorts, index, "address", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        SSL Protocols
                      </label>
                      <Select
                        value={portConfig.sslProtocols}
                        onChange={(value) => handlePortChange(setHttpsPorts, index, "sslProtocols", value)}
                        className="w-full"
                      >
                        <Option value="default">Default</Option>
                        <Option value="tls1">TLSv1</Option>
                        <Option value="tls1.1">TLSv1.1</Option>
                        <Option value="tls1.2">TLSv1.2</Option>
                        <Option value="tls1.3">TLSv1.3</Option>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">Api</span>
                      <Switch
                        checked={portConfig.api}
                        onChange={(checked) => handlePortChange(setHttpsPorts, index, "api", checked)}
                      />
                      <DeleteOutlined
                        className="text-red-500 cursor-pointer text-lg"
                        onClick={() => removePort(setHttpsPorts, index)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* RTMP */}
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-700">RTMP</h3>
                  <PlusOutlined
                    className="text-blue-500 cursor-pointer text-lg"
                    onClick={() => addPort(setRtmpPorts, { port: "", address: "", api: false })}
                  />
                </div>
                {rtmpPorts.map((portConfig, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 items-end">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Port
                      </label>
                      <Input
                        value={portConfig.port}
                        onChange={(e) => handlePortChange(setRtmpPorts, index, "port", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Address
                      </label>
                      <Input
                        value={portConfig.address}
                        onChange={(e) => handlePortChange(setRtmpPorts, index, "address", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">Api</span>
                      <Switch
                        checked={portConfig.api}
                        onChange={(checked) => handlePortChange(setRtmpPorts, index, "api", checked)}
                      />
                      <DeleteOutlined
                        className="text-red-500 cursor-pointer text-lg"
                        onClick={() => removePort(setRtmpPorts, index)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* RTMPS */}
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-700">RTMPS</h3>
                  <PlusOutlined
                    className="text-blue-500 cursor-pointer text-lg"
                    onClick={() => addPort(setRtmpsPorts, { port: "", address: "0.0.0.0", sslProtocols: "default", api: false })}
                  />
                </div>
                {rtmpsPorts.map((portConfig, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 items-end">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Port
                      </label>
                      <Input
                        value={portConfig.port}
                        onChange={(e) => handlePortChange(setRtmpsPorts, index, "port", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Address
                      </label>
                      <Input
                        value={portConfig.address}
                        onChange={(e) => handlePortChange(setRtmpsPorts, index, "address", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        SSL Protocols
                      </label>
                      <Select
                        value={portConfig.sslProtocols}
                        onChange={(value) => handlePortChange(setRtmpsPorts, index, "sslProtocols", value)}
                        className="w-full"
                      >
                        <Option value="default">Default</Option>
                        <Option value="tls1">TLSv1</Option>
                        <Option value="tls1.1">TLSv1.1</Option>
                        <Option value="tls1.2">TLSv1.2</Option>
                        <Option value="tls1.3">TLSv1.3</Option>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">Api</span>
                      <Switch
                        checked={portConfig.api}
                        onChange={(checked) => handlePortChange(setRtmpsPorts, index, "api", checked)}
                      />
                      <DeleteOutlined
                        className="text-red-500 cursor-pointer text-lg"
                        onClick={() => removePort(setRtmpsPorts, index)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* RTSP */}
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-700">RTSP</h3>
                  <PlusOutlined
                    className="text-blue-500 cursor-pointer text-lg"
                    onClick={() => addPort(setRtspPorts, { port: "", address: "0.0.0.0", api: false })}
                  />
                </div>
                {rtspPorts.map((portConfig, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 items-end">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Port
                      </label>
                      <Input
                        value={portConfig.port}
                        onChange={(e) => handlePortChange(setRtspPorts, index, "port", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Address
                      </label>
                      <Input
                        value={portConfig.address}
                        onChange={(e) => handlePortChange(setRtspPorts, index, "address", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">Api</span>
                      <Switch
                        checked={portConfig.api}
                        onChange={(checked) => handlePortChange(setRtspPorts, index, "api", checked)}
                      />
                      <DeleteOutlined
                        className="text-red-500 cursor-pointer text-lg"
                        onClick={() => removePort(setRtspPorts, index)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* RTSPS */}
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-700">RTSPS</h3>
                  <PlusOutlined
                    className="text-blue-500 cursor-pointer text-lg"
                    onClick={() => addPort(setRtspSslPorts, { port: "", address: "0.0.0.0", sslProtocols: "default", api: false })}
                  />
                </div>
                {rtspSslPorts.map((portConfig, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 items-end">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Port
                      </label>
                      <Input
                        value={portConfig.port}
                        onChange={(e) => handlePortChange(setRtspSslPorts, index, "port", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Address
                      </label>
                      <Input
                        value={portConfig.address}
                        onChange={(e) => handlePortChange(setRtspSslPorts, index, "address", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        SSL Protocols
                      </label>
                      <Select
                        value={portConfig.sslProtocols}
                        onChange={(value) => handlePortChange(setRtspSslPorts, index, "sslProtocols", value)}
                        className="w-full"
                      >
                        <Option value="default">Default</Option>
                        <Option value="tls1">TLSv1</Option>
                        <Option value="tls1.1">TLSv1.1</Option>
                        <Option value="tls1.2">TLSv1.2</Option>
                        <Option value="tls1.3">TLSv1.3</Option>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">Api</span>
                      <Switch
                        checked={portConfig.api}
                        onChange={(checked) => handlePortChange(setRtspSslPorts, index, "api", checked)}
                      />
                      <DeleteOutlined
                        className="text-red-500 cursor-pointer text-lg"
                        onClick={() => removePort(setRtspSslPorts, index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Access, GeoIP, License */}
            <div className="md:col-span-1 space-y-6">
              {/* Access */}
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Access
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admin UI username
                  </label>
                  <Input defaultValue="flussonic" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admin UI password
                  </label>
                  <Input.Password defaultValue="letmein!" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API allowed from
                  </label>
                  <Input />
                </div>
              </div>

              {/* GeoIP */}
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  GeoIP
                </h3>
                <Input />
              </div>

              {/* License */}
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  License
                </h3>
                <Input
                  defaultValue="04::NULLED::BY @CRACKSMART|WWW.CRACKSMART.COM"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Protocols Section */}
          <div className="p-4 lg:p-0 mt-6 space-y-6">
            <h2 className="text-xl mb-3 font-semibold text-gray-700">
              Protocols
            </h2>
            <div className="mb-8 bg-white p-4 rounded-md shadow-sm border border-gray-200 space-y-4">
              <Input
                className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-700 px-3 py-1.5 rounded-md"
                placeholder="SRT port"
                type="text"
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-700">
              TLS-tunneled protocols
            </h2>
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left side */}
              <div>
                <button className="shadow-md mb-5 cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md">
                  Issue by LetsEncrypt
                </button>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Domains
                  </label>
                  <p>localhost, streamed.local</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issuer
                  </label>
                  <p>MyCompany, LLC</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid until
                  </label>
                  <p>2023-12-16</p>
                </div>
              </div>
              {/* Right side */}
              <div>
                <Upload {...uploadProps}>
                  <Button className="shadow-md mb-5 cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md">
                    Upload Certificates
                  </Button>
                </Upload>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>streamer.key</span>
                    <span className="text-red-500">file not found</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>streamer.crt</span>
                    <span className="text-red-500">file not found</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>streamer-ca.crt</span>
                    <span className="text-red-500">file not found</span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-700">Additional</h2>
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Log level:
                </span>
                <Radio.Group defaultValue="default">
                  <Radio value="default">default</Radio>
                  <Radio value="debug">debug</Radio>
                  <Radio value="notice">notice</Radio>
                  <Radio value="error">error</Radio>
                </Radio.Group>
              </div>
              <div className="flex items-center">
                <Checkbox>Log requests</Checkbox>
              </div>
              <div className="flex items-center gap-4">
                <p>NVIDIA monitor</p>
                <Radio.Group defaultValue="enabled">
                  <Radio value="disabled">disabled</Radio>
                  <Radio value="enabled">enabled</Radio>
                </Radio.Group>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PulseDB path: local DB for metrics
                </label>
                <Input
                  className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-700 px-3 py-1.5 rounded-md"
                  value={"/var/lib/flussonic"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session log path: path to save sessions on local dis
                </label>
                <Input
                  className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-700 px-3 py-1.5 rounded-md"
                  value={"/var/lib/flussonic"}
                />
              </div>
              <div>
                <Input
                  className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-700 px-3 py-1.5 rounded-md"
                  placeholder="SNMP port: access Flussonic Media Server statistics via SNMP"
                  type="text"
                />
              </div>
              <div>
                <Input
                  className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-700 px-3 py-1.5 rounded-md"
                  placeholder="Total bandwidth: estimated maximum capacity of Flussonic Media Server bandwidth (100M)"
                  type="text"
                />
              </div>
              <div>
                <Input
                  className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-700 px-3 py-1.5 rounded-md"
                  placeholder="Meta: arbitrary information related to server"
                />
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex justify-start gap-4 mt-6">
              <button className="shadow-md cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1.5 rounded-md">
                Save
              </button>
              <button className="shadow-md flex gap-2 cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md">
                Download Config <IoMdDownload className="text-lg" />
              </button>
              <Upload {...uploadProps}>
                <button className="shadow-md flex gap-2 cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md">
                  Upload Config <MdFileUpload className="text-lg" />
                </button>
              </Upload>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export default Config;