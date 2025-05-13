import { useState } from 'react';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { Input } from 'antd';
import { Select } from 'antd';
import { Switch } from 'antd';
import { Space } from 'antd';
import { Card } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import AppLayout from '../../../Admin Components/AppLayout';

const { TabPane } = Tabs;

const EditStream = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [template, setTemplate] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [inputMediaInfo, setInputMediaInfo] = useState({ video: '', audio: '' });
  const [outputMediaInfo, setOutputMediaInfo] = useState({ video: '', audio: '' });
    const [htmlCode, setHtmlCode] = useState('<iframe style="width:640px; height:480px;" allowfullscreen src="http://example.com"></iframe>');

  const templateOptions = [
    { label: 'Not selected', value: '' },
    { label: 'Template 1', value: 'template1' },
    { label: 'Template 2', value: 'template2' },
  ];

  return (
    <AppLayout>

    <div className="min-h-screen">
      {/* Tabs */}
      <div
        className={`scrollHide w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
          isMobile ? "px-2" : "px-4"
        }`}
      >
        <Tabs
          defaultActiveKey="1"
          className="mb-0"
          size={isMobile ? "small" : "middle"}
        >
          <TabPane tab={<Link to="/media/overview">Overview</Link>} key="1" />
          <TabPane tab={<Link to="/media/input">Input</Link>} key="2" />
          <TabPane tab={<Link to="/media/transcoder">Transcoder</Link>} key="3" />
          <TabPane tab={<Link to="/media/dvr">DVR</Link>} key="4" />
          <TabPane tab={<Link to="/media/output">Output</Link>} key="5" />
          <TabPane tab={<Link to="/media/epg">EPG</Link>} key="6" />
          <TabPane tab={<Link to="/media/auth">Auth</Link>} key="7" />
          <TabPane tab={<Link to="/media/playsessions">Play sessions</Link>} key="8" />
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="p-6 h-[calc(107vh-150px)] overflow-y-auto">
        {/* Heading */}
        <h1 className="text-xl font-semibold mb-5">Edit Stream</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <Card className="mb-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-48"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-48"
                    placeholder="Enter Title"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <Input.TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-48"
                    rows={3}
                    placeholder="Enter Description"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Select
                    value={template}
                    onChange={setTemplate}
                    options={templateOptions}
                    className="w-48"
                    placeholder="Select a Template"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="font-medium">Status</label>
                  <Space>
                    <Switch
                      checked={isOnline}
                      onChange={setIsOnline}
                      className="mr-2"
                    />
                    <span className={isOnline ? 'text-green-500' : 'text-gray-500'}>
                      {isOnline ? 'Online' : 'Offline'}
                    </span>
                  </Space>
                </div>
                <div className="flex items-center justify-between">
                  <label className="font-medium">
                    <span className="mr-2">Input media info</span>
                  </label>
                  <div>
                    <p>{inputMediaInfo.video || "N/A"}</p>
                    <p>{inputMediaInfo.audio || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="font-medium">
                    <span className="mr-2">Output media info</span>
                  </label>
                  <div>
                    <p>{outputMediaInfo.video || "N/A"}</p>
                    <p>{outputMediaInfo.audio || "N/A"}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Video Player Preview */}
            <Card className="mb-6">
              <div className="flex flex-col items-center justify-center h-64 bg-gray-200 rounded-md">
                <PlayCircleOutlined className="text-4xl text-gray-500" />
                <p className="mt-2 text-gray-700">Video Player Preview</p>
              </div>
            </Card>

            {/* Embed HTML Player */}
            <Card>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <label className="font-medium">
                    Embed HTML player on your website
                  </label>
                </div>
                <div className="flex gap-3 items-center">
                  <Input
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    className="w-full mr-2"
                    placeholder="Paste HTML Code"
                  />
                  <Button
                    icon={<></>}
                    onClick={() => {
                      navigator.clipboard.writeText(htmlCode);
                    }}
                  >
                    Copy HTML
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column (Placeholder for Graph) */}
          <div>
            <Card>
              <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-gray-700">
                  Graph Placeholder (In/Out/Clients)
                </span>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="w-full bg-white p-4 flex justify-end gap-4 z-10">
          <Button danger>Delete Stream</Button>
          <Button type="primary">Save</Button>
        </div>

      </div>
    </div>
    </AppLayout>
  );
};

export default EditStream;
