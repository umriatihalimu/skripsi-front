import Link from "next/link";
import React from "react";

const MenuDomainSpbe: React.FunctionComponent = () => {
  return (
    <>
      <div className="dropdown dropdown-bottom">
        <div className="flex items-center gap-3 ">
          <div tabIndex={0} role="button" className="btn m-1">
            Domain SPBE
          </div>
          <p className="bg-gray-100 p-1 px-5 text-gray-500">Manajemen SPBE</p>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <Link href={"#"}>Kebijakan Internal SPBE</Link>
          </li>
          <li>
            <Link href={"#"}>Tata Kelola SPBE</Link>
          </li>
          <li>
            <Link href={"#"}>Manajemen SPBE</Link>
          </li>
          <li>
            <Link href={"#"}>Layanan SPBE </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuDomainSpbe;
