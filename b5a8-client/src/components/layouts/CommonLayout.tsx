import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CommonLayoutProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: CommonLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
