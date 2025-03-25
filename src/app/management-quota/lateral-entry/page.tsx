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
    <div className="flex min-h-screen p-8 bg-gray-100">
      {/* Left Sidebar (Tabs) */}
      <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Admission 2025-26</h2>
        <ul className="space-y-3">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={`p-3 cursor-pointer rounded-lg ${
                activeTab === index
                  ? "bg-blue-600 text-white"
                  : completedTabs[index]
                  ? "bg-gray-200 text-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => completedTabs[index] && setActiveTab(index)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content Area */}
      <div className="w-3/4 p-6 bg-white rounded-lg shadow-lg ml-6">
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
  <div>
    <h2 className="text-xl font-semibold">Candidate Profile</h2>
    <p>Enter candidate details.</p>
  </div>
);

const AcademicHistory: React.FC = () => (
  <div>
    <h2 className="text-xl font-semibold">Academic History</h2>
    <p>Enter academic details.</p>
  </div>
);

const QualifyingExamination: React.FC = () => (
  <div>
    <h2 className="text-xl font-semibold">Qualifying Examination</h2>
    <p>Provide exam details.</p>
  </div>
);

const GuardianInfo: React.FC = () => (
  <div>
    <h2 className="text-xl font-semibold">Guardian Info & Declaration</h2>
    <p>Enter guardian details.</p>
  </div>
);
