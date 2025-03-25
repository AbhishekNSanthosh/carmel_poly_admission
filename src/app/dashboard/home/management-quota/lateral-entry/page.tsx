"use client";
import React, { useState } from "react";

export default function AdmissionForm() {
  // Define Tabs
  const tabs: string[] = [
    "Branch Preference",
    "Candidate Profile",
    "Academic History",
    "Qualifying Examination",
    "Guardian Info & Declaration",
  ];

  const branches: string[] = [
    "Computer Science",
    "Electronics",
    "Civil",
    "Mechanical Engineering",
    "Automobile Engineering",
    "Electrical & Electronics Engineering",
  ];

  // State to track current tab & completed tabs
  const [activeTab, setActiveTab] = useState<number>(0);
  const [completedTabs, setCompletedTabs] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
  ]);

  const [preferences, setPreferences] = useState<string[]>(Array(6).fill(""));

  // Handle branch selection
  const handleSelect = (index: number, branch: string) => {
    const newPreferences = [...preferences];
    newPreferences[index] = branch;
    setPreferences(newPreferences);
  };

  // Get available branches for each dropdown (remove already selected ones)
  const getAvailableBranches = (selectedIndex: number): string[] => {
    return branches.filter(
      (branch) =>
        !preferences.includes(branch) || preferences[selectedIndex] === branch
    );
  };

  // Handle Next Click
  const handleNext = () => {
    if (activeTab < tabs.length - 1) {
      const newCompletedTabs = [...completedTabs];
      newCompletedTabs[activeTab + 1] = true;
      setCompletedTabs(newCompletedTabs);
      setActiveTab(activeTab + 1);
    }
  };

  // Handle Back Click
  const handleBack = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      {/* Left Sidebar (Tabs) */}
      <div className=" p-6 bg-white">
        <span className="text-azure-600 font-semibold text-xl">Management Quota - Lateral Entry</span>
      </div>
      <div className="flex flex-row">
        <div className="w-1/4 bg-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Admission 2025-26</h2>
          <ul className="space-y-3">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={`p-3 cursor-pointer rounded-lg ${
                  activeTab === index
                    ? "bg-azure-600 text-white"
                    : completedTabs[index]
                    ? "bg-bgprimary text-gray-800"
                    : "bg-red-50 text-red-500 cursor-not-allowed"
                }`}
                onClick={() => completedTabs[index] && setActiveTab(index)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content Area */}
        <div className="w-3/4 p-6 bg-white rounded-lg ml-6">
          {/* Tab Content */}
          <div>
            {activeTab === 0 && (
              <BranchPreference
                preferences={preferences}
                handleSelect={handleSelect}
                getAvailableBranches={getAvailableBranches}
              />
            )}
            {activeTab === 1 && <CandidateProfile />}
            {activeTab === 2 && <AcademicHistory />}
            {activeTab === 3 && <QualifyingExamination />}
            {activeTab === 4 && <GuardianInfo />}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              className="px-6 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
              onClick={handleBack}
              disabled={activeTab === 0}
            >
              Back
            </button>
            <button
              className="px-6 py-2 bg-azure-600 text-white rounded-lg disabled:opacity-50"
              onClick={handleNext}
              disabled={activeTab === tabs.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Props Interface for BranchPreference
interface BranchPreferenceProps {
  preferences: string[];
  handleSelect: (index: number, branch: string) => void;
  getAvailableBranches: (selectedIndex: number) => string[];
}

// Individual Tab Components
const BranchPreference: React.FC<BranchPreferenceProps> = ({
  preferences,
  handleSelect,
  getAvailableBranches,
}) => (
  <div className="p-6">
    <h2 className="text-xl font-semibold mb-4">Branch Preference</h2>
    <p className="mb-4">Select your preferred branches in order.</p>

    {/* Preference Selection */}
    <div className="space-y-4">
      {preferences.map((selectedBranch, index) => (
        <div key={index} className="flex flex-col">
          <label className="text-lg font-medium">Preference {index + 1}</label>
          <select
            value={selectedBranch}
            onChange={(e) => handleSelect(index, e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select a branch</option>
            {getAvailableBranches(index).map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  </div>
);

const CandidateProfile: React.FC = () => (
  <div className="flex flex-col gap-3">
    <h2 className="text-xl font-semibold">Candidate Profile</h2>
    <div className="flex flex-col gap-5">
      <div className="flex w-full items-start gap-[10px]">
        <div className="flex-1 flex flex-col items-start justify-center ">
          <span className="text-sm">First Name</span>
          <input
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
            placeholder="Joel"
          />
        </div>
        <div className="flex-1 flex flex-col items-start justify-center ">
          <span className="text-sm">Last Name</span>
          <input
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
            placeholder="Joel"
          />
        </div>
      </div>
      <div className="flex w-full items-start gap-[10px]">
        <div className="flex-1 flex flex-col items-start justify-center">
          <span className="text-sm">Date of Birth</span>
          <input
            type="date"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex-1 flex flex-col items-start justify-center ">
          <span className="text-sm">Place of birth</span>
          <input
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
            placeholder="Joel"
          />
        </div>
      </div>
      <div className="flex w-full items-start gap-[10px]">
        <div className="flex-1 flex flex-col items-start justify-center">
          <span className="text-sm">Gender</span>
          <select className="bg-gray-100 rounded-md px-3 py-2 w-full">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex-1 flex flex-col items-start justify-center ">
          <span className="text-sm">Religion</span>
          <input
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
            placeholder="Joel"
          />
        </div>
      </div>

      <div className="flex w-full items-start gap-[10px]">
        <div className="flex-1 flex flex-col items-start justify-center">
          <span className="text-sm">Aadhar Number</span>
          <input
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
            placeholder="Enter Aadhar Number"
          />
        </div>

        <div className="flex-1 flex flex-col items-start justify-center">
          <span className="text-sm">Address</span>
          <input
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
            placeholder="Enter Address"
          />
        </div>
      </div>

      <div className="flex w-full items-start gap-[10px]">
        <div className="flex-1 flex flex-col items-start justify-center">
          <span className="text-sm">Contact no. 1</span>
          <input
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
            placeholder="Enter Aadhar Number"
          />
        </div>

        <div className="flex-1 flex flex-col items-start justify-center">
          <span className="text-sm">Contact no. 2</span>
          <input
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
            placeholder="Enter Address"
          />
        </div>
      </div>
    </div>
  </div>
);

const AcademicHistory: React.FC = () => (
  <div className="">
    <h2 className="text-xl font-semibold mb-4">Academic History</h2>

    {/* Select Course */}
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium">Select Course</label>
      <select className="bg-gray-100 rounded-md px-3 py-2 w-full">
        <option value="plus_two">Plus Two</option>
      </select>
    </div>

    {/* Name of Institution */}
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium">Name of Institution</label>
      <input
        type="text"
        className="bg-gray-100 rounded-md px-3 py-2 w-full"
        placeholder="Enter institution name"
      />
    </div>

    {/* University / Board */}
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium">University / Board</label>
      <select className="bg-gray-100 rounded-md px-3 py-2 w-full">
        <option value="hse">HSE</option>
        <option value="cbse">CBSE</option>
      </select>
    </div>

    {/* Passed On */}
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium">Passed On</label>
      <input
        type="text"
        className="bg-gray-100 rounded-md px-3 py-2 w-full"
        placeholder="Mar-2024"
      />
    </div>
  </div>
);

const QualifyingExamination: React.FC = () => {
  const [board, setBoard] = useState<string>("hse");

  const hseSubjects = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "English",
  ];
  const cbseSubjects = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Computer Science",
    "English",
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Qualifying Examination</h2>
      <p className="mb-4">Provide exam details.</p>

      {/* Board Selection */}
      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium">Select Board</label>
        <select
          className="bg-gray-100 rounded-md px-3 py-2 w-full"
          value={board}
          onChange={(e) => setBoard(e.target.value)}
        >
          <option value="hse">HSE</option>
          <option value="cbse">CBSE</option>
        </select>
      </div>

      {/* Subject List and Marks Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(board === "hse" ? hseSubjects : cbseSubjects).map(
          (subject, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-sm font-medium">{subject}</label>
              <input
                type="number"
                className="bg-gray-100 rounded-md px-3 py-2 w-full"
                placeholder="Enter marks"
                min="0"
                max="100"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

const GuardianInfo: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Guardian Info & Declaration</h2>
      <p>Enter guardian details.</p>

      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium">Name of Guardian</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Occupation</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Address (Residence)
          </label>
          <textarea className="w-full p-2 border rounded"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Relationship with Applicant
          </label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Monthly Income</label>
          <input type="number" className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input type="tel" className="w-full p-2 border rounded" />
        </div>
      </form>
    </div>
  );
};
