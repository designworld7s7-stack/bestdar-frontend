import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/shared/nav";
// 1. Import the Provider and the Global Wrapper
import { ModalProvider } from "@/context/modal-context";
import ConsultationGlobalWrapper from "@/components/shared/consultation-wrapper";

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
      <body className="antialiased bg-white text-brand-black">
        {/* 2. Wrap everything in the ModalProvider */}
        <ModalProvider>
          <Navbar lang={lang} />
          {children}
          
          {/* 3. This wrapper listens for the global open/close */}
          <ConsultationGlobalWrapper lang={lang} />
        </ModalProvider>
      </body>
    </html>
  );
}