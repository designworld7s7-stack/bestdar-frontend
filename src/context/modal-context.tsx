'use client';

import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext<any>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const openConsultation = () => setIsConsultationOpen(true);
  const closeConsultation = () => setIsConsultationOpen(false);

  return (
    <ModalContext.Provider value={{ isConsultationOpen, openConsultation, closeConsultation }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModals = () => {
  const context = useContext(ModalContext);
  // Safety check
  if (!context) {
    throw new Error("useModals must be used within a ModalProvider. Check if your Layout wraps {children} in <ModalProvider>.");
  }
  return context;
};