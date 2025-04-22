"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db, doc, getDoc } from '@common/config/firebaseConfig';  // Adjust the import path

export default function Page() {
  const { id } = useParams();
  console.log(id)
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Fetch the document using doc() and getDoc()
        const docId = Array.isArray(id) ? id.join('/') : id;

        // Fetch the document using doc() and getDoc()
        const docRef = doc(db, 'admissions', docId); // Ensure docId is a string here
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
  <h1 className="text-2xl font-semibold text-gray-800 mb-6">Application Details</h1>
  {data ? (
    <div className="space-y-6">
      {/* Personal Information Section */}
      <div className="space-y-2">
        <p><strong className="font-semibold text-gray-700">Aadhar:</strong> {data.aadhar}</p>
        <p><strong className="font-semibold text-gray-700">Address:</strong> {data.address}</p>
        <p><strong className="font-semibold text-gray-700">Board:</strong> {data.board}</p>
        <p><strong className="font-semibold text-gray-700">Category:</strong> {data.category}</p>
        <p><strong className="font-semibold text-gray-700">Contact:</strong> {data.contact}</p>
        <p><strong className="font-semibold text-gray-700">Contact1:</strong> {data.contact1}</p>
        <p><strong className="font-semibold text-gray-700">Contact2:</strong> {data.contact2}</p>
        <p><strong className="font-semibold text-gray-700">Course:</strong> {data.course}</p>
        <p><strong className="font-semibold text-gray-700">Date of Birth:</strong> {data.dob}</p>
        <p><strong className="font-semibold text-gray-700">First Name:</strong> {data.firstName}</p>
        <p><strong className="font-semibold text-gray-700">Last Name:</strong> {data.lastName}</p>
        <p><strong className="font-semibold text-gray-700">Gender:</strong> {data.gender}</p>
        <p><strong className="font-semibold text-gray-700">Guardian Address:</strong> {data.guardianAddress}</p>
        <p><strong className="font-semibold text-gray-700">Guardian Contact:</strong> {data.guardianContact}</p>
        <p><strong className="font-semibold text-gray-700">Guardian Name:</strong> {data.guardianName}</p>
        <p><strong className="font-semibold text-gray-700">Guardian Relation:</strong> {data.guardianRelation}</p>
        <p><strong className="font-semibold text-gray-700">Institution:</strong> {data.institution}</p>
        <p><strong className="font-semibold text-gray-700">Marks:</strong> {data.marks}</p>
        <p><strong className="font-semibold text-gray-700">Monthly Income:</strong> {data.monthlyIncome}</p>
        <p><strong className="font-semibold text-gray-700">Passed On:</strong> {data.passedOn}</p>
        <p><strong className="font-semibold text-gray-700">Place:</strong> {data.place}</p>
        <p><strong className="font-semibold text-gray-700">Region:</strong> {data.region}</p>
        <p><strong className="font-semibold text-gray-700">Timestamp:</strong> {data.timestamp}</p>
      </div>

      {/* Preferences Section */}
      {data.preferences && data.preferences.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Preferences</h3>
          <ul className="list-disc pl-6 space-y-1">
            {data.preferences.map((preference: string, index: number) => (
              <li key={index} className="text-gray-700">{preference}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Marks Section */}
      {data.mark && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Marks</h3>
          <ul className="list-disc pl-6 space-y-1">
            {Object.keys(data.mark).map((key, index) => (
              <li key={index} className="text-gray-700">{key}: {data.mark[key]}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : (
    <p className="text-gray-600">No data found for this ID.</p>
  )}
</div>

  );
}
