// Import necessary modules and components
import React from "react";
import NavMenu from "./navmenu";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

// Define your metadata more extensively
export const metadata = {
  title: "Interactive 454 Retail Calendar",
  description:
    "Interact with this interactive 454 Calendar (Retail Industry Standard from NRF) to pick date and calculate timeframe effortlessly and mistake free. Restated calendar included to deal with 53-week years.",
  author: "YZY",
  keywords:
    "NRF retail calendar, 454 calendar, 445 calendar, timeframe, MTD, QTD, YOY, retail analysis, interactive calendar, 3 Years Calendar",
};

export default function RootLayout({ children }) {
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
