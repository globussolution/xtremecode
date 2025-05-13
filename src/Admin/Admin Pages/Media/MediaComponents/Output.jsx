import AppLayout from "../../../Admin Components/AppLayout";
import { useState } from "react";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";

function Output() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <>
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


      </AppLayout>
    </>
  );
}

export default Output;
