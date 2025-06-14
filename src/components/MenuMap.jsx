import { LuLayoutDashboard } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { useClientContext } from "../context/ClientContext";
import { IoInfinite } from "react-icons/io5";

const MenuMap = () => {
  const { collapsed, setCollapsed } = useClientContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (item) => {
    navigate(item.path);
  };
  const menuItems = [
    {
      key: "1",
      label: "Task 1",
      path: "/",
      icon: <LuLayoutDashboard />,
    },
    {
      key: "2",
      label: "Task 2",
      path: "/infinite-scroll",
      icon: <IoInfinite />,
    },
  ];
  return (
    <section
      className={`flex flex-col ${
        collapsed ? "gap-[1.6rem]" : "gap-[1.2rem]"
      } relative `}
    >
      {menuItems?.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <div
            key={item.key}
            className={`flex flex-col relative rounded-[10px] duration-200 ease-in-out `}
          >
            {isActive && !collapsed && (
              <div className=" w-1 h-[1.7rem] bg-primary absolute -left-[1.42rem]"></div>
            )}
            <div
              className={`flex gap-2.5 items-center cursor-pointer ${
                isActive ? "text-primary " : "text-neutral-700 "
              } ${collapsed ? "justify-center" : " justify-start"}  `}
              onClick={() => handleNavigation(item)}
            >
              <i className={`text-[1.3rem] font-extrabold`}>{item.icon}</i>
              <p
                className={` font-plex_sans text-[14.5px] xl:text-[15px] tracking-normal ${
                  collapsed ? "hidden" : "block"
                }`}
              >
                {item.label}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default MenuMap;
