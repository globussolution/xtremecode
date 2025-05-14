import AppLayout from "../../../Admin Components/AppLayout";
import { useState } from "react";
import { Tabs, Select, Radio, Button } from "antd";
import { Link } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";

function Auth() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [authenticationType, setAuthenticationType] = useState("none");
  const [sessionKeys, setSessionKeys] = useState([]);
  const [allowedDomains, setAllowedDomains] = useState("");
  const [countryAccess, setCountryAccess] = useState("disabled");
  const [drmAuthorization, setDrmAuthorization] = useState("disabled");

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useState(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to render DRM-specific input fields
  const renderDrmInputs = () => {
    switch (drmAuthorization) {
      case "AES-128":
        return (
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="drm_id"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="keyserver*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="expires"
            />
          </div>
        );
      case "Sample AES":
        return (
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="drm_id"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="keyserver*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="expires"
            />
          </div>
        );
      case "Conax":
        return (
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="drm_id"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="keyserver*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="user_path"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="expires"
            />
          </div>
        );
      case "BuyDRM KeyOS":
        return (
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="drm_id"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="userkey*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="expires"
            />
          </div>
        );
      case "Widevine":
        return (
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="aeskey*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="iv*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="content_id"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="signer"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="keyserver"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="expires"
            />
          </div>
        );
      case "EzDRM":
        return (
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="drm_id"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="user*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="password*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="expires"
            />
          </div>
        );
      case "EzDRM Classic":
        return (
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="drm_id"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="user*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="password*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="expires"
            />
          </div>
        );
      case "PallyCon":
        return (
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="drm_id"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="enc_token*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="expires"
            />
          </div>
        );
      case "GS DRM":
        return (
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="drm_id*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="keyserver*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="expires"
            />
          </div>
        );
      case "Irdeto":
        return (
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="drm_id"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ic_host*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="account_id*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="user_name*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="password*"
            />
          </div>
        );
      case "Solocoo":
        return (
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="secret*"
            />
            <input
              type="text"
              className="shadow placeholder:text-gray-400 placeholder:font-semibold appearance-none border hover:border-blue-600 focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="site*"
            />
          </div>
        );
      case "disabled":
      default:
        return null; // No extra inputs for "disabled"
    }
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
          defaultActiveKey="7"
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
          <TabPane
            tab={<Link to="/media/playsessions">Play sessions</Link>}
            key="8"
          />
        </Tabs>
      </div>

      {/* Auth Content */}
      <div className="p-4 h-[calc(100vh-150px)] overflow-y-auto md:p-6 lg:p-8">
        {/* Authentication Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Authentication type
          </label>
          <Radio.Group
            value={authenticationType}
            onChange={(e) => setAuthenticationType(e.target.value)}
          >
            <Radio value="none">none</Radio>
            <Radio value="custom">custom</Radio>
            <Radio value="stalker">stalker</Radio>
            <Radio value="securelink">securelink</Radio>
            <Radio value="IPTV">IPTV</Radio>
            <Radio value="Watcher">Watcher</Radio>
          </Radio.Group>
        </div>

        {/* Select session keys */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select session keys
          </label>
          <Select
            mode="multiple"
            placeholder="Select session keys"
            value={sessionKeys}
            onChange={(values) => setSessionKeys(values)}
            style={{ width: "100%" }}
            options={[
              { value: "ip", label: "ip" },
              { value: "name", label: "name" },
              { value: "proto", label: "proto" },
              { value: "token", label: "token" },
            ]}
          />
        </div>

        {/* Allowed domains */}
        <div className="mb-4">
          <label
            htmlFor="allowedDomains"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Allowed domains: Limit on which domains embed.html may be played.
          </label>
          <input
            type="text"
            id="allowedDomains"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="example.com, another-domain.net"
            value={allowedDomains}
            onChange={(e) => setAllowedDomains(e.target.value)}
          />
        </div>

        {/* Limit access by country two-letter codes */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Limit access by country two-letter codes (for example: US, RU)
          </label>
          <Radio.Group
            value={countryAccess}
            onChange={(e) => setCountryAccess(e.target.value)}
          >
            <Radio value="disabled">disabled</Radio>
            <Radio value="whitelist">whitelist</Radio>
            <Radio value="blacklist">blacklist</Radio>
          </Radio.Group>
          {countryAccess !== "disabled" && (
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
              placeholder="US, RU, CA"
            />
          )}
        </div>

        {/* Require DRM authorization */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Require DRM authorization
          </label>
          <Select
            value={drmAuthorization}
            onChange={(value) => setDrmAuthorization(value)}
            style={{ width: "100%" }}
          >
            <Select.Option value="disabled">disabled</Select.Option>
            <Select.Option value="AES-128">AES-128</Select.Option>
            <Select.Option value="Sample AES">Sample AES</Select.Option>
            <Select.Option value="Conax">Conax</Select.Option>
            <Select.Option value="BuyDRM KeyOS">BuyDRM KeyOS</Select.Option>
            <Select.Option value="Widevine">Widevine</Select.Option>
            <Select.Option value="EzDRM">EzDRM</Select.Option>
            <Select.Option value="EzDRM Classic">EzDRM Classic</Select.Option>
            <Select.Option value="PallyCon">PallyCon</Select.Option>
            <Select.Option value="GS DRM">GS DRM</Select.Option>
            <Select.Option value="Irdeto">Irdeto</Select.Option>
            <Select.Option value="Solocoo">Solocoo</Select.Option>
            {/* Add other DRM options as needed */}
          </Select>

          {/* Dynamically rendered input fields based on DRM selection */}
          {renderDrmInputs()}
        </div>

        {/* Buttons */}
         <div className="flex justify-end gap-2">
             <Button danger>Delete Stream</Button>
             <Button type="primary">Save</Button>
         </div>
      </div>
    </AppLayout>
  );
}

export default Auth;