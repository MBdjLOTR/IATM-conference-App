// src/components/SubmissionsListPage.tsx
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Loader } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext'; // Import app context
// Add this at the top of your file, before using __app_id
// Define interface for a Submission object
interface Submission {
  id: string;
  conferenceId: string;
  conferenceName: string;
  title: string;
  authors: string;
  abstractText: string;
  topic: string;
  submittedAt: string;
  status: string;
}

const SubmissionsListPage: React.FC = () => {
  const { db, userId, isAuthReady } = useAppContext();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthReady || !db || !userId) return;

    // Access __app_id more safely without 'any'
    const appId = process.env.REACT_APP_ID || 'iatm-dev-app';
    const submissionsCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/submissions`);
    const q = query(submissionsCollectionRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const submissionList: Submission[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Submission, 'id'>
      }));
      submissionList.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      setSubmissions(submissionList);
      setLoading(false);
    }, (err: Error) => {
      console.error("Error fetching submissions:", err);
      setError("Failed to load your submissions. Please try again.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, userId, isAuthReady]);

  if (loading) return <div className="text-center p-8 text-gray-700 dark:text-gray-300"><Loader className="animate-spin inline-block mr-2" />Loading your submissions...</div>;
  if (error) return <div className="text-center p-8 text-red-600 dark:text-red-400">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl mt-8 dark:bg-gray-800 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-400 mb-6">My Abstract Submissions</h2>
      {submissions.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">You haven't submitted any abstracts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {submissions.map((submission) => (
            <div key={submission.id}
                 className="bg-white p-6 rounded-lg shadow-md border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102 animate-fade-in-up">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{submission.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-1"><strong>Conference:</strong> {submission.conferenceName}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-1"><strong>Authors:</strong> {submission.authors}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-1"><strong>Topic:</strong> {submission.topic}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3"><strong>Submitted:</strong> {new Date(submission.submittedAt).toLocaleDateString()}</p>
              <p className={`font-medium ${submission.status === 'Pending Review' ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`}>
                Status: {submission.status}
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-100 dark:bg-gray-600 dark:border-gray-500">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Abstract:</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-4">{submission.abstractText}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionsListPage;