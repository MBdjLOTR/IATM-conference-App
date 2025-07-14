// src/components/Header.tsx
import React from 'react';
import { Home, Calendar, Mail, FileText, Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../contexts/ThemeContext'; // Import theme context
import { useAppContext } from '../contexts/AppContext'; // Import app context for userId

export interface HeaderProps {
  navigate: (page: string, props?: Record<string, unknown>) => void;
  userId: string | null;
  // ...other props if any
}
const Header: React.FC<HeaderProps> = ({ navigate }) => {
  const { theme, toggleTheme } = useThemeContext(); // Get theme and toggle function from context
  const { userId } = useAppContext(); // Get userId from app context

  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 shadow-lg rounded-b-xl dark:from-gray-900 dark:to-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 md:mb-0">
          IATM Conference Portal
        </h1>
        <nav className="flex space-x-4 items-center">
          <button
            onClick={() => navigate('home')}
            className="flex items-center px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:hover:bg-gray-600"
          >
            <Home className="mr-2" size={20} /> Home
          </button>
          <button
            onClick={() => navigate('conferences')}
            className="flex items-center px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:hover:bg-gray-600"
          >
            <Calendar className="mr-2" size={20} /> Conferences
          </button>
          <button
            onClick={() => navigate('submissions')}
            className="flex items-center px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:hover:bg-gray-600"
          >
            <FileText className="mr-2" size={20} /> My Submissions
          </button>
          <button
            onClick={() => navigate('contact')}
            className="flex items-center px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:hover:bg-gray-600"
          >
            <Mail className="mr-2" size={20} /> Contact
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:hover:bg-gray-600"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </nav>
      </div>
      {userId && (
        <div className="container mx-auto text-right text-sm mt-2">
          Logged in as: <span className="font-semibold">{userId}</span>
        </div>
      )}
    </header>
  );
};

export default Header;