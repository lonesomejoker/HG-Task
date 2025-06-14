import Sider from "antd/es/layout/Sider";
import { useEffect, useRef } from "react";
import { MdMenu } from "react-icons/md";
import MenuMap from "../components/MenuMap";
import { useClientContext } from "../context/ClientContext";

const DashSideNav = () => {
  const { collapsed, setCollapsed } = useClientContext();
  const sidebarRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Sider
      style={{ backgroundColor: "white", margin: "0px" }}
      ref={sidebarRef}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={"18%"}
      className=" border-r-2 border-gray-200   "
    >
      <div
        className={` border-b-2 h-[4.5rem] shadow shadow-slate-200 border-gray-200 sticky top-0 z-[4]  bg-white flex items-center  ${
          collapsed ? " justify-center " : " justify-between  pl-4 pr-3"
        } `}
      >
        <div className={` flex items-center  ${collapsed && "hidden"} `}>
          <h6>Highland</h6>
          <h6 className=" text-red-700 ml-0.5">Group</h6>
        </div>

        <MdMenu
          className="text-[#6b778a] text-[1.6rem]"
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      <section
        className={`mt-[1rem] z-[1] sticky top-24  ${collapsed ? "  " : "pl-6 pr-5 "} `}
      >
        <MenuMap />
      </section>
    </Sider>
  );
};

export default DashSideNav;
