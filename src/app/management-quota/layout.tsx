"use client"
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {app} from "@common/config/firebaseConfig"

const auth = getAuth(app);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  if (loading) {
    return <div className="w-full min-h-screen flex items-center justify-center text-gray-700 text-lg">Loading...</div>;
  }

  return (
      <div>{user ? children : null}</div>
  );
}
