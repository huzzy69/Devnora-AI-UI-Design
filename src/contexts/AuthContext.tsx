import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  currentWorkspace: 'owner' | 'admin' | 'member' | null;
  userEmail: string | null;
  isAuthenticated: boolean;
  login: (workspace: 'owner' | 'admin' | 'member', email: string) => void;
  logout: () => void;
  checkSession: () => { isLoggedIn: boolean; workspace: string | null; email: string | null };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentWorkspace, setCurrentWorkspace] = useState<'owner' | 'admin' | 'member' | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load session from localStorage on mount
  useEffect(() => {
    const savedWorkspace = localStorage.getItem('currentWorkspace') as 'owner' | 'admin' | 'member' | null;
    const savedEmail = localStorage.getItem('userEmail');
    
    if (savedWorkspace && savedEmail) {
      setCurrentWorkspace(savedWorkspace);
      setUserEmail(savedEmail);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (workspace: 'owner' | 'admin' | 'member', email: string) => {
    setCurrentWorkspace(workspace);
    setUserEmail(email);
    setIsAuthenticated(true);
    
    // Save to localStorage
    localStorage.setItem('currentWorkspace', workspace);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('loginTime', new Date().toISOString());
  };

  const logout = () => {
    setCurrentWorkspace(null);
    setUserEmail(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('currentWorkspace');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('loginTime');
  };

  const checkSession = () => {
    const workspace = localStorage.getItem('currentWorkspace');
    const email = localStorage.getItem('userEmail');
    
    return {
      isLoggedIn: !!(workspace && email),
      workspace: workspace,
      email: email,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        currentWorkspace,
        userEmail,
        isAuthenticated,
        login,
        logout,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
