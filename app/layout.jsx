// Import necessary modules and components
import React from "react";
import Head from "next/head"; // Import Head from Next.js
import { Inter } from "next/font/google";
import NavMenu from "./navmenu";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

// Define your metadata more extensively
const metadata = {
  title: "Interactive 454 Retail Calendar",
  description:
    "Interact with this interactive 454 Calendar (Retail Industry Standard from NRF) to pick date and calculate timeframe effortlessly and mistake free. Restated calendar included to deal with 53-week years.",
  author: "YZY",
  keywords:
    "NRF retail calendar, 454 calendar, 445 calendar, timeframe, MTD, QTD, YOY, retail analysis, interactive calendar, 3 Years Calendar",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <title>{metadata.title}</title>
      </Head>
      <body className="flex flex-col">
        <NavMenu />
        <main className="flex flex-col mt-20">{children}</main>
        <Analytics />
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </>
  );
}
