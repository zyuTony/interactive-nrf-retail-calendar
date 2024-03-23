"use client";

import { useState } from "react";

import ResultCard from "./resultcard";

export default function GetPreset() {
  const [anchorDate, setAnchorDate] = useState("");
  const [error, setError] = useState("");

  const [compDayLY, setcompDayLY] = useState(null);
  const [compDayLLY, setcompDayLLY] = useState(null);

  const calcCompDay = async (e) => {
    e.preventDefault();

    try {
      const repLY = await fetch("api/std_date", {
        method: "POST",
        body: JSON.stringify({ anchorDate, offset: 1 }),
      });
      const dataLY = await repLY.json();
      setcompDayLY(dataLY.cal_dt);

      const repLLY = await fetch("api/std_date", {
        method: "POST",
        body: JSON.stringify({ anchorDate, offset: 2 }),
      });
      const dataLLY = await repLLY.json();
      setcompDayLLY(dataLLY.cal_dt);
    } catch (err) {
      setError("fail to fetch");
      console.error(err);
    }
  };
  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={calcCompDay} className="mb-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="date" className="mb-2 text-lg font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="border-2 border-gray-200 rounded-lg p-2 leading-tight focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
            value={anchorDate}
            onChange={(e) => setAnchorDate(e.target.value)}
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
        {compDayLY && <ResultCard label="Comp Day from LY" value={compDayLY} />}
        {compDayLLY && (
          <ResultCard label="Comp Day from LLY" value={compDayLLY} />
        )}
      </div>
      {error && (
        <div className="mt-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
