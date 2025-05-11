import AppLayout from "../../../Admin Components/AppLayout";
import TabPane from "antd/es/tabs/TabPane";
import { Tabs } from "antd"
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

function VODs() {
  const [isMobile, setIsMobile] = useState(false)

  return (
    <>
      <AppLayout>
        {/* Mobile Title */}
        <div className="md:hidden px-4 py-2">
           <h1 className="text-xl font-semibold">VODs</h1>
        </div>
        {/* Tabs */}
        <div className={`flex items-center gap-2 border-b border-gray-200 ${isMobile ? "px-2" : ""}`}>
          <button
            className={`cursor-pointer text-xl font-bold px-3 py-1 mr-5 text-white bg-[#08027d] rounded-md ${isMobile ? "mt-1" : ""}`}
          >
            <IoAddCircleOutline />
          </button>
          <Tabs defaultActiveKey="5" className="mb-0" size={isMobile ? "small" : "middle"}>
            <TabPane tab={<Link to="/">Streams</Link>} key="1" />
            <TabPane tab={<Link to="/media/templates">Templates</Link>} key="2" />
            <TabPane tab={<Link to="/media/multiplexers">Multiplexers</Link>} key="3" />
            <TabPane tab={<Link to="/media/sources">Sources</Link>} key="4" />
            <TabPane tab={<Link to="/media/vods">VODs</Link>} key="5" />
            <TabPane tab={<Link to="/media/dvbcards">DVB cards</Link>} key="6" />
          </Tabs>
        </div>
        <h1>VODs</h1>
      </AppLayout>
    </>
  );
}

export default VODs;
