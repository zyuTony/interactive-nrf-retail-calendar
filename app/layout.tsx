import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavMenu from "./navmenu";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Find TimeFrame",
  description: "created by Tony Yu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <NavMenu />
        {/* Adjust the mt-x class as needed to ensure enough space for the NavMenu */}
        <main className="flex flex-col mt-20">{children}</main>
        <Analytics />
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
