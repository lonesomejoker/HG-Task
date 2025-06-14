import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { TbHelp } from "react-icons/tb";
import { IoGridOutline } from "react-icons/io5";
import DashSideNav from "./DashSideNav";

export const AdminContext = createContext();

const menuIcons = [
  {
    icon: <TbHelp />,
    path: "",
  },
  {
    icon: <IoGridOutline />,
    path: "",
  },
];

const UserDashboardLayout = () => {
  return (
    <main className=" flex gap-0">
      <DashSideNav />
      <section className=" flex-1">
        <header className="pl-6 pr-5 z-[3] shadow shadow-slate-200 bg-white h-[4.5rem] border-b-2 border-zinc-200 flex items-center justify-end gap-4 sticky top-0">
          {menuIcons?.map((item, idx) => {
            return (
              <i key={idx} className=" text-[1.5rem]">
                {item.icon}
              </i>
            );
          })}
        </header>
        <section className="bg-slate-50 px-9 py-8 ">
          <Outlet context={{}} />
        </section>
      </section>
    </main>
  );
};

export default UserDashboardLayout;
