// src/components/ContactPage.tsx
import React from 'react';
import { Mail, Users, FileText } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl mt-8 dark:bg-gray-800 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-400 mb-6">Contact IATM</h2>
      <div className="max-w-md mx-auto bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200 dark:bg-blue-900/30 dark:border-blue-700 dark:text-gray-200">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          For general inquiries, support, or further information about IATM and our initiatives, please reach out to us.
        </p>
        <div className="space-y-3">
          <p className="flex items-center text-gray-700 dark:text-gray-300">
            <Mail className="mr-3 text-blue-600 dark:text-blue-400" size={24} />
            <strong>Email:</strong> <a href="mailto:info@iatm.org" className="ml-2 text-blue-600 hover:underline dark:text-blue-400">info@iatm.org</a>
          </p>
          <p className="flex items-center text-gray-700 dark:text-gray-300">
            <Users className="mr-3 text-blue-600 dark:text-blue-400" size={24} />
            <strong>Address:</strong> [Placeholder Address], Pennsylvania, USA
          </p>
          <p className="flex items-center text-gray-700 dark:text-gray-300">
            <FileText className="mr-3 text-blue-600 dark:text-blue-400" size={24} />
            <strong>Website:</strong> <a href="https://www.iatm.org" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline dark:text-blue-400">www.iatm.org</a> (Placeholder)
          </p>
        </div>
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
          We look forward to connecting with you and fostering a collaborative environment for technology and management advancements.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
