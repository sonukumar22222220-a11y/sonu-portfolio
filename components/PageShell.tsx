import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { ContactContent } from "@/lib/types";

export default function PageShell({
  contact,
  children,
}: {
  contact: ContactContent;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-32">{children}</main>
      <Footer contact={contact} />
    </>
  );
}
