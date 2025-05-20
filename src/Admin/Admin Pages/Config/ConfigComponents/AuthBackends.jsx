import { Tabs } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import AppLayout from "../../../Admin Components/AppLayout";

function AuthBackends(){

    const [isMobile, setIsMobile] = useState(false);

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

    return(
        <>
           <AppLayout>
            {/* Mobile Title */}
              <div className="md:hidden px-4 py-2 mb-5 mt-3">
                <h1 className="text-2xl font-semibold">Auth backends</h1>
              </div>

            <div
                className={`scrollHide lg:px-0 px-4 w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
                  isMobile ? "px-2" : ""
                }`}
              >
                <Tabs
                  defaultActiveKey="5"
                  className="mb-0"
                  size={isMobile ? "small" : "middle"}
                  items={items}
                />
              </div>
           </AppLayout>
        </>
    )
}

export default AuthBackends;