"use client";

import { useState } from "react";

import ResultCard from "./resultcard";

export default function GetMonth() {
  const [yearNum, setYearNum] = useState(0);
  const [moNum, setMoNum] = useState(0);
  const [error, setError] = useState("");
  const [compStart, setcompStart] = useState(null);
  const [compEnd, setcompEnd] = useState(null);

  const calcYear = async (e) => {
    e.preventDefault();

    try {
      const rep = await fetch("api/std_duration_mo", {
        method: "POST",
        body: JSON.stringify({ yearNum, moNum }),
      });

      if (!rep.ok) {
        throw new Error("HTTP error");
      }

      const data = await rep.json();
      setcompStart(data.mo_strt_dt);
      setcompEnd(data.mo_end_dt);
    } catch (err) {
      setError("fail to fetch");
      console.error(err);
    }
  };
  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={calcYear} className="mb-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="date" className="mb-2 text-lg font-medium">
            Year
          </label>
          <input
            type="number"
            id="date"
            name="date"
            className="border-2 border-gray-200 rounded-lg p-2 leading-tight focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
            value={yearNum}
            onChange={(e) => setYearNum(parseInt(e.target.value, 10) || "")}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="date" className="mb-2 text-lg font-medium">
            Month
          </label>
          <input
            type="number"
            id="date"
            name="date"
            className="border-2 border-gray-200 rounded-lg p-2 leading-tight focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
            value={moNum}
            onChange={(e) => setMoNum(parseInt(e.target.value, 10) || "")}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          Get date!
        </button>
      </form>
      <div className="flex flex-col space-y-4">
        {compStart && <ResultCard label="Weekday" value={compStart} />}
        {compEnd && <ResultCard label="Fiscal Year" value={compEnd} />}
      </div>
      {error && (
        <div className="mt-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
