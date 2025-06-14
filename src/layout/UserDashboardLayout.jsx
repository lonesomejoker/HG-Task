import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import DashSideNav from "./DashSideNav";
import { useClientContext } from "../context/ClientContext";
import { MdMenu } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";

export const AdminContext = createContext();

const UserDashboardLayout = () => {
  const { collapsed, setCollapsed } = useClientContext();

  return (
    <main className=" flex gap-0">
      <DashSideNav />
      <section className=" flex-1">
        <section className=" flex items-center justify-between sticky top-0 pl-4 pr-5 z-[3] shadow shadow-slate-200 bg-white h-[4.5rem] border-b-2 border-zinc-200">
          <MdMenu
            className="text-[#6b778a] text-[1.5rem]"
            onClick={() => setCollapsed(!collapsed)}
          />
          <header
            className={` flex items-center flex-row-reverse gap-5 justify-end `}
          >
            <img
              className={`h-[2.5rem] md:h-[3rem]  rounded-full object-cover`}
              src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/82937756529961.59b2075873405.png"
              alt="pp"
            />
            <div className="relative size-fit">
              <FiMessageSquare className=" text-[1.2rem] text-gray-400" />
              <div className=" bg-rose-500 size-[0.7rem] border-[2px] border-white rounded-full absolute  -top-1 -right-1"></div>
            </div>

            <div className="relative size-fit">
              <FaRegBell className=" text-[1.2rem] text-gray-400" />
              <div className=" bg-rose-500 size-[0.7rem] border-[2px] border-white rounded-full absolute  -top-1 -right-1"></div>
            </div>
          </header>
        </section>

        <section className="bg-slate-50 px-4 md:px-6 lg:px-9 py-4 md:py-6 lg:py-8 ">
          <Outlet context={{}} />
        </section>
      </section>
    </main>
  );
};

export default UserDashboardLayout;
