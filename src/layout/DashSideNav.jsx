import { useEffect, useRef, useState } from "react";
import { Layout, Drawer } from "antd";
import MenuMap from "../components/MenuMap";
import { useClientContext } from "../context/ClientContext";

const { Sider } = Layout;

const DashSideNav = () => {
  const { collapsed, setCollapsed,isMobile,setIsMobile } = useClientContext();
  const sidebarRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const sidebarContent = (
    <>
      <div
        className={` md:border-b-2 md:h-[4.5rem] md:shadow shadow-slate-200 border-gray-200 sticky top-0 z-[4] bg-white flex items-center ${
          collapsed ? "justify-center" : "justify-between pl-4 pr-3"
        }`}
      >
        <div className={`flex items-center gap-1 `}>
          <img
            className=" object-cover h-[3rem]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-CdHpUVDydvDtw5GDBx-pX-80iezQNg_uw&s"
          />
          <p className={`${collapsed && "hidden"} font-[700] font-heading`}>
            Highland
            <span className="text-red-700 ml-0.5">Group</span>
          </p>
        </div>
      </div>
      <section
        className={`mt-[1rem] z-[1] sticky top-24 ${
          collapsed ? "" : "pl-6 pr-5"
        }`}
      >
        <MenuMap />
      </section>
    </>
  );

  return isMobile ? (
    <Drawer
      placement="left"
      onClose={() => setCollapsed(true)}
      open={!collapsed}
      width="80%"
    >
      <div ref={sidebarRef}>{sidebarContent}</div>
    </Drawer>
  ) : (
    <Sider
      style={{ backgroundColor: "white", margin: "0px" }}
      ref={sidebarRef}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width="18%"
      className="border-r-2 border-gray-200"
    >
      {sidebarContent}
    </Sider>
  );
};

export default DashSideNav;
