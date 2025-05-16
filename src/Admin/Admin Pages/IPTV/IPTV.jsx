import { useState } from 'react';
import { Layout, Input, Table, Space, Tabs, Button, Empty } from 'antd';
import AppLayout from "../../Admin Components/AppLayout";
import { IoAddCircleOutline } from 'react-icons/io5';

const { Content } = Layout;
const { TabPane } = Tabs;

function IPTV() {
    const [isIPTVEnabled, setIsIPTVEnabled] = useState(false);

    const handleEnableIPTV = () => {
        setIsIPTVEnabled(true);
    };

    const handleDisableIPTV = () => {
        setIsIPTVEnabled(false);
    };


const items = [
  {
    key: 'create',
    label: (
      <span className="flex items-center cursor-pointer text-lg font-bold px-3 py-1 bg-[#08027d] hover:bg-blue-700 text-white rounded-md">
        <IoAddCircleOutline />
      </span>
    ),
    children: (
        <>
      <div className="flex justify-end mb-4">
        <Button danger onClick={handleDisableIPTV}>
          Disable IPTV
        </Button>
      </div>
      <div className="p-4 bg-gray-50 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="newUsername" className="block text-gray-700 text-sm font-semibold mb-2">
              New user name
            </label>
            <Input placeholder="Enter new user name" id="newUsername" required />
            <p className="text-red-500 text-xs">required</p>
          </div>
          <div>
            <label htmlFor="maxSessions" className="block text-gray-700 text-sm font-semibold mb-2">
              Max sessions
            </label>
            <Input type="number" placeholder="Enter max sessions" id="maxSessions" />
          </div>
          <div>
            <label htmlFor="packages" className="block text-gray-700 text-sm font-semibold mb-2">
              Packages
            </label>
            <Input placeholder="Select package" id="packages" />
          </div>
        </div>
        <div className="mt-6">
          <button className="transition-all shadow-md cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1 rounded-md">
            Save
          </button>
          <button className="transition-all ml-3 shadow-md cursor-pointer border border-gray-300 hover:border-[#08027d] text-black hover:text-[#08027d] px-5 py-1 rounded-md">Cancel</button>
        </div>
      </div>
      </>
    ),
  },
  {
    key: 'users',
    label: 'Users',
    children: (
      <>
        <div className="flex justify-end mb-4">
          <Button danger onClick={handleDisableIPTV}>
            Disable IPTV
          </Button>
        </div>
        <div className="bg-gray-50 rounded-md p-4">
          <Input.Search placeholder="Filter" style={{ marginBottom: 16 }} />
          <Table
            columns={[
              { title: 'Name', dataIndex: 'name', key: 'name' },
              { title: 'Token', dataIndex: 'token', key: 'token' },
              { title: 'Max sessions', dataIndex: 'maxSessions', key: 'maxSessions' },
              { title: 'Packages', dataIndex: 'packageList', key: 'packageList' },
            ]}
            dataSource={[
              // Add your packages data here
            ]}
          />
        </div>
      </>
    ),
  },
  {
    key: 'packages',
    label: 'Packages',
    children: (
      <>
        <div className="flex justify-end mb-4">
          <Button danger onClick={handleDisableIPTV}>
            Disable IPTV
          </Button>
        </div>
        <div className="bg-gray-50 rounded-md p-4">
          <Input.Search placeholder="Filter" style={{ marginBottom: 16 }} />
          <Table
            columns={[
              { title: 'Name', dataIndex: 'name', key: 'name' },
              { title: 'Channels', dataIndex: 'channels', key: 'channels' },
              {
                title: 'Actions',
                key: 'actions',
                render: (text, record) => (
                  <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                  </Space>
                ),
              },
            ]}
            dataSource={[
              { key: '1', name: 'default', channels: 'HBO_Max, Testing' },
              // Add more user data here
            ]}
          />
        </div>
      </>
    ),
  },
];

    return (
        <AppLayout>
            <Content>
                {!isIPTVEnabled ? (
                    <div className="text-center mt-[10%]">
                        <Empty
                            description={
                                <span>
                                    IPTV is not configured
                                </span>
                            }
                        />
                        <button  
                         className="transition-all mt-3 shadow-md cursor-pointer font-semibold bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1.5 rounded-md" 
                         onClick={handleEnableIPTV}
                        >
                            Enable IPTV
                        </button>
                    </div>
                ) : (
                  <>
                  <div className="lg:px-0 px-4">
                    <Tabs defaultActiveKey="users" items={items} />
                  </div>   
                  </>
                )}
            </Content>
        </AppLayout>
    );
}

export default IPTV;