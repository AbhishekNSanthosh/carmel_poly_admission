"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

import { app } from "@common/config/firebaseConfig";
import { useRouter } from "next/navigation";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function LandingPageContent() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      router.push('/dashboard/home')
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard/home");
    }
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-gray-700 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar with User Info */}
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
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-azure-600 transition shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-1 my-10 lg:m-0 md:p-0">
        {/* Left Side - Image */}
        <div className="flex-1 flex items-center justify-center w-full md:w-auto">
          <Image
            src={"/carmelpoly.png"}
            width={1000}
            height={1000}
            className="w-3/4 md:w-[30rem] max-w-xs md:max-w-none"
            alt="Carmel Polytechnic"
          />
        </div>

        {/* Right Side - Login or Choices */}
        <div className="flex-1 flex flex-col items-center lg:justify-center w-full">
          {!user ? (
            <div className="bg-white p-8 rounded-lg flex flex-col items-center text-center w-full max-w-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Login to continue
              </h2>
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center rounded-[15px] border border-azure-600 gap-2 px-6 py-3 "
              >
                <Image
                  src="/google.png"
                  alt="Google"
                  className="w-7 h-7 rounded-full"
                  width={1000}
                  height={1000}
                />
                Sign in with Google
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
