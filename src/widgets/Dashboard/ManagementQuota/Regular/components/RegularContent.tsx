import React from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { app } from "@common/config/firebaseConfig";
import { User } from "firebase/auth";

export default function RegularContent() {
  const router = useRouter();
  const auth = getAuth(app);
  const user = auth.currentUser as User;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="w-full h-[10vh] flex items-center justify-between px-6 py-4 bg-white">
        <span className="text-lg font-semibold">
          Welcome, {user?.displayName}!
        </span>
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="User"
            className="w-10 h-10 rounded-full border border-white shadow-md"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-[90vh] flex flex-col items-center justify-center">
        <div className="w-11/12 lg:w-max max-w-md py-6 px-4 lg:px-8 lg:py-12 flex flex-col items-center justify-center space-y-5 rounded-lg bg-white">
          {/* Title */}
          <div>
            <span className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
              Management Quota - Regular
            </span>
          </div>

          {/* Buttons Section */}
          <div className="lg:w-full flex flex-col items-center gap-4">
            <button
              className="w-full px-4 py-3 bg-azure-600 text-white text-base md:text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
              onClick={() => router.push("/dashboard/home/management-quota/regular/apply")}
            >
              Apply Now
            </button>
            <button
              className="w-full px-4 py-3 bg-azure-600 text-white text-base md:text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
              onClick={() => router.push("/dashboard/home/management-quota/regular/status")}
            >
              Check Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 