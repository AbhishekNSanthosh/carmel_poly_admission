import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { FaHome, FaUsers } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { LuFileStack } from "react-icons/lu";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@common/config/firebaseConfig";

export default function AdminSideBar() {
  const location = usePathname();

  const auth = getAuth(app);
  const menuItems = [
    {
      title: "Applications",
      link: "/admin/applications",
      icon: <LuFileStack className="text-[22px]" />,
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <div className="w-[15vw] fixed bg-white h-[90vh] mt-[10vh] text-gray-700">
      <div className="w-full h-full">
        <div className="mt-[8vh] w-full flex flex-col gap-1">
          {menuItems?.map((menuItem, index) => {
            const isActive = location.startsWith(menuItem.link);

            return (
              <Link
                className={`flex  flex-row items-center gap-2 text-2xl py-2 relative w-full px-[2vw] 
      ${isActive ? "bg-azure-50 text-azure-600" : ""}`}
                key={index}
                href={menuItem?.link}
              >
                {isActive && (
                  <div className="h-full w-2 rounded-r-[20px] absolute left-0 top-0 bg-azure-600"></div>
                )}
                <div className="flex mt-[-3px]">{menuItem?.icon}</div>
                <span className="text-[1.1rem]">{menuItem?.title}</span>
              </Link>
            );
          })}
        </div>
        <div className="absolute bottom-5 px-5 w-full">
          <button
            onClick={() => {
              handleLogout();
            }}
            className="bg-red-50 flex items-center gap-3 justify-center font-medium text-red-600 w-full px-3 py-3 rounded-[15px]"
          >
            <CiLogout /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
