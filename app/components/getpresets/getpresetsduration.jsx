"use client";

import { useState } from "react";

import ResultCard from "../ui/resultcard";

export default function GetPresetDuration() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [error, setError] = useState("");

  const [compStartLY, setcompStartLY] = useState(null);
  const [compEndLY, setcompEndLY] = useState(null);
  const [compStartLLY, setcompStartLLY] = useState(null);
  const [compEndLLY, setcompEndLLY] = useState(null);

  const calcCompDay = async (e) => {
    e.preventDefault();

    try {
      const repStartLY = await fetch("api/std_date", {
        method: "POST",
        body: JSON.stringify({ anchorDate: startDate, offset: 1 }),
      });
      const dataStartLY = await repStartLY.json();
      setcompStartLY(dataStartLY.cal_dt);

      const repEndLY = await fetch("api/std_date", {
        method: "POST",
        body: JSON.stringify({ anchorDate: endDate, offset: 1 }),
      });
      const dataEndLY = await repEndLY.json();
      setcompEndLY(dataEndLY.cal_dt);

      const repStartLLY = await fetch("api/std_date", {
        method: "POST",
        body: JSON.stringify({ anchorDate: startDate, offset: 2 }),
      });
      const dataStartLLY = await repStartLLY.json();
      setcompStartLLY(dataStartLLY.cal_dt);

      const repEndLLY = await fetch("api/std_date", {
        method: "POST",
        body: JSON.stringify({ anchorDate: endDate, offset: 2 }),
      });
      const dataEndLLY = await repEndLLY.json();
      setcompEndLLY(dataEndLLY.cal_dt);
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
            Start date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="border-2 border-gray-200 rounded-lg p-2 leading-tight focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="date" className="mb-2 text-lg font-medium">
            End date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="border-2 border-gray-200 rounded-lg p-2 leading-tight focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
        {compStartLY && (
          <ResultCard label="LY Start Date" value={compStartLY} />
        )}
        {compEndLY && <ResultCard label="LY End Date" value={compEndLY} />}
        {compStartLLY && (
          <ResultCard label="LLY Start Date" value={compStartLLY} />
        )}
        {compEndLLY && <ResultCard label="LLY End Date" value={compEndLLY} />}
      </div>
      {error && (
        <div className="mt-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
