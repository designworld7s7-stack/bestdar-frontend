'use client';

import { useModals } from "@/context/modal-context";
import ConsultationModal from "./consultation-modal";

export default function ConsultationGlobalWrapper({ lang }: { lang: string }) {
  const { isConsultationOpen, closeConsultation } = useModals();

  return (
    <ConsultationModal 
      lang={lang} 
      isOpen={isConsultationOpen} 
      onClose={closeConsultation} 
    />
  );
}