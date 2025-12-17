import Header from "@/components/Header";

export default function ArLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" lang="ar">
      <Header locale="ar" />
      {children}
    </div>
  );
}
