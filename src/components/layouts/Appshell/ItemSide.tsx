import React from "react";

import {
  MdOutlineDashboard,
  MdOutlineAssessment,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { CiDatabase } from "react-icons/ci";
import { TbReport } from "react-icons/tb";
import Sidebar, { SidebarItem } from "./Sidebar";

type ItemProps = {
  isSidebarOpen: boolean; // Pastikan `isSidebarOpen` bertipe boolean
};
const Item: React.FC<ItemProps> = ({ isSidebarOpen }) => {
  return (
    <div
      className={`fixed w-64 h-full bg-[#222d32] shadow-md ${
        isSidebarOpen ? "block" : "hidden"
      }`}
    >
      <Sidebar isSidebarOpen>
        <SidebarItem
          icon={<MdOutlineDashboard size={22} />}
          text="Dashboard"
          active
        />
        <SidebarItem icon={<CiDatabase size={22} />} text="Data Indikator" />
        <SidebarItem icon={<TbReport size={22} />} text="Penilaian" />
        <SidebarItem
          icon={<MdOutlineAssessment size={22} />}
          text="Laporan Penilaian"
        />
        <SidebarItem
          icon={<MdOutlineManageAccounts size={22} />}
          text="Kelola Data User"
        />
      </Sidebar>
    </div>
  );
};

export default Item;
