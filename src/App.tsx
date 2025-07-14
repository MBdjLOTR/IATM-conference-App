// src/App.tsx
import React, { useState } from 'react';
import { FirebaseProvider, } from './contexts/AppContext.tsx'; // Import FirebaseProvider and useAppContext
import {useAppContext} from './contexts/AppContext.ts'; // Import useAppContext
import { ThemeProvider } from './contexts/ThemeContext.tsx'; // Import ThemeProvider

// Import your components
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ConferencesPage from './components/ConferencesPage';
import SubmissionFormPage from './components/SubmissionFormPage';
import SubmissionsListPage from './components/SubmissionsListPage';
import ContactPage from './components/ContactPage';

// --- Main App Component ---
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  // Changed 'any' to 'unknown' for pageProps
  const [pageProps, setPageProps] = useState<Record<string, unknown>>({});

  // Changed 'any' to 'unknown' for props parameter
  const navigate = (page: string, props: Record<string, unknown> = {}) => {
    setCurrentPage(page);
    setPageProps(props);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'conferences':
        return <ConferencesPage navigate={navigate} />;
      case 'submit':
        return (
          <SubmissionFormPage
            navigate={navigate}
            conferenceId={pageProps.conferenceId as string}
            conferenceName={pageProps.conferenceName as string}
            {...pageProps}
          />
        );
      case 'submissions':
        return <SubmissionsListPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  const { userId } = useAppContext(); // Get userId from context for header

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col dark:bg-gray-900 dark:text-gray-200">
      {/* Global styles (font, scrollbar, animations) are now handled by src/index.css */}
      <Header navigate={navigate} userId={userId} />
      <main className="flex-grow p-4">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

// Wrap App with FirebaseProvider and ThemeProvider
export default function WrappedApp() {
  return (
    <FirebaseProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </FirebaseProvider>
  );
}
