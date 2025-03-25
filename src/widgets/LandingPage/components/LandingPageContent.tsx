"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User } from "firebase/auth";

import { app } from "@common/config/firebaseConfig";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function LandingPageContent() {
  const [user, setUser] = useState<User | null>(null);
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
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (loading) {
    return <div className="w-full min-h-screen flex items-center justify-center text-gray-700 text-lg">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar with User Info */}
      {user && (
        <div className="w-full flex items-center justify-between px-6 py-4 shadow-md">
          <span className="text-lg font-semibold">Welcome, {user.displayName}!</span>
          <div className="flex items-center gap-4">
            <Image width={100} height={100} src={user.photoURL || "/default-avatar.png"} alt="User" className="w-10 h-10 rounded-full border border-white shadow-md" />
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex h-full flex-col md:flex-col items-center justify-center flex-1 lg:m-0 md:p-0">
        {/* Left Side - Image */}
        <div className="flex items-center justify-center w-full">
          <Image
            src={"/carmelpoly.png"}
            width={1000}
            height={1000}
            className="w-3/4 md:w-[30rem] max-w-xs md:max-w-none"
            alt="Carmel Polytechnic"
          />
        </div>

        {/* Right Side - Login or Choices */}
        <div className="flex flex-col items-center lg:justify-center w-full">
          {!user ? (
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center w-full max-w-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Login to continue</h2>
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center border border-azure-600 gap-2 px-6 py-3"
              >
                <Image src="/google.png" alt="Google" className="w-7 h-7 rounded-full" width={1000} height={1000}/>
                Sign in with Google
              </button>
            </div>
          ) : (
            <div className="w-11/12 lg:w-max max-w-md py-6 px-4 lg:px-8 lg:py-12 flex flex-col items-center justify-center space-y-5 border border-gray-300 rounded-lg shadow-lg bg-white">
              {/* Title */}
              <div>
                <span className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
                  Admission 2025-26
                </span>
              </div>

              {/* Buttons Section */}
              <div className="lg:w-full flex flex-col items-center gap-4">
                <Link className="w-full" href={"/management-quota/merit"}>
                  <button className="w-full px-4 py-3 bg-azure-600 text-white text-base md:text-lg font-semibold rounded-lg hover:bg-blue-700 transition">
                    Management Merit - Regular
                  </button>
                </Link>
                <Link className="w-full" href={"/management-quota/merit"}>
                  <button className="w-full px-4 py-3 bg-azure-600 text-white text-base md:text-lg font-semibold rounded-lg hover:bg-blue-700 transition">
                    Management Quota - Regular
                  </button>
                </Link>
                <Link className="w-full" href={"/management-quota/merit"}>
                  <button className="w-full px-4 py-3 bg-azure-600 text-white text-base md:text-lg font-semibold rounded-lg hover:bg-blue-700 transition">
                    Management Quota - Lateral Entry
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
