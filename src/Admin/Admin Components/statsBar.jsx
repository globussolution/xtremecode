import { Drawer, Button } from "antd"
import { MoreOutlined } from "@ant-design/icons"

const MobileStatsBar = ({ onShowDetails }) => {
  return (
    <div className="flex border border-gray-400 rounded-full md:hidden justify-between items-center bg-white py-1 mx-2 pr-2 pl-3 mt-3 mb-3">
      <div>
        <span className="font-semibold border-r pr-3 border-gray-400">
          STREAMS: <span className="text-blue-700">1 / 1</span>
        </span>
        <span className="font-semibold pl-3">
          IN: <span className="text-blue-700">0.267 MBPS</span>
        </span>
      </div>
      <Button
        style={{ backgroundColor: "#04004f", borderRadius: "50%" }}
        type="text"
        icon={<MoreOutlined style={{ color: "white" }} />}
        onClick={onShowDetails}
      />
    </div>
  )
}

const MobileStatsDrawer = ({ visible, onClose }) => {
  return (
    <Drawer title="Stream Statistics" placement="top" onClose={onClose} open={visible} height={200}>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between font-semibold">
          <span>STREAMS:</span>
          <span className="text-blue-700">1 / 1</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>FILES:</span>
          <span className="text-blue-700">0</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>CLIENTS:</span>
          <span className="text-blue-700">1</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>IN:</span>
          <span className="text-blue-700">0.267 MBPS</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>OUT:</span>
          <span className="text-blue-700">0.278 MBPS</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>UP:</span>
          <span className="text-blue-700">15D 05:48:01</span>
        </div>
      </div>
    </Drawer>
  )
}

const DesktopStatsBar = () => {
  return (
    <div className="hidden md:flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Streams</h1>
      <div className="flex space-x-3 border border-gray-300 rounded-full">
        <div className="px-3 font-medium py-1 border-gray-400">23.09</div>
        <div className="px-3 font-medium py-1 border-l border-gray-300">
          STREAMS: <span className="text-blue-700">1 / 1</span>
        </div>
        <div className="px-3 font-medium py-1 border-l border-gray-300">
          FILES: <span className="text-blue-700">0</span>
        </div>
        <div className="px-3 font-medium py-1 border-l border-gray-300">
          CLIENTS: <span className="text-blue-700">1</span>
        </div>
        <div className="px-3 font-medium py-1 border-l border-gray-300">
          IN: <span className="text-blue-700">0.267 MBPS</span>
        </div>
        <div className="px-3 font-medium py-1 border-l border-gray-300">
          OUT: <span className="text-blue-700">0.278 MBPS</span>
        </div>
        <div className="px-3 font-medium py-1 border-l border-gray-300">
          UP: <span className="text-blue-700">15D 05:48:01</span>
        </div>
      </div>
    </div>
  )
}

const StatsBar = {
  Mobile: MobileStatsBar,
  MobileDrawer: MobileStatsDrawer,
  Desktop: DesktopStatsBar,
}

export default StatsBar;
