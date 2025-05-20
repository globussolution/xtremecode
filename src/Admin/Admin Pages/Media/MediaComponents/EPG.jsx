import AppLayout from "../../../Admin Components/AppLayout";
import { useState } from "react";
import { Button, Tabs } from "antd";
import { Link } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";
import { FaChevronLeft } from "react-icons/fa";

function EPG() {
  const [isMobile, setIsMobile] = useState(false);
  const items = [
  {
    key: '1',
    label: <Link to="/media/overview">Overview</Link>,
  },
  {
    key: '2',
    label: <Link to="/media/input">Input</Link>,
  },
  {
    key: '3',
    label: <Link to="/media/transcoder">Transcoder</Link>,
  },
  {
    key: '4',
    label: <Link to="/media/dvr">DVR</Link>,
  },
  {
    key: '5',
    label: <Link to="/media/output">Output</Link>,
  },
  {
    key: '6',
    label: <Link to="/media/epg">EPG</Link>,
  },
  {
    key: '7',
    label: <Link to="/media/auth">Auth</Link>,
  },
  {
    key: '8',
    label: <Link to="/media/playsessions">Play sessions</Link>,
  },
];

  return (
    <>
      <AppLayout>
        <div className="mb-5 mt-8 lg:px-0 px-3">
           <Link className="flex items-center gap-2 font-semibold text-blue-700" to="/"><FaChevronLeft className="text-sm"/> Back to media</Link>
        </div>

        {/* Tabs */}
       <div
          className={`scrollHide w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
            isMobile ? "px-2" : "px-4"
          }`}
        >
          <Tabs
            defaultActiveKey="6"
            className="mb-0"
            size={isMobile ? "small" : "middle"}
            items={items}
          />
        </div>

        <div className="p-5">
            <label className="cursor-pointer text-lg font-semibold"><input type="checkbox" /> EPG </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-8">
          <Button danger>
            Delete Stream
          </Button>
          <button className="shadow-md cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1 rounded-md">
            Save
          </button>
        </div>
      </AppLayout>
    </>
  );
}

export default EPG;