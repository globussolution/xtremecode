import { useState } from "react";
import { Layout, Input, Table, Tag, Space, Tabs } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import AppLayout from "../../Admin Components/AppLayout";
import { IoAddCircleOutline } from "react-icons/io5";

const { Content } = Layout;

function Cluster() {
  const [newPeerHostname, setNewPeerHostname] = useState("");
  const [peerHostname, setPeerHostname] = useState("vps-db961ad8.vps.ovh.ca");
  const [clusterKey, setClusterKey] = useState("0000000000000001");
  const [clusters, setClusters] = useState([
    {
      key: "1",
      host: "cluster1",
      cpu: "-",
      mem: "-",
      clients: "0 / 0",
      streams: "-",
      outputBitrate: "-",
      load: "-",
      uptime: "-",
    },
  ]);

  const columns = [
    {
      title: "Host",
      dataIndex: "host",
      key: "host",
      render: (text) => (
        <Space size="small">
          <Tag color="gray"></Tag> {/* Placeholder for cluster icon */}
          {text}
        </Space>
      ),
    },
    {
      title: "CPU (%)",
      dataIndex: "cpu",
      key: "cpu",
    },
    {
      title: "Mem (%)",
      dataIndex: "mem",
      key: "mem",
    },
    {
      title: "Clients",
      dataIndex: "clients",
      key: "clients",
    },
    {
      title: "Streams",
      dataIndex: "streams",
      key: "streams",
    },
    {
      title: "Output bitrate (kbps)",
      dataIndex: "outputBitrate",
      key: "outputBitrate",
    },
    {
      title: "Load",
      dataIndex: "load",
      key: "load",
    },
    {
      title: "Uptime",
      dataIndex: "uptime",
      key: "uptime",
    },
  ];

  const handleCreateSave = () => {
    console.log("Create Save clicked with hostname:", newPeerHostname);
    // Add logic to handle saving the new peer hostname
  };

  const handleCreateCancel = () => {
    console.log("Create Cancel clicked");
    setNewPeerHostname("");
  };

  const handleClusterAdd = () => {
    console.log("Add Cluster clicked on Cluster tab");
    // Add logic to add a new cluster to the table
  };

  const handleClusterSave = () => {
    console.log("Save clicked on Cluster tab");
    // Add logic to save cluster configurations
  };

  const handleClusterCancel = () => {
    console.log("Cancel clicked on Cluster tab");
    // Add logic to cancel changes on cluster configurations
  };

  const items = [
    {
      key: "create",
      label: (
        <span className="flex items-center cursor-pointer text-lg font-bold px-3 py-1 bg-[#08027d] hover:bg-blue-700 text-white rounded-md">
          <IoAddCircleOutline />
        </span>
      ),
      children: (
        <div className="bg-white border border-gray-300 shadow-md rounded-md p-6">
          <label
            htmlFor="newPeerHostname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            New peer hostname
          </label>
          <div className="relative mb-4">
            <Input
              id="newPeerHostname"
              value={newPeerHostname}
              onChange={(e) => setNewPeerHostname(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              suffix={
                <InfoCircleOutlined className="text-blue-500 cursor-pointer" />
              }
            />
          </div>
          <div className="flex justify-start gap-2">
            <button
              className="transition-all shadow-md cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1 rounded-md"
              onClick={handleCreateSave}
            >
              Save
            </button>
            <button
              onClick={handleCreateCancel}
              className="transition-all shadow-md cursor-pointer border border-gray-300 hover:border-[#08027d] text-black hover:text-[#08027d] px-5 py-1 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "cluster",
      label: "Cluster",
      children: (
        <div className="border border-gray-300 rounded-md px-5 py-5">
          <div className="grid gap-4 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="peerHostname"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                This peer hostname
              </label>
              <div className="relative">
                <Input
                  disabled
                  id="peerHostname"
                  value={peerHostname}
                  onChange={(e) => setPeerHostname(e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  suffix={
                    <InfoCircleOutlined className="text-blue-500 cursor-pointer" />
                  }
                />
              </div>
              <small className="text-gray-500">
                How this peer should be referred from other Flussonic Media
                Server peers
              </small>
            </div>

            <div>
              <label
                htmlFor="clusterKey"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Cluster key
              </label>
              <div className="relative">
                <Input
                  id="clusterKey"
                  value={clusterKey}
                  onChange={(e) => setClusterKey(e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  suffix={
                    <InfoCircleOutlined className="text-blue-500 cursor-pointer" />
                  }
                />
              </div>
              <small className="text-gray-500">
                Must be the same on all clustered peers
              </small>
            </div>
          </div>

          <div className="overflow-x-auto bg-auto border border-gray-200 rounded-md">
            <Table columns={columns} dataSource={clusters} pagination={false} />
          </div>

          <div className="mt-6 flex justify-start gap-2">
            <button
              onClick={handleClusterSave}
              className="transition-all shadow-md cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1 rounded-md"
            >
              Save
            </button>
            <button
              onClick={handleClusterCancel}
              className="transition-all shadow-md cursor-pointer border border-gray-300 hover:border-[#08027d] text-black hover:text-[#08027d] px-5 py-1 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <Content>
        <div className="lg:px-0 px-4">
          {/* Mobile Title */}
          <div className="md:hidden mt-5 mb-5">
            <h1 className="text-2xl font-semibold">Cluster</h1>
          </div>
          <Tabs defaultActiveKey="cluster" items={items} />
        </div>
      </Content>
    </AppLayout>
  );
}

export default Cluster;
