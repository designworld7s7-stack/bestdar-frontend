'use client';

import React, { createContext, useContext, useState } from 'react';

// Define your three roles [cite: 2026-02-04]
type Role = 'guest' | 'user' | 'investor';

interface AuthContextType {
  role: Role;
  setRole: (role: Role) => void; // Use this to test different views [cite: 2026-02-04]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Change 'guest' to 'investor' here to see the site change instantly! [cite: 2026-02-04]
  const [role, setRole] = useState<Role>('guest');

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};