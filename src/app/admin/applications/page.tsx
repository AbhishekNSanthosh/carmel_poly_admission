"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@common/config/firebaseConfig";
import Link from "next/link";

interface ApplicationData {
  id: string;
  timestamp: any;
    firstName: string;
    lastName:string;
    email: string;
    category: string;
}

export default function Page() {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  console.log(filterCategory)
console.log(applications)
const fetchApplications = async () => {
  setLoading(true);
  try {
    let baseQuery = collection(db, "admissions");
    let conditions: any[] = [];

    if (filterCategory !== "all") {
      conditions.push(where("category", "==", filterCategory));  // Accessing category directly
    }

    const q = query(baseQuery, ...conditions);
    const querySnapshot = await getDocs(q);

    const apps = querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...(doc.data() as Omit<ApplicationData, "id">),
      })
    );

    // Filter by category locally if not 'all'
    const filteredApps = filterCategory !== "all" 
      ? apps.filter((app) => app.category === filterCategory)
      : apps;

    // Sort the applications locally by timestamp (sortOrder)
    const sortedApps = filteredApps.sort((a, b) => {
      // Convert timestamp strings to Date objects
      const timestampA = new Date(a.timestamp);
      const timestampB = new Date(b.timestamp);
    
      if (sortOrder === "asc") {
        return timestampA.getTime() - timestampB.getTime();  // Compare as milliseconds
      } else {
        return timestampB.getTime() - timestampA.getTime();
      }
    });
    

    setApplications(sortedApps);
  } catch (error) {
    console.error("Error fetching applications:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchApplications();
}, [sortOrder, filterCategory]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Submitted Applications</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border p-2 rounded"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Categories</option>
          <option value="management_lateral_entry">Lateral Entry</option>
          <option value="management_regular">Regular</option>
          <option value="management_merit">Merit</option>
        </select>
      </div>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul className="space-y-2">
          {applications.map((app) => (
            <Link href={'/admin/applications/view/'+app.id}>
            <li key={app.id} className="border p-4 rounded shadow">
              <p>
                <strong>Name:</strong> {app.firstName}{" "}
                {app.lastName}
              </p>
              <p>
                <strong>Email:</strong> {app.email}
              </p>
              <p>
                <strong>Category:</strong> {app.category}
              </p>
              <p>
                <strong>Submitted:</strong>{" "}
                {app.timestamp.toDate?.().toLocaleString() || app.timestamp}
              </p>
            </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
