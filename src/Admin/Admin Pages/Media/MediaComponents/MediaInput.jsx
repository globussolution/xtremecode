import AppLayout from "../../../Admin Components/AppLayout";
import { useState } from 'react';
import { Tabs, Input, Checkbox, Button, Drawer } from 'antd';
import { Link } from 'react-router-dom';
import TabPane from "antd/es/tabs/TabPane";

function MediaInput() {
  const [isMobile, setIsMobile] = useState(false);
  const [url1, setUrl1] = useState('fake://fake');
  const [newUrl, setNewUrl] = useState('');
  const [allowPublish, setAllowPublish] = useState(true);
  const [fallbackVideo, setFallbackVideo] = useState('');
  const [videoTimeout, setVideoTimeout] = useState('');
  const [audioTimeout, setAudioTimeout] = useState('');
  const [dvrEnabled, setDvrEnabled] = useState(false);
  const [transcodeEnabled, setTranscodeEnabled] = useState(false);
  const [sourceTimeout, setSourceTimeout] = useState('');
  const [clusterIngestEnabled, setClusterIngestEnabled] = useState(false);
  const [captureAt, setCaptureAt] = useState('');
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [priority, setPriority] = useState('');
  const [sourceTimeoutUrl, setSourceTimeoutUrl] = useState('');
  const [allowIf, setAllowIf] = useState('');
  const [denyIf, setDenyIf] = useState('');
  const [clusterKey, setClusterKey] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [teletextDescriptors, setTeletextDescriptors] = useState([{ page: '', language: '', pageType: '' }]);
  const [extraParams, setExtraParams] = useState([{ key: '', value: '' }]);
  const [userAgent, setUserAgent] = useState('');

  const handleSave = () => {
    // Implement your save logic here
    console.log({
      url1,
      newUrl,
      allowPublish,
      fallbackVideo,
      videoTimeout,
      audioTimeout,
      dvrEnabled,
      transcodeEnabled,
      sourceTimeout,
      clusterIngestEnabled,
      captureAt,
      priority,
      sourceTimeoutUrl,
      allowIf,
      denyIf,
      clusterKey,
      headers,
      teletextDescriptors,
      extraParams,
      userAgent,
    });
  };

  const handleDeleteStream = () => {
    // Implement your delete stream logic here
    console.log("Delete Stream clicked");
  };

  const showDrawer = () => {
    setOptionsVisible(true);
  };

  const closeDrawer = () => {
    setOptionsVisible(false);
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleHeaderChange = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handleAddTeletextDescriptor = () => {
    setTeletextDescriptors([...teletextDescriptors, { page: '', language: '', pageType: '' }]);
  };

  const handleTeletextDescriptorChange = (index, field, value) => {
    const newTeletextDescriptors = [...teletextDescriptors];
    newTeletextDescriptors[index][field] = value;
    setTeletextDescriptors(newTeletextDescriptors);
  };

  const handleAddExtraParam = () => {
    setExtraParams([...extraParams, { key: '', value: '' }]);
  };

  const handleExtraParamChange = (index, field, value) => {
    const newExtraParams = [...extraParams];
    newExtraParams[index][field] = value;
    setExtraParams(newExtraParams);
  };

    const items = [
    {
      key: "1",
      label: <Link to="/media/overview">Overview</Link>,
    },
    {
      key: "2",
      label: <Link to="/media/input">Input</Link>,
    },
    {
      key: "3",
      label: <Link to="/media/transcoder">Transcoder</Link>,
    },
    {
      key: "4",
      label: <Link to="/media/dvr">DVR</Link>,
    },
    {
      key: "5",
      label: <Link to="/media/output">Output</Link>,
    },
    {
      key: "6",
      label: <Link to="/media/epg">EPG</Link>,
    },
    {
      key: "7",
      label: <Link to="/media/auth">Auth</Link>,
    },
    {
      key: "8",
      label: <Link to="/media/playsessions">Play sessions</Link>,
    },
  ];

  return (
    <AppLayout>
      {/* Tabs */}
       <div
          className={`scrollHide w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
            isMobile ? "px-2" : "px-4"
          }`}
        >
          <Tabs
            defaultActiveKey="2"
            className="mb-0"
            size={isMobile ? "small" : "middle"}
            items={items}
          />
        </div>

      {/* Input Form */}
      <div className="p-4 h-[calc(100vh-150px)] overflow-y-auto">
        <div className="mb-4 flex flex-col items-start gap-2">
          <label htmlFor="url1" className="block text-gray-700 text-sm font-bold mb-2 sm:mb-0">
            URL 1
          </label>
          <div>
            <input
              id="url1"
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
              className="w-96 placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
            />
            <button className="ml-3 cursor-pointer bg-[#080097] text-white px-5 py-1.5 rounded-md" onClick={showDrawer}>Options</button>
          </div>
        </div>

        <div className="mb-4">
          <input
            placeholder="New URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
           className="w-96 placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
          />
        </div>

        <div className="mt-8 mb-8">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Publication <span className="text-gray-500">(Allow to publish to the stream)</span>
          </label>
          <Checkbox
            checked={allowPublish}
            onChange={(e) => setAllowPublish(e.target.checked)}
          >
            Enabled
          </Checkbox>
          <Checkbox
            checked={!allowPublish}
            onChange={(e) => setAllowPublish(!e.target.checked)}
          >
            Disabled
          </Checkbox>
        </div>

        <div className="mt-8 mb-8">
          <input
            placeholder="Fallback video: if all your sources become dead, an mp4 file on this VOD/path will be played"
            value={fallbackVideo}
            onChange={(e) => setFallbackVideo(e.target.value)}
            className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
          />
        </div>

        <div className="flex gap-4 mt-8 mb-8">
          <div className="flex gap-5 items-center">
            <input
              placeholder="Timeout"
              onChange={(e) => setVideoTimeout(e.target.value)}
              className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
            />
            <input
              placeholder="Video timeout"
              value={videoTimeout}
              onChange={(e) => setVideoTimeout(e.target.value)}
              className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
            />
            <input
              placeholder="Audio timeout"
              value={audioTimeout}
              onChange={(e) => setVideoTimeout(e.target.value)}
              className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
            />
          </div>
          <Checkbox
            checked={dvrEnabled}
            onChange={(e) => setDvrEnabled(e.target.checked)}
          >
            DVR
          </Checkbox>
          <Checkbox
            checked={transcodeEnabled}
            onChange={(e) => setTranscodeEnabled(e.target.checked)}
          >
            Transcode
          </Checkbox>
        </div>

        <div className="mt-8 mb-8">
          <input
            placeholder="Source timeout: number of seconds before considering the source as dead"
            value={sourceTimeout}
            onChange={(e) => setSourceTimeout(e.target.value)}
            className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
          />
        </div>

        <div className="flex gap-5 items-center mt-8 mb-8">
          <Checkbox
            checked={clusterIngestEnabled}
            onChange={(e) => setClusterIngestEnabled(e.target.checked)}
            className="mr-2"
          >
            Cluster ingest
          </Checkbox>
          <input
            placeholder="Capture at"
            value={captureAt}
            onChange={(e) => setCaptureAt(e.target.value)}
            className="w-[85%] placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
          />
        </div>

       {/* Buttons */}
        <div className="flex justify-end gap-2 mt-8">
          <Button danger onClick={handleDeleteStream}>
            Delete Stream
          </Button>
          <button className="shadow-md cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1 rounded-md" onClick={handleSave}>
            Save
          </button>
        </div>

        <Drawer
          title="Options"
          placement="right"
          width={700}
          onClose={closeDrawer}
          open={optionsVisible}
        >
          <div className="mb-4">
            <label htmlFor="priority" className="block text-gray-700 text-sm font-bold mb-2">
              Priority: this value determines the order of ingestion. The lower the value, the higher the priority
            </label>
            <Input
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-4 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="sourceTimeoutUrl" className="block text-gray-700 text-sm font-bold mb-2">
              Source timeout: specific timeout for this url
            </label>
            <Input
              id="sourceTimeoutUrl"
              value={sourceTimeoutUrl}
              onChange={(e) => setSourceTimeoutUrl(e.target.value)}
              className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-4 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="allowIf" className="block text-gray-700 text-sm font-bold mb-2">
              Allow if
            </label>
            <Input
              id="allowIf"
              value={allowIf}
              onChange={(e) => setAllowIf(e.target.value)}
              className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-4 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="denyIf" className="block text-gray-700 text-sm font-bold mb-2">
              Deny if
            </label>
            <Input
              id="denyIf"
              value={denyIf}
              onChange={(e) => setDenyIf(e.target.value)}
              className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-4 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="clusterKey" className="block text-gray-700 text-sm font-bold mb-2">
              Cluster key
            </label>
            <Input
              id="clusterKey"
              value={clusterKey}
              onChange={(e) => setClusterKey(e.target.value)}
              className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-4 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Headers
            </label>
            {headers.map((header, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder="New key"
                  value={header.key}
                  onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                  className="placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-4 py-2 rounded-md"
                />
                <Input
                  placeholder="New value"
                  value={header.value}
                  onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                  className="placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-4 py-2 rounded-md"
                />
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label htmlFor="userAgent" className="block text-gray-700 text-sm font-bold mb-2">
              User-Agent: custom HTTP header that Flussonic Media Server will use to fetch data
            </label>
            <Input
              id="userAgent"
              value={userAgent}
              onChange={(e) => setUserAgent(e.target.value)}
              className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-4 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Teletext descriptors
            </label>
            {teletextDescriptors.map((descriptor, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <Input
                  placeholder="Page"
                  value={descriptor.page}
                  onChange={(e) => handleTeletextDescriptorChange(index, 'page', e.target.value)}
                  className="placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-4 py-2 rounded-md w-24"
                />
                <Input
                  placeholder="Language"
                  value={descriptor.language}
                  onChange={(e) => handleTeletextDescriptorChange(index, 'language', e.target.value)}
                  className="placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-4 py-2 rounded-md w-32"
                />
                <Input
                  placeholder="Page type"
                  value={descriptor.pageType}
                  onChange={(e) => handleTeletextDescriptorChange(index, 'pageType', e.target.value)}
                  className="placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800px-4 py-2 rounded-md w-32"
                />
              </div>
            ))}
            <Button size="small" onClick={handleAddTeletextDescriptor}>
              + Add Teletext Descriptor
            </Button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Specify extra source params to pass
            </label>
            {extraParams.map((param, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder="New key"
                  value={param.key}
                  onChange={(e) => handleExtraParamChange(index, 'key', e.target.value)}
                  className="placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-4 py-2 rounded-md"
                />
                <Input
                  placeholder="New value"
                  value={param.value}
                  onChange={(e) => handleExtraParamChange(index, 'value', e.target.value)}
                  className="placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-4 py-2 rounded-md"
                />
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    </AppLayout>
  );
}

export default MediaInput;