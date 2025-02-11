import React from "react";
import { FaRegUserCircle, FaBars } from "react-icons/fa";
import { FiBell } from "react-icons/fi";

type ItemProps = {
  isSidebarOpen: boolean; // Pastikan `isSidebarOpen` bertipe boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>; //tipe data khusus setter useState
};

const Navbar: React.FC<ItemProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  return (
    <nav
      className={`${
        isSidebarOpen ? "ml-64" : ""
      }  bg-[#3C8DBC] text-white flex justify-between px-3 py-1  items-center h-[53px]`}
    >
      {/* <Head>
        <title>Dashboard</title>
      </Head> */}

      <FaBars
        size={20}
        className="cursor-pointer hover:text-gray-300"
        onClick={() => {
          setSidebarOpen(!isSidebarOpen);
        }}
      />

      {/* Kanan: Bell dan User Icon */}
      <div className="flex ">
        <FiBell size={24} className="mr-4" />
        <div className="mr-4 ">
          <p>User</p>
        </div>
        <FaRegUserCircle size={24} />
      </div>
    </nav>
  );
};

export default Navbar;
