import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { ContactContent, SiteInfo } from "@/lib/types";

export default function PageShell({
  site,
  contact,
  children,
}: {
  site: SiteInfo;
  contact: ContactContent;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar site={site} />
      <main className="pt-32">{children}</main>
      <Footer site={site} contact={contact} />
    </>
  );
}
