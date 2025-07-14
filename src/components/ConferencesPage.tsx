// src/components/ConferencesPage.tsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query } from 'firebase/firestore';
import { Calendar, Home, FileText, XCircle, Loader } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext'; // Import app context
declare const __app_id: string;
interface ConferencesPageProps {
  navigate: (page: string, props?: Record<string, unknown>) => void;
}

interface Conference {
  id: string;
  name: string;
  date: string;
  venue: string;
  description: string;
  submissionDeadline: string;
}

const ConferencesPage: React.FC<ConferencesPageProps> = ({ navigate }) => {
  const { db, isAuthReady, userId } = useAppContext();
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthReady || !db) return;

    const appId = typeof __app_id !== 'undefined' ? __app_id : 'iatm-dev-app';
    const conferencesCollectionRef = collection(db, `artifacts/${appId}/public/data/conferences`);
    const q = query(conferencesCollectionRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const conferenceList: Conference[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Conference, 'id'>
      }));
      conferenceList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setConferences(conferenceList);
      setLoading(false);
    }, (err: unknown) => {
      console.error("Error fetching conferences:", err);
      setError("Failed to load conferences. Please try again.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, isAuthReady, userId]);

  const addDummyConference = async () => {
    if (!db) return;
    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'iatm-dev-app';
      await addDoc(collection(db, `artifacts/${appId}/public/data/conferences`), {
        name: "IATM Global Tech Summit",
        date: "2025-10-20",
        venue: "Virtual Event",
        description: "Focus on AI, Blockchain, and Sustainable Technologies.",
        submissionDeadline: "2025-09-15"
      });
      await addDoc(collection(db, `artifacts/${appId}/public/data/conferences`), {
        name: "IATM Innovation & Management Forum",
        date: "2026-03-10",
        venue: "New York, USA",
        description: "Exploring leadership, innovation, and strategic management.",
        submissionDeadline: "2026-02-01"
      });
      // Custom message box for user feedback
      const messageBox = document.createElement('div');
      messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      messageBox.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center">
          <p class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Dummy conferences added!</p>
          <p class="text-gray-600 dark:text-gray-400 mb-4">They should appear shortly. If not, try refreshing the page.</p>
          <button id="closeMessageBox" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      document.getElementById('closeMessageBox')!.onclick = () => document.body.removeChild(messageBox);

    } catch (e: unknown) {
      console.error("Error adding dummy conference: ", e);
      // Custom message box for error feedback
      const messageBox = document.createElement('div');
      messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      messageBox.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center">
          <p class="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Error adding dummy conference.</p>
          <button id="closeMessageBox" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-md">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      document.getElementById('closeMessageBox')!.onclick = () => document.body.removeChild(messageBox);
    }
  };

  if (loading) return <div className="text-center p-8 text-gray-700 dark:text-gray-300"><Loader className="animate-spin inline-block mr-2" />Loading conferences...</div>;
  if (error) return <div className="text-center p-8 text-red-600 dark:text-red-400">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl mt-8 dark:bg-gray-800 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-400 mb-6">Upcoming Conferences</h2>
      {conferences.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="mb-4">No conferences available yet.</p>
          <button
            onClick={addDummyConference}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
          >
            Add Dummy Conferences
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conferences.map((conf) => (
            <div key={conf.id}
                 className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102 border border-blue-200 dark:from-gray-700 dark:to-gray-600 dark:border-gray-500 dark:text-gray-200 animate-fade-in">
              <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">{conf.name}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-1 flex items-center"><Calendar size={18} className="mr-2 text-blue-500 dark:text-blue-400" /> Date: {conf.date}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-3 flex items-center"><Home size={18} className="mr-2 text-indigo-500 dark:text-indigo-400" /> Venue: {conf.venue}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{conf.description}</p>
              <p className="text-red-600 dark:text-red-400 font-medium text-sm flex items-center"><XCircle size={16} className="mr-1" /> Submission Deadline: {conf.submissionDeadline}</p>
              <button
                onClick={() => navigate('submit', { conferenceId: conf.id, conferenceName: conf.name })}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  <FileText className="mr-2" size={20} /> Submit Abstract
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConferencesPage;