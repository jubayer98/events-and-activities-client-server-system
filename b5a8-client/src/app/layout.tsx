import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ClientLayout from "./layout-client";

export const metadata: Metadata = {
  title: "SyncSpace - Event Management Platform",
  description: "Discover and create memorable events with SyncSpace",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:rgb(37,99,235);stop-opacity:1' /><stop offset='100%' style='stop-color:rgb(147,51,234);stop-opacity:1' /></linearGradient></defs><rect width='100' height='100' rx='20' fill='url(%23grad)'/><text x='50' y='72' font-size='70' font-weight='bold' text-anchor='middle' fill='white' font-family='system-ui, -apple-system, sans-serif'>S</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
