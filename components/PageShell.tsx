import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { AboutContent, ContactContent } from "@/lib/types";

export default function PageShell({
  about,
  contact,
  children,
}: {
  about: AboutContent;
  contact: ContactContent;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar name={about.name} />
      <main className="pt-32">{children}</main>
      <Footer about={about} contact={contact} />
    </>
  );
}
