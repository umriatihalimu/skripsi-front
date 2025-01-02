import React, { ReactNode, useState } from "react";

import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Item from "./ItemSide";

const disableNavbar = ["/404", "/register", "/login"];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  return (
    <div className={`flex `}>
      <div
        className={`self-start ${isSidebarOpen ? "block" : "hidden w-full"}`}
      >
        <Item isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="flex-grow">
        <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div
          className="p-4"
          style={{ marginLeft: isSidebarOpen ? "250px" : "0px" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
