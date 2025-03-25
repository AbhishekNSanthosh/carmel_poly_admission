import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LandingPageContent() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center my-10 lg:m-0 lg:p-4 md:p-0">
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

      {/* Right Side - Choices */}
      <div className="flex-1 flex flex-col items-center lg:justify-center  w-full ">
        <div className="w-11/12 lg:w-max max-w-md py-6 px-4 lg:p-6 flex flex-col items-center justify-center space-y-5 border border-gray-300 rounded-lg shadow-lg bg-white">
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
      </div>
    </div>
  );
}