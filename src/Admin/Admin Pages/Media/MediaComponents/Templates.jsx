import TabPane from "antd/es/tabs/TabPane";
import AppLayout from "../../../Admin Components/AppLayout";
import { Tabs } from "antd";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Templates() {
  const [isMobile, setIsMobile] = useState(false);

  const items = [
    {
      key: "1",
      label: <Link to="/">Streams</Link>,
    },
    {
      key: "2",
      label: <Link to="/media/templates">Templates</Link>,
    },
    {
      key: "3",
      label: <Link to="/media/multiplexers">Multiplexers</Link>,
    },
    {
      key: "4",
      label: <Link to="/media/sources">Sources</Link>,
    },
    {
      key: "5",
      label: <Link to="/media/vods">VODs</Link>,
    },
    {
      key: "6",
      label: <Link to="/media/dvbcards">DVB cards</Link>,
    },
  ];

  return (
    <>
      <AppLayout>
        {/* Mobile Title */}
        <div className="md:hidden px-4 py-2">
          <h1 className="text-xl font-semibold">Templates</h1>
        </div>

        {/* Tabs */}
        <div
          className={`scrollHide w-full overflow-x-auto lg:px-0 px-2 flex items-center gap-2 border-b border-gray-200 ${
            isMobile ? "px-2" : ""
          }`}
        >
          <Link to="/media/create">
            <button
              className={`cursor-pointer text-xl font-bold px-3 py-1 mr-5 text-white bg-[#08027d] rounded-md ${
                isMobile ? "mt-1" : ""
              }`}
            >
              <IoAddCircleOutline />
            </button>
          </Link>
          <Tabs
            defaultActiveKey="2"
            className="mb-0"
            size={isMobile ? "small" : "middle"}
            items={items}
          />
        </div>

        <h1 className="text-center mt-10 font-semibold">No templates found</h1>
      </AppLayout>
    </>
  );
}

export default Templates;
