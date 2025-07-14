import { createContext, useContext } from 'react';
import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';

export interface AppContextType {
  db: Firestore | null;
  auth: Auth | null;
  userId: string | null;
  isAuthReady: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a FirebaseProvider');
  }
  return context;
};
export default AppContext;