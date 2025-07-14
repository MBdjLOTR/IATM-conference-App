// src/contexts/ThemeContext.tsx
import React, { useState, useEffect } from 'react';
import { ThemeContext} from './ThemeContext';

// --- Theme Provider Component ---
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  // Apply the theme class to the document's root element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark'); // Remove existing theme classes
      root.classList.add(theme); // Add the current theme class
      localStorage.setItem('theme', theme); // Persist theme preference
    }
  }, [theme]); // Re-run effect when theme changes

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};