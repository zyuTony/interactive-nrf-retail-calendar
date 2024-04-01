"use client";

import { useState, useEffect, useCallback } from "react";
import {
  setMonthDurationCookie,
  getMonthDurationFromCookie,
} from "../cookietracking/cookiehandler";
import ResultCard from "../ui/resultcard";
import HistoryDisplay from "../ui/historycard";

export default function GetMonth() {
  const [yearNum, setYearNum] = useState(new Date().getFullYear()); // Default to current year
  const [moNum, setMoNum] = useState(new Date().getMonth() + 1); // Default to current month

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const [compStart, setcompStart] = useState(null);
  const [compEnd, setcompEnd] = useState(null);

  // for updating HistoryCard display
  const varNamePairs = {
    input: [
      { var: "yearNum", name: "Fiscal Year" },
      { var: "moNum", name: "Fiscal Month" },
    ],
    output: [
      { var: "mo_strt_dt", name: "Start Date" },
      { var: "mo_end_dt", name: "End Date" },
    ],
  };
  const monthNames = {
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
    12: "January",
  };
  useEffect(() => {
    // Load history from cookie at component mount
    const historyData = getMonthDurationFromCookie();
    if (historyData) {
      const historyParsed = JSON.parse(historyData);
      setHistory(historyParsed);
      if (historyParsed.length > 0) {
        setYearNum(historyParsed[historyParsed.length - 1].yearNum);
        setMoNum(historyParsed[historyParsed.length - 1].moNum);
      }
    }
    setLoading(false);
  }, []);

  const calcYear = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const rep = await fetch("api/std_duration_mo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ yearNum, moNum }),
      });

      if (!rep.ok) {
        throw new Error("API is down. Please try again later.");
      }

      const data = await rep.json();
      setcompStart(data.mo_strt_dt);
      setcompEnd(data.mo_end_dt);
      setMonthDurationCookie(history, { yearNum, moNum, ...data });
      setHistory(JSON.parse(getMonthDurationFromCookie()));
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  if (loading) {
    return null;
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Parent container for side-by-side layout */}
      <div className="flex flex-row justify-between gap-8">
        {/* Left side: Form and ResultCards */}
        <div className="flex-1">
          <form onSubmit={calcYear} className="mb-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="year" className="mb-2 text-lg font-medium">
                Fiscal Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                min="2003"
                max="2026"
                defaultValue={history[history.length - 1]?.yearNum}
                className="border-2 border-gray-200 rounded-lg p-2 leading-tight focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
                onChange={(e) => setYearNum(parseInt(e.target.value, 10) || "")}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="month" className="mb-2 text-lg font-medium">
                Fiscal Month
              </label>
              <select
                id="month"
                name="month"
                className="border-2 border-gray-200 rounded-lg p-2 leading-tight focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
                defaultValue={history[history.length - 1]?.moNum}
                onChange={(e) => setMoNum(parseInt(e.target.value, 10))}
              >
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
                <option value="12">January</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              Get Date
            </button>
          </form>

          <div className="flex flex-col space-y-4">
            <ResultCard
              label="Start date"
              value={compStart ? compStart : ""}
              className="flex-initial text-m w-full
                  "
            />
            <ResultCard
              label="End date"
              value={compEnd ? compEnd : ""}
              className="flex-initial text-m w-full
                  "
            />
          </div>
          {error && (
            <div className="mt-4">
              <p className="text-red-400">{error}</p>
            </div>
          )}
        </div>
        <div className="flex-1">
          <HistoryDisplay
            history={history}
            limit={3}
            varNamePairs={varNamePairs}
            nameCode={monthNames}
            indicator="moNum"
          />
        </div>
      </div>
    </div>
  );
}
