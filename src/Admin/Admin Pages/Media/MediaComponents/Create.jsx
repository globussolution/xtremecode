import { Tabs } from "antd";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import AppLayout from "../../../Admin Components/AppLayout";
import { useState } from "react";
import TabPane from "antd/es/tabs/TabPane";

function Create() {
  const [isMobile, setIsMobile] = useState(false);
  const items = [
    {
      key: "0",
      label: (
        <Link to="/media/create">
          <button
            className={`cursor-pointer text-xl font-bold px-3 py-1 mr-5 text-white bg-[#08027d] rounded-md ${
              isMobile ? "mt-1" : ""
            }`}
          >
            <IoAddCircleOutline />
          </button>
        </Link>
      ),
    },
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
        <div className="md:hidden px-4 py-2 mb-5 mt-3">
          <h1 className="text-2xl font-semibold">Create</h1>
        </div>

        {/* Tabs */}
        <div
          className={`scrollHide w-full overflow-x-auto lg:px-0 px-2 flex items-center gap-2 border-b border-gray-200 ${
            isMobile ? "px-2" : ""
          }`}
        >
          <Tabs
            defaultActiveKey="0"
            className="mb-0"
            size={isMobile ? "small" : "middle"}
            items={items}
          />
        </div>

        {/* Create Section */}
        <div className="lg:px-0 px-4 mt-5">
          <h1 className="text-xl font-semibold mb-3 ml-1">Create</h1>
          <div className="shadowClass bg-white rounded-md p-4">
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="streamName"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Stream name
                </label>
                <input
                  type="text"
                  id="streamName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                <p className="text-red-500 text-xs">required</p>
              </div>
              <div>
                <label
                  htmlFor="sourceUrl"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Source URL (if available)
                </label>
                <input
                  type="text"
                  id="sourceUrl"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="template"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Template
                </label>
                <div className="relative">
                  <select
                    id="template"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
                  >
                    <option>- Not selected -</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-3 items-center justify-start mt-4">
              <button className="cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white font-semibold py-1.5 px-8 rounded focus:outline-none focus:shadow-outline">
                Save
              </button>
              <button className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1.5 px-8 rounded focus:outline-none focus:shadow-outline mr-2">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export default Create;
