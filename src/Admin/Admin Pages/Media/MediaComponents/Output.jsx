import { useState } from 'react';
import { Tabs, Switch, Select, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";
import { InfoCircleOutlined, CopyOutlined, CheckCircleOutlined } from "@ant-design/icons";
import AppLayout from '../../../Admin Components/AppLayout';

const Output = () => {
  const [isMobile, setIsMobile] = useState(false);

  const InputWithToggle = ({ label, defaultValue }) => {
    const [toggleValue, setToggleValue] = useState('none');
    const [value, setValue] = useState(defaultValue);
    const [copied, setCopied] = useState(false);

    const handleToggle = (option) => {
      setToggleValue(option);
    };

    const handleCopy = () => {
      navigator.clipboard.writeText(value).then(() => {
        message.success("Copied")
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error("Failed to copy: ", err);
      });
    };

    const handleInputChange = (e) => {
      setValue(e.target.value);
    };

  // input and toggler styling
    return (
      <div className="mb-4">
        <label className="block text-xs font-medium text-green-600 dark:text-gray-300 mb-1">
          {label}
        </label>
        <div className="flex items-center">
          {/* Custom 3-way Toggle */}
          <div className="flex bg-gray-200 dark:bg-gray-700 rounded-md p-1 space-x-1">
            <button
              onClick={() => handleToggle('except')}
              className={`cursor-pointer px-3 py-1 rounded-md text-xs font-medium ${toggleValue === 'except' ? 'bg-red-500 text-white' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Except
            </button>
            <button
              onClick={() => handleToggle('none')}
              className={`cursor-pointer px-3 py-1 rounded-md text-xs font-medium ${toggleValue === 'none' ? 'bg-white dark:bg-gray-800' : 'text-gray-700 dark:text-gray-300'}`}
            >
              {" "}
            </button>
            <button
              onClick={() => handleToggle('only')}
              className={`cursor-pointer px-3 py-1 rounded-md text-xs font-medium ${toggleValue === 'only' ? 'bg-green-500 text-white' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Only
            </button>
          </div>

          {/* Input Field */}
          <input
            value={value}
            onChange={handleInputChange}
            className="w-full ml-3 placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
            placeholder="Enter value..."
            aria-label="Input Value"
          />

          {/* Copy Button */}
          <Button
            onClick={handleCopy}
            className={
              copied
                ? "ml-2 p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                : "ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }
            title="Copy to clipboard"
            icon={copied ? <CheckCircleOutlined className="w-5 h-5" /> : <CopyOutlined className="w-5 h-5" />}
            aria-label="Copy to Clipboard"
          />
        </div>
        {copied && (
          <div className="mt-2 text-green-500 text-sm flex items-center">
            <CheckCircleOutlined className="w-4 h-4 mr-1" />
            Copied!
          </div>
        )}
      </div>
    );
  };

  return (
    <AppLayout>
      {/* Tabs */}
      <div
        className={`scrollHide w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
          isMobile ? "px-2" : "px-4"
        }`}
      >
        <Tabs
          defaultActiveKey="5"
          className="mb-0"
          size={isMobile ? "small" : "middle"}
        >
          <TabPane tab={<Link to="/media/overview">Overview</Link>} key="1" />
          <TabPane tab={<Link to="/media/input">Input</Link>} key="2" />
          <TabPane
            tab={<Link to="/media/transcoder">Transcoder</Link>}
            key="3"
          />
          <TabPane tab={<Link to="/media/dvr">DVR</Link>} key="4" />
          <TabPane tab={<Link to="/media/output">Output</Link>} key="5" />
          <TabPane tab={<Link to="/media/epg">EPG</Link>} key="6" />
          <TabPane tab={<Link to="/media/auth">Auth</Link>} key="7" />
          <TabPane
            tab={<Link to="/media/playsessions">Play sessions</Link>}
            key="8"
          />
        </Tabs>
      </div>

      {/* Output Tab Content */}
      <div className="p-4 h-[calc(100vh-150px)] overflow-y-auto">
        {/* inputs */}
          <div className="flex items-center mb-2">
            <div className="w-full bg-white dark:bg-gray-800shadow-lg mt-3 mb-3 pb-1 border-b border-gray-300">
              <InputWithToggle
                label="HLS Apple HLS standard URL. All extra tracks in distinct playlists"
                defaultValue="http://15.235.193.163/HBO_Max/index.m3u8"
              />
              <InputWithToggle
                label="HLS Non-Apple devices standard URL. All tracks in a single playlist"
                defaultValue="http://15.235.193.163/HBO_Max/video.m3u8"
              />
              <InputWithToggle
                label="EMBED"
                defaultValue="http://15.235.193.163/HBO_Max/embed.html"
              />
               <InputWithToggle
                label="MSS"
                defaultValue="http://15.235.193.163/HBO_Max.isml/manifest"
              />
              <InputWithToggle
                label="MPEG-TS"
                defaultValue="http://15.235.193.163/HBO_Max/mpegts"
              />
              <InputWithToggle
                label="DASH"
                defaultValue="http://15.235.193.163/HBO_Max/index.mpd"
              />
              <InputWithToggle
                label="RTMP is not configured yet, please follow global config page."
                defaultValue="RTMP is not configured yet, please follow global config page."
              />
               <InputWithToggle
                label="RTSP is not configured yet, please follow global config page."
                defaultValue="RTSP is not configured yet, please follow global config page."
              />
                <InputWithToggle
                label="M4F Video Backhaul Protocol (fragmented)"
                defaultValue="m4f://15.235.193.163/HBO_Max"
              />
                <InputWithToggle
                label="M4S Video Backhaul Protocol (live)"
                defaultValue="m4s://15.235.193.163/HBO_Max"
              />
              <InputWithToggle
                label="SHOUTCast"
                defaultValue="http://15.235.193.163/HBO_Max/shoutcast"
              />
              <InputWithToggle
                label="SRT is not configured yet, please follow global config page."
                defaultValue="SRT is not configured yet, please follow global config page."
              />
              <InputWithToggle
                label="JPEG"
                defaultValue="http://15.235.193.163/HBO_Max/preview.jpg"
              />
              <InputWithToggle
                label="MSE-LD"
                defaultValue="ws://15.235.193.163/HBO_Max/mse_ld"
              />
              <InputWithToggle
                label="API"
                defaultValue="http://15.235.193.163/HBO_Max/media_info.json"
              />
              <InputWithToggle
                label="API"
                defaultValue="http://15.235.193.163/HBO_Max/recording_status.json"
              />
            </div>
          </div>

        {/* CMAF Packager */}
        <div className="mb-6">
          <h3 className="text-base text-gray-400 font-semibold mb-2">
            CMAF Packager (required for LL-HLS) <InfoCircleOutlined />
          </h3>
          <div className="flex items-center gap-5">
            <span><input type="radio" name="cmaf" /> enabled</span>
            <span><input type="radio" name="cmaf" /> disabled</span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="mb-6">
          <h3 className="flex gap-2 text-base text-gray-400 font-semibold mb-2">
            Thumbnails Generate picture for each output segment
            <InfoCircleOutlined />
          </h3>
          <div className="flex items-center gap-5">
            <span><input type="radio" name="thumbnail" /> enabled</span>
            <span><input type="radio" name="thumbnail" /> on demand</span>
            <span><input type="radio" name="thumbnail" /> disabled</span>
          </div>
        </div>

        {/* Max Sessions */}
        <div className="mb-4">
          <input
            placeholder="Max sessions: maximum simultaneous users for this media"
            className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
          />
        </div>

        {/* Client Timeout */}
        <div className="mb-6">
          <input
            placeholder="Client timeout: after this timeout from last client ondemand stream will be turned off"
            className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
          />
        </div>

        {/* Additional Options */}
        <div>
          <h2 className="text-xl font-semibold mb-5 mt-7">Additional options for</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Segment based protocols */}
            <div>
              <h3 className="text-base font-semibold mb-2">
                Segment based protocols (HLS, HDS, DASH)
              </h3>
              <div className="flex flex-col mb-5">
                <span className="font-semibold  text-gray-500">
                  Generate audio-only HLS playlists
                  <span className="text-sm">
                    Required by Apple validation rules <InfoCircleOutlined />
                  </span>
                </span>
                <div className="flex items-center gap-5 mt-2">
                  <span><input type="radio" name="audio_hls" /> disabled</span>
                  <span><input type="radio" name="audio_hls" /> enabled</span>
                </div>
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  placeholder="Segment count (number of segments the playlist should have)"
                  className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
                />
              </div>
              <div className="mb-2">
                <input
                  placeholder="Segment duration: number of seconds each segment takes"
                  className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
                />
              </div>
              <div className="mb-2">
                <input
                  placeholder="URL prefix: enables absolute urls in playlists"
                  className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-xs font-bold mb-1">
                  HLS SCTE-35
                </label>
                <select
                  size="small"
                  defaultValue="- Not selected -"
                  style={{ width: "100%" }}
                  className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
                >
                  <option value="- Not selected -">- Not selected -</option>
                  <option value="aws">aws</option>
                  <option value="scte35">scte35</option>
                  <option value="rfc8216">rfc8216</option>
                </select>
              </div>
            </div>

            {/* Persistent protocols */}
            <div>
              <h3 className="text-base font-semibold mb-2">
                Persistent protocols (HTTP MPEG-TS, RTMP, RTSP)
              </h3>
              <div className="flex flex-col mb-5">
                <span className="font-semibold  text-gray-500">
                  Prepush Prepils filis player buffer for instant playback
                  <InfoCircleOutlined />
                </span>
                <div className="flex items-center gap-5 mt-2">
                  <span><input type="radio" name="prepush" /> disabled</span>
                  <span><input type="radio" name="prepush" /> enabled</span>
                  <span><input type="radio" name="prepush" /> enabled specific</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-8">MPEG-TS specific</h3>
                <div className="mb-2">
                  <input
                    placeholder="Provider"
                    className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
                  />
                </div>
                <div className="mb-2">
                  <input
                    placeholder="stream-title"
                    className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
                  />
                </div>
                <div>
                  <input
                    placeholder="Program ID"
                    className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Subtitles position (from Image 4) */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Subtitles position</h3>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-full">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Align
                </label>
                <Select
                  className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
                >
                  <option value="- Not selected -">- Not selected -</option>
                  <option value="left">left</option>
                  <option value="center">center</option>
                  <option value="right">right</option>
                </Select>
              </div>
              <div className="w-full">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Vertical align
                </label>
                <Select
                  className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
                >
                  <option value="- Not selected -">- Not selected -</option>
                  <option value="top">top</option>
                  <option value="middle">middle</option>
                  <option value="bottom">bottom</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Logo (from Image 3) - Basic structure */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Logo</h3>
            <div className="flex items-center space-x-4 mb-2">
              <input
                placeholder="Width"
                className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
              />
              <input
                placeholder="Height"
                className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
              />
            </div>
            <div className="flex items-center space-x-4 mb-2">
              <input
                placeholder="Top"
                className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
              />
              <input
                placeholder="Bottom"
                className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
              />
            </div>
            <div className="flex items-center space-x-4">
              <input
                placeholder="Left"
                className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
              />
              <input
                placeholder="Right"
                className="w-full placeholder:font-semibold border border-gray-400 focus:outline-none hover:border-blue-700 focus:border-blue-800 px-3 py-1.5 rounded-md"
              />
            </div>
            <div className="mt-4">
              <button className="cursor-pointer px-3 py-1.5 rounded-md text-white font-semibold bg-blue-800 hover:bg-blue-700">Select</button>
              <button className="ml-2 cursor-pointer px-3 py-1.5 rounded-md text-white font-semibold bg-red-500 hover:bg-red-600" type="button">
                Remove
              </button>
            </div>
          </div>

          {/* Push live video to certain URLs (from Image 3) - Basic structure */}
          <div className="col-span-full mt-8">
            <h3 className="text-lg font-semibold mb-2">
              Push live video to certain URLs <InfoCircleOutlined />
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Enabled
                    </th>
                    <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Timeout
                    </th>
                    <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Retry timeout
                    </th>
                    <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Limit
                    </th>
                    <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border-b border-gray-200 text-sm">
                      <Switch size="small" />
                    </td>
                    <td className="px-3 py-2 border-b border-gray-200 text-sm">
                      <Input size="small" />
                    </td>
                    <td className="px-3 py-2 border-b border-gray-200 text-sm">
                      <Input size="small" />
                    </td>
                    <td className="px-3 py-2 border-b border-gray-200 text-sm">
                      <Input size="small" />
                    </td>
                    <td className="px-3 py-2 border-b border-gray-200 text-sm">
                      <Input size="small" />
                    </td>
                    <td className="px-3 py-2 border-b border-gray-200 text-sm">
                      {/* Status indicator */}
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-8">
          <Button danger>
            Delete Stream
          </Button>
          <button className="shadow-md cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1 rounded-md" >
            Save
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Output;
