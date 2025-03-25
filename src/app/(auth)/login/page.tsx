'use client';

import { useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User } from "firebase/auth";
import Image from "next/image";

import { app } from "@common/config/firebaseConfig";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function LoginPage() {
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

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
        {user ? (
          <>
            {user.photoURL && (
              <Image src={user.photoURL} alt="User" className="w-16 h-16 rounded-full mx-auto" />
            )}
            <h2 className="text-xl font-semibold mt-3">Welcome, {user.displayName}!</h2>
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">Login to continue</h2>
            <button
              onClick={handleGoogleLogin}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
            >
              <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}
