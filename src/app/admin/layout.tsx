"use client"

import { app } from "@common/config/firebaseConfig";
import AdminSideBar from "@widgets/Dashboard/components/AdminSidebar";
import Header from "@widgets/Dashboard/components/Header";
import Sidebar from "@widgets/Dashboard/components/Sidebar";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      } else {
        setUser(user);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);
  return (
    <main className="min-h-screen">
      <div className="">
        <Header user={user}/>
      </div>
      <div className="flex flex-row w-full h-full">
        <AdminSideBar />
        <div className="pt-[13vh] pl-[16vw] bg-azure-50 bg-opacity-50 w-full min-h-[100vh] pb-[1vw] pr-[1vw]">{children}</div>
      </div>
    </main>
  );
}
