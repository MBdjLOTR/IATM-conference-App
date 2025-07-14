// src/contexts/AppContext.tsx
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import type { Auth } from 'firebase/auth'; // Import Auth type
import { getFirestore, Firestore } from 'firebase/firestore'; // Import Firestore type
// Removed unused imports: collection, addDoc, onSnapshot, query, orderBy, doc, getDoc, setDoc
import { Loader, XCircle } from 'lucide-react';
import AppContext from './AppContext.ts'
// Declare global variables for TypeScript
// These are provided by the Canvas environment at runtime
declare global {
  var __app_id: string | undefined;
  var __firebase_config: string | undefined;
  var __initial_auth_token: string | undefined;
}


// --- Firebase Provider Component ---
export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [db, setDb] = useState<Firestore | null>(null); // Use Firestore type
  const [auth, setAuth] = useState<Auth | null>(null); // Use Auth type
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        // --- IMPORTANT: REPLACE THESE WITH YOUR ACTUAL FIREBASE CONFIGURATION FOR LOCAL DEVELOPMENT ---
        // You can find this in your Firebase project console:
        // Project settings (gear icon) -> Project settings -> General -> Your apps -> Web app (scroll down)

        const localFirebaseConfig = {
          apiKey: "AIzaSyDp0FXcvSPyD_u7dWZuh5UEmEOJykxaDrs",
          authDomain: "iatm-conference.firebaseapp.com",
          projectId: "iatm-conference",
          storageBucket: "iatm-conference.firebasestorage.app",
          messagingSenderId: "849897834613",
          appId: "1:849897834613:web:ae1fee46451e69cd21d03c",
          measurementId: "G-XP64HYGJ1D"
        };
        // --- END OF FIREBASE CONFIGURATION FOR LOCAL DEVELOPMENT ---

        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : localFirebaseConfig;

        if (!firebaseConfig || Object.keys(firebaseConfig).length === 0 || !firebaseConfig.apiKey) {
          throw new Error("Firebase configuration is missing or invalid. Please ensure you've provided your Firebase config.");
        }

        const app: FirebaseApp = initializeApp(firebaseConfig); // Explicitly type app
        const firestoreDb: Firestore = getFirestore(app); // Explicitly type firestoreDb
        const firebaseAuth: Auth = getAuth(app); // Explicitly type firebaseAuth

        setDb(firestoreDb);
        setAuth(firebaseAuth);

        // Listen for auth state changes to determine user ID
        const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
          if (user) {
            setUserId(user.uid);
          } else {
            // If no user is logged in, try to sign in with custom token (from Canvas) or anonymously
            if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
              try {
                await signInWithCustomToken(firebaseAuth, __initial_auth_token);
              } catch (tokenError: unknown) { // Use unknown for caught errors
                console.error("Error signing in with custom token:", tokenError);
                await signInAnonymously(firebaseAuth); // Fallback to anonymous sign-in
              }
            } else {
              await signInAnonymously(firebaseAuth); // Sign in anonymously if no token
            }
          }
          setIsAuthReady(true); // Mark auth as ready after initial check/sign-in attempt
          setLoading(false); // Stop loading regardless of auth success, so app can render
        });

        return () => unsubscribe(); // Cleanup auth listener on component unmount
      } catch (err: unknown) { // Use unknown for caught errors
        console.error("Failed to initialize Firebase:", err);
        // Provide a more user-friendly error message, perhaps suggesting checking console
        setError("Failed to initialize application. Please check your browser's console for more details.");
        setLoading(false);
      }
    };

    initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Display loading or error states while Firebase initializes
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <Loader className="animate-spin text-blue-600 dark:text-blue-400 w-12 h-12" />
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Loading application...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-950">
        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-red-300 dark:border-red-700">
          <XCircle className="text-red-500 w-12 h-12" />
          <p className="mt-4 text-lg text-red-700 dark:text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  // Render children only when Firebase is ready
  return (
    <AppContext.Provider value={{ db, auth, userId, isAuthReady }}>
      {children}
    </AppContext.Provider>
  );
};



