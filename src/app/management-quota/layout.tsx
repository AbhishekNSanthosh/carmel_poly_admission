"use client";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { app } from "@common/config/firebaseConfig";
import Image from "next/image";

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

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-gray-700 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div>
      {" "}
      {user && (
        <div className="p-4">
          <div className="w-full flex items-center justify-between px-6 py-4 bg-white">
            <span className="text-lg font-semibold">
              Welcome, {user.displayName}!
            </span>
            <div className="flex items-center gap-4">
              <Image
                width={100}
                height={100}
                src={user.photoURL || "/default-avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full border border-white shadow-md"
              />
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {user ? children : null}
    </div>
  );
}
