// src/components/SubmissionFormPage.tsx
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { CheckCircle, XCircle } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext'; // Import app context

// Define props for the SubmissionFormPage component
interface SubmissionFormPageProps {
  navigate: (page: string, props?: Record<string, unknown>) => void;
  conferenceId: string;
  conferenceName: string;
}

const SubmissionFormPage: React.FC<SubmissionFormPageProps> = ({ navigate, conferenceId, conferenceName }) => {
  const { db, userId, isAuthReady } = useAppContext();
  const [title, setTitle] = useState<string>('');
  const [authors, setAuthors] = useState<string>('');
  const [abstractText, setAbstractText] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>(''); // 'success' or 'error'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!db || !userId || !isAuthReady) {
      setMessage('Application not ready. Please wait or refresh.');
      setMessageType('error');
      return;
    }

    // Basic form validation
    if (!title || !authors || !abstractText || !topic) {
      setMessage('All fields are required.');
      setMessageType('error');
      return;
    }

    try {
      // IMPORTANT: __app_id is a global variable provided by the Canvas environment.
      // For local development, it will be undefined, and the `localAppId` from AppContext will be used.
      // Ensure your Firebase security rules are set up correctly for private data:
      // match /artifacts/{appId}/users/{userId}/submissions/{document=**} {
      //   allow read, write: if request.auth != null && request.auth.uid == userId;
      // }
      const appId = process.env.REACT_APP_ID || 'iatm-dev-app';
      await addDoc(collection(db, `artifacts/${appId}/users/${userId}/submissions`), {
        conferenceId: conferenceId,
        conferenceName: conferenceName,
        title,
        authors,
        abstractText,
        topic,
        submittedAt: new Date().toISOString(), // Record submission time
        status: 'Pending Review' // Initial status
      });
      setMessage('Abstract submitted successfully!');
      setMessageType('success');
      // Clear form fields after successful submission
      setTitle('');
      setAuthors('');
      setAbstractText('');
      setTopic('');
    } catch (e: unknown) {
      console.error("Error adding document: ", e);
      setMessage('Error submitting abstract. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl mt-8 dark:bg-gray-800 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-400 mb-6">
        Submit Abstract for {conferenceName || 'Selected Conference'}
      </h2>
      {/* Message display for success/error */}
      {message && (
        <div className={`p-4 mb-4 rounded-lg text-center ${messageType === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
          <span className="flex items-center justify-center">
            {messageType === 'success' ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
            {message}
          </span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Paper Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            required
          />
        </div>
        <div>
          <label htmlFor="authors" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Authors (comma separated):</label>
          <input
            type="text"
            id="authors"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            required
          />
        </div>
        <div>
          <label htmlFor="abstractText" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Abstract:</label>
          <textarea
            id="abstractText"
            value={abstractText}
            onChange={(e) => setAbstractText(e.target.value)}
            rows={8}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="topic" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Topic/Keywords:</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <span className="flex items-center justify-center">
            <CheckCircle className="mr-2" size={20} /> Submit Abstract
          </span>
        </button>
        <button
          type="button"
          onClick={() => navigate('conferences')}
          className="w-full mt-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          Back to Conferences
        </button>
      </form>
    </div>
  );
};

export default SubmissionFormPage;