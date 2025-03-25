import Link from "next/link";
import React from "react";

export default function Dashboard() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-11/12 lg:w-max max-w-md py-6 px-4 lg:px-8 lg:py-12 flex flex-col items-center justify-center space-y-5 rounded-lg bg-white">
        {/* Title */}
        <div>
          <span className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
            Admission 2025-26
          </span>
        </div>

        {/* Buttons Section */}
        <div className="lg:w-full flex flex-col items-center gap-4">
          <Link
            className="w-full"
            href={"/dashboard/home/management-quota/lateral-entry"}
          >
            <button className="w-full px-4 py-3 bg-azure-600 text-white text-base md:text-lg font-semibold rounded-lg hover:bg-blue-700 transition">
              Management Quota - Lateral Entry
            </button>
          </Link>
          <Link className="w-full" href={"/dashboard/home/management-quota/regular"}>
            <button className="w-full px-4 py-3 bg-azure-600 text-white text-base md:text-lg font-semibold rounded-lg hover:bg-blue-700 transition">
              Management Quota - Regular
            </button>
          </Link>
          <Link className="w-full" href={"/dashboard/home/management-quota/merit"}>
            <button className="w-full px-4 py-3 bg-azure-600 text-white text-base md:text-lg font-semibold rounded-lg hover:bg-blue-700 transition">
              Management Merit - Regular
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
