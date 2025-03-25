import Image from "next/image";
import React from "react";

export default function LandingPageContent() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      {/* Left Side - Image */}
      <div className="flex-1 flex items-center w-full justify-center">
        <Image
          src={"/carmelpoly.png"}
          width={1000}
          height={1000}
          className="w-[30rem]"
          alt="Carmel Polytechnic"
        />
      </div>

      {/* Right Side - Choices */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-6 flex flex-col items-center justify-center space-y-5 border border-gray-300 rounded-lg shadow-lg bg-white">
          {/* Title */}
          <div>
            <span className="text-2xl font-semibold text-gray-800">
              Admission 2025-26
            </span>
          </div>

          {/* Buttons Section */}
          <div className="w-full flex flex-col items-center gap-4">
            <button className="w-full px-6 py-3 bg-azure-600 text-white text-lg font-semibold rounded-lg hover:bg-azure-700 transition">
              Management Merit - Regular
            </button>
            <button className="w-full px-6 py-3 bg-azure-600 text-white text-lg font-semibold rounded-lg hover:bg-azure-700 transition">
              Management Quota - Regular
            </button>
            <button className="w-full px-6 py-3 bg-azure-600 text-white text-lg font-semibold rounded-lg hover:bg-azure-700 transition">
              Management Quota - Lateral Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
