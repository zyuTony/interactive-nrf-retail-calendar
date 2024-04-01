"use client";
import GetMonth from "../components/duration/getmonth";
import GetQuarter from "../components/duration/getquarter";
import { useState } from "react";

export default function Home() {
  const [activeModule, setActiveModule] = useState("Month");

  return (
    <div>
      <div className="flex justify-center gap-2 mb-4">
        <p className="mb-4">Duration</p>
        <button
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out ${
            activeModule === "Month"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => {
            setActiveModule("Month");
          }}
        >
          Month
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out ${
            activeModule === "Quarter"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => {
            setActiveModule("Quarter");
          }}
        >
          Quarter
        </button>
      </div>

      {activeModule === "Month" && <GetMonth />}
      {activeModule === "Quarter" && <GetQuarter />}
    </div>
  );
}
