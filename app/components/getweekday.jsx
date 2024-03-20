"use client";

import { useState } from "react";

import ResultCard from "./resultcard";

export default function GetWeekday() {
  const [anchorDate, setAnchorDate] = useState("");
  const [error, setError] = useState("");

  const [weekday, setWeekday] = useState(null);
  const [fisyrnbr, setFisyrnbr] = useState(null);
  const [fisqtrnbr, setFisqtrnbr] = useState(null);
  const [fismonbr, setFismonbr] = useState(null);
  const [fiswknbr, setFiswknbr] = useState(null);

  const calcYear = async (e) => {
    e.preventDefault();

    try {
      const rep = await fetch("api/calc_date", {
        method: "POST",
        body: JSON.stringify({ anchorDate }),
      });

      if (!rep.ok) {
        throw new Error("HTTP error");
      }

      const data = await rep.json();

      setWeekday(data.dy_of_wk_desc);
      setFisyrnbr(data.fis_yr_nbr);
      setFisqtrnbr(data.fis_qtr_nbr);
      setFismonbr(data.fis_mo_nbr);
      setFiswknbr(data.fis_wk_nbr);
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
        {weekday && <ResultCard label="Weekday" value={weekday} />}
        {fisyrnbr && <ResultCard label="Fiscal Year" value={fisyrnbr} />}
        {fisqtrnbr && <ResultCard label="Fiscal Quarter" value={fisqtrnbr} />}
        {fismonbr && <ResultCard label="Fiscal Month" value={fismonbr} />}
        {fiswknbr && <ResultCard label="Fiscal Week" value={fiswknbr} />}
      </div>
      {error && (
        <div className="mt-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
