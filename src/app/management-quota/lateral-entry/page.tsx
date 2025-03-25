"use client";
import React, { useState } from "react";
import { db } from "@common/config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

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

  interface formData {
    firstName: string;
    lastName: string;
    dob: string;
    place: string; 
    gender: string;
    region: string;
    aadhar: string;
    address: string;
    contact1: string;
    contact2: string;
    board: string;
    marks: string;
    guardianName: string;
    contact: string;
    preferences: [string, string, string, string, string];
   }


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    place: "",
    gender: "",
    region: "",
    aadhar: "",
    address: "",
    contact1: "",
    contact2: "",
    board: "",
    marks: "",
    guardianName: "",
    contact: "",
    preferences: ["", "", "", "", ""] as [string, string, string, string, string],
  });
  

  // Handle branch selection
    const handlePrefrenceData = (index: number, branch: string) => {
      const newData = [...formData.preferences] as [string, string, string, string, string];
      newData[index] = branch;
      console.log(newData)
      setFormData((prevState) => ({
        ...prevState,
        preferences: newData,
      }));
  };
  
  const handleDirectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
              [field]: value,
    }));
  };

  // Get available branches for each dropdown (remove already selected ones)
  const getAvailableBranches = (selectedIndex: number): string[] => {
    return branches.filter(
      (branch) =>
        !formData.preferences.includes(branch) || formData.preferences[selectedIndex] === branch
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

  const handleSubmit = async () => {
  //   if (formDatapreferences.some((pref) => pref === "")) {
  //     alert("Please select all branch preferences.");
  //     return;
  //   }
  
  //   try {
  //     const formData = {
  //       preferences,
  //       timestamp: new Date(), // Store submission time
  //     };
  
  //     await addDoc(collection(db, "admissions"), formData);
  
  //     alert("Form submitted successfully!");
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert("Error submitting form. Please try again.");
  //   }
  };


  return (
    <div className="flex min-h-screen p-8">
      {/* Left Sidebar (Tabs) */}
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
              preferences={formData.preferences}
              handlePrefrenceData={handlePrefrenceData}
              getAvailableBranches={getAvailableBranches}
            />
          )}
          {activeTab === 1 && <CandidateProfile handleDirectChange={handleDirectChange} formData={formData} />}
          {activeTab === 2 && <AcademicHistory handleDirectChange={handleDirectChange} formData={formData}  />}
          {activeTab === 3 && <QualifyingExamination handleDirectChange={handleDirectChange} formData={formData}  />}
          {activeTab === 4 && <GuardianInfo handleDirectChange={handleDirectChange} formData={formData} />}
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
            onClick={activeTab === tabs.length - 1 ? handleSubmit : handleNext}
          >
            {activeTab === tabs.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Props Interface for BranchPreference
interface BranchPreferenceProps {
  preferences: string[];
  handlePrefrenceData: (index: number, branch: string) => void;
  getAvailableBranches: (selectedIndex: number) => string[];
}

// Individual Tab Components
const BranchPreference: React.FC<BranchPreferenceProps> = ({
  preferences,
  handlePrefrenceData,
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
            onChange={(e) => handlePrefrenceData(index, e.target.value)}
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

interface CandidateProfileProps {
  formData: { firstName: string,
    lastName: string,
    dob: string,
    place: string,
    gender: string,
    region:string,
    aadhar: string,
    address: string,
    contact1: string,
    contact2: string,
    board: string,
    marks: string,
    guardianName: string,
    contact: string,
    preferences: [string, string, string, string, string] };
  handleDirectChange: (field: string, value: string) => void;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({ formData ,handleDirectChange}) => (
  <div className="flex flex-col gap-3">
    <h2 className="text-xl font-semibold">Candidate Profile</h2>
    <div className="flex flex-col gap-5">
      <div className="flex w-full items-start gap-[10px]">
        <div className="flex-1 flex flex-col items-start justify-center ">
          <span className="text-sm">First Name</span>
          <input
            value={formData.firstName}
            onChange={(e)=>(handleDirectChange("firstName", e.target.value))}
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
            placeholder="Joel"
          />
        </div>
        <div className="flex-1 flex flex-col items-start justify-center ">
          <span className="text-sm">Last Name</span>
          <input
            value={formData.lastName}
            onChange={(e)=>(handleDirectChange("lastName", e.target.value))}
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
            value={formData.dob}
            onChange={(e)=>(handleDirectChange("dob", e.target.value))}
            
            type="date"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex-1 flex flex-col items-start justify-center ">
          <span className="text-sm">Place of birth</span>
          <input
            value={formData.place}
            onChange={(e)=>(handleDirectChange("place", e.target.value))}
            
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
            placeholder="Joel"
          />
        </div>
      </div>
      <div className="flex w-full items-start gap-[10px]">
        <div className="flex-1 flex flex-col items-start justify-center">
          <span className="text-sm">Gender</span>
          <select
          value={formData.gender}
          onChange={(e)=>(handleDirectChange("gender", e.target.value))}
          
            className="bg-gray-100 rounded-md px-3 py-2 w-full">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex-1 flex flex-col items-start justify-center ">
          <span className="text-sm">Religion</span>
          <input
            value={formData.region}
            onChange={(e)=>(handleDirectChange("region", e.target.value))}
            
            
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
            value={formData.aadhar}
            onChange={(e)=>(handleDirectChange("aadhar", e.target.value))}
            
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
            placeholder="Enter Aadhar Number"
          />
        </div>

        <div className="flex-1 flex flex-col items-start justify-center">
          <span className="text-sm">Address</span>
          <input
            value={formData.address}
            onChange={(e)=>(handleDirectChange("address", e.target.value))}

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
            value={formData.contact1}
            onChange={(e)=>(handleDirectChange("contact1", e.target.value))}
            
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
            placeholder="Enter Aadhar Number"
          />
        </div>

        <div className="flex-1 flex flex-col items-start justify-center">
          <span className="text-sm">Contact no. 2</span>
          <input
            value={formData.contact2}
            onChange={(e)=>(handleDirectChange("contact2", e.target.value))}
            
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full"
            placeholder="Enter Address"
          />
        </div>
      </div>
    </div>
  </div>
);

interface AcademicHistoryProps {
  formData: {
    firstName: string;
    lastName: string;
    dob: string;
    place: string;
    gender: string;
    region: string;
    aadhar: string;
    address: string;
    contact1: string;
    contact2: string;
    board: string;
    marks: string;
    guardianName: string;
    contact: string;
    preferences: [string, string, string, string, string];
  };
  handleDirectChange: (field: string, value: string) => void;
}

const AcademicHistory: React.FC<AcademicHistoryProps> = ({ formData, handleDirectChange }) => (
  <div className="">
    <h2 className="text-xl font-semibold mb-4">Academic History</h2>

    {/* Select Course */}
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium">Select Course</label>
      <select
     value={formData.course}
        className="bg-gray-100 rounded-md px-3 py-2 w-full">
        <option value="plus_two">Plus Two</option>
      </select> 
    </div>

    {/* Name of Institution */}
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium">Name of Institution</label>
      <input
        value={formData.institution}
        onChange={(e) => handleDirectChange("institution", e.target.value)}
        type="text"
        className="bg-gray-100 rounded-md px-3 py-2 w-full"
        placeholder="Enter institution name"
      />
    </div>

    {/* University / Board */}
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium">University / Board</label>
      <select
        value={formData.board}
        onChange={(e) => handleDirectChange("board", e.target.value)}
        className="bg-gray-100 rounded-md px-3 py-2 w-full">
        <option value="hse">HSE</option>
        <option value="cbse">CBSE</option>
      </select>
    </div>

    {/* Passed On */}
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium">Passed On</label>
      <input
        value={formData.passedOn}
        onChange={(e) => handleDirectChange("passedOn", e.target.value)}
        type="text"
        className="bg-gray-100 rounded-md px-3 py-2 w-full"
        placeholder="Mar-2024"
      />
    </div>
  </div>
);


interface QualifyingExaminationProps {
  formData: {
    firstName: string;
    lastName: string;
    dob: string;
    place: string;
    gender: string;
    region: string;
    aadhar: string;
    address: string;
    contact1: string;
    contact2: string;
    board: string;
    marks: string;
    guardianName: string;
    contact: string;
    preferences: [string, string, string, string, string];
  };
  handleDirectChange: (field: string, value: string) => void;
}

const QualifyingExamination: React.FC<QualifyingExaminationProps> = ({ formData, handleDirectChange }) => {
  const [board, setBoard] = useState<string>("hse");

  const hseSubjects = ["Physics", "Chemistry", "Mathematics", "Biology", "English"];
  const cbseSubjects = ["Physics", "Chemistry", "Mathematics", "Computer Science", "English"];

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
        {(board === "hse" ? hseSubjects : cbseSubjects).map((subject, index) => (
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
        ))}
      </div>
    </div>
  );
};

interface GuardianInfoProps {
  formData: {
    firstName: string;
    lastName: string;
    dob: string;
    place: string;
    gender: string;
    region: string;
    aadhar: string;
    address: string;
    contact1: string;
    contact2: string;
    board: string;
    marks: string;
    guardianName: string;
    contact: string;
    preferences: [string, string, string, string, string];
  };
  handleDirectChange: (field: string, value: string) => void;
}

const GuardianInfo: React.FC<GuardianInfoProps> = ({ formData, handleDirectChange }) => {
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
          <label className="block text-sm font-medium">Address (Residence)</label>
          <textarea className="w-full p-2 border rounded"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Relationship with Applicant</label>
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

