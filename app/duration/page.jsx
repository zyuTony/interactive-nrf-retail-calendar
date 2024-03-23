"use client";
import GetMonth from "../components/getmonth";
import { useState } from "react";

export default function Home() {
  const [activeModule, setActiveModule] = useState("Month");

  return (
    <div>
      <p className="mb-4">Presets</p>
      <div className="flex justify-center gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out ${
            activeModule === "singleDay"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => {
            setActiveModule("Month");
          }}
        >
          Single Day
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out ${
            activeModule === "duration"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => {
            setActiveModule("duration");
          }}
        >
          Duration
        </button>
      </div>

      {activeModule === "Month" && <GetMonth />}
    </div>
  );
}
