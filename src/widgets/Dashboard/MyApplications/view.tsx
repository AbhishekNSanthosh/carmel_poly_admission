import React from "react";
import { LuFileStack } from "react-icons/lu"; // Importing an icon for better UI

export default function MyApplications() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-gray-600">
      <LuFileStack className="text-6xl text-gray-400 mb-4" />
      <span className="text-xl font-medium">
        You haven't submitted any applications yet.
      </span>
      <p className="text-gray-500 text-sm mt-2">
        Once you apply, your applications will appear here.
      </p>
    </div>
  );
}
