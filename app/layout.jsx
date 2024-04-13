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
  image: "https://i.imgur.com/bIxdhMg.png",
  url: "https://www.findtimeframe.com",
  openGraph: {
    type: "website",
    title: "Interactive Retail Calendar",
    siteName: "Interactive 454 Retail Calendar",
    image: "https://i.imgur.com/bIxdhMg.png",
    url: "https://www.findtimeframe.com",
    width: 1200,
    height: 630,
    alt: "interactive calendar page",
    description:
      "Use this interactive 454 Calendar to pick date and calculate timeframe effortlessly and mistake free. Same calendar as the retail industry standard from NRF. Restated calendar included to deal with 53-week years.",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Verification */}
        <meta
          name="google-site-verification"
          content="TAB72fTdWrWM-UNi_DiJJ9EY03oJ9RoJptG8D0HOXMs"
        />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:site_name" content="Interactive Retail Calendar" />
        <meta property="og:locale" content="en_US" />
        {/* Additional tags for og:image size if known */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className="flex flex-col">
        <NavMenu />
        <main className="flex flex-col mt-20">{children}</main>
        <Analytics />
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </>
  );
}
