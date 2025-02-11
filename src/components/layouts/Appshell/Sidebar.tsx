import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

type itemSidebarProps = {
  icon: React.ReactNode;
  href: string;
  text: string;
  active?: boolean;
  alert?: boolean;
};
type SidebarProps = {
  children: React.ReactNode; // untuk menerima elemen-elemen seperti SidebarItem
  isSidebarOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="fixed w-64 items-center">
      <div className="bg-[#3C8DBC] text-white flex justify-center gap-x-4 px-3 py-1.5 items-center">
        {/* svg */}
        <svg
          id="logo-85"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="ccustom w-16 h-16px text-[#0f4053]"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 0C15.5228 0 20 4.47715 20 10V0H30C35.5228 0 40 4.47715 40 10C40 15.5228 35.5228 20 30 20C35.5228 20 40 24.4772 40 30C40 32.7423 38.8961 35.2268 37.1085 37.0334L37.0711 37.0711L37.0379 37.1041C35.2309 38.8943 32.7446 40 30 40C27.2741 40 24.8029 38.9093 22.999 37.1405C22.9756 37.1175 22.9522 37.0943 22.9289 37.0711C22.907 37.0492 22.8852 37.0272 22.8635 37.0051C21.0924 35.2009 20 32.728 20 30C20 35.5228 15.5228 40 10 40C4.47715 40 0 35.5228 0 30V20H10C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM18 10C18 14.4183 14.4183 18 10 18V2C14.4183 2 18 5.58172 18 10ZM38 30C38 25.5817 34.4183 22 30 22C25.5817 22 22 25.5817 22 30H38ZM2 22V30C2 34.4183 5.58172 38 10 38C14.4183 38 18 34.4183 18 30V22H2ZM22 18V2L30 2C34.4183 2 38 5.58172 38 10C38 14.4183 34.4183 18 30 18H22Z"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <circle cx="50" cy="50" r="40" />
          </path>
        </svg>
        {/*batas  svg */}

        <p className="text-2xl font-bold text-white">SIPK-SPBE</p>
      </div>

      <div className="bg-[#222d32] pt-28">
        <ul>{children}</ul>

        <div className="flex justify-center">
          <button
            onClick={() => {
              Cookies.remove("cobit_token");
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="flex justify-center items-center mt-20  p-1 font-semibold uppercase bg-[#374950] text-white w-1/2 rounded-sm shadow-sm hover:bg-[#4E636B]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

export function SidebarItem({ icon, text, active, href }: itemSidebarProps) {
  return (
    <li
      className={`flex items-center pl-11 py-2 px-3  cursor-pointer text-white transition-colors  ${
        active ? "bg-[#374950]" : "hover:bg-[#4E636B] "
      }`}
    >
      <Link href={href} className="flex">
        {icon}
        <span className={`pl-3 cursor-pointer transition-colors ${active}`}>
          {text}
        </span>
      </Link>
    </li>
  );
}
