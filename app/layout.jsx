// Import necessary modules and components
import React from "react";
import NavMenu from "./navmenu";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

// Define your metadata more extensively
export const metadata = {
  title: "Interactive Retail Calendar",
  description:
    "Use this interactive 454 Calendar to pick date and calculate timeframe effortlessly and mistake free. Same calendar as the retail industry standard from NRF. Restated calendar included to deal with 53-week years.",
  author: "YZY",
  keywords:
    "NRF retail calendar, 454 calendar, 445 calendar, timeframe, MTD, QTD, YOY, retail analysis, interactive calendar, 3 Years Calendar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="TAB72fTdWrWM-UNi_DiJJ9EY03oJ9RoJptG8D0HOXMs"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
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
