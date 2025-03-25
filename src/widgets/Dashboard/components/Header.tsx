import Image from "next/image";
import React from "react";
import { User } from "firebase/auth";

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  return (
    <div className="flex h-[11vh] fixed w-full bg-white px-[2vw] py-[1vw] items-center justify-between">
      <div>
        <Image
          src="/carmellogo.png"
          alt="Carmel Polytechnic Logo"
          width={1000}
          height={1000}
          className="w-[10rem]" // Adjusted width for better fit
        />
      </div>
      {user && (
        <div className="">
           <div className="p-1 border-2 border-azure-600 rounded-full">
           <Image src={user?.photoURL || '/'} alt="" width={1000} height={1000} className="w-10 rounded-full"/>
           </div>
        </div>
      )}
    </div>
  );
}
