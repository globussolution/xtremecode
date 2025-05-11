import React from "react"

import { useState, useEffect } from "react"
import { Layout, Menu, theme, Drawer, Button } from "antd"
import { MenuOutlined } from "@ant-design/icons"
import { FaPlay } from "react-icons/fa"
import { BsFillBarChartFill } from "react-icons/bs"
import { IoSettingsSharp } from "react-icons/io5"
import { SiBlockchaindotcom } from "react-icons/si"
import { RiTv2Fill } from "react-icons/ri"
import { PiSecurityCameraFill } from "react-icons/pi"
import { FaHeadset } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import StatsBar from "./statsBar"
import defaultSmallLogo from "../../assets/images/smalllogo.png"
import defaultFullLogo from "../../assets/images/fulllogo.png"

const { Content, Sider } = Layout

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}

// sidebar items
const items = [
  getItem("Media", "1", <FaPlay />),
  getItem("Pulse", "2", <BsFillBarChartFill />),
  getItem("Config", "3", <IoSettingsSharp />),
  getItem("Cluster", "4", <SiBlockchaindotcom />),
  getItem("IPTV", "5", <RiTv2Fill />),
  getItem("IP Cameras", "6", <PiSecurityCameraFill />),
  getItem("Support", "7", <FaHeadset />),
  getItem("Logout", "8", <BiLogOut />),
]

const AppLayout = ({ children, fullLogo = defaultFullLogo, smallLogo = defaultSmallLogo }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [statsDrawerVisible, setStatsDrawerVisible] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // Check if the screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
      {/* Mobile Sidebar Drawer */}
      <Drawer
        title={
          <div className="flex items-center">
            <img src={smallLogo || "/placeholder.svg"} alt="Logo" className="w-[40px]" />
            <span className="text-lg font-bold">Flussonic</span>
          </div>
        }
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        bodyStyle={{ padding: 0, backgroundColor: "#04004F" }}
        headerStyle={{ backgroundColor: "#04004F", color: "white", borderBottom: "1px solid rgba(255,255,255,0.2)" }}
      >
        <Menu
          className="font-semibold"
          style={{ backgroundColor: "#04004F" }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Drawer>

      {/* Stats Drawer for Mobile */}
      <StatsBar.MobileDrawer visible={statsDrawerVisible} onClose={() => setStatsDrawerVisible(false)} />

      {/* Desktop Sidebar */}
      <Sider
        style={{ backgroundColor: "#04004F" }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="hidden md:block"
        breakpoint="lg"
        collapsedWidth={80}
      >
        <div className="pt-4 pb-3 px-5">
          <img
            className={`transition-all duration-300 ${collapsed ? "w-[40px]" : "w-[140px]"}`}
            src={collapsed ? smallLogo : fullLogo}
            alt="Logo"
          />
        </div>
        <Menu
          className="border-t border-gray-500 font-semibold"
          style={{ paddingTop: "15%", marginTop: "3%", backgroundColor: "#04004F" }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout>
        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between bg-[#04004F] text-white p-3">
          <img src={smallLogo || "/placeholder.svg"} alt="Logo" className="h-7" />
          <Button
            type="text"
            style={{ fontSize: "20px" }}
            icon={<MenuOutlined style={{ color: "white" }} />}
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>

        {/* Mobile Stats Bar */}
        <StatsBar.Mobile onShowDetails={() => setStatsDrawerVisible(true)} />

        <Content style={{ padding: isMobile ? "0" : "15px 20px", backgroundColor: "white" }}>
          <div
            style={{
              padding: 0,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Desktop Stats Bar */}
            <StatsBar.Desktop />

            {/* Main Content */}
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout;
