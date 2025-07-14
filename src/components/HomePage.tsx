// src/components/HomePage.tsx
import React from 'react';
import { Users, Calendar, PlusCircle } from 'lucide-react';

interface HomePageProps {
  navigate: (page: string, props?: Record<string, unknown>) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <div className="container mx-auto mt-8">
      {/* Hero Section with Thematic Image and Animation */}
      <div
        className="relative bg-cover bg-center rounded-lg shadow-xl overflow-hidden mb-8 animate-fade-in"
        style={{
          // Professional corporate and nature blend imagery
          // Example: A blurred image of a modern office space blending into a lush green landscape
          backgroundImage: `url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          minHeight: '400px',
          backgroundAttachment: 'fixed', // Parallax-like effect
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center p-8 text-center animate-fade-in-up">
          <h2 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg animate-pulse-subtle">
            Cultivating Leaders & Changemakers
          </h2>
          <p className="text-xl text-white max-w-2xl mb-6 leading-relaxed drop-shadow-md">
            Engaging students and researchers in cross-disciplinary collaboration, forward-thinking research, and global dialogue for a more innovative and inclusive future.
          </p>
          <button
            onClick={() => navigate('conferences')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            <span className="flex items-center justify-center">
              <PlusCircle className="mr-2" size={24} /> View Upcoming Conferences
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <h2 className="text-4xl font-bold text-center text-blue-800 dark:text-blue-400 mb-6 animate-fade-in">Welcome to IATM</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md dark:bg-blue-900/30 dark:border dark:border-blue-700 animate-slide-in-left">
            <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center"><Users className="mr-2" /> Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To cultivate the next generation of leaders and changemakers by engaging students and researchers in cross-disciplinary collaboration,
              forward-thinking research, and global dialogue for a more innovative and inclusive future.
            </p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-lg shadow-md dark:bg-indigo-900/30 dark:border dark:border-indigo-700 animate-slide-in-right">
            <h3 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300 mb-3 flex items-center"><Calendar className="mr-2" /> Our Vision</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To be a global catalyst for empowering emerging leaders and advancing interdisciplinary innovation that shapes a more connected,
              inclusive, and sustainable world.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md dark:bg-gray-700 animate-fade-in">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">Our Objectives</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Organize conferences, seminars, and workshops that advance research, education, and cross-disciplinary dialogue.</li>
            <li>Publish scholarly journals, books, and other academic resources to disseminate knowledge and promote intellectual engagement.</li>
            <li>Provide mentoring, advisory, and consultancy services for students, researchers, educational institutions, and small-to-medium enterprises (SMEs).</li>
            <li>Create opportunities for student engagement through internships, research projects, and volunteer initiatives that enhance experiential learning.</li>
            <li>Promote academic and industry collaborations to drive innovation, knowledge exchange, and professional development across sectors.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
