// Import necessary modules and components
import { Metadata } from "next";
import { Inter } from "next/font/google";
import NavMenu from "./navmenu";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

// Preloading the font for performance improvement
const inter = Inter({ subsets: ["latin"] });

// Define your metadata more extensively
export const metadata = {
  title: "Interactive 454 Retail Calendar",
  description:
    "Interact with this interactive 454 Calendar (Retail Industry Standard from NRF) to pick date and calculate timeframe effortlessly and mistake free. Restated calendar included to deal with 53-week years.",
  // Adding more metadata can help with SEO
  author: "YZY", // The author's name
  // Include keywords related to the content of your website
  keywords:
    "NRF retail calendar, 454 calendar, 445 calendar, timeframe, MTD, QTD, YOY, retail analysis, interactive calendar, 3 Years Calendar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add the meta tags in the head section of your document */}
        <meta charSet="UTF-8" />
        {/* Responsive meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* SEO-related meta tags */}
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        {/* Open Graph / Facebook meta tags for better social sharing */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        {/* Twitter Card meta tags for better social sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        {/* Preload main font for performance */}
        <link rel="preload" href={inter.src} as="font" crossOrigin="" />
        {/* Title tag */}
        <title>{metadata.title}</title>
      </head>
      <body className="flex flex-col">
        <NavMenu />
        {/* Main content */}
        <main className="flex flex-col mt-20">{children}</main>
        {/* Analytics and notifications */}
        <Analytics />
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
