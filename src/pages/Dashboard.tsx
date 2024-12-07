import React from "react";
import { IoFolderOutline } from "react-icons/io5";

const DashboardPage = () => {
  return (
    <div className="flex flex-row h-[1200px]">
      {/* Main Page */}
      <div className="flex flex-col p-3">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <div className="flex flex-row gap-4">
          {/* data indikator */}
          <div className="flex flex-col border-2 gap-y-3 p-2 bg-gray-300 w-[250px] h-[200px] rounded-[5px]">
            <h1 className="font-bold border-b-2 border-gray-500 ">
              Data Indikator
            </h1>
            <div className="flex flex-row gap-3 ">
              <IoFolderOutline size={28} />
              <div className="bg-blue-200">20 files</div>
            </div>
          </div>

          {/* data penilaian */}
          <div className="flex flex-col border-2 gap-y-3 p-2 bg-gray-300 w-[250px] h-[200px] rounded-[5px]">
            <h1 className="font-bold border-b-2 border-gray-500 ">
              Data Penilaian
            </h1>
            <div className="flex flex-row gap-3 ">
              <IoFolderOutline size={28} />
              <div className="bg-blue-200">20 files</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
