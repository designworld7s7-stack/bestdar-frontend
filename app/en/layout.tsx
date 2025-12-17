import Header from "@/components/Header";

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="ltr" lang="en">
      <Header locale="en" />
      {children}
    </div>
  );
}
