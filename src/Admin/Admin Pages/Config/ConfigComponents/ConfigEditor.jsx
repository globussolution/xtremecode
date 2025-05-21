import { Tabs } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; 
import AppLayout from "../../../Admin Components/AppLayout"; 


function ConfigEditor() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Function to update `isMobile` state
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const items = [
    {
      key: "1",
      label: <Link to="/config">Settings</Link>,
    },
    {
      key: "2",
      label: <Link to="/config/configeditor">Config editor</Link>,
    },
    {
      key: "3",
      label: <Link to="/config/dvr">DVR</Link>,
    },
    {
      key: "4",
      label: <Link to="/config/auth">Auth</Link>,
    },
    {
      key: "5",
      label: <Link to="/config/authbackends">Auth backends</Link>,
    },
    {
      key: "6",
      label: <Link to="/config/events">Events</Link>,
    },
  ];

  return (
    <>
      <AppLayout>
        {/* Mobile Title */}
        <div className="md:hidden px-4 py-2 mb-5 mt-3">
          <h1 className="text-2xl font-semibold text-gray-800">
            Config Editor
          </h1>
        </div>

        {/* Tabs */}
        <div
          className={`scrollHide lg:px-0 px-4 w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
            isMobile ? "px-2" : ""
          }`}
        >
          <Tabs
            defaultActiveKey="2"
            className="mb-0"
            size={isMobile ? "small" : "middle"}
            items={items}
          />
        </div>

        {/* Main content  */}
        <div className="px-4 py-3 h-[calc(100vh-150px)] overflow-y-auto lg:px-0 mt-3">
          {/* Save Button  */}
          <div className="mb-7">
            <button
              className="shadow-md cursor-pointer bg-[#08027d] hover:bg-blue-700 text-white px-5 py-1.5 rounded-md"
            >
              Save
            </button>
          </div>

          {/* Config Text Area section */}
          <div className="bg-white">
            <label
              htmlFor="config-text"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Config text
            </label>
            <textarea
              id="config-text"
              className="w-full h-80 p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={`# Global settings :
                http 80 ;
                rtmp 1935 ;
                
                pulsedb /var/lib/flussonic ;
                
                session_log /var/lib/flussonic ;
                cluster_key 0000000000000001 ;
                
                edit auth flussonic letmein ! ;
                
                # Remote sources :
                peer cluster1 {
                  cluster_key http://127.0.0.1 ;
                }
                
                # Ingest streams :
                ondemand HBO_Max {
                  disabled false ;
                  input fake://fake ;
                }
                
                stream Testing {
                  disabled ;
                }
                
                # VOD locations :
                
                vod vod {
                  storage /home ;
                }
                
                vod vod2 {
                  storage / ;
                  download ;
                }`}
            ></textarea>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export default ConfigEditor;