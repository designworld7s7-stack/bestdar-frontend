import type { Metadata } from "next";
import { Inter, Playfair_Display } from 'next/font/google'; // Import loaders
import "../globals.css";
import Navbar from "@/components/shared/nav";
import { ModalProvider } from "@/context/modal-context";
import { AuthProvider } from "@/context/auth-context";
import ConsultationGlobalWrapper from "@/components/shared/consultation-wrapper";

// 1. INITIALIZE HERE (Outside the function) [cite: 2026-02-04]
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', 
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Best Dar | Premium Real Estate",
  description: "Invest in Turkey and UAE with Best Dar",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isRtl = lang === "ar";

  return (
    <html lang={lang} dir={isRtl ? "rtl" : "ltr"}>
      {/* 2. APPLY CLASS NAMES HERE [cite: 2026-02-04] */}
      <body className={`${inter.className} antialiased bg-white text-brand-black`}>
        <AuthProvider>
          <ModalProvider>
            <Navbar lang={lang} />
            {children}
            <ConsultationGlobalWrapper lang={lang} />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}