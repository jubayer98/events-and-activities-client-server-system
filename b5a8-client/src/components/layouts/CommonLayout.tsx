"use client";

import { ReactNode, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "../Navbar";
import { useAuth } from "@/contexts/AuthContext";
import CommonLayoutSkeleton from "./CommonLayoutSkeleton";

interface CommonLayoutProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: CommonLayoutProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user]);

  if (isLoading) {
    return <CommonLayoutSkeleton />;
  }

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
